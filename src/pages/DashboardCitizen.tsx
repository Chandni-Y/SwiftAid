"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getUser } from '../lib/auth';
import dynamic from 'next/dynamic';
import { Loader2 } from 'lucide-react';
import IncidentPanel from '../components/IncidentPanel';

// Dynamically import the map to avoid SSR issues with Leaflet's window dependency
const MapInterface = dynamic(() => import('../components/MapInterface'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center w-full h-full bg-slate-100/50">
      <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
    </div>
  ),
});

export default function DashboardCitizen() {
  const [user, setUser] = useState<any>(null);
  const [isChecking, setIsChecking] = useState(true);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const currentUser = getUser();
    if (!currentUser || currentUser.role !== 'citizen') {
      router.push('/');
    } else {
      setUser(currentUser);
      setIsChecking(false);
      
      // Request Geolocation
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
            setLocationError(null);
          },
          (error) => {
            console.error('Error getting location:', error);
            setLocationError('Unable to retrieve your location. Please check permissions.');
            // Fallback location or let map use default
          },
          { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
        );
      } else {
        setLocationError('Geolocation is not supported by your browser.');
      }
    }
  }, [router]);

  if (isChecking || !user || user.role !== 'citizen') {
    return null; // or a loading spinner
  }

  return (
    <div className="relative h-[calc(100vh-4rem)] w-full overflow-hidden flex flex-col bg-slate-50">
      
      {/* Floating Status / Welcome Tip */}
      <div className="absolute top-4 left-4 right-4 z-40 pointer-events-none flex flex-col items-center">
        <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg border border-slate-200 pointer-events-auto">
          <p className="text-sm font-medium text-slate-800">
            {locationError ? <span className="text-red-500">{locationError}</span> : <>Welcome, <strong>{user.name}</strong></>}
          </p>
        </div>
      </div>

      {/* Full Screen Map */}
      <div className="flex-1 w-full relative z-0">
        <MapInterface location={location} />
      </div>

      {/* Bottom Sliding Panel */}
      <IncidentPanel location={location} />
      
    </div>
  );
}
