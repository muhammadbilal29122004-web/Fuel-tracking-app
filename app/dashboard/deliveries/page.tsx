'use client';

import { useState, useEffect } from 'react';
import {
    Plus,
    Truck,
    MapPin,
    Navigation,
    Droplets,
    Hash,
    X,
    User,
    MoreVertical,
    Calendar,
    AlertCircle,
    Edit2,
    Check,
    RefreshCcw
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import StatusBadge from '@/components/StatusBadge';

interface Driver {
    _id: string;
    name: string;
    address: string;
}

interface Delivery {
    _id: string;
    trackingNumber: string;
    driverId: Driver;
    fuelType: 'Petrol' | 'Diesel';
    quantity: number;
    pickupLocation: string;
    deliveryLocation: string;
    currentLocation: string;
    status: 'Pending' | 'In Transit' | 'Delivered';
    createdAt: string;
}

export default function DeliveriesPage() {
    const [deliveries, setDeliveries] = useState<Delivery[]>([]);
    const [drivers, setDrivers] = useState<Driver[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [updatingId, setUpdatingId] = useState<string | null>(null);
    const [editingLocId, setEditingLocId] = useState<string | null>(null);
    const [tempLoc, setTempLoc] = useState('');

    const [formData, setFormData] = useState({
        driverId: '',
        fuelType: 'Petrol',
        quantity: 0,
        pickupLocation: '',
        deliveryLocation: '',
        currentLocation: '',
        status: 'Pending'
    });

    useEffect(() => {
        fetchDeliveries();
        fetchDrivers();
    }, []);

    const fetchDeliveries = async () => {
        try {
            setLoading(true);
            const res = await fetch('/api/deliveries');
            const data = await res.json();
            if (Array.isArray(data)) {
                setDeliveries(data);
            }
        } catch (error) {
            console.error('Error fetching deliveries:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchDrivers = async () => {
        try {
            const res = await fetch('/api/drivers');
            const data = await res.json();
            if (Array.isArray(data)) {
                setDrivers(data);
            }
        } catch (error) {
            console.error('Error fetching drivers:', error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch('/api/deliveries', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                setIsModalOpen(false);
                setFormData({
                    driverId: '',
                    fuelType: 'Petrol',
                    quantity: 0,
                    pickupLocation: '',
                    deliveryLocation: '',
                    currentLocation: '',
                    status: 'Pending'
                });
                await fetchDeliveries();
            }
        } catch (error) {
            console.error('Error creating delivery:', error);
        } finally {
            setLoading(false);
        }
    };

    const updateDelivery = async (id: string, updates: any) => {
        try {
            setUpdatingId(id);
            const res = await fetch(`/api/deliveries/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updates),
            });

            if (res.ok) {
                // Optimistic update
                setDeliveries(prev => prev.map(d => d._id === id ? { ...d, ...updates } : d));
                setEditingLocId(null);
            } else {
                alert('Failed to update location. Please try again.');
            }
        } catch (error) {
            console.error('Error updating delivery:', error);
        } finally {
            setUpdatingId(null);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Delivery Tracking</h1>
                    <p className="text-slate-500 mt-1">Monitor and manage fuel shipments</p>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={fetchDeliveries}
                        className="p-3 text-slate-500 hover:text-blue-600 bg-white border border-slate-200 rounded-xl transition-all"
                        title="Refresh list"
                    >
                        <RefreshCcw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                    </button>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl transition-all shadow-lg shadow-blue-200 flex items-center justify-center gap-2"
                    >
                        <Plus className="w-5 h-5" />
                        Create New Shipment
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {loading && deliveries.length === 0 ? (
                    <div className="p-12 text-center text-slate-400 bg-white rounded-3xl border-2 border-dashed border-slate-100 italic">
                        Gathering delivery data...
                    </div>
                ) : deliveries.length === 0 ? (
                    <div className="p-12 text-center text-slate-400 bg-white rounded-3xl border-2 border-dashed border-slate-100">
                        No active deliveries. Start by creating one!
                    </div>
                ) : (
                    deliveries.map((delivery) => (
                        <motion.div
                            layout
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            key={delivery._id}
                            className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 flex flex-col lg:flex-row items-start lg:items-center gap-6"
                        >
                            {/* Delivery ID / Icon */}
                            <div className="flex items-center gap-4 min-w-[180px]">
                                <div className="p-3 bg-indigo-50 rounded-2xl">
                                    <Truck className="w-6 h-6 text-indigo-600" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Tracking ID</p>
                                    <p className="font-mono font-bold text-slate-900">{delivery.trackingNumber}</p>
                                </div>
                            </div>

                            {/* Status & Info */}
                            <div className="flex-1 flex flex-col md:flex-row items-start md:items-center gap-6 w-full lg:w-auto">
                                <div className="flex-1 grid grid-cols-2 lg:grid-cols-4 gap-6 w-full">
                                    <div>
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-none mb-2">Fuel Info</p>
                                        <div className="flex items-center gap-2">
                                            <Droplets className="w-4 h-4 text-emerald-500" />
                                            <span className="font-bold text-slate-900">{delivery.fuelType}</span>
                                            <span className="text-slate-500 text-sm">({delivery.quantity}L)</span>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-none mb-2">Driver Info</p>
                                        <div className="flex flex-col">
                                            <div className="flex items-center gap-2">
                                                <User className="w-4 h-4 text-blue-500" />
                                                <span className="font-bold text-slate-900">{delivery.driverId?.name || 'N/A'}</span>
                                            </div>
                                            <span className="text-[10px] text-slate-400 ml-6 truncate max-w-[120px]">{delivery.driverId?.address}</span>
                                        </div>
                                    </div>

                                    <div className="lg:col-span-2">
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-none mb-2 text-rose-500">Current Progress (Kha Pohancha)</p>
                                        <div className="flex items-center gap-2 group">
                                            <MapPin className="w-4 h-4 text-rose-500" />
                                            {editingLocId === delivery._id ? (
                                                <div className="flex items-center gap-2">
                                                    <input
                                                        type="text"
                                                        value={tempLoc}
                                                        onChange={(e) => setTempLoc(e.target.value)}
                                                        className="text-sm border-b-2 border-blue-500 bg-blue-50/50 outline-none focus:ring-0 px-2 py-1 w-48 rounded"
                                                        placeholder="Enter current location..."
                                                        autoFocus
                                                        onKeyPress={(e) => e.key === 'Enter' && updateDelivery(delivery._id, { currentLocation: tempLoc })}
                                                    />
                                                    {updatingId === delivery._id ? (
                                                        <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                                                    ) : (
                                                        <>
                                                            <button
                                                                onClick={() => updateDelivery(delivery._id, { currentLocation: tempLoc })}
                                                                className="text-emerald-600 bg-emerald-50 p-1.5 rounded-lg hover:bg-emerald-100 transition-colors shadow-sm"
                                                            >
                                                                <Check className="w-4 h-4" />
                                                            </button>
                                                            <button
                                                                onClick={() => setEditingLocId(null)}
                                                                className="text-slate-400 bg-slate-50 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
                                                            >
                                                                <X className="w-4 h-4" />
                                                            </button>
                                                        </>
                                                    )}
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-2">
                                                    <span className={cn(
                                                        "font-bold text-slate-900",
                                                        !delivery.currentLocation && "text-slate-400 font-medium italic"
                                                    )}>
                                                        {delivery.currentLocation || 'Location not set yet'}
                                                    </span>
                                                    <button
                                                        onClick={() => {
                                                            setEditingLocId(delivery._id);
                                                            setTempLoc(delivery.currentLocation || '');
                                                        }}
                                                        className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-slate-100 rounded-lg transition-all"
                                                    >
                                                        <Edit2 className="w-3.5 h-3.5 text-slate-400" />
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 w-full md:w-auto">
                                    <StatusBadge status={delivery.status} />

                                    <select
                                        value={delivery.status}
                                        onChange={(e) => updateDelivery(delivery._id, { status: e.target.value })}
                                        className="text-xs font-bold bg-slate-50 border border-slate-200 rounded-lg px-2 py-1.5 outline-none focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer"
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="In Transit">In Transit</option>
                                        <option value="Delivered">Delivered</option>
                                    </select>
                                </div>
                            </div>
                        </motion.div>
                    ))
                )}
            </div>

            {/* Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden"
                        >
                            <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between">
                                <div>
                                    <h2 className="text-2xl font-bold text-slate-900">Create New Shipment</h2>
                                    <p className="text-slate-500 text-sm">Fill in the details to generate a tracking ID</p>
                                </div>
                                <button onClick={() => setIsModalOpen(false)} className="p-2 text-slate-400 hover:text-slate-600">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="p-8 space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Driver Selection */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700 block">Dispatch Driver</label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                            <select
                                                required
                                                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none appearance-none font-medium"
                                                value={formData.driverId}
                                                onChange={(e) => setFormData({ ...formData, driverId: e.target.value })}
                                            >
                                                <option value="">Select a driver</option>
                                                {drivers.map(d => <option key={d._id} value={d._id}>{d.name}</option>)}
                                            </select>
                                        </div>
                                    </div>

                                    {/* Fuel Type */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700 block">Fuel Type</label>
                                        <div className="relative">
                                            <Droplets className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                            <select
                                                required
                                                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none appearance-none font-medium"
                                                value={formData.fuelType}
                                                onChange={(e) => setFormData({ ...formData, fuelType: e.target.value as any })}
                                            >
                                                <option value="Petrol">Petrol</option>
                                                <option value="Diesel">Diesel</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* Quantity */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700 block">Quantity (Liters)</label>
                                        <div className="relative">
                                            <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                            <input
                                                type="number"
                                                required
                                                className="w-full pl-10 pr-16 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-medium"
                                                value={formData.quantity}
                                                onChange={(e) => setFormData({ ...formData, quantity: Number(e.target.value) })}
                                            />
                                            <span className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-slate-400 text-sm">LTR</span>
                                        </div>
                                    </div>

                                    {/* Initial Status */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700 block">Initial Status</label>
                                        <select
                                            required
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none appearance-none font-medium"
                                            value={formData.status}
                                            onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                                        >
                                            <option value="Pending">Pending</option>
                                            <option value="In Transit">In Transit</option>
                                            <option value="Delivered">Delivered</option>
                                        </select>
                                    </div>

                                    {/* Current Location (Optional) */}
                                    <div className="space-y-2 col-span-2">
                                        <label className="text-sm font-bold text-slate-700 block underline decoration-blue-500 decoration-2">Kha se start karein? (Current Location)</label>
                                        <div className="relative">
                                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-500" />
                                            <input
                                                type="text"
                                                placeholder="e.g. Loading Bay 1, Karachi Terminal"
                                                className="w-full pl-10 pr-4 py-3 bg-blue-50 border border-blue-100 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-medium"
                                                value={formData.currentLocation}
                                                onChange={(e) => setFormData({ ...formData, currentLocation: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    {/* Locations */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700 block">Pickup Terminal</label>
                                        <div className="relative">
                                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 opacity-50 text-slate-400" />
                                            <input
                                                type="text"
                                                placeholder="e.g. Port Qasim"
                                                required
                                                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none italic"
                                                value={formData.pickupLocation}
                                                onChange={(e) => setFormData({ ...formData, pickupLocation: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700 block">Final Delivery Destination</label>
                                        <div className="relative">
                                            <Navigation className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 opacity-50 text-slate-400" />
                                            <input
                                                type="text"
                                                placeholder="e.g. Shell Station, Gulshan"
                                                required
                                                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-500 outline-none italic"
                                                value={formData.deliveryLocation}
                                                onChange={(e) => setFormData({ ...formData, deliveryLocation: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-8 border-t border-slate-100 flex gap-4">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="flex-1 py-4 text-slate-600 font-bold rounded-2xl hover:bg-slate-50 transition-colors border border-slate-200"
                                    >
                                        Discard
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl transition-all shadow-xl shadow-blue-200 flex items-center justify-center gap-2"
                                    >
                                        {loading ? <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : 'Confirm & Start Shipment'}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}

function cn(...inputs: any[]) {
    return inputs.filter(Boolean).join(' ');
}
