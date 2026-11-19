#!/usr/bin/env python3
"""Build program.qmd and speakers.qmd for the SAERD site from the program workbook.

Usage:  python build_program.py SAERD26_Program_v13.xlsx

* Everything (timetable, sessions, papers, speakers, bios) comes from the workbook.
* Speaker photos: an existing speakers.qmd next to this script is read first and each
  speaker keeps the photo file it already uses. A new speaker gets a photo automatically if
  images/speakers/<slug>.jpg|jpeg|png|webp exists (slug = name without titles, hyphenated),
  otherwise an initials badge is shown.
"""
import sys, re, html, datetime as dt
from pathlib import Path
from openpyxl import load_workbook

SRC = Path(sys.argv[1] if len(sys.argv) > 1 else "SAERD26_Program_v13.xlsx")
ROOT = Path(__file__).parent
esc = html.escape
wb = load_workbook(SRC, data_only=True)

def table(ws, first_header):
    rows = list(ws.iter_rows(values_only=True))
    for i, r in enumerate(rows):
        if r and r[0] == first_header:
            hdr = [str(h).strip() if h is not None else "" for h in r]
            return [{h: v for h, v in zip(hdr, r2) if h} for r2 in rows[i + 1:] if any(v is not None for v in r2)]
    raise SystemExit(f"header '{first_header}' not found in {ws.title}")

