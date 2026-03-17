"use client";
import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { HeartPulse, Ambulance, ArrowRight, ShieldPlus } from 'lucide-react';
import { getUser } from '../lib/auth';

export default function RoleSelection() {
  const router = useRouter();

  useEffect(() => {
    const user = getUser();
    if (user) {
      if (user.role === 'citizen') {
        router.push('/dashboard/citizen');
      } else if (user.role === 'authority') {
        router.push('/dashboard/authority');
      }
    }
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 overflow-hidden">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-8 flex flex-col items-center">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-600 p-3 rounded-xl shadow-sm">
              <ShieldPlus className="h-8 w-8 text-white" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">
            SwiftAid
          </h2>
          <p className="text-sm text-slate-500">
            Emergency Medical Assistance Platform
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 justify-center">
          <Link
            href="/login/citizen"
            className="group flex flex-col items-center justify-center w-full sm:w-[260px] h-[160px] border border-slate-200 rounded-xl hover:border-blue-500 hover:shadow-md transition-all bg-slate-50 hover:bg-white"
          >
            <HeartPulse className="h-8 w-8 text-blue-600 mb-3 group-hover:scale-110 transition-transform" />
            <h4 className="text-lg font-semibold text-slate-900 mb-1">Citizen</h4>
            <p className="text-xs text-slate-500 text-center px-4">
              Report emergencies and request help
            </p>
          </Link>

          <Link
            href="/login/authority"
            className="group flex flex-col items-center justify-center w-full sm:w-[260px] h-[160px] border border-slate-200 rounded-xl hover:border-red-500 hover:shadow-md transition-all bg-slate-50 hover:bg-white"
          >
            <Ambulance className="h-8 w-8 text-red-600 mb-3 group-hover:scale-110 transition-transform" />
            <h4 className="text-lg font-semibold text-slate-900 mb-1">Authority</h4>
            <p className="text-xs text-slate-500 text-center px-4">
              Respond to emergencies and dispatch
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
