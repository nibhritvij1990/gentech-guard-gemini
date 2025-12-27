"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WarrantyChecker from "@/components/WarrantyChecker";
import WarrantyForm from "@/components/WarrantyForm";
import { ShieldCheck, UserPlus } from "lucide-react";

export default function WarrantyPage() {
    const [activeTab, setActiveTab] = useState<"check" | "register">("check");

    return (
        <main className="min-h-screen bg-dark-bg text-white selection:bg-primary-blue selection:text-white">
            <Header />

            {/* Hero Section for Warranty */}
            <section className="pt-32 pb-16 bg-gradient-to-b from-primary-blue/10 to-transparent">
                <div className="container mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-4xl md:text-6xl font-black mb-6">
                            E-WARRANTY <span className="blue-text italic">PORTAL</span>
                        </h1>
                        <p className="text-text-grey max-w-2xl mx-auto text-lg font-medium">
                            Secure your investment. Register your Gentech Guard® protection or verify your existing warranty status instantly.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Main Portal Section */}
            <section className="pb-24">
                <div className="container mx-auto px-4 max-w-4xl">
                    {/* Tab Switcher */}
                    <div className="flex p-1 bg-white/5 rounded-2xl border border-white/10 mb-12 max-w-md mx-auto">
                        <button
                            onClick={() => setActiveTab("check")}
                            className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-xl font-black text-sm uppercase tracking-widest transition-all ${activeTab === "check" ? "bg-primary-blue text-white shadow-lg neon-glow" : "text-text-grey hover:text-white"
                                }`}
                        >
                            <ShieldCheck size={18} />
                            Check Status
                        </button>
                        <button
                            onClick={() => setActiveTab("register")}
                            className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-xl font-black text-sm uppercase tracking-widest transition-all ${activeTab === "register" ? "bg-primary-blue text-white shadow-lg neon-glow" : "text-text-grey hover:text-white"
                                }`}
                        >
                            <UserPlus size={18} />
                            Register
                        </button>
                    </div>

                    {/* Content Area */}
                    <div className="relative min-h-[500px]">
                        <AnimatePresence mode="wait">
                            {activeTab === "check" ? (
                                <motion.div
                                    key="check"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    transition={{ duration: 0.4 }}
                                >
                                    <WarrantyChecker />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="register"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.4 }}
                                >
                                    <WarrantyForm />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
