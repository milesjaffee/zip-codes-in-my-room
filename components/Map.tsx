'use client';

import { MapContainer, TileLayer, GeoJSON, GeoJSONProps} from 'react-leaflet';
import './Map.css'

import zipData from "../public/selected_zips.json";
import zipMetadata from "../zipcodes_on_things_in_my_room.json";

import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';
delete (L.Icon.Default.prototype as any)._getIconUrl;

export default function DynamicMap() {
    const center: L.LatLngExpression = [36, -85];
    return (
        <MapContainer center={center} zoom={5} style={{ height: '600px', width: '100%'}} attributionControl={true}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" className="grayscale-map-tiles"/>
        
            <GeoJSON
            data={({data: zipData} as GeoJSONProps).data}
            style={{
                color: "#26e",
                weight: 2,
                fillOpacity: 0.25,
            }}
            onEachFeature={(feature, layer) => {
                
                layer.on("click", () => {
                    (layer as L.Path).setStyle({ color: "#670" });

                    const zip = Number(feature.properties.ZCTA5CE20);
                    const info = zipMetadata["zips"].find(item => item["zip"] === zip);

                    if (!info) return;

                    layer.bindPopup(`
                        <strong>${zip}</strong><br/>
                        Item: ${info.item}<br/>
                        From: ${info.group}, ${info.address}
                    `).openPopup().on("popupclose", () => {
                        (layer as L.Path).setStyle({ color: "#2563eb" });
                    })
                });
                layer.on({
                    mouseover: () => (layer as L.Path).setStyle({ fillOpacity: 0.45 }),
                    mouseout: () => (layer as L.Path).setStyle({ fillOpacity: 0.25 }),
                    
                });
            }}
            />
        </MapContainer>
    )
}
