"use client";

import { useState } from "react";
import { Search, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Mock database for demonstration
const MOCK_DB: Record<string, any> = {
    "GNT-123456": {
        name: "John Doe",
        vehicle: "BMW M4 (Sky Blue)",
        installationDate: "12 Oct 2024",
        product: "Gentech Pro",
        status: "Active",
        expiry: "11 Oct 2031",
    },
    "GNT-987654": {
        name: "Jane Smith",
        vehicle: "Tesla Model 3 ",
        installationDate: "05 Dec 2024",
        product: "Gentech Matte",
        status: "Active",
        expiry: "04 Dec 2031",
    },
};

export default function WarrantyChecker() {
    const [serial, setSerial] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);
    const [error, setError] = useState("");

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!serial) return;

        setLoading(true);
        setError("");
        setResult(null);

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1500));

        const data = MOCK_DB[serial.toUpperCase()];
        if (data) {
            setResult(data);
        } else {
            setError("Warranty serial number not found. Please verify and try again.");
        }
        setLoading(false);
    };

    return (
        <div className="glass p-8 md:p-12 rounded-[2.5rem] border border-white/5 relative overflow-hidden">
            <div className="max-w-md mx-auto text-center mb-10">
                <h2 className="text-2xl font-black mb-4">VERIFY YOUR WARRANTY</h2>
                <p className="text-text-grey text-sm font-medium">
                    Enter the unique serial number provided at the time of installation to view your digital certificate.
                </p>
            </div>

            <form onSubmit={handleSearch} className="max-w-lg mx-auto mb-12">
                <div className="relative group">
                    <input
                        type="text"
                        value={serial}
                        onChange={(e) => setSerial(e.target.value)}
                        placeholder="e.g. GNT-123456"
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-6 outline-none focus:border-primary-blue focus:bg-white/10 transition-all font-black tracking-widest uppercase placeholder:text-text-grey/30"
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="absolute right-2 top-2 bottom-2 bg-primary-blue hover:bg-white hover:text-dark-bg text-white px-8 rounded-xl font-black text-sm transition-all flex items-center gap-2 neon-glow disabled:opacity-50"
                    >
                        {loading ? <Loader2 className="animate-spin" size={18} /> : <Search size={18} />}
                        {loading ? "SEARCHING..." : "VERIFY"}
                    </button>
                </div>
                <p className="text-[10px] text-text-grey/40 mt-3 text-center uppercase tracking-widest">
                    Case sensitive serial number found on your physical invoice
                </p>
            </form>

            <AnimatePresence>
                {error && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-red-500/10 border border-red-500/20 p-6 rounded-2xl flex items-center gap-4 text-red-400 max-w-lg mx-auto"
                    >
                        <AlertCircle className="shrink-0" />
                        <p className="text-sm font-bold">{error}</p>
                    </motion.div>
                )}

                {result && (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-lg mx-auto"
                    >
                        <div className="bg-gradient-to-br from-white/10 to-transparent p-1 rounded-[2.5rem] shadow-2xl">
                            <div className="bg-dark-bg/90 backdrop-blur-xl rounded-[2.4rem] p-8 md:p-10 border border-white/5">
                                <div className="flex justify-between items-start mb-8">
                                    <div>
                                        <span className="bg-green-500/10 text-green-400 text-[10px] font-black px-3 py-1 rounded-full border border-green-500/20 uppercase tracking-widest mb-2 inline-block">
                                            {result.status}
                                        </span>
                                        <h3 className="text-2xl font-black text-white">{result.name}</h3>
                                    </div>
                                    <CheckCircle2 className="text-primary-blue" size={32} />
                                </div>

                                <div className="grid grid-cols-2 gap-y-6 mb-10">
                                    <div>
                                        <p className="text-[10px] text-text-grey uppercase tracking-widest mb-1">Vehicle</p>
                                        <p className="text-white font-bold">{result.vehicle}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-text-grey uppercase tracking-widest mb-1">Product</p>
                                        <p className="text-primary-blue font-black">{result.product}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-text-grey uppercase tracking-widest mb-1">Installed On</p>
                                        <p className="text-white font-bold">{result.installationDate}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-text-grey uppercase tracking-widest mb-1">Valid Until</p>
                                        <p className="text-white font-bold">{result.expiry}</p>
                                    </div>
                                </div>

                                <button className="w-full py-4 bg-white/5 hover:bg-white hover:text-dark-bg border border-white/10 rounded-xl text-white font-black text-xs uppercase tracking-[0.2em] transition-all">
                                    DOWNLOAD CERTIFICATE
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
