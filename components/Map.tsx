'use client';
/*



interface Item {
    zip: number;
    group: string;
    address: string;
    item: string;
    type: string;
}

interface MapProps {
    items: Item[];
    settings?: any[];
}

delete (L.Icon.Default.prototype as any)._getIconUrl;

export default function DynamicMap({ items, settings = []}: MapProps) {
    const center: L.LatLngExpression = [20, 0];

    return (
        <MapContainer center={center} zoom={2} style={{ height: '600px', width: '100%'}} attributionControl={true}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        </MapContainer>
    )
}*/
import { MapContainer, TileLayer, GeoJSON} from 'react-leaflet';
import zipData from "../public/selected_zips.json";

import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';
delete (L.Icon.Default.prototype as any)._getIconUrl;

export default function DynamicMap() {
    const center: L.LatLngExpression = [20, 0];
    return (
        <MapContainer center={center} zoom={2} style={{ height: '600px', width: '100%'}} attributionControl={true}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        
            <GeoJSON
            data={zipData}
            style={{
                color: "#2563eb",
                weight: 2,
                fillOpacity: 0.25,
            }}
            />
        </MapContainer>
    )
}
