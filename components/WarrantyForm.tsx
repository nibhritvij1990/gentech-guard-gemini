"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Car, Wrench, CheckCircle, ArrowRight, ArrowLeft } from "lucide-react";

const steps = [
    { id: 1, title: "Owner Info", icon: User },
    { id: 2, title: "Vehicle Details", icon: Car },
    { id: 3, title: "Installation", icon: Wrench },
];

export default function WarrantyForm() {
    const [step, setStep] = useState(1);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        city: "",
        vehicleModel: "",
        regNumber: "",
        dealerName: "",
        installDate: "",
        serialNumber: "",
    });

    const handleNext = () => setStep((s) => Math.min(s + 1, 3));
    const handleBack = () => setStep((s) => Math.max(s - 1, 1));

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, send data to API here
        setIsSubmitted(true);
    };

    const updateField = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    if (isSubmitted) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass p-12 rounded-[2.5rem] border border-white/5 text-center"
            >
                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-8 border border-green-500/30">
                    <CheckCircle className="text-green-400" size={40} />
                </div>
                <h2 className="text-3xl font-black text-white mb-4 uppercase tracking-tighter">Registration Complete!</h2>
                <p className="text-text-grey max-w-sm mx-auto mb-10 font-medium">
                    Your warranty has been submitted for verification. We will send your digital certificate to your email within 24 hours.
                </p>
                <button
                    onClick={() => setIsSubmitted(false)}
                    className="bg-primary-blue text-white px-10 py-4 rounded-xl font-black text-sm uppercase tracking-widest neon-glow"
                >
                    Return to Portal
                </button>
            </motion.div>
        );
    }

    return (
        <div className="glass p-8 md:p-12 rounded-[2.5rem] border border-white/5 relative overflow-hidden">
            {/* Step Progress */}
            <div className="flex justify-between mb-12 relative max-w-sm mx-auto">
                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white/5 -translate-y-1/2 z-0" />
                {steps.map((s) => (
                    <div key={s.id} className="relative z-10 flex flex-col items-center gap-2">
                        <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${step >= s.id ? "bg-primary-blue border-primary-blue text-white shadow-[0_0_15px_rgba(0,170,255,0.4)]" : "bg-dark-bg border-white/10 text-text-grey"
                                }`}
                        >
                            <s.icon size={18} />
                        </div>
                        <span className={`text-[10px] font-black uppercase tracking-widest ${step >= s.id ? "text-white" : "text-text-grey"}`}>
                            {s.title}
                        </span>
                    </div>
                ))}
            </div>

            <form onSubmit={handleSubmit}>
                <div className="min-h-[300px] mb-10">
                    <AnimatePresence mode="wait">
                        {step === 1 && (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                            >
                                <InputField
                                    label="Customer Full Name"
                                    placeholder="e.g. Rahul Sharma"
                                    value={formData.name}
                                    onChange={(val: string) => updateField("name", val)}
                                />
                                <InputField
                                    label="Phone Number"
                                    placeholder="+91 99999 99999"
                                    value={formData.phone}
                                    onChange={(val: string) => updateField("phone", val)}
                                />
                                <InputField
                                    label="Email Address"
                                    placeholder="name@email.com"
                                    value={formData.email}
                                    onChange={(val: string) => updateField("email", val)}
                                />
                                <InputField
                                    label="City"
                                    placeholder="e.g. New Delhi"
                                    value={formData.city}
                                    onChange={(val: string) => updateField("city", val)}
                                />
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                            >
                                <InputField
                                    label="Vehicle Model"
                                    placeholder="e.g. Mahindra XUV700"
                                    value={formData.vehicleModel}
                                    onChange={(val: string) => updateField("vehicleModel", val)}
                                />
                                <InputField
                                    label="Registration Number"
                                    placeholder="DD-00-XX-0000"
                                    value={formData.regNumber}
                                    onChange={(val: string) => updateField("regNumber", val)}
                                />
                            </motion.div>
                        )}

                        {step === 3 && (
                            <motion.div
                                key="step3"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                            >
                                <InputField
                                    label="Dealer Name"
                                    placeholder="Store where installed"
                                    value={formData.dealerName}
                                    onChange={(val: string) => updateField("dealerName", val)}
                                />
                                <InputField
                                    label="Installation Date"
                                    type="date"
                                    placeholder="Select date"
                                    value={formData.installDate}
                                    onChange={(val: string) => updateField("installDate", val)}
                                />
                                <div className="md:col-span-2">
                                    <InputField
                                        label="Serial Number (from Invoice)"
                                        placeholder="e.g. GNT-XXXXXX"
                                        value={formData.serialNumber}
                                        onChange={(val: string) => updateField("serialNumber", val)}
                                    />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="flex justify-between gap-4 border-t border-white/5 pt-8">
                    <button
                        type="button"
                        onClick={handleBack}
                        className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-sm transition-all ${step === 1 ? "opacity-0 pointer-events-none" : "hover:text-primary-blue text-white"
                            }`}
                    >
                        <ArrowLeft size={16} />
                        BACK
                    </button>

                    {step < 3 ? (
                        <button
                            type="button"
                            onClick={handleNext}
                            className="bg-primary-blue hover:bg-white hover:text-dark-bg text-white px-10 py-4 rounded-xl font-black text-sm transition-all flex items-center gap-2 neon-glow"
                        >
                            NEXT STEP
                            <ArrowRight size={18} />
                        </button>
                    ) : (
                        <button
                            type="submit"
                            className="bg-primary-blue hover:bg-white hover:text-dark-bg text-white px-12 py-4 rounded-xl font-black text-sm transition-all border-2 border-primary-blue neon-glow"
                        >
                            COMPLETE REGISTRATION
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}

interface InputFieldProps {
    label: string;
    placeholder: string;
    type?: string;
    value: string;
    onChange: (val: string) => void;
}

function InputField({ label, placeholder, type = "text", value, onChange }: InputFieldProps) {
    return (
        <div className="flex flex-col gap-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-text-grey flex items-center gap-1">
                {label} <span className="text-primary-blue">*</span>
            </label>
            <input
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                required
                className="bg-white/5 border border-white/10 rounded-xl py-4 px-5 text-white outline-none focus:border-primary-blue focus:bg-white/10 transition-all font-medium placeholder:text-text-grey/30 text-sm"
            />
        </div>
    );
}
