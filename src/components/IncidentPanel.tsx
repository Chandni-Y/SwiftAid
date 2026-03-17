'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, useAnimation, PanInfo } from 'framer-motion';
import { 
  AlertCircle, 
  Flame, 
  ShieldAlert, 
  Car, 
  Wind,
  Send,
  Loader2
} from 'lucide-react';
import { saveIncident } from '../lib/incidents';

const INCIDENT_TYPES = [
  { id: 'medical', label: 'Medical Emergency', icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200' },
  { id: 'fire', label: 'Fire Emergency', icon: Flame, color: 'text-amber-500', bg: 'bg-amber-50', border: 'border-amber-200' },
  { id: 'crime', label: 'Security / Crime Incident', icon: ShieldAlert, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200' },
];

interface IncidentPanelProps {
  location: { lat: number; lng: number } | null;
}

export default function IncidentPanel({ location }: IncidentPanelProps) {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  
  const constraintsRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  // Handle panel snap animations based on drag
  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 50; // pixels
    if (info.offset.y < -threshold) {
      // expand
      setIsExpanded(true);
      controls.start({ y: 0 });
    } else if (info.offset.y > threshold) {
      // collapse
      setIsExpanded(false);
      controls.start({ y: 'calc(100% - 100px)' }); // Leaves 100px peeking
    } else {
      // snap back to current state
      controls.start({ y: isExpanded ? 0 : 'calc(100% - 100px)' });
    }
  };

  const toggleIncidentType = (id: string) => {
    setSelectedTypes(prev => 
      prev.includes(id) 
        ? prev.filter(t => t !== id)
        : [...prev, id]
    );
  };

  const handleSubmit = async () => {
    if (selectedTypes.length === 0 || !location) return;

    setIsSubmitting(true);
    
    // Simulate API call to /api/incidents/report
    try {
      const payload = {
        types: selectedTypes,
        description,
        location,
        timestamp: new Date().toISOString()
      };
      
      console.log('Submitting incident:', payload);
      
      // Save the primary incident type to the shared store
      const primaryType = selectedTypes[0] as 'medical' | 'fire' | 'crime';
      saveIncident({
        type: primaryType || 'medical',
        description,
        lat: location.lat,
        lng: location.lng,
      });

      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSubmitSuccess(true);
      
      // Reset after success
      setTimeout(() => {
        setSubmitSuccess(false);
        setSelectedTypes([]);
        setDescription('');
        setIsExpanded(false);
        controls.start({ y: 'calc(100% - 100px)' });
      }, 3000);
      
    } catch (error) {
      console.error('Failed to submit incident:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="absolute inset-x-0 bottom-0 z-[1000] overflow-hidden pointer-events-none" style={{ height: '70vh' }} ref={constraintsRef}>
      <motion.div
        className="absolute bottom-0 w-full bg-white rounded-t-3xl shadow-[0_-8px_30px_rgba(0,0,0,0.12)] pointer-events-auto flex flex-col h-full"
        initial={{ y: 'calc(100% - 130px)' }}
        animate={controls}
        drag="y"
        dragConstraints={{ top: 0, bottom: window.innerHeight * 0.7 - 100 }} // Allow dragging downwards up to peek height
        dragElastic={0.1}
        dragMomentum={false}
        onDragEnd={handleDragEnd}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      >
        {/* Drag Handle Area */}
        <div className="w-full flex justify-center py-4 cursor-grab active:cursor-grabbing">
          <div className="w-12 h-1.5 bg-slate-200 rounded-full" />
        </div>

        {/* Header / Summary when collapsed */}
        <div className="px-6 pb-4 cursor-pointer" onClick={() => {
            setIsExpanded(!isExpanded);
            controls.start({ y: !isExpanded ? 0 : 'calc(100% - 130px)' });
          }}>
          <h2 className="text-xl font-bold text-slate-900">Report an Incident</h2>
          <p className="text-sm text-slate-500">Swipe up to provide details</p>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto px-6 pb-24 touch-pan-y">
          {/* Incident Selection */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-slate-700 mb-3">What is the emergency?</h3>
            <div className="flex flex-wrap gap-2">
              {INCIDENT_TYPES.map((type) => {
                const isSelected = selectedTypes.includes(type.id);
                const Icon = type.icon;
                return (
                  <button
                    key={type.id}
                    onClick={() => toggleIncidentType(type.id)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-full border transition-all ${
                      isSelected 
                        ? `${type.border} ${type.bg} ${type.color} ring-2 ring-offset-1 ring-${type.color.split('-')[1]}-500` 
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{type.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Description Field */}
          <div className="mb-6">
            <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-2">
              Additional Details (Optional)
            </label>
            <textarea
              id="description"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. Number of casualties, suspect description..."
              className="w-full rounded-xl border-slate-200 border p-3 text-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

        </div>
        
        {/* Fixed Bottom Action Area */}
        <div className="absolute bottom-0 inset-x-0 p-6 bg-white border-t border-slate-100 pb-safe">
            <button
              onClick={handleSubmit}
              disabled={selectedTypes.length === 0 || !location || isSubmitting || submitSuccess}
              className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-white font-medium text-lg transition-all ${
                submitSuccess 
                  ? 'bg-green-500' 
                  : selectedTypes.length === 0 || !location
                    ? 'bg-slate-300 cursor-not-allowed'
                    : 'bg-red-600 hover:bg-red-700 active:scale-[0.98] shadow-lg shadow-red-600/20'
              }`}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Sending Report...
                </>
              ) : submitSuccess ? (
                'Report Submitted'
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Report Incident
                </>
              )}
            </button>
            
            {!location && (
               <p className="text-center text-xs text-red-500 mt-2">
                 Waiting for location access...
               </p>
            )}
        </div>

      </motion.div>
    </div>
  );
}
