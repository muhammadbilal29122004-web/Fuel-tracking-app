'use client';

import { useState } from 'react';
import {
    Search,
    BookOpen,
    Truck,
    Users,
    ShieldCheck,
    HelpCircle,
    HelpCircleIcon,
    ChevronRight,
    ExternalLink,
    LifeBuoy,
    MessageCircle,
    Mail
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const categories = [
    { id: 'shipments', title: 'Shipments', icon: Truck, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { id: 'drivers', title: 'Driver Management', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { id: 'security', title: 'Security & Access', icon: ShieldCheck, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { id: 'billing', title: 'System Guide', icon: BookOpen, color: 'text-amber-600', bg: 'bg-amber-50' },
];

const faqs = [
    {
        category: 'shipments',
        question: 'How do I generate a tracking number?',
        answer: 'Tracking numbers are automatically generated when you create a new shipment in the Deliveries page. Each ID is 16 digits long and unique to that specific fuel transfer.'
    },
    {
        category: 'drivers',
        question: 'Can I reuse a driver tracking ID?',
        answer: 'Driver Tracking IDs are permanent. Once a driver is registered, their 16-digit ID remains the same. You can use this ID on the public tracking page to see their latest assigned shipment.'
    },
    {
        category: 'shipments',
        question: 'How to update "Kha Tak Pohancha"?',
        answer: 'Go to the Deliveries page and find the active shipment. Click the edit (pencil) icon next to the "Current Progress" section to enter the location name. Press the checkmark to save.'
    },
    {
        category: 'security',
        question: 'How do I change my admin password?',
        answer: 'Navigate to the Settings page and select the "Security" tab. You can update your password and manage two-factor authentication from there.'
    },
    {
        category: 'system',
        question: 'What is the "Live Sync" in the notification bar?',
        answer: 'Live Sync indicates that your dashboard is connected to the central server. Any updates made by drivers or other admins will appear in real-time with very low latency.'
    }
];

export default function KnowledgeBasePage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const filteredFaqs = faqs.filter(faq =>
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-12 max-w-6xl mx-auto pb-20">
            {/* Hero Header */}
            <div className="relative p-12 bg-slate-900 rounded-[40px] overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-600 -skew-x-12 translate-x-1/2" />
                <div className="relative z-10 space-y-6">
                    <div className="inline-flex items-center gap-2 bg-white/10 text-blue-400 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest border border-white/10">
                        <LifeBuoy className="w-4 h-4" /> Help Center
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">How can we help you?</h1>

                    <div className="relative max-w-2xl">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search for articles, guides, or troubleshooting..."
                            className="w-full pl-14 pr-6 py-5 bg-white rounded-2xl text-slate-900 font-bold focus:ring-4 focus:ring-blue-500/20 outline-none shadow-2xl"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Categories Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {categories.map((cat) => (
                    <motion.div
                        whileHover={{ y: -5 }}
                        key={cat.id}
                        className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl transition-all group cursor-pointer"
                    >
                        <div className={`w-14 h-14 ${cat.bg} ${cat.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                            <cat.icon className="w-7 h-7" />
                        </div>
                        <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">{cat.title}</h3>
                        <div className="mt-4 flex items-center gap-1 text-xs font-bold text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                            Browse Articles <ChevronRight className="w-3 h-3" />
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* FAQ Accordion */}
            <div className="space-y-6">
                <div>
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-2">Frequently Asked Questions</h2>
                    <p className="text-slate-500 text-sm">Quick answers to common questions about the platform.</p>
                </div>

                <div className="grid gap-4">
                    {filteredFaqs.map((faq, index) => (
                        <div
                            key={index}
                            className={`bg-white rounded-3xl border border-slate-100 overflow-hidden transition-all ${openFaq === index ? 'ring-2 ring-blue-500/10 shadow-lg' : ''}`}
                        >
                            <button
                                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                className="w-full text-left p-6 flex items-center justify-between group"
                            >
                                <span className="font-bold text-slate-800 transition-colors group-hover:text-blue-600">{faq.question}</span>
                                <div className={`p-2 rounded-xl bg-slate-50 transition-transform duration-300 ${openFaq === index ? 'rotate-90 text-blue-600' : 'text-slate-400'}`}>
                                    <ChevronRight className="w-4 h-4" />
                                </div>
                            </button>
                            <AnimatePresence>
                                {openFaq === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="px-6 pb-6"
                                    >
                                        <div className="pt-2 text-slate-500 text-sm leading-relaxed border-t border-slate-50">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>

            {/* Support Section */}
            <div className="bg-blue-600 rounded-[40px] p-10 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl shadow-blue-200">
                <div className="space-y-4">
                    <h2 className="text-3xl font-black tracking-tight">Still need help?</h2>
                    <p className="text-blue-100 text-lg">Our 24/7 technical support team is ready to assist you with any issues.</p>
                </div>
                <div className="flex flex-wrap gap-4">
                    <button className="bg-white text-blue-600 px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center gap-2 hover:bg-blue-50 transition-colors shadow-lg shadow-black/10">
                        <MessageCircle className="w-5 h-5" /> Live Chat
                    </button>
                    <button className="bg-blue-700 text-white px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center gap-2 hover:bg-blue-800 transition-colors border border-blue-500/50">
                        <Mail className="w-5 h-5" /> Email Support
                    </button>
                </div>
            </div>

            <div className="text-center">
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">FuelTrack Logistics v2.4.0 Knowledge Base</p>
            </div>
        </div>
    );
}
