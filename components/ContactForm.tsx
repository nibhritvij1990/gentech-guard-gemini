"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, Mail, Phone, MessageSquare, Briefcase } from "lucide-react";

type FormType = "inquiry" | "dealer";

export default function ContactForm() {
    const [formType, setFormType] = useState<FormType>("inquiry");
    const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        city: "",
        message: "",
        businessName: "", // for dealer
        currentExperience: "", // for dealer
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");

        // Mock Notification Logic (Zero-Cost Architecture)
        console.group("🚀 LEAD CAPTURED: Gentech Guard®");
        console.log("Type:", formType.toUpperCase());
        console.log("Data:", formData);
        console.log("📡 ACTION: Sending Instant Telegram Notification...");
        console.log("📝 ACTION: Logging to Google Sheets for ROI tracking...");
        console.groupEnd();

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 2000));

        setStatus("success");
        // Reset form after success
        setTimeout(() => {
            setStatus("idle");
            setFormData({
                name: "",
                email: "",
                phone: "",
                city: "",
                message: "",
                businessName: "",
                currentExperience: "",
            });
        }, 5000);
    };

    const updateField = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    return (
        <section id="contact" className="py-24 bg-dark-bg/50 border-t border-white/5 relative">
            <div className="container mx-auto px-4 md:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

                    {/* Left Side: Copy */}
                    <div>
                        <motion.span
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="text-primary-blue font-black tracking-[0.2em] uppercase text-sm mb-4 inline-block"
                        >
                            Get in Touch
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-3xl md:text-6xl font-black text-white mb-8"
                        >
                            LET&apos;S PROTECT <br />
                            <span className="blue-text italic text-4xl md:text-7xl">YOUR PASSION</span>
                        </motion.h2>

                        <div className="space-y-8 mt-12">
                            <ContactInfoItem
                                icon={Mail}
                                title="Email Us"
                                detail="info@gentechguard.com"
                                sub="Support available 24/7"
                            />
                            <ContactInfoItem
                                icon={Phone}
                                title="Call Experts"
                                detail="+91 1800-XXX-XXXX"
                                sub="Mon-Sat (10:00 - 19:00)"
                            />
                            <ContactInfoItem
                                icon={Briefcase}
                                title="Office"
                                detail="New Delhi, India"
                                sub="Regional Logistics Hub"
                            />
                        </div>
                    </div>

                    {/* Right Side: Form */}
                    <div className="glass p-8 md:p-12 rounded-[2.5rem] border border-white/5 relative overflow-hidden shadow-2xl">
                        <AnimatePresence mode="wait">
                            {status === "success" ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className="text-center py-12"
                                >
                                    <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-8 border border-green-500/30">
                                        <CheckCircle className="text-green-400" size={48} />
                                    </div>
                                    <h3 className="text-3xl font-black text-white mb-4 uppercase tracking-tighter">MESSAGE SENT!</h3>
                                    <p className="text-text-grey max-w-sm mx-auto font-medium">
                                        Thank you for reaching out. A Gentech Expert will contact you shortly via phone or email.
                                    </p>
                                </motion.div>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                >
                                    {/* Form Type Switcher */}
                                    <div className="flex p-1 bg-white/5 rounded-xl border border-white/10 mb-8 max-w-[300px]">
                                        <button
                                            onClick={() => setFormType("inquiry")}
                                            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg font-black text-[10px] uppercase tracking-widest transition-all ${formType === "inquiry" ? "bg-primary-blue text-white shadow-lg neon-glow" : "text-text-grey hover:text-white"
                                                }`}
                                        >
                                            <MessageSquare size={14} />
                                            Inquiry
                                        </button>
                                        <button
                                            onClick={() => setFormType("dealer")}
                                            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg font-black text-[10px] uppercase tracking-widest transition-all ${formType === "dealer" ? "bg-primary-blue text-white shadow-lg neon-glow" : "text-text-grey hover:text-white"
                                                }`}
                                        >
                                            <Briefcase size={14} />
                                            Dealer
                                        </button>
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <FormInput
                                                label="Full Name"
                                                placeholder="John Doe"
                                                value={formData.name}
                                                onChange={(v: string) => updateField("name", v)}
                                            />
                                            <FormInput
                                                label="Phone Number"
                                                placeholder="+91 999 000 0000"
                                                type="tel"
                                                value={formData.phone}
                                                onChange={(v: string) => updateField("phone", v)}
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <FormInput
                                                label="Email Address"
                                                placeholder="name@email.com"
                                                type="email"
                                                value={formData.email}
                                                onChange={(v: string) => updateField("email", v)}
                                            />
                                            <FormInput
                                                label="City / Region"
                                                placeholder="e.g. New Delhi"
                                                value={formData.city}
                                                onChange={(v: string) => updateField("city", v)}
                                            />
                                        </div>

                                        {formType === "dealer" && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                className="space-y-6 overflow-hidden"
                                            >
                                                <FormInput
                                                    label="Business Name"
                                                    placeholder="Your Studio/Store Name"
                                                    value={formData.businessName}
                                                    onChange={(v: string) => updateField("businessName", v)}
                                                />
                                                <FormInput
                                                    label="Current Experience"
                                                    placeholder="Years in Detailing/Automotive"
                                                    value={formData.currentExperience}
                                                    onChange={(v: string) => updateField("currentExperience", v)}
                                                />
                                            </motion.div>
                                        )}

                                        <div className="flex flex-col gap-2">
                                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-text-grey">
                                                {formType === "dealer" ? "Brief Profile" : "How can we help?"}
                                            </label>
                                            <textarea
                                                required
                                                value={formData.message}
                                                onChange={(e) => updateField("message", e.target.value)}
                                                placeholder="..."
                                                className="bg-white/5 border border-white/10 rounded-xl py-4 px-5 text-white outline-none focus:border-primary-blue focus:bg-white/10 transition-all font-medium placeholder:text-text-grey/30 text-sm h-32 resize-none"
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={status === "loading"}
                                            className="w-full bg-primary-blue hover:bg-white hover:text-dark-bg text-white py-5 rounded-2xl font-black text-sm uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 neon-glow disabled:opacity-50"
                                        >
                                            {status === "loading" ? "SENDING..." : "DISPATCH MESSAGE"}
                                            <Send size={18} />
                                        </button>

                                        <p className="text-[9px] text-text-grey/40 text-center uppercase tracking-widest italic">
                                            Privacy Protected • Zero Spam Policy • 256-bit Secure
                                        </p>
                                    </form>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
}

function ContactInfoItem({ icon: Icon, title, detail, sub }: any) {
    return (
        <div className="flex gap-6 group">
            <div className="w-14 h-14 shrink-0 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-primary-blue group-hover:text-white transition-all text-primary-blue shadow-lg group-hover:neon-glow">
                <Icon size={24} />
            </div>
            <div>
                <h4 className="text-[10px] font-black uppercase tracking-widest text-text-grey mb-1">{title}</h4>
                <p className="text-xl font-bold text-white mb-1">{detail}</p>
                <p className="text-xs text-text-grey font-medium">{sub}</p>
            </div>
        </div>
    );
}

function FormInput({ label, placeholder, type = "text", value, onChange }: any) {
    return (
        <div className="flex flex-col gap-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-text-grey">
                {label} <span className="text-primary-blue">*</span>
            </label>
            <input
                type={type}
                required
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="bg-white/5 border border-white/10 rounded-xl py-4 px-5 text-white outline-none focus:border-primary-blue focus:bg-white/10 transition-all font-medium placeholder:text-text-grey/30 text-sm"
            />
        </div>
    );
}
