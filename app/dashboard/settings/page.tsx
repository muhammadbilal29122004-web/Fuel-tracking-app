'use client';

import { useState } from 'react';
import {
    User,
    Shield,
    Bell,
    Globe,
    Save,
    Truck,
    Fuel,
    Smartphone,
    Check
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function SettingsPage() {
    const [isSaved, setIsSaved] = useState(false);
    const [activeTab, setActiveTab] = useState('profile');

    const handleSave = () => {
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 3000);
    };

    const tabs = [
        { id: 'profile', label: 'Company Profile', icon: User },
        { id: 'security', label: 'Security', icon: Shield },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'system', label: 'System Preferences', icon: Globe },
    ];

    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">System Settings</h1>
                    <p className="text-slate-500 mt-1">Configure your logistics platform and security preferences</p>
                </div>
                <button
                    onClick={handleSave}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl transition-all shadow-lg shadow-blue-200 flex items-center justify-center gap-2 group active:scale-95"
                >
                    {isSaved ? (
                        <><Check className="w-5 h-5" /> Settings Saved</>
                    ) : (
                        <><Save className="w-5 h-5 group-hover:scale-110 transition-transform" /> Save All Changes</>
                    )}
                </button>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
                {/* Navigation Tabs */}
                <div className="w-full md:w-64 shrink-0 space-y-2">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl font-bold text-sm transition-all ${activeTab === tab.id
                                    ? 'bg-white text-blue-600 shadow-sm border border-slate-100'
                                    : 'text-slate-500 hover:bg-slate-100'
                                }`}
                        >
                            <tab.icon className={`w-5 h-5 ${activeTab === tab.id ? 'text-blue-600' : 'text-slate-400'}`} />
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Dynamic Content Area */}
                <div className="flex-1 bg-white border border-slate-100 rounded-[32px] p-8 shadow-sm min-h-[500px]">
                    {activeTab === 'profile' && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                            <h2 className="text-xl font-bold text-slate-900 border-b border-slate-50 pb-4">General Information</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700">Company Name</label>
                                    <input
                                        type="text"
                                        defaultValue="FuelTrack Logistics"
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-medium"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700">Primary Contact Email</label>
                                    <input
                                        type="email"
                                        defaultValue="admin@fueltrack.com"
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-medium"
                                    />
                                </div>
                                <div className="space-y-2 col-span-2">
                                    <label className="text-sm font-bold text-slate-700">Logistics Hub Base Address</label>
                                    <textarea
                                        defaultValue="Port Qasim Terminal, Phase 2, Karachi, Pakistan"
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-medium h-24"
                                    />
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'security' && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                            <h2 className="text-xl font-bold text-slate-900 border-b border-slate-50 pb-4">Identity & Security</h2>

                            <div className="space-y-4">
                                <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 flex items-center justify-between group cursor-pointer hover:border-blue-200 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                                            <Shield className="w-6 h-6 text-blue-600" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-slate-900">Two-Factor Authentication</p>
                                            <p className="text-xs text-slate-500">Add an extra layer of security to your account.</p>
                                        </div>
                                    </div>
                                    <div className="w-12 h-6 bg-slate-200 rounded-full relative">
                                        <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full" />
                                    </div>
                                </div>

                                <div className="space-y-2 pt-4">
                                    <label className="text-sm font-bold text-slate-700">Current Password</label>
                                    <input type="password" placeholder="••••••••" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700">New Password</label>
                                    <input type="password" placeholder="Min 8 characters" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" />
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'notifications' && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                            <h2 className="text-xl font-bold text-slate-900 border-b border-slate-50 pb-4">Alert Preferences</h2>

                            <div className="space-y-2">
                                {[
                                    { icon: Truck, label: 'Delivery Updates', desc: 'Notify when shipment status changes from Pending to Delivered.' },
                                    { icon: Fuel, label: 'Low Inventory Alerts', desc: 'Get alerts when fuel terminals report below 10% capacity.' },
                                    { icon: Smartphone, label: 'Driver Messages', desc: 'Allow drivers to send direct messages through the hub.' }
                                ].map((item, i) => (
                                    <div key={i} className="flex items-start gap-4 p-4 hover:bg-slate-50 rounded-2xl transition-colors group cursor-pointer">
                                        <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                                            <item.icon className="w-5 h-5" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between">
                                                <p className="font-bold text-slate-900 text-sm">{item.label}</p>
                                                <input type="checkbox" defaultChecked className="w-5 h-5 rounded-lg border-slate-300 text-blue-600 focus:ring-blue-500" />
                                            </div>
                                            <p className="text-xs text-slate-500 mt-1">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'system' && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                            <h2 className="text-xl font-bold text-slate-900 border-b border-slate-50 pb-4">System Preferences</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700">Measurement Unit</label>
                                    <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-medium">
                                        <option>Liters (LTR)</option>
                                        <option>Gallons (GAL)</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700">Currency Display</label>
                                    <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-medium">
                                        <option>Pakistani Rupee (PKR)</option>
                                        <option>US Dollar (USD)</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700">Default Tracking Life</label>
                                    <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-medium">
                                        <option>30 Days</option>
                                        <option>90 Days</option>
                                        <option>Forever</option>
                                    </select>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
}
