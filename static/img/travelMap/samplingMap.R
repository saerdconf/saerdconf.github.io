# Install and load necessary libraries
install.packages("ggplot2")
install.packages("rnaturalearth")
install.packages("rnaturalearthdata")
install.packages("sf")
install.packages("dplyr")  # For data manipulation

library(ggplot2)
library(rnaturalearth)
library(rnaturalearthdata)
library(sf)
library(dplyr)
library(tidyverse)
library(giscoR)

# Load Natural Earth world data (land only)

# Replace "path/to/your/shapefile.shp" with the actual file path
shapefile <- st_read("/Users/knith/Mirror/05_Website/kosalnith.github.io/static/img/travelMap/khmadm_2018_shp/khm_admbnda_adm1_gov_20181004.shp")

# View the shapefile
print(shapefile)


# Plot the shapefile using ggplot2
ggplot(data = shapefile) +
  geom_sf() +
  theme_minimal() +
  labs(title = "Map from Shapefile")


ggplot(data = shapefile) +
  geom_sf(fill = "lightblue", color = "black") +
  theme_minimal() +
  labs(title = "Customized Map")

# Create a dataset with country names and the 'x' variable (1 = red, 0 = off-white)
data <- data.frame(
  ADM1_PCODE = c("KH12", "KH03", "KH25", "KH08", "KH14", "KH20", "KH21"),
  x = c(1, 1, 1, 1, 1, 1, 1)  # Example: 1 for red, 0 for off-white
)

# Merge the dataset with the world spatial data using the country name
cambodia <- shapefile %>% 
  left_join(data, by = c("ADM1_PCODE" = "ADM1_PCODE"))

# For countries not in the data, set 'x' to NA and treat them as 0 (off-white)
cambodia$x[is.na(cambodia$x)] <- 0

# Create the map with enhanced colors: red for 'x = 1', pastel color for 'x = 0'
ggplot(data = cambodia) +
  geom_sf(aes(fill = factor(x)), color = "gray30", size = 0.0) +  # Map 'x' to fill color
  scale_fill_manual(values = c("0" = "#DFE0D5", "1" = "#DE4D04")) +  # Define great colors: off-white and vibrant red
  theme(
    panel.background = element_rect(fill = "#FFFFFF", color = NA),  # Soft light blue background for the ocean
    panel.grid.major = element_blank(),
    panel.grid.minor = element_blank(),
    axis.text = element_blank(),
    axis.ticks = element_blank(),
    legend.position = "none",  # Hide legend for a clean look
    plot.title = element_text(size = 11, face = "bold", hjust = 0.5, color = "gray30"),  # Stylish title
    plot.subtitle = element_text(size = 9, hjust = 0.5, color = "gray20")  # Subtitle with complementary color
  )+
  geom_text(aes(label = ADM1_EN, geometry = geometry), stat = "sf_coordinates", size = 10, color = "gray30")

ggsave("/Users/knith/Library/CloudStorage/OneDrive-CambodiaDevelopmentResourceInstitute/01_Projects/12_PCII/1_CDRIsurvey/sampling/samplingplot.png", plot = map, width = 19, height = 12, dpi = 300)
