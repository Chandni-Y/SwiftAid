"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, User, AlertCircle, ArrowLeft, CheckCircle2, Shield, Building, Loader2 } from 'lucide-react';
import { getUser } from '../lib/auth';

export default function SignupAuthority() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!(email.endsWith('@gov.in') || email.endsWith('@nic.in'))) {
      setError('Please use an official government email (@gov.in or @nic.in).');
      return;
    }

    if (!department) {
      setError('Please select a department.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          role: 'authority',
          data: { name, email, department, password },
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          router.push('/login/authority');
        }, 2000);
      } else {
        setError(data.error || 'Failed to create account');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 overflow-hidden">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <div className="mb-6 text-center">
          <Link href="/login/authority" className="inline-flex items-center text-xs font-medium text-slate-500 hover:text-slate-900 mb-4 transition-colors">
            <ArrowLeft className="mr-1 h-3 w-3" />
            Back to Login
          </Link>
          <div className="flex justify-center mb-2">
            <Shield className="h-8 w-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">
            Authority Registration
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Register to manage emergency reports
          </p>
        </div>

        {success ? (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md flex items-start mb-6">
            <CheckCircle2 className="h-5 w-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-red-800">Registration successful!</p>
              <p className="text-xs text-red-700 mt-1">Redirecting to login...</p>
            </div>
          </div>
        ) : (
          <form className="space-y-4" onSubmit={handleSignup}>
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded-md flex items-start">
                <AlertCircle className="h-4 w-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-red-700">{error}</p>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Full Name / Rank</label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-4 w-4 text-slate-400" />
                </div>
                <input
                  type="text"
                  required
                  className="focus:ring-red-500 focus:border-red-500 block w-full pl-9 sm:text-sm border-slate-300 rounded-lg py-2 border bg-slate-50"
                  placeholder="Officer John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Government Email</label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-4 w-4 text-slate-400" />
                </div>
                <input
                  type="email"
                  required
                  className="focus:ring-red-500 focus:border-red-500 block w-full pl-9 sm:text-sm border-slate-300 rounded-lg py-2 border bg-slate-50"
                  placeholder="officer@department.gov.in"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Department</label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Building className="h-4 w-4 text-slate-400" />
                </div>
                <select
                  required
                  className="focus:ring-red-500 focus:border-red-500 block w-full pl-9 sm:text-sm border-slate-300 rounded-lg py-2 border bg-slate-50 text-slate-700"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                >
                  <option value="" disabled>Select Department</option>
                  <option value="Police">Police</option>
                  <option value="Fire">Fire Department</option>
                  <option value="Medical">Medical / Ambulance</option>
                  <option value="Disaster Management">Disaster Management</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-4 w-4 text-slate-400" />
                  </div>
                  <input
                    type="password"
                    required
                    className="focus:ring-red-500 focus:border-red-500 block w-full pl-9 sm:text-sm border-slate-300 rounded-lg py-2 border bg-slate-50"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Confirm</label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-4 w-4 text-slate-400" />
                  </div>
                  <input
                    type="password"
                    required
                    className="focus:ring-red-500 focus:border-red-500 block w-full pl-9 sm:text-sm border-slate-300 rounded-lg py-2 border bg-slate-50"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors disabled:opacity-70 disabled:cursor-not-allowed mt-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
                  Registering...
                </>
              ) : (
                'Register Authority'
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
