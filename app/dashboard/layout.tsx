'use client';

import { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Fuel, Menu, X, Search, Bell, User } from 'lucide-react';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
        const auth = localStorage.getItem('isLoggedIn');
        if (!auth) {
            router.push('/login');
        } else {
            setIsAuthenticated(true);
        }
    }, [router]);

    if (isAuthenticated === null) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="relative">
                    <div className="w-12 h-12 border-4 border-slate-100 rounded-full" />
                    <div className="absolute top-0 w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F8FAFC] flex text-slate-900">
            {/* Desktop Sidebar (Permanent) */}
            <div className="hidden lg:block w-72 shrink-0">
                <Sidebar />
            </div>

            {/* Mobile Sidebar (Drawer) */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 lg:hidden transition-all duration-300"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            <div className={`fixed inset-y-0 left-0 w-72 z-[60] transform lg:hidden transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <Sidebar />
                <button
                    onClick={() => setIsSidebarOpen(false)}
                    className="absolute top-4 -right-12 p-2 bg-slate-900 text-white rounded-xl shadow-xl lg:hidden"
                >
                    <X className="w-6 h-6" />
                </button>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
                {/* Top Header */}
                <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200/60 flex items-center justify-between px-6 lg:px-10 shrink-0 z-40">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setIsSidebarOpen(true)}
                            className="p-2.5 text-slate-500 hover:bg-slate-100 rounded-xl lg:hidden transition-colors"
                        >
                            <Menu className="w-6 h-6" />
                        </button>

                        <div className="hidden md:flex items-center gap-3 bg-slate-50 px-4 py-2.5 rounded-2xl border border-slate-200/60 w-80 group focus-within:ring-2 focus-within:ring-blue-500/10 focus-within:border-blue-500/50 transition-all">
                            <Search className="w-4 h-4 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search shipments, drivers..."
                                className="bg-transparent border-none outline-none text-sm font-medium w-full placeholder:text-slate-400"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <Link href="/dashboard/notifications" className="relative p-2.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all">
                            <Bell className="w-6 h-6" />
                            <span className="absolute top-3 right-3 w-2 h-2 bg-rose-500 rounded-full border-2 border-white" />
                        </Link>

                        <div className="h-8 w-px bg-slate-200 mx-2 hidden sm:block" />

                        <div className="flex items-center gap-3 pl-2 group cursor-pointer">
                            <div className="hidden sm:block text-right">
                                <p className="text-sm font-bold text-slate-900 leading-none">Admin Profile</p>
                                <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">Super Admin</p>
                            </div>
                            <div className="w-10 h-10 bg-slate-100 rounded-2xl flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                                <User className="w-6 h-6 text-slate-400 group-hover:text-white transition-colors" />
                            </div>
                        </div>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto p-4 lg:p-10 custom-scrollbar">
                    <div className="max-w-7xl mx-auto pb-10">
                        {children}
                    </div>
                </main>
            </div>

            <style jsx>{`
              .custom-scrollbar::-webkit-scrollbar {
                width: 6px;
              }
              .custom-scrollbar::-webkit-scrollbar-track {
                background: transparent;
              }
              .custom-scrollbar::-webkit-scrollbar-thumb {
                background: #E2E8F0;
                border-radius: 10px;
              }
              .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                background: #CBD5E1;
              }
            `}</style>
        </div>
    );
}
