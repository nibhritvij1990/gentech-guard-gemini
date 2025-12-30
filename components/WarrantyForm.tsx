"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Car, Wrench, CheckCircle, ArrowRight, ArrowLeft, Upload, Loader2, AlertCircle } from "lucide-react";

const steps = [
    { id: 1, title: "Owner Info", icon: User },
    { id: 2, title: "Vehicle Details", icon: Car },
    { id: 3, title: "Installation", icon: Wrench },
];

export default function WarrantyForm() {
    const [step, setStep] = useState(1);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");

    // Form State
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        regNumber: "",
        chassisNumber: "",
        ppfRoll: "",
        ppfCategory: "",
        dealerName: "",
        installerMobile: "",
        installationLocation: "",
        message: "",
    });

    const [files, setFiles] = useState<{
        vehicleImage: File | null;
        rcImage: File | null;
    }>({
        vehicleImage: null,
        rcImage: null,
    });

    const updateField = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        setError(""); // Clear error on change
    };

    const handleFileChange = (field: "vehicleImage" | "rcImage", file: File | null) => {
        setFiles((prev) => ({ ...prev, [field]: file }));
    };

    const validateStep = (currentStep: number) => {
        const d = formData;
        if (currentStep === 1) {
            if (!d.name || !d.phone || !d.email) return "Please fill in all required fields (Name, Phone, Email).";
        }
        if (currentStep === 2) {
            if (!d.regNumber || !d.chassisNumber || !d.ppfRoll || !d.ppfCategory) return "Please fill in all required vehicle details.";
        }
        if (currentStep === 3) {
            if (!d.dealerName || !d.installerMobile || !d.installationLocation) return "Please fill in all required dealer details.";
        }
        return null;
    };

    const handleNext = () => {
        const errorMsg = validateStep(step);
        if (errorMsg) {
            setError(errorMsg);
            return;
        }
        setError("");
        setStep((s) => Math.min(s + 1, 3));
    };

    const handleBack = () => {
        setError("");
        setStep((s) => Math.max(s - 1, 1));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const errorMsg = validateStep(3);
        if (errorMsg) {
            setError(errorMsg);
            return;
        }

        setIsSubmitting(true);
        setError("");

        try {
            const submitData = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                submitData.append(key, value);
            });
            if (files.vehicleImage) submitData.append("vehicleImage", files.vehicleImage);
            if (files.rcImage) submitData.append("rcImage", files.rcImage);

            const res = await fetch("/api/warranty/register", {
                method: "POST",
                body: submitData,
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || "Something went wrong.");
            }

            setIsSubmitted(true);
        } catch (err: any) {
            setError(err.message || "Failed to submit warranty registration.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSubmitted) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass p-12 rounded-[2.5rem] border border-white/5 text-center"
                style={{
                    background: "#fafafa11",
                }}
            >
                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-8 border border-green-500/30">
                    <CheckCircle className="text-green-400" size={40} />
                </div>
                <h2 className="text-3xl font-black text-white mb-4 uppercase tracking-tighter">Registration Complete!</h2>
                <p className="text-text-grey max-w-sm mx-auto mb-10 font-medium">
                    Your warranty has been submitted for verification. We will send your digital certificate to your email within 24 hours.
                </p>
                <button
                    onClick={() => {
                        setIsSubmitted(false);
                        setStep(1);
                        setFormData({
                            name: "", phone: "", email: "", regNumber: "", chassisNumber: "",
                            ppfRoll: "", ppfCategory: "", dealerName: "", installerMobile: "",
                            installationLocation: "", message: ""
                        });
                        setFiles({ vehicleImage: null, rcImage: null });
                    }}
                    className="bg-primary-blue text-white px-10 py-4 rounded-xl font-black text-sm uppercase tracking-widest neon-glow"
                >
                    Return to Portal
                </button>
            </motion.div>
        );
    }

    return (
        <div className="glass p-8 md:p-12 rounded-[2.5rem] border border-white/5 relative overflow-hidden"
            style={{
                background: "#fafafa11",
            }}
        >
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
                                    label="Vehicle Registration Number"
                                    placeholder="DD-00-XX-0000"
                                    value={formData.regNumber}
                                    onChange={(val: string) => updateField("regNumber", val)}
                                />
                                <InputField
                                    label="Chassis / VIN Number"
                                    placeholder="e.g. 1234567890"
                                    value={formData.chassisNumber}
                                    onChange={(val: string) => updateField("chassisNumber", val)}
                                />
                                <InputField
                                    label="PPF Roll / Unique Product Code"
                                    placeholder="e.g. 1234567890"
                                    value={formData.ppfRoll}
                                    onChange={(val: string) => updateField("ppfRoll", val)}
                                />
                                <InputField
                                    label="PPF Category"
                                    placeholder="e.g. Matte / Gloss / Pro"
                                    value={formData.ppfCategory}
                                    onChange={(val: string) => updateField("ppfCategory", val)}
                                />
                                <FileInput
                                    label="Vehicle Image with PPF Roll Code"
                                    subLabel="(Optional)"
                                    onChange={(file) => handleFileChange("vehicleImage", file)}
                                    file={files.vehicleImage}
                                />
                                <FileInput
                                    label="RC (Registration Certificate) Image"
                                    subLabel="(Optional)"
                                    onChange={(file) => handleFileChange("rcImage", file)}
                                    file={files.rcImage}
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
                                    label="Authorised Studio Name"
                                    placeholder="Store where installed"
                                    value={formData.dealerName}
                                    onChange={(val: string) => updateField("dealerName", val)}
                                />
                                <InputField
                                    label="Installer Mobile Number"
                                    placeholder="+91 99999 99999"
                                    value={formData.installerMobile}
                                    onChange={(val: string) => updateField("installerMobile", val)}
                                />
                                <InputField
                                    label="Installation Location"
                                    placeholder="e.g. New Delhi"
                                    value={formData.installationLocation}
                                    onChange={(val: string) => updateField("installationLocation", val)}
                                />
                                <InputField
                                    label="Message (Optional)"
                                    placeholder="Any additional information"
                                    value={formData.message}
                                    onChange={(val: string) => updateField("message", val)}
                                    required={false}
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-6 bg-red-500/10 border border-red-500/20 p-4 rounded-xl flex items-center gap-3 text-red-400"
                    >
                        <AlertCircle size={18} />
                        <span className="text-xs font-bold">{error}</span>
                    </motion.div>
                )}

                <div className="flex justify-between gap-4 border-t border-white/5 pt-8">
                    <button
                        type="button"
                        onClick={handleBack}
                        disabled={isSubmitting}
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
                            disabled={isSubmitting}
                            className="bg-primary-blue hover:bg-white hover:text-dark-bg text-white px-12 py-4 rounded-xl font-black text-sm transition-all border-2 border-primary-blue neon-glow disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            {isSubmitting && <Loader2 className="animate-spin" size={16} />}
                            {isSubmitting ? "REGISTERING..." : "COMPLETE REGISTRATION"}
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
    required?: boolean;
}

