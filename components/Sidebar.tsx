'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    BarChart3,
    Users,
    Truck,
    LogOut,
    Fuel,
    Settings,
    Bell,
    HelpCircle,
    ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const menuItems = [
    { icon: BarChart3, label: 'Overview', href: '/dashboard' },
    { icon: Users, label: 'Drivers', href: '/dashboard/drivers' },
    { icon: Truck, label: 'Deliveries', href: '/dashboard/deliveries' },
    { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
];

export default function Sidebar() {
    const pathname = usePathname();

    const handleLogout = () => {
        localStorage.removeItem('isAdmin');
        window.location.href = '/';
    };

    return (
        <aside className="fixed left-0 top-0 h-screen w-72 bg-[#0F172A] border-r border-slate-800 flex flex-col z-[60] shadow-2xl">
            {/* Brand Section */}
            <div className="p-8">
                <div className="flex items-center gap-3">
                    <div className="bg-blue-600 p-2.5 rounded-xl shadow-lg shadow-blue-500/20">
                        <Fuel className="text-white w-6 h-6" />
                    </div>
                    <div>
                        <span className="text-xl font-black text-white tracking-tighter block leading-none">Fuel<span className="text-blue-500">Track</span></span>
                        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] mt-1 block">Enterprise Admin</span>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto custom-scrollbar">
                <p className="px-4 text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Main Menu</p>
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "group relative flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all duration-300",
                                isActive
                                    ? "bg-blue-600 text-white shadow-xl shadow-blue-500/20"
                                    : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                            )}
                        >
                            <div className="flex items-center gap-3.5">
                                <item.icon className={cn(
                                    "w-5 h-5 transition-transform duration-300 group-hover:scale-110",
                                    isActive ? "text-white" : "text-slate-500 group-hover:text-blue-400"
                                )} />
                                <span className="font-bold text-sm">{item.label}</span>
                            </div>
                            {isActive && (
                                <motion.div
                                    layoutId="sidebar-active-indicator"
                                    className="w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_8px_white]"
                                />
                            )}
                            {!isActive && (
                                <ChevronRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-slate-500" />
                            )}
                        </Link>
                    );
                })}

                <div className="pt-8 space-y-1.5">
                    <p className="px-4 text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Support & System</p>
                    <Link href="/dashboard/notifications" className={cn(
                        "flex items-center gap-3.5 px-4 py-3.5 rounded-2xl transition-all group",
                        pathname === '/dashboard/notifications' ? "bg-blue-600/10 text-blue-500" : "text-slate-500 hover:text-white hover:bg-slate-800/50"
                    )}>
                        <Bell className={cn("w-5 h-5", pathname === '/dashboard/notifications' ? "text-blue-500" : "group-hover:text-blue-400")} />
                        <span className="font-bold text-sm">Notifications</span>
                    </Link>
                    <Link href="/dashboard/knowledge-base" className={cn(
                        "flex items-center gap-3.5 px-4 py-3.5 rounded-2xl transition-all group",
                        pathname === '/dashboard/knowledge-base' ? "bg-blue-600/10 text-blue-500" : "text-slate-500 hover:text-white hover:bg-slate-800/50"
                    )}>
                        <HelpCircle className={cn("w-5 h-5", pathname === '/dashboard/knowledge-base' ? "text-blue-500" : "group-hover:text-blue-400")} />
                        <span className="font-bold text-sm">Knowledge Base</span>
                    </Link>
                </div>
            </nav>

            {/* Footer / User Profile Profile */}
            <div className="p-4 mt-auto">
                <div className="bg-slate-800/40 border border-slate-800 p-4 rounded-3xl mb-4 group cursor-pointer hover:bg-slate-800/60 transition-all">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white font-black text-sm shadow-lg">
                            AD
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-white truncate">Administrator</p>
                            <p className="text-[10px] text-slate-500 font-bold uppercase truncate">Main Server</p>
                        </div>
                    </div>
                </div>

                <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 px-4 py-4 rounded-2xl text-rose-500 font-black text-xs uppercase tracking-widest hover:bg-rose-500/10 transition-all border border-transparent hover:border-rose-500/20"
                >
                    <LogOut className="w-4 h-4" />
                    Secure Sign Out
                </button>
            </div>

            <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #334155;
          border-radius: 10px;
        }
      `}</style>
        </aside>
    );
}