def to_time(v):
    if isinstance(v, dt.datetime): return v.time()
    if isinstance(v, dt.time): return v
    m = round(float(v) * 24 * 60); return dt.time(m // 60, m % 60)
def to_date(v):
    if isinstance(v, dt.datetime): return v.date()
    if isinstance(v, dt.date): return v
    return dt.date(1899, 12, 30) + dt.timedelta(days=int(v))
def hhmm(t): return t.strftime("%H:%M")

TITLES = re.compile(r"^(H\.E\.|Dr\.|Prof\.|Asso\.|Asst\.|Assoc\.|Mr\.|Miss\.|Ms\.|Mrs\.)\s*", re.I)
def bare(name):
    prev = None
    while prev != name: prev, name = name, TITLES.sub("", name.strip())
    return name
def slug(name): return re.sub(r"[^a-z0-9]+", "-", bare(name).lower()).strip("-")
def initials(name):
    parts = [p for p in bare(name).split() if p[0].isalpha()]
    return (parts[0][0] + (parts[-1][0] if len(parts) > 1 else "")).upper()
def clean(t): return " ".join(str(t).split())

settings = {r[0]: r[1] for r in wb["Settings"].iter_rows(values_only=True) if r[0] and r[1] is not None}
CONF, VENUE, HASHTAG = settings.get("Conference name", "SAERD 2026"), settings.get("Venue and location", ""), settings.get("Hashtag", "")

speakers = [s for s in table(wb["Speakers"], "No") if s.get("Name")]
sessions = {s["Code"]: s for s in table(wb["Sessions"], "Code") if s.get("Code")}
papers = [p for p in table(wb["Data"], "No") if p.get("Session")]
schedule = [s for s in table(wb["Schedule"], "Day") if s.get("Item")]

def real(sp): return not sp["Name"].lower().startswith("speaker to be announced")
by_name = {sp["Name"]: sp for sp in speakers if real(sp)}

def person(name):
    sp = by_name[name]
    aff = clean(sp.get("Position / affiliation") or "")
    aff = f' <span class="aff">{esc(aff)}</span>' if aff else ""
    return f'<span class="person"><a href="speakers.html#{slug(name)}">{esc(name)}</a>{aff}</span>'

ROLES = {}   # speaker name -> roles derived from the Schedule sheet
LABELS = {"speaker": "Speaker", "speakers": "Speakers", "moderator": "Moderator"}

def plenary_body(details, item="", day=""):
    """Turn a Schedule 'Details' cell into subtitle / role labels / people (names found on the
    Speakers sheet are linked to their card and show the sheet's affiliation)."""
    lines = [l.strip() for l in str(details).split("\n")]
    out, sub, i = [], [], 0
    people = []
    label = ""
    def flush():
        nonlocal people
        if people: out.append('<div class="slot-people">' + "".join(people) + "</div>"); people = []
    while i < len(lines):
        l = lines[i]; i += 1
        if not l: continue
        if l.lower() in LABELS:
            flush(); label = l.lower(); out.append(f'<div class="slot-role">{LABELS[l.lower()]}</div>'); continue
        if l.upper() == "TBD":
            people.append('<span class="person tba">To be announced</span>'); continue
        name = next((n for n in by_name if bare(l).startswith(bare(n))), None)
        if name:
            people.append(person(name))
            ROLES.setdefault(name, []).append(("Moderator, " if label == "moderator" else "") + f"{item} (Day {day})")
            # "Name, long affiliation" that wrapped onto the next line -> skip the continuation
            if "," in l and i < len(lines) and lines[i] and lines[i].lower() not in LABELS \
               and lines[i].upper() != "TBD" and not any(bare(lines[i]).startswith(bare(n)) for n in by_name):
                i += 1
            continue
        if "(" in l: people.append(f'<span class="person">{esc(l)}</span>')
        else: sub.append(l)
    flush()
    head = "".join(f'<div class="slot-sub">{esc(s)}</div>' for s in sub)
    return head + "".join(out)

def slot(row, n_parallel=None):
    t0, t1 = hhmm(to_time(row["Start"])), hhmm(to_time(row["End"]))
    kind = (row.get("Type") or "other").lower()
    body = f'<div class="slot-title">{esc(row["Item"])}</div>'
    if kind == "parallel":
        body += f'<div class="slot-sub">{n_parallel} sessions run at the same time</div>'
    elif row.get("Details"):
        body += plenary_body(row["Details"], row["Item"], row["Day"]) if kind == "plenary" else f'<div class="slot-sub">{esc(clean(row["Details"]))}</div>'
    return f'<div class="slot slot-{kind}"><div class="slot-time">{t0} – {t1}</div><div class="slot-body">{body}</div></div>'

def paper_li(p):
    printed = clean(p.get("Authors (as printed)") or "")
    lead = f'{p["First name"]} {p["Last name"]}'.strip()
    printed = f"<b>{esc(lead)}</b>{esc(printed[len(lead):])}" if printed.startswith(lead) else esc(printed)
    return f'<li><div class="paper-title">{esc(clean(p["Paper title"]))}</div><div class="paper-authors">{printed}</div></li>'

def card(code):
    s = sessions[code]
    ps = sorted([p for p in papers if p["Session"] == code], key=lambda p: p["Order"])
    return (f'<section class="session-card"><header><span class="code">{code}</span><span class="room">{esc(s["Room"])}</span></header>'
            f'<div class="session-title">{esc(s["Session title"])}</div><div class="chair"><b>Chair:</b> {esc(s["Chair"])}</div>'
            f'<ol class="papers">{"".join(paper_li(p) for p in ps)}</ol></section>')

def block_codes(row):
    block = row["Item"].split()[-1]
    return sorted([c for c, s in sessions.items() if s["Block"] == block], key=lambda c: int(sessions[c]["Room #"]))

# ---------------- program.qmd ----------------
days = sorted({s["Day"] for s in schedule}, key=int)
dates = {r["Day"]: to_date(r["Date"]) for r in schedule}
out = ["---", 'title: "Conference Program"', "css: assets/program.css", "toc: false", "page-layout: full", "---", "",
       f'**{esc(CONF)}**  ', f'**{dates[days[0]].day}–{dates[days[-1]].day} {dates[days[-1]]:%B %Y}** · {esc(VENUE)} · {esc(HASHTAG)}', "",
       "::: {.panel-tabset}", ""]
for d in days:
    out += [f"### Day {d} · {dates[d]:%a} {dates[d].day} {dates[d]:%b}", "", "```{=html}", '<div class="program-day">']
    for r in [x for x in schedule if x["Day"] == d]:
        if (r.get("Type") or "") == "Parallel":
            codes = block_codes(r)
            out.append(slot(r, len(codes)) + '<div class="parallel-grid">' + "".join(card(c) for c in codes) + "</div>")
        else:
            out.append(slot(r))
    out += ["</div>", "```", ""]
out += [":::", "", "[Meet the speakers →](speakers.qmd)", ""]
(ROOT / "program.qmd").write_text("\n".join(out), encoding="utf-8")

# ---------------- speakers.qmd ----------------
# Photos stored under your own filenames (speaker slug -> file). Add new ones here or just keep them in speakers.qmd.
kept = {"ratha-chiv": "images/speakers/Ratha.jpg", "micheal-hill": "images/speakers/Hill.jpg", "chandarany-ouch": "images/speakers/Rani.jpg",
        "rido-thath": "images/speakers/Rido.jpg", "soeng-reth": "images/speakers/Seoun.png"}
old = ROOT / "speakers.qmd"
if old.exists():
    kept.update(re.findall(r'id="([^"]+)"><div class="speaker-photo"><img src="([^"]+)"', old.read_text(encoding="utf-8")))

def photo(name):
    if slug(name) in kept:
        return f'<img src="{kept[slug(name)]}" alt="{esc(name)}" loading="lazy">'
    for ext in ("jpg", "jpeg", "png", "webp"):
        if (ROOT / "images" / "speakers" / f"{slug(name)}.{ext}").exists():
            return f'<img src="images/speakers/{slug(name)}.{ext}" alt="{esc(name)}" loading="lazy">'
    return f'<div class="initials" aria-hidden="true">{esc(initials(name))}</div>'

def role_of(sp):
    return "; ".join(dict.fromkeys(ROLES.get(sp["Name"], []))) or clean(sp.get("Role at the conference") or "")

def bio_parts(sp):
    """Return (card_html, dialog_html). Short bios sit in the card; long ones show a short teaser
    in the card and open in a readable dialog."""
    n = sp["Name"]; paras = [clean(p) for p in str(sp.get("Bio") or "").split("\n") if p.strip()]
    if not paras: return '<p class="bio-tba">Biography to be announced.</p>', ""
    if sum(map(len, paras)) <= 420:
        return '<div class="bio">' + "".join(f"<p>{esc(p)}</p>" for p in paras) + "</div>", ""
    card = (f'<p class="bio-teaser">{esc(paras[0])}</p>'
            f'<button type="button" class="bio-btn" data-bio="{slug(n)}">Read full biography <span aria-hidden="true">→</span></button>')
    dlg = (f'<dialog class="bio-dialog" id="bio-{slug(n)}" aria-label="Biography of {esc(n)}">'
           f'<form method="dialog"><button class="bio-close" aria-label="Close">×</button></form>'
           f'<div class="bio-head"><div class="bio-avatar">{photo(n)}</div><div><h3>{esc(n)}</h3>'
           f'<div class="bio-aff">{esc(clean(sp.get("Position / affiliation") or ""))}</div>'
           f'<div class="speaker-role">{esc(role_of(sp))}</div></div></div>'
           f'<div class="bio-body">' + "".join(f"<p>{esc(p)}</p>" for p in paras) + "</div></dialog>")
    return card, dlg

BIO_JS = """<script>
(function(){
  var root=document.documentElement;
  document.addEventListener('click',function(e){
    var b=e.target.closest('[data-bio]');
    if(b){var d=document.getElementById('bio-'+b.getAttribute('data-bio'));
      if(d&&d.showModal){var cs=getComputedStyle(document.body);d.style.background=cs.backgroundColor;d.style.color=cs.color;root.style.overflow='hidden';d.showModal();}return;}
    if(e.target.matches&&e.target.matches('dialog.bio-dialog'))e.target.close();
  });
  document.addEventListener('close',function(e){if(e.target.matches&&e.target.matches('dialog.bio-dialog'))root.style.overflow='';},true);
})();
</script>"""

cards, dialogs = [], []
for sp in speakers:
    if not real(sp): continue
    n = sp["Name"]
    card_bio, dlg = bio_parts(sp)
    if dlg: dialogs.append(dlg)
    cards.append(f'<article class="speaker-card" id="{slug(n)}"><div class="speaker-photo">{photo(n)}</div>'
                 f'<div class="speaker-info"><h3>{esc(n)}</h3><div class="speaker-aff">{esc(clean(sp.get("Position / affiliation") or ""))}</div>'
                 f'<div class="speaker-role">{esc(role_of(sp))}</div>{card_bio}</div></article>')
tba = [sp for sp in speakers if not real(sp)]
note = " " + "Panel A speakers will be announced." if any("Panel Discussion A" in (sp.get("Role at the conference") or "") for sp in tba) else ""
sq = ["---", 'title: "Speakers"', "css: assets/program.css", "toc: false", "page-layout: full", "---", "",
      "Opening remarks, special lecture, panel discussants, and plenary speakers at SAERD 2026." + note, "",
      "```{=html}", '<div class="speaker-grid">', *cards, "</div>", *dialogs, BIO_JS, "```", "",
      "[View the conference program →](program.qmd)", ""]
(ROOT / "speakers.qmd").write_text("\n".join(sq), encoding="utf-8")

n_sessions = len(sessions)
print(f"program.qmd: {len(papers)} papers in {n_sessions} sessions; speakers.qmd: {len(cards)} speakers "
      f"({sum(1 for c in cards if '<img' in c)} with photos)")
