import geopandas as gpd
import json

# Load full ZCTA dataset
zctas = gpd.read_file("zip_shapes/zip_shapes_simplified.shp")

# Your predefined ZIP list
target_zips = {
    "10001", "10002", "10003",
    # ... ~100 ZIPs
}

try:
    with open('zipcodes_on_things_in_my_room.json', 'r') as file:
        data = json.load(file)

    if 'zips' in data and isinstance(data['zips'], list):
        # Use list comprehension to get the values
        values_list = [item.get('zip') for item in data['zips']]
        # Filter out potential 'None' values if the key might be missing for some items
        target_zips = ["0"+str(value) for value in values_list if value < 10000]
        target_zips += [str(value) for value in values_list if value > 10000]
        
except FileNotFoundError:
    print(f"Error: The file 'data.json' was not found.")
except json.JSONDecodeError:
    print(f"Error: Could not decode JSON from the file. Check the file format.")

print(f"targets: {len(target_zips)}")

# Filter
filtered = zctas[zctas["ZCTA5CE20"].isin(target_zips)]
filtered_out_zips = sorted(set(map(str, target_zips)) - set(filtered["ZCTA5CE20"].astype(str).unique()))

print(f"filtered: {len(filtered)}")
print("no geo data:",filtered_out_zips)

# Reproject to WGS84 (Leaflet expects this)
filtered = filtered.to_crs(epsg=4326)

# Simplify geometry
filtered["geometry"] = filtered.geometry.simplify(
    tolerance=0.00001,  # tweak this
    preserve_topology=True
)

# Export
filtered.to_file("public/selected_zips.json", driver="GeoJSON")