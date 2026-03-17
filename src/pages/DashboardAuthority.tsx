"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getUser } from '../lib/auth';
import dynamic from 'next/dynamic';
import { Loader2, BellRing, AlertTriangle } from 'lucide-react';
import { Incident } from '../components/AuthorityMapInterface';
import { getStoredIncidents, initializeMockIncidents, INCIDENTS_CHANGE_EVENT } from '../lib/incidents';

// Dynamically import the map to prevent Leaflet SSR errors
const AuthorityMapInterface = dynamic(() => import('../components/AuthorityMapInterface'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center w-full h-full bg-slate-100/50">
      <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
    </div>
  ),
});

// Initial mock incidents seeded in the jurisdiction
const INITIAL_INCIDENTS: Incident[] = [
  {
    id: 'inc-1',
    type: 'medical',
    lat: 20.5900,
    lng: 78.9600,
    description: 'Heart Attack - Male, 56 yrs',
    timeReported: '2 mins ago',
  },
  {
    id: 'inc-2',
    type: 'crime',
    lat: 20.6050,
    lng: 78.9700,
    description: 'Suspected burglary in progress',
    timeReported: '15 mins ago',
  }
];

export default function DashboardAuthority() {
  const [user, setUser] = useState<any>(null);
  const [isChecking, setIsChecking] = useState(true);
  
  // Map and Alert State
  const [incidents, setIncidents] = useState<Incident[]>(INITIAL_INCIDENTS);
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);
  const [hasNewAlert, setHasNewAlert] = useState(false);
  
  const router = useRouter();

  useEffect(() => {
    const currentUser = getUser();
    if (!currentUser || currentUser.role !== 'authority') {
      router.push('/');
    } else {
      setUser(currentUser);
      setIsChecking(false);
      
      // Initialize mock data if store is empty
      initializeMockIncidents(INITIAL_INCIDENTS);
      
      // Load initial state
      const loadIncidents = () => {
        const stored = getStoredIncidents();
        setIncidents(prev => {
          // If a new incident was added, trigger alert
          if (stored.length > prev.length && prev.length > 0) {
            setHasNewAlert(true);
          }
          return stored;
        });
      };
      
      loadIncidents();

      // Listen for cross-tab storage events
      const handleStorageChange = (e: StorageEvent) => {
        if (e.key === 'swiftAidIncidents') {
          loadIncidents();
        }
      };

      // Listen for same-tab custom events
      const handleCustomEvent = () => loadIncidents();

      window.addEventListener('storage', handleStorageChange);
      window.addEventListener(INCIDENTS_CHANGE_EVENT, handleCustomEvent);

      return () => {
        window.removeEventListener('storage', handleStorageChange);
        window.removeEventListener(INCIDENTS_CHANGE_EVENT, handleCustomEvent);
      };
    }
  }, [router]);

  const handleMarkerClick = (incident: Incident) => {
    setSelectedIncident(incident);
  };

  const handleAcknowledgeAlert = () => {
    setHasNewAlert(false);
    // Select the most recent incident
    setSelectedIncident(incidents[incidents.length - 1]);
  };

  const getLabelForType = (type: string) => {
    switch (type) {
      case 'medical': return 'Medical Emergency';
      case 'fire': return 'Fire Emergency';
      case 'crime': return 'Security / Crime';
      default: return 'Emergency';
    }
  };

  if (isChecking || !user || user.role !== 'authority') {
    return null;
  }

  return (
    <div className="relative h-[calc(100vh-4rem)] w-full overflow-hidden flex flex-col bg-slate-900">
      
      {/* High Priority Visual Alert Overlay */}
      {hasNewAlert && (
        <div className="absolute inset-0 pointer-events-none z-50">
          {/* Glowing Red Border */}
          <div className="absolute inset-0 border-[6px] border-red-600/80 shadow-[inset_0_0_50px_rgba(220,38,38,0.5)]"></div>
          {/* Subtle Background Flashing Tint */}
          <div className="absolute inset-0 bg-red-600/5 animate-pulse"></div>
          
          {/* Alert Card */}
          <div className="absolute top-20 left-1/2 -translate-x-1/2 pointer-events-auto w-full max-w-sm px-4">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border-2 border-red-500">
              <div className="bg-red-600 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2 text-white">
                  <AlertTriangle className="h-5 w-5 animate-pulse" />
                  <span className="font-bold">CRITICAL ALERT</span>
                </div>
                <BellRing className="h-5 w-5 text-red-200 animate-pulse" />
              </div>
              <div className="p-5 text-center">
                <h3 className="text-xl font-bold text-slate-900 mb-1">New Emergency Report!</h3>
                <p className="text-sm text-slate-600 mb-5">A new incident has been reported in your jurisdiction.</p>
                
                <button 
                  onClick={handleAcknowledgeAlert}
                  className="w-full bg-slate-900 text-white font-medium py-3 rounded-xl hover:bg-slate-800 transition-colors shadow-md active:scale-[0.98]"
                >
                  Acknowledge & View
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Authority Top Navigation / Floating Header */}
      <div className="absolute top-4 left-4 right-4 z-40 pointer-events-none flex justify-between items-start">
        {/* Left Widget: Operator Info */}
        <div className="bg-white/95 backdrop-blur-md px-5 py-3 rounded-2xl shadow-lg border border-slate-200 pointer-events-auto flex items-center gap-4">
          <div>
            <h1 className="text-lg font-bold text-slate-900 leading-tight">Command Center</h1>
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
              Opr: {user.name} • {user.department}
            </p>
          </div>
        </div>

        {/* Right Widget: System Status */}
        <div className="bg-slate-900/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg border border-slate-700 pointer-events-auto flex items-center gap-3">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="text-xs font-bold text-emerald-400 tracking-wider">SYSTEM ONLINE</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 w-full relative z-0 flex">
        
        {/* Full Screen Map Workspace */}
        <div className="flex-1 h-full relative z-0">
          <AuthorityMapInterface 
            incidents={incidents} 
            onMarkerClick={handleMarkerClick} 
            selectedIncident={selectedIncident}
          />
        </div>

        {/* Incident Detail View Side Panel */}
        {selectedIncident && (
          <div className="w-full sm:w-96 h-full bg-white shadow-[-10px_0_30px_rgba(0,0,0,0.1)] z-30 flex flex-col border-l border-slate-200 overflow-y-auto animate-in slide-in-from-right duration-300">
            {/* Header */}
            <div className="bg-slate-900 text-white p-5 flex justify-between items-center sticky top-0 z-10">
              <h2 className="text-lg font-bold">Incident Details</h2>
              <button 
                onClick={() => setSelectedIncident(null)}
                className="text-slate-400 hover:text-white transition-colors text-sm font-medium"
              >
                Close
              </button>
            </div>

            <div className="p-5 flex-1 flex flex-col gap-6">
              {/* Reported Info */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-4 border-b border-slate-200 pb-3">
                  <div className={`w-3 h-3 rounded-full ${
                    selectedIncident.type === 'medical' ? 'bg-red-500' :
                    selectedIncident.type === 'fire' ? 'bg-amber-500' : 'bg-blue-500'
                  }`} />
                  <h3 className="font-bold text-slate-900 text-lg">
                    {getLabelForType(selectedIncident.type)}
                  </h3>
                </div>
                
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-slate-500 block text-xs uppercase tracking-wider font-semibold mb-1">Time Reported</span>
                    <span className="text-slate-900 font-medium">{selectedIncident.timeReported}</span>
                  </div>
                  {selectedIncident.description && (
                    <div>
                      <span className="text-slate-500 block text-xs uppercase tracking-wider font-semibold mb-1">Description</span>
                      <p className="text-slate-800 bg-white p-3 rounded-lg border border-slate-200">{selectedIncident.description}</p>
                    </div>
                  )}
                  <div>
                    <span className="text-slate-500 block text-xs uppercase tracking-wider font-semibold mb-1">Coordinates</span>
                    <span className="text-slate-900 font-mono text-xs bg-slate-200 px-2 py-1 rounded">
                      {selectedIncident.lat.toFixed(6)}, {selectedIncident.lng.toFixed(6)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Placeholder Routing Sections */}
              <div>
                <h4 className="font-bold text-slate-900 mb-3 text-sm uppercase tracking-wider">Response Routes</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 bg-white border border-slate-200 rounded-lg shadow-sm">
                    <span className="text-sm font-medium text-slate-700">Ambulance Route</span>
                    <span className="text-xs bg-slate-100 text-slate-500 px-2 py-1 rounded font-medium">Coming Soon</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white border border-slate-200 rounded-lg shadow-sm">
                    <span className="text-sm font-medium text-slate-700">Fire Response Route</span>
                    <span className="text-xs bg-slate-100 text-slate-500 px-2 py-1 rounded font-medium">Coming Soon</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white border border-slate-200 rounded-lg shadow-sm">
                    <span className="text-sm font-medium text-slate-700">Police Response Route</span>
                    <span className="text-xs bg-slate-100 text-slate-500 px-2 py-1 rounded font-medium">Coming Soon</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-auto pt-4 border-t border-slate-200 flex flex-col gap-3">
                <button className="w-full py-3 px-4 bg-red-600 hover:bg-red-700 text-white text-sm font-bold rounded-xl shadow-sm transition-colors flex items-center justify-center gap-2">
                  Dispatch Ambulance
                </button>
                <button className="w-full py-3 px-4 bg-amber-500 hover:bg-amber-600 text-white text-sm font-bold rounded-xl shadow-sm transition-colors flex items-center justify-center gap-2">
                  Dispatch Fire Unit
                </button>
                <button className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl shadow-sm transition-colors flex items-center justify-center gap-2">
                  Notify Police
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
      
    </div>
  );
}
