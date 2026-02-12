'use client';

import { useState } from 'react';
import {
   Fuel,
   Search,
   Truck,
   MapPin,
   Navigation,
   User,
   Hash,
   Droplets,
   ShieldCheck,
   BarChart3,
   ChevronRight,
   Globe,
   CreditCard,
   Package,
   X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import StatusBadge from '@/components/StatusBadge';
import Link from 'next/link';

export default function LandingPage() {
   const [trackingNumber, setTrackingNumber] = useState('');
   const [deliveryData, setDeliveryData] = useState<any>(null);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState('');

   const handleTrack = async (e: React.FormEvent) => {
      e.preventDefault();
      if (trackingNumber.length !== 16) {
         setError('Please enter a valid 16-digit tracking number.');
         return;
      }

      setLoading(true);
      setError('');
      setDeliveryData(null);

      try {
         const res = await fetch(`/api/track/${trackingNumber}`);
         if (!res.ok) {
            const errData = await res.json();
            throw new Error(errData.error || 'Tracking number not found.');
         }
         const data = await res.json();
         setDeliveryData(data);
      } catch (err: any) {
         setError(err.message);
      } finally {
         setLoading(false);
      }
   };

   return (
      <div className="min-h-screen bg-[#F8FAFC] font-sans selection:bg-blue-100 selection:text-blue-600 overflow-x-hidden">
         {/* Background Decorative Elements */}
         <div className="fixed top-0 left-0 w-full h-[600px] bg-gradient-to-b from-blue-50/50 to-transparent -z-10 pointer-events-none" />
         <div className="fixed -top-24 -right-24 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl -z-10 animate-pulse" />
         <div className="fixed top-[40%] -left-24 w-72 h-72 bg-indigo-100/30 rounded-full blur-3xl -z-10" />

         {/* Modern Navbar */}
         <nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-slate-200/50 px-6 py-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
               <div className="flex items-center gap-2.5 group cursor-pointer">
                  <div className="bg-blue-600 p-2 rounded-xl shadow-blue-200 shadow-lg group-hover:scale-110 transition-transform duration-300">
                     <Fuel className="text-white w-6 h-6" />
                  </div>
                  <span className="text-2xl font-black text-slate-900 tracking-tighter">Fuel<span className="text-blue-600">Track</span></span>
               </div>

               <div className="hidden md:flex items-center gap-8">
                  <a href="#features" className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">Features</a>
               </div>

               <Link
                  href="/dashboard"
                  className="group flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-slate-800 transition-all shadow-lg hover:shadow-slate-200"
               >
                  Admin Portal
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
               </Link>
            </div>
         </nav>

         <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-12 gap-12 items-start mb-24">
               {/* Left Column: Hero & Search */}
               <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="lg:col-span-5 space-y-8"
               >
                  <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider">
                     <ShieldCheck className="w-4 h-4" />
                     Enterprise Logistics
                  </div>
                  <h1 className="text-5xl md:text-6xl font-black text-slate-900 leading-[1.1] tracking-tight">
                     Track Your <br />
                     <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Fuel Shipment.</span>
                  </h1>
                  <p className="text-slate-600 text-lg leading-relaxed">
                     Enter your 16-digit tracking or driver ID for real-time intelligence on your fuel delivery status.
                  </p>

                  <form onSubmit={handleTrack} className="space-y-4">
                     <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 transition-colors focus-within:text-blue-600" />
                        <input
                           type="text"
                           placeholder="Enter 16-digit ID (e.g. 1703...)"
                           value={trackingNumber}
                           onChange={(e) => setTrackingNumber(e.target.value.replace(/\D/g, '').slice(0, 16))}
                           className="w-full bg-white border border-slate-200 rounded-2xl py-5 pl-12 pr-4 text-slate-900 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all outline-none font-bold text-lg shadow-sm"
                           required
                        />
                     </div>
                     <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-black px-10 py-5 rounded-2xl transition-all shadow-xl shadow-blue-200 active:scale-[0.98] text-lg flex items-center justify-center gap-3"
                     >
                        {loading ? (
                           <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                           <>TRACK PACKAGE <Navigation className="w-5 h-5 shrink-0" /></>
                        )}
                     </button>
                  </form>
                  {error && <p className="text-rose-500 text-sm font-bold flex items-center gap-2 bg-rose-50 p-4 rounded-2xl border border-rose-100">
                     <X className="w-4 h-4" /> {error}
                  </p>}
               </motion.div>

               {/* Right Column: Comprehensive Results */}
               <div className="lg:col-span-7 relative min-h-[500px]">
                  {!deliveryData && !loading && (
                     <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-12 bg-white/40 backdrop-blur-sm rounded-[40px] border border-white border-dashed border-2 overflow-hidden">
                        {/* Modern Radar Tracking Animation */}
                        <div className="relative w-48 h-48 mb-10 flex items-center justify-center">
                           {/* Background Rings */}
                           <div className="absolute inset-0 border border-slate-200/50 rounded-full" />
                           <div className="absolute inset-4 border border-slate-200/50 rounded-full" />
                           <div className="absolute inset-8 border border-slate-200/50 rounded-full" />

                           {/* Animated Pulse Rings */}
                           <motion.div
                              initial={{ scale: 0.8, opacity: 0 }}
                              animate={{ scale: 1.5, opacity: [0, 0.5, 0] }}
                              transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }}
                              className="absolute inset-0 border-2 border-blue-500/30 rounded-full"
                           />
                           <motion.div
                              initial={{ scale: 0.8, opacity: 0 }}
                              animate={{ scale: 1.5, opacity: [0, 0.3, 0] }}
                              transition={{ duration: 3, repeat: Infinity, ease: "easeOut", delay: 1.5 }}
                              className="absolute inset-0 border-2 border-blue-400/20 rounded-full"
                           />

                           {/* Radar Sweep Line */}
                           <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                              className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-500/20 via-transparent to-transparent z-10"
                              style={{
                                 background: 'conic-gradient(from 0deg, rgba(59, 130, 246, 0.4) 0deg, transparent 90deg, transparent 360deg)',
                              }}
                           />

                           {/* Central Tracking Node */}
                           <div className="relative z-20 w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center border border-slate-100 group-hover:scale-110 transition-transform duration-500">
                              <div className="absolute inset-0 bg-blue-600/5 rounded-2xl animate-pulse" />
                              <Globe className="w-8 h-8 text-blue-600 relative z-30" />
                           </div>

                           {/* Floating Scan Points */}
                           {[0, 72, 144, 216, 288].map((degree, i) => (
                              <motion.div
                                 key={i}
                                 initial={{ opacity: 0 }}
                                 animate={{ opacity: [0, 1, 0] }}
                                 transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
                                 className="absolute w-1.5 h-1.5 bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.8)]"
                                 style={{
                                    transform: `rotate(${degree}deg) translateY(-80px)`
                                 }}
                              />
                           ))}
                        </div>

                        <motion.div
                           initial={{ opacity: 0, y: 10 }}
                           animate={{ opacity: 1, y: 0 }}
                           transition={{ delay: 0.2 }}
                           className="space-y-3"
                        >
                           <h3 className="text-3xl font-black text-slate-900 tracking-tight">System Ready</h3>
                           <p className="text-slate-500 max-w-xs mx-auto font-medium leading-relaxed">
                              Global fuel logistics grid active. <br />
                              <span className="text-blue-600 font-bold">Awaiting unique tracking signature.</span>
                           </p>
                        </motion.div>

                        {/* Scanning Text Footer */}
                        <div className="absolute bottom-6 left-0 w-full flex justify-center gap-4">
                           <div className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
                              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Network Online</span>
                           </div>
                           <div className="flex items-center gap-2 border-l border-slate-200 pl-4">
                              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">256-bit Encryption Active</span>
                           </div>
                        </div>
                     </div>
                  )}

                  {loading && (
                     <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-12 bg-white/60 backdrop-blur-md rounded-[40px] border border-blue-100 z-50 overflow-hidden">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-50/20 via-transparent to-transparent" />
                        <div className="relative w-32 h-32 mb-8 flex items-center justify-center">
                           <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                              className="absolute inset-0 border-4 border-blue-50 border-t-blue-600 rounded-full shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                           />
                           <motion.div
                              animate={{ rotate: -360 }}
                              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                              className="absolute inset-4 border-2 border-dashed border-blue-200 rounded-full"
                           />
                           <Navigation className="w-10 h-10 text-blue-600 animate-pulse" />
                        </div>
                        <div className="space-y-4 relative z-10">
                           <div className="space-y-1">
                              <h3 className="text-2xl font-black text-slate-900 tracking-tight">Scanning Pipeline...</h3>
                              <p className="text-slate-500 font-medium">Retrieving real-time location telemetry.</p>
                           </div>
                           <div className="flex justify-center gap-1.5">
                              {[0, 1, 2, 3, 4].map((i) => (
                                 <motion.div
                                    key={i}
                                    animate={{
                                       height: [8, 24, 8],
                                       opacity: [0.3, 1, 0.3]
                                    }}
                                    transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.1 }}
                                    className="w-1.5 bg-blue-600 rounded-full"
                                 />
                              ))}
                           </div>
                        </div>
                     </div>
                  )}

                  <AnimatePresence mode="wait">
                     {deliveryData && (
                        <motion.div
                           initial={{ opacity: 0, scale: 0.95, y: 20 }}
                           animate={{ opacity: 1, scale: 1, y: 0 }}
                           exit={{ opacity: 0, scale: 0.95, y: 20 }}
                           className="bg-white rounded-[40px] border border-slate-100 shadow-2xl overflow-hidden"
                        >
                           {/* Header Banner */}
                           <div className="bg-slate-900 p-8 text-white">
                              <div className="flex flex-wrap justify-between items-start gap-4 mb-8">
                                 <div>
                                    <p className="text-blue-400 text-xs font-black uppercase tracking-widest mb-1">Official Tracking Reference</p>
                                    <h2 className="text-2xl font-mono font-bold tracking-tighter sm:text-3xl">{deliveryData.trackingNumber}</h2>
                                 </div>
                                 <StatusBadge status={deliveryData.status} />
                              </div>

                              {/* Current Location (Kha Tak Pohancha) */}
                              <div className="bg-blue-600 rounded-3xl p-6 shadow-xl shadow-blue-500/20 border border-blue-500 flex items-center gap-5">
                                 <div className="bg-white/10 p-4 rounded-2xl animate-pulse">
                                    <MapPin className="w-8 h-8" />
                                 </div>
                                 <div className="flex-1 min-w-0">
                                    <p className="text-blue-100 text-[10px] font-black uppercase tracking-widest leading-none mb-1">Current Intelligence (Kha Tak Pohancha)</p>
                                    <h3 className="text-xl sm:text-2xl font-black truncate">{deliveryData.currentLocation || "Scanning pipeline..."}</h3>
                                 </div>
                              </div>
                           </div>

                           {/* Detail Grid */}
                           <div className="p-8 grid sm:grid-cols-2 gap-6">
                              {/* Driver & Vehicle */}
                              <div className="space-y-4">
                                 <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                    <User className="w-3 h-3 text-blue-500" /> Personnel & Asset
                                 </h4>
                                 <div className="bg-slate-50 p-5 rounded-3xl border border-slate-100 space-y-3">
                                    <div className="flex justify-between items-center">
                                       <span className="text-sm font-bold text-slate-500">Driver</span>
                                       <span className="text-sm font-black text-slate-900">{deliveryData.driverId?.name}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                       <span className="text-sm font-bold text-slate-500">Vehicle No</span>
                                       <span className="text-sm font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-lg">{deliveryData.driverId?.vehicleNumber}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                       <span className="text-sm font-bold text-slate-500">Permanent ID</span>
                                       <span className="text-[10px] font-mono font-bold text-slate-400">{deliveryData.driverId?.trackingId}</span>
                                    </div>
                                 </div>
                              </div>

                              {/* Shipment Info */}
                              <div className="space-y-4">
                                 <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                    <Package className="w-3 h-3 text-indigo-500" /> Cargo Specifications
                                 </h4>
                                 <div className="bg-slate-50 p-5 rounded-3xl border border-slate-100 space-y-3">
                                    <div className="flex justify-between items-center">
                                       <span className="text-sm font-bold text-slate-500">Fuel Compound</span>
                                       <div className="flex items-center gap-2">
                                          <Droplets className="w-3 h-3 text-blue-500" />
                                          <span className="text-sm font-black text-slate-900">{deliveryData.fuelType}</span>
                                       </div>
                                    </div>
                                    <div className="flex justify-between items-center">
                                       <span className="text-sm font-bold text-slate-500">Volume</span>
                                       <span className="text-sm font-black text-slate-900">{deliveryData.quantity} <span className="text-slate-400">LTR</span></span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                       <span className="text-sm font-bold text-slate-500">Registry Date</span>
                                       <span className="text-[10px] font-bold text-slate-400">{new Date(deliveryData.createdAt).toLocaleDateString()}</span>
                                    </div>
                                 </div>
                              </div>

                              {/* Route Timeline */}
                              <div className="sm:col-span-2 space-y-4">
                                 <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                    <Navigation className="w-3 h-3 text-rose-500" /> Logistics Route
                                 </h4>
                                 <div className="relative p-6 bg-slate-900 rounded-[32px] overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                                    <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                                       <div className="flex-1">
                                          <p className="text-blue-400 text-[10px] font-black uppercase mb-1">Origin</p>
                                          <h5 className="text-white font-bold">{deliveryData.pickupLocation}</h5>
                                       </div>
                                       <div className="flex-1 flex justify-center w-full sm:w-auto">
                                          <div className="h-px bg-slate-700 flex-1 min-w-[50px] relative hidden sm:block">
                                             <div className="absolute top-1/2 right-0 -translate-y-1/2 w-1.5 h-1.5 bg-blue-500 rounded-full" />
                                          </div>
                                          <Truck className="w-5 h-5 text-blue-500 mx-4 shrink-0" />
                                          <div className="h-px bg-slate-700 flex-1 min-w-[50px] relative hidden sm:block">
                                             <div className="absolute top-1/2 left-0 -translate-y-1/2 w-1.5 h-1.5 bg-slate-700 rounded-full" />
                                          </div>
                                       </div>
                                       <div className="flex-1 text-left sm:text-right">
                                          <p className="text-rose-400 text-[10px] font-black uppercase mb-1">Destination</p>
                                          <h5 className="text-white font-bold">{deliveryData.deliveryLocation}</h5>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </motion.div>
                     )}
                  </AnimatePresence>
               </div>
            </div>

            {/* Improved Feature Cards Section */}
            <div id="features" className="pt-20 grid md:grid-cols-3 gap-8 mb-24">
               {[
                  { icon: Clock, title: "Real-time Intelligence", desc: "Our system provides millisecond-accurate updates on shipment locations across the entire network.", color: "text-blue-600", bg: "bg-blue-50" },
                  { icon: ShieldCheck, title: "End-to-End Security", desc: "Every drop of fuel is tracked and accounted for with enterprise-grade blockchain-ready verification.", color: "text-indigo-600", bg: "bg-indigo-50" },
                  { icon: BarChart3, title: "Digital Fleet Management", desc: "Full visibility into driver performance and vehicle utilization for optimized logistics operations.", color: "text-emerald-600", bg: "bg-emerald-50" }
               ].map((feat, i) => (
                  <motion.div
                     key={i}
                     whileHover={{ y: -5 }}
                     className="bg-white p-10 rounded-[40px] border border-slate-200/60 shadow-sm hover:shadow-2xl hover:shadow-slate-200/50 transition-all group"
                  >
                     <div className={`w-16 h-16 ${feat.bg} ${feat.color} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-sm`}>
                        <feat.icon className="w-8 h-8" />
                     </div>
                     <h3 className="text-2xl font-bold text-slate-900 mb-4">{feat.title}</h3>
                     <p className="text-slate-500 leading-relaxed font-medium">{feat.desc}</p>
                  </motion.div>
               ))}
            </div>
         </main>

         {/* Trust Badges Portfolio Style */}
         <footer className="py-20 px-6 border-t border-slate-200/50 bg-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/4 h-full bg-blue-50/20 -skew-x-12" />
            <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 relative z-10">
               <div className="col-span-2">
                  <div className="flex items-center gap-2.5 mb-6">
                     <div className="bg-blue-600 p-2 rounded-xl">
                        <Fuel className="text-white w-6 h-6" />
                     </div>
                     <span className="text-2xl font-black text-slate-900 tracking-tighter">Fuel<span className="text-blue-600">Track</span></span>
                  </div>
                  <p className="text-slate-500 max-w-sm mb-8 leading-relaxed font-medium">
                     FuelTrack is the next generation of fuel logistics management, bringing transparency and efficiency to the global energy supply chain.
                  </p>
               </div>

               <div className="sm:col-span-1">
                  <h4 className="font-bold text-slate-900 mb-8 uppercase tracking-[0.2em] text-[10px]">Ecosystem</h4>
                  <ul className="space-y-4 text-sm font-bold text-slate-500">
                     <li className="hover:text-blue-600 cursor-pointer transition-colors flex items-center gap-2">API Documentation <ChevronRight className="w-3 h-3" /></li>
                     <li className="hover:text-blue-600 cursor-pointer transition-colors flex items-center gap-2">Network Status <ChevronRight className="w-3 h-3" /></li>
                     <li className="hover:text-blue-600 cursor-pointer transition-colors flex items-center gap-2">Security Audits <ChevronRight className="w-3 h-3" /></li>
                  </ul>
               </div>
            </div>

            <div className="max-w-7xl mx-auto mt-20 pt-10 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-8">
               <div className="text-slate-400 text-sm font-semibold tracking-tight">
                  &copy; 2026 FuelTrack Logistics. Developed by <span className="text-blue-600 font-black relative px-1">Tech Sparks <span className="absolute bottom-0 left-0 w-full h-[6px] bg-blue-100 -z-10" /></span>
               </div>
               <div className="flex items-center gap-10 opacity-20 grayscale grayscale-100 font-black tracking-tighter text-2xl italic select-none">
                  <span>KARACHI.OPS</span>
                  <span>LOGISTICS+</span>
                  <span>FUEL.CORE</span>
               </div>
            </div>
         </footer>
      </div>
   );
}

function Clock(props: any) {
   return (
      <svg
         {...props}
         xmlns="http://www.w3.org/2000/svg"
         width="24"
         height="24"
         viewBox="0 0 24 24"
         fill="none"
         stroke="currentColor"
         strokeWidth="2.5"
         strokeLinecap="round"
         strokeLinejoin="round"
      >
         <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
      </svg>
   );
}
