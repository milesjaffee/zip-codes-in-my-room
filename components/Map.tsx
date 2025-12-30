'use client';

import { MapContainer, TileLayer, GeoJSON, GeoJSONProps} from 'react-leaflet';
import zipData from "../public/selected_zips.json";

import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';
delete (L.Icon.Default.prototype as any)._getIconUrl;

export default function DynamicMap() {
    const center: L.LatLngExpression = [36, -85];
    return (
        <MapContainer center={center} zoom={5} style={{ height: '600px', width: '100%'}} attributionControl={true}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        
            <GeoJSON
            data={({data: zipData} as GeoJSONProps).data}
            style={{
                color: "#2563eb",
                weight: 2,
                fillOpacity: 0.25,
            }}
            />
        </MapContainer>
    )
}
