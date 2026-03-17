'use client';

import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Car, Flame, ShieldAlert, AlertCircle } from 'lucide-react';

// Fix Leaflet marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png').default?.src || 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: require('leaflet/dist/images/marker-icon.png').default?.src || 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: require('leaflet/dist/images/marker-shadow.png').default?.src || 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Create custom icons for different incident types
const createCustomIcon = (color: string) => {
  return new L.DivIcon({
    className: 'custom-icon',
    html: `
      <div style="
        background-color: ${color};
        width: 30px;
        height: 30px;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        border: 2px solid white;
        box-shadow: 0 0 10px rgba(0,0,0,0.5);
      "></div>
    `,
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
  });
};

const medicalIcon = createCustomIcon('#ef4444'); // red-500
const fireIcon = createCustomIcon('#f59e0b'); // amber-500
const crimeIcon = createCustomIcon('#3b82f6'); // blue-500

export type Incident = {
  id: string;
  type: 'medical' | 'fire' | 'crime';
  lat: number;
  lng: number;
  description: string;
  timeReported: string;
};

interface AuthorityMapInterfaceProps {
  incidents: Incident[];
  onMarkerClick: (incident: Incident) => void;
  selectedIncident: Incident | null;
}

// Component to dynamically fit bounds when selected incident changes
function FitBounds({ incident, station }: { incident: Incident | null, station: { lat: number, lng: number } }) {
  const map = useMap();
  useEffect(() => {
    if (incident) {
      const bounds = L.latLngBounds(
        [station.lat, station.lng],
        [incident.lat, incident.lng]
      );
      // Pad bounds to ensure both markers are well within view
      map.flyToBounds(bounds, { padding: [50, 50], duration: 1.5 });
    }
  }, [incident, station, map]);
  return null;
}

export default function AuthorityMapInterface({ 
  incidents, 
  onMarkerClick,
  selectedIncident 
}: AuthorityMapInterfaceProps) {
  
  // Default authority jurisdiction center (e.g., city center)
  const defaultCenter = { lat: 20.5937, lng: 78.9629 };
  
  // Simulated emergency station location 
  const emergencyStation = { lat: 20.6000, lng: 78.9500 };

  const getIconForType = (type: string) => {
    switch (type) {
      case 'medical': return medicalIcon;
      case 'fire': return fireIcon;
      case 'crime': return crimeIcon;
      default: return medicalIcon;
    }
  };

  const getLabelForType = (type: string) => {
    switch (type) {
      case 'medical': return 'Medical Emergency';
      case 'fire': return 'Fire Emergency';
      case 'crime': return 'Security / Crime';
      default: return 'Emergency';
    }
  };

  return (
    <div className="h-full w-full z-0 relative">
      <MapContainer 
        center={[defaultCenter.lat, defaultCenter.lng]} 
        zoom={13} 
        style={{ height: '100%', width: '100%', zIndex: 0 }}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Draw routing line to selected incident */}
        {selectedIncident && (
          <>
            <Polyline 
              positions={[
                [emergencyStation.lat, emergencyStation.lng],
                [selectedIncident.lat, selectedIncident.lng]
              ]} 
              color="#3b82f6" 
              weight={5} 
              opacity={0.8}
              dashArray="10, 10"
              className="animate-pulse"
            />
            <FitBounds incident={selectedIncident} station={emergencyStation} />
          </>
        )}

        {/* Emergency Station Marker */}
        <Marker position={[emergencyStation.lat, emergencyStation.lng]}>
          <Popup>
            <div className="font-bold">Emergency Operations Center</div>
            <div className="text-sm text-slate-500">Dispatch Base</div>
          </Popup>
        </Marker>

        {/* Incident Markers */}
        {incidents.map((incident) => (
          <Marker 
            key={incident.id} 
            position={[incident.lat, incident.lng]}
            icon={getIconForType(incident.type)}
            eventHandlers={{
              click: () => onMarkerClick(incident),
            }}
          >
            <Popup className="incident-popup min-w-[250px]">
              <div className="p-1">
                <div className="font-bold text-base mb-1 text-slate-900 border-b pb-2">
                  {getLabelForType(incident.type)}
                </div>
                
                <div className="flex flex-col gap-2 mt-2">
                  <div className="text-sm">
                    <span className="font-semibold text-slate-700">Time:</span> {incident.timeReported}
                  </div>
                  {incident.description && (
                    <div className="text-sm">
                      <span className="font-semibold text-slate-700">Details:</span> 
                      <p className="mt-1 text-slate-600 bg-slate-50 p-2 rounded-md">{incident.description}</p>
                    </div>
                  )}
                  <div className="text-xs text-slate-400 font-mono mt-1">
                    {incident.lat.toFixed(6)}, {incident.lng.toFixed(6)}
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col gap-2">
                  <button className="w-full py-1.5 px-3 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded shadow flex items-center justify-center gap-2 transition-colors">
                    <AlertCircle className="w-4 h-4"/> Dispatch Ambulance
                  </button>
                  <button className="w-full py-1.5 px-3 bg-amber-500 hover:bg-amber-600 text-white text-sm font-medium rounded shadow flex items-center justify-center gap-2 transition-colors">
                    <Flame className="w-4 h-4"/> Dispatch Fire Unit
                  </button>
                  <button className="w-full py-1.5 px-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded shadow flex items-center justify-center gap-2 transition-colors">
                    <ShieldAlert className="w-4 h-4"/> Notify Police
                  </button>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
