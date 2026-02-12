'use client';

import { useState, useEffect } from 'react';
import {
    Bell,
    Truck,
    UserPlus,
    AlertTriangle,
    CheckCircle2,
    Clock,
    Filter,
    MoreVertical,
    Trash2,
    BadgeAlert
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ActivityLog {
    _id: string;
    action: string;
    details: string;
    type: 'driver' | 'delivery' | 'system';
    createdAt: string;
}

export default function NotificationsPage() {
    const [activities, setActivities] = useState<ActivityLog[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<'all' | 'driver' | 'delivery' | 'system'>('all');

    useEffect(() => {
        fetchActivities();
    }, []);

    const fetchActivities = async () => {
        try {
            const res = await fetch('/api/activities');
            const data = await res.json();
            if (Array.isArray(data)) {
                setActivities(data);
            }
        } catch (error) {
            console.error('Error fetching notifications:', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredActivities = activities.filter(act =>
        filter === 'all' ? true : act.type === filter
    );

    const getIcon = (type: string) => {
        switch (type) {
            case 'driver': return <UserPlus className="w-5 h-5 text-blue-600" />;
            case 'delivery': return <Truck className="w-5 h-5 text-indigo-600" />;
            case 'system': return <BadgeAlert className="w-5 h-5 text-amber-600" />;
            default: return <Bell className="w-5 h-5 text-slate-600" />;
        }
    };

    const getBgColor = (type: string) => {
        switch (type) {
            case 'driver': return 'bg-blue-50';
            case 'delivery': return 'bg-indigo-50';
            case 'system': return 'bg-amber-50';
            default: return 'bg-slate-50';
        }
    };

    return (
        <div className="space-y-8 max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
                        Notifications
                        {activities.length > 0 && (
                            <span className="text-sm bg-rose-500 text-white px-2 py-0.5 rounded-full font-bold">
                                {activities.length}
                            </span>
                        )}
                    </h1>
                    <p className="text-slate-500 mt-1">Stay updated with real-time logs and system alerts</p>
                </div>

                <div className="flex items-center gap-2 bg-white p-1 rounded-2xl border border-slate-100 shadow-sm">
                    {(['all', 'delivery', 'driver', 'system'] as const).map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${filter === f
                                    ? 'bg-slate-900 text-white shadow-lg'
                                    : 'text-slate-400 hover:text-slate-600'
                                }`}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            <div className="bg-white border border-slate-100 rounded-[32px] overflow-hidden shadow-sm">
                <div className="p-6 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
                    <h2 className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                        <Clock className="w-4 h-4 text-blue-500" /> Recent Updates
                    </h2>
                    <button className="text-xs font-bold text-slate-400 hover:text-rose-500 transition-colors flex items-center gap-1">
                        <Trash2 className="w-3 h-3" /> Clear All
                    </button>
                </div>

                <div className="divide-y divide-slate-50">
                    {loading ? (
                        [1, 2, 3, 4].map(i => (
                            <div key={i} className="p-6 flex gap-4 animate-pulse">
                                <div className="w-12 h-12 bg-slate-100 rounded-2xl shrink-0" />
                                <div className="flex-1 space-y-2">
                                    <div className="h-4 bg-slate-100 rounded w-1/4" />
                                    <div className="h-3 bg-slate-50 rounded w-1/2" />
                                </div>
                            </div>
                        ))
                    ) : filteredActivities.length === 0 ? (
                        <div className="p-20 text-center">
                            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Bell className="w-8 h-8 text-slate-300" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-800">No Notifications</h3>
                            <p className="text-slate-500 text-sm">You're all caught up! Nothing new to show here.</p>
                        </div>
                    ) : (
                        filteredActivities.map((log) => (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                key={log._id}
                                className="p-6 hover:bg-slate-50 transition-colors group cursor-pointer"
                            >
                                <div className="flex gap-4 items-start">
                                    <div className={`w-12 h-12 ${getBgColor(log.type)} rounded-2xl flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 transition-transform`}>
                                        {getIcon(log.type)}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between mb-1">
                                            <h4 className="font-bold text-slate-900">{log.action}</h4>
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-white px-2 py-1 rounded-lg border border-slate-100 shadow-sm">
                                                {new Date(log.createdAt).toLocaleDateString()} at {new Date(log.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                        </div>
                                        <p className="text-sm text-slate-500 leading-relaxed">
                                            {log.details}
                                        </p>
                                        <div className="mt-3 flex items-center gap-4">
                                            <button className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline">View Details</button>
                                            <button className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-rose-500">Dismiss</button>
                                        </div>
                                    </div>
                                    <button className="opacity-0 group-hover:opacity-100 p-2 text-slate-400 hover:text-slate-600 transition-all">
                                        <MoreVertical className="w-5 h-5" />
                                    </button>
                                </div>
                            </motion.div>
                        ))
                    )}
                </div>
            </div>

            {/* System Status Footer */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-[24px] flex items-center gap-4">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                        <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                    </div>
                    <div>
                        <p className="text-xs font-black text-emerald-700 uppercase tracking-widest">Global Ops</p>
                        <p className="text-sm font-bold text-emerald-900">All Systems Normal</p>
                    </div>
                </div>
                <div className="bg-blue-50 border border-blue-100 p-6 rounded-[24px] flex items-center gap-4 md:col-span-2">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                        <Clock className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                        <p className="text-xs font-black text-blue-700 uppercase tracking-widest">Sync Lag</p>
                        <p className="text-sm font-bold text-blue-900">Real-time synchronization active with &lt;12ms latency.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
