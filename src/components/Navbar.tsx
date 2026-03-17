"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Shield, LogOut } from 'lucide-react';
import { getUser, logout } from '../lib/auth';

export default function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    setUser(getUser());

    const handleAuthChange = () => {
      setUser(getUser());
    };

    window.addEventListener('authChange', handleAuthChange);
    window.addEventListener('storage', handleAuthChange);

    return () => {
      window.removeEventListener('authChange', handleAuthChange);
      window.removeEventListener('storage', handleAuthChange);
    };
  }, []);

  const handleLogout = () => {
    logout();
    setUser(null);
    router.push('/');
  };

  return (
    <nav className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex-shrink-0 flex items-center gap-2">
              <Shield className="h-8 w-8 text-blue-600" />
              <span className="font-bold text-xl text-slate-900 tracking-tight">SwiftAid</span>
            </Link>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            {user ? (
              <>
                <div className="hidden sm:block text-sm">
                  <span className="text-slate-500">Logged in as </span>
                  <span className="font-medium text-slate-900">{user.name}</span>
                  <span className="ml-2 px-2 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600 capitalize">
                    {user.role}
                  </span>
                </div>
                <div className="block sm:hidden text-sm">
                  <span className="font-medium text-slate-900">{user.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-slate-500 hover:text-slate-700 hover:bg-slate-50 focus:outline-none transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
