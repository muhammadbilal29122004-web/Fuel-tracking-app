'use client';

import { useState, useEffect } from 'react';
import { Users, Truck, RotateCw, CheckCircle, Fuel, Clock, MapPin, UserPlus } from 'lucide-react';
import StatsCard from '@/components/StatsCard';
import { motion } from 'framer-motion';

interface ActivityLog {
    _id: string;
    action: string;
    details: string;
    type: 'driver' | 'delivery' | 'system';
    createdAt: string;
}

export default function DashboardOverview() {
    const [stats, setStats] = useState({
        totalDrivers: 0,
        totalDeliveries: 0,
        inTransit: 0,
        completed: 0
    });
    const [activities, setActivities] = useState<ActivityLog[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const [driversRes, deliveriesRes, activitiesRes] = await Promise.all([
                    fetch('/api/drivers'),
                    fetch('/api/deliveries'),
                    fetch('/api/activities')
                ]);

                const drivers = await driversRes.json();
                const deliveries = await deliveriesRes.json();
                const activityLog = await activitiesRes.json();

                setStats({
                    totalDrivers: Array.isArray(drivers) ? drivers.length : 0,
                    totalDeliveries: Array.isArray(deliveries) ? deliveries.length : 0,
                    inTransit: Array.isArray(deliveries) ? deliveries.filter((d: any) => d.status === 'In Transit').length : 0,
                    completed: Array.isArray(deliveries) ? deliveries.filter((d: any) => d.status === 'Delivered').length : 0,
                });

                if (Array.isArray(activityLog)) {
                    setActivities(activityLog);
                }
            } catch (error) {
                console.error('Failed to fetch stats:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    const getIcon = (type: string, action: string) => {
        if (action.includes('Location')) return <MapPin className="w-4 h-4 text-rose-500" />;
        if (type === 'driver') return <UserPlus className="w-4 h-4 text-blue-500" />;
        return <Truck className="w-4 h-4 text-indigo-500" />;
    };

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Dashboard Overview</h1>
                    <p className="text-slate-500 mt-1">Real-time statistics of your logistics operations</p>
                </div>
                <div className="bg-white px-4 py-2 rounded-xl border border-slate-100 flex items-center gap-2 text-sm font-medium text-slate-600 shadow-sm">
                    <Clock className="w-4 h-4 text-blue-500" />
                    Live Updates Active
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard
                    title="Total Drivers"
                    value={loading ? '...' : stats.totalDrivers}
                    icon={Users}
                    colorClass="bg-blue-600"
                />
                <StatsCard
                    title="Total Deliveries"
                    value={loading ? '...' : stats.totalDeliveries}
                    icon={Truck}
                    colorClass="bg-indigo-600"
                />
                <StatsCard
                    title="In Transit"
                    value={loading ? '...' : stats.inTransit}
                    icon={RotateCw}
                    colorClass="bg-amber-600"
                />
                <StatsCard
                    title="Completed"
                    value={loading ? '...' : stats.completed}
                    icon={CheckCircle}
                    colorClass="bg-emerald-600"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Activity Feed */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="lg:col-span-2 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm"
                >
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-3">
                            Recent Activity
                            <span className="bg-blue-50 text-blue-600 text-xs px-2 py-1 rounded-full uppercase tracking-wider">Live</span>
                        </h2>
                        <button
                            onClick={() => window.location.reload()}
                            className="text-slate-400 hover:text-blue-600 transition-colors"
                        >
                            <RotateCw className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="space-y-6 relative before:absolute before:left-6 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-50">
                        {loading ? (
                            [1, 2, 3].map(i => (
                                <div key={i} className="flex gap-4 animate-pulse">
                                    <div className="w-12 h-12 bg-slate-100 rounded-2xl shrink-0" />
                                    <div className="flex-1 space-y-2">
                                        <div className="h-4 bg-slate-100 rounded w-1/4" />
                                        <div className="h-3 bg-slate-50 rounded w-1/2" />
                                    </div>
                                </div>
                            ))
                        ) : activities.length === 0 ? (
                            <div className="text-center py-10">
                                <p className="text-slate-400 italic">No recent activity found. Operations are quiet.</p>
                            </div>
                        ) : (
                            activities.map((log) => (
                                <motion.div
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    key={log._id}
                                    className="flex gap-4 group relative items-start"
                                >
                                    <div className="w-12 h-12 bg-white border border-slate-100 rounded-2xl flex items-center justify-center shadow-sm z-10 group-hover:border-blue-200 transition-colors">
                                        {getIcon(log.type, log.action)}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between gap-2 mb-1">
                                            <h4 className="text-sm font-bold text-slate-800">{log.action}</h4>
                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                                {new Date(log.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                        </div>
                                        <p className="text-sm text-slate-500 leading-snug truncate group-hover:whitespace-normal transition-all">
                                            {log.details}
                                        </p>
                                    </div>
                                </motion.div>
                            ))
                        )}
                    </div>
                </motion.div>

                {/* Quick Actions / Tips */}
                <div className="space-y-6">
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-slate-900 p-8 rounded-3xl text-white relative overflow-hidden group"
                    >
                        <div className="relative z-10">
                            <h2 className="text-xl font-bold mb-2">Ready to ship?</h2>
                            <p className="text-slate-400 mb-6 text-sm">Create a new delivery and track it in real-time with our advanced logistics system.</p>
                            <button className="bg-white text-slate-900 px-6 py-3 rounded-xl text-sm font-bold hover:bg-blue-50 transition-colors">
                                New Delivery
                            </button>
                        </div>
                        <Truck className="absolute -bottom-10 -right-10 w-48 h-48 text-white/5 transform group-hover:scale-110 transition-transform duration-500" />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-blue-600 p-8 rounded-3xl text-white shadow-xl shadow-blue-200"
                    >
                        <h3 className="font-bold text-lg mb-2">Live Tracking Pro</h3>
                        <p className="text-blue-100 text-sm mb-4">Don't forget to update the location field to keep your customers informed!</p>
                        <div className="flex gap-2">
                            <div className="w-1 h-1 bg-white rounded-full" />
                            <div className="w-1 h-1 bg-white/50 rounded-full" />
                            <div className="w-1 h-1 bg-white/50 rounded-full" />
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