function InputField({ label, placeholder, type = "text", value, onChange, required = true }: InputFieldProps) {
    return (
        <div className="flex flex-col gap-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-text-grey flex items-center gap-1">
                {label} {required && <span className="text-primary-blue">*</span>}
            </label>
            <input
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                required={required}
                className="bg-white/5 border border-white/10 rounded-xl py-4 px-5 text-white outline-none focus:border-primary-blue focus:bg-white/10 transition-all font-medium placeholder:text-text-grey/30 text-sm"
            />
        </div>
    );
}

interface FileInputProps {
    label: string;
    subLabel?: string;
    file: File | null;
    onChange: (file: File | null) => void;
}

function FileInput({ label, subLabel, file, onChange }: FileInputProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    return (
        <div className="flex flex-col gap-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-text-grey flex items-center gap-1">
                {label} <span className="text-text-grey/50 normal-case tracking-normal ml-1">{subLabel}</span>
            </label>
            <div
                onClick={() => fileInputRef.current?.click()}
                className="cursor-pointer bg-white/5 border border-white/10 border-dashed rounded-xl py-4 px-5 text-white hover:border-primary-blue over:bg-white/10 transition-all flex items-center justify-between group"
            >
                <div className="flex items-center gap-3 overflow-hidden">
                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-primary-blue group-hover:text-white transition-colors">
                        <Upload size={14} />
                    </div>
                    <span className="text-sm font-medium truncate text-text-grey group-hover:text-white transition-colors">
                        {file ? file.name : "Click to upload image"}
                    </span>
                </div>
                {file && (
                    <span className="text-[10px] font-bold bg-green-500/20 text-green-400 px-2 py-1 rounded">ATTACHED</span>
                )}
            </div>
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                    const f = e.target.files?.[0] || null;
                    onChange(f);
                }}
            />
        </div>
    );
}
