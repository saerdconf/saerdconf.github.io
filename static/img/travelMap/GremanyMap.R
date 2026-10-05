library(tidyverse)
library(giscoR)

# Step 1: Get the data
germany_districts <- gisco_get_nuts(
  year = "2021", # the most recent year 
  nuts_level = 3, # defines the level of detail we want
  epsg = 3035, # the ETRS89 / LAEA Europe projection
  country = 'Germany'
) |> 
  # Nicer output
  as_tibble() |> 
  janitor::clean_names()
germany_districts

# Step 2: A first static plot
germany_districts |> 
  ggplot(aes(geometry = geometry)) +
  geom_sf()

## Add the state borders
germany_states <- gisco_get_nuts(
  year = "2021", 
  nuts_level = 1,
  epsg = 3035,
  country = 'Germany'
) |> 
  as_tibble() |> 
  janitor::clean_names()
germany_states


germany_districts |> 
  ggplot(aes(geometry = geometry)) +
  geom_sf(
    data = germany_states,
    aes(fill = nuts_name),
    color = 'black',
    linewidth = 0.5
  ) +
  geom_sf()

## We don’t actually see the colors
germany_districts |> 
  ggplot(aes(geometry = geometry)) +
  geom_sf(
    data = germany_states,
    aes(fill = nuts_name),
    color = 'black',
    linewidth = 0.5
  ) +
  geom_sf(
    fill = NA,
    color = 'black',
    linewidth = 0.1
  )

# Step 3: Make the chart interactive
## Define the data_id and tooltip aesthetics to make the chart interactive, and
## Render the chart with the girafe() function.

library(ggiraph)
gg_plt <- germany_districts |> 
  ggplot(aes(geometry = geometry)) +
  geom_sf(
    data = germany_states,
    aes(fill = nuts_name),
    color = 'black',
    linewidth = 0.5
  ) +
  geom_sf_interactive(
    fill = NA, 
    aes(
      data_id = nuts_id,
      tooltip = glue::glue('{nuts_name}')
    ),
    linewidth = 0.1
  )

girafe(ggobj = gg_plt)

## Let’s get rid of the unnecessary legend and grid first though
library(ggiraph)
gg_plt <- germany_districts |> 
  ggplot(aes(geometry = geometry)) +
  geom_sf(
    data = germany_states,
    aes(fill = nuts_name),
    color = 'black',
    linewidth = 0.5
  ) +
  geom_sf_interactive(
    fill = NA, 
    aes(
      data_id = nuts_id,
      tooltip = glue::glue('{nuts_name}')
    ),
    linewidth = 0.1
  ) +
  theme_void() +
  theme(
    legend.position = 'none'
  )

girafe(ggobj = gg_plt)

# Step 4: Merge geographic data

library(sf)
state_nmbrs <- map_dbl(
  germany_districts$geometry,
  \(x) {
    map_lgl(
      germany_states$geometry,
      \(y) st_within(x, y) |> 
        as.logical()
    ) |> which()
  }
)
state_nmbrs

## We can add the state names to the district data.
germany_districts_w_state <- germany_districts |> 
  mutate(
    state = germany_states$nuts_name[state_nmbrs]
  )
germany_districts_w_state |> select(nuts_name, state)

## Show the state name
gg_plt <- germany_districts_w_state |> 
  ggplot(aes(geometry = geometry)) +
  geom_sf(
    data = germany_states,
    aes(fill = nuts_name),
    color = 'black',
    linewidth = 0.5
  ) +
  geom_sf_interactive(
    fill = NA, 
    aes(
      data_id = nuts_id,
      tooltip = glue::glue('{nuts_name}<br>{state}')
    ),
    linewidth = 0.1
  ) +
  theme_void() +
  theme(
    legend.position = 'none'
  )

girafe(ggobj = gg_plt)

# Step 5: Polish
## Create a nicer tooltip labels (by using better fonts and font sizes)
## Use nicer colors via the scale_fill_manual() function

make_nice_label <- function(nuts_name, state) {
  nuts_name_label <- htmltools::span(
    nuts_name,
    style = htmltools::css(
      fontweight = 600,
      font_family = 'Source Sans Pro',
      font_size = '32px'
    )
  )
  state_label <- htmltools::span(
    state,
    style = htmltools::css(
      font_family = 'Source Sans Pro',
      font_size = '20px'
    )
  )
  glue::glue('{nuts_name_label}<br>{state_label}')
}

germany_districts_w_state_and_labels <- germany_districts_w_state  |> 
  mutate(
    nice_label = map2_chr(
      nuts_name,
      state,
      make_nice_label
    )
  )

## Use nicer colors for the chart
ggplt <- germany_districts_w_state_and_labels  |> 
  ggplot(aes(geometry = geometry)) +
  geom_sf(
    data = germany_states,
    aes(fill = nuts_name),
    color = 'black',
    linewidth = 0.5
  ) +
  geom_sf_interactive(
    fill = NA, 
    aes(
      data_id = nuts_id,
      tooltip = nice_label
    ),
    linewidth = 0.1
  ) +
  geom_sf(
    data = germany_states,
    aes(fill = nuts_name),
    color = 'black',
    linewidth = 0.5
  ) +
  geom_sf_interactive(
    fill = NA, 
    aes(
      data_id = nuts_id,
      tooltip = nice_label
    ),
    linewidth = 0.1
  ) +
  theme_void() +
  theme(
    legend.position = 'none'
  ) +
  scale_fill_manual(
    values = c("#A0CBE8FF", "#F28E2BFF", "#FFBE7DFF", "#59A14FFF", "#8CD17DFF", "#B6992DFF", "#F1CE63FF", "#499894FF", "#86BCB6FF", "#E15759FF", "#FF9D9AFF", "#79706EFF", "#BAB0ACFF", "#D37295FF", "#FABFD2FF", "#B07AA1FF", "#D4A6C8FF", "#9D7660FF", "#D7B5A6FF")
  )

girafe(ggobj = ggplt)

## Just turn the hover area black
girafe(
  ggobj = ggplt,
  options = list(
    opts_hover(
      css = girafe_css(
        css = '',
        area = 'stroke: black; fill: black;'
      )
    )
  )
)
