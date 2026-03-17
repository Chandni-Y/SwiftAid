import Link from 'next/link';
import { User, ShieldAlert } from 'lucide-react';

export default function LoginPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-sm border border-slate-200">
        <div className="text-center">
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Choose your role to continue
          </p>
        </div>

        <div className="mt-8 space-y-4">
          <Link
            href="/login/citizen"
            className="group relative flex w-full items-center justify-center gap-3 rounded-lg border-2 border-slate-200 p-4 hover:border-blue-500 hover:bg-slate-50 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <div className="flex bg-blue-100 p-3 rounded-full text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <User className="h-6 w-6" />
            </div>
            <div className="text-left flex-1 border-l pl-4 border-slate-200 group-hover:border-blue-200">
              <h3 className="text-lg font-medium text-slate-900">Citizen</h3>
              <p className="text-sm text-slate-500">Access emergency services</p>
            </div>
          </Link>

          <Link
            href="/login/authority"
            className="group relative flex w-full items-center justify-center gap-3 rounded-lg border-2 border-slate-200 p-4 hover:border-red-500 hover:bg-slate-50 transition-all focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            <div className="flex bg-red-100 p-3 rounded-full text-red-600 group-hover:bg-red-600 group-hover:text-white transition-colors">
              <ShieldAlert className="h-6 w-6" />
            </div>
            <div className="text-left flex-1 border-l pl-4 border-slate-200 group-hover:border-red-200">
              <h3 className="text-lg font-medium text-slate-900">Authority</h3>
              <p className="text-sm text-slate-500">Manage emergency responses</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
