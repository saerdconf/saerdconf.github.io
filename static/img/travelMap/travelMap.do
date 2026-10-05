cd "C:\Users\Lenovo\Downloads\travelMap"

clear

use "C:\Users\Lenovo\Downloads\travelMap\world.dta", clear

** Travel Map

spmap visit using world_shp2, id(_ID) ///
	cln(5) fcolor(Oranges)    ///
	legstyle(0) legend(pos(7) size(2.8)) ///
	ocolor(white ..) osize(.03 ..)  ///
    note("Map layer: Orange indicates the world I visited and cantaloupe indicates the world I have not yet visited.", size(vsmall))
	
	graph export "C:\Users\Lenovo\Downloads\travelMap\travelMap.png", replace wid(5000)	
	graph export "C:\Users\Lenovo\Downloads\travelMap\travelMap.pdf", replace 


spmap active using "bezirk_shp.dta" if date==`r(max)', ///
id(_ID) clm(k) cln(10) fcolor("`colors'")  /// 
	ocolor(white ..) osize(vvthin ..) ///
	ndfcolor(white ..) ndocolor(gs8 ..) ndsize(vvthin ..) ndlabel("No cases") ///
		legend(pos(11) size(*1.2) symx(*1) symy(*1) forcesize) legstyle(2)   ///
  	    polygon(data("NUTS2_shp")  ocolor(black)  osize(thin) legenda(on) legl("Bundesländer")) //
		title("{fontface Arial Bold:COVID-19 Active Cases (`date')}", size(large)) ///
		subtitle("Total = `diff'", size(small)) ///
		note("Map layer: Statistik Austria. Data: https://covid19-dashboard.ages.at/", size(vsmall))
		graph export "../figures/covid19_austria_active.png", replace wid(3000)	
	
		