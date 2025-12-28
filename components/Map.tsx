'use client';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';

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
}