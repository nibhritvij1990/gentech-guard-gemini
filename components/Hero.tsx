"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Shield, Zap, Droplets } from "lucide-react";
import { useRef } from "react";

export default function Hero() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <section
            ref={containerRef}
            className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-dark-bg"
        >
            {/* BACKGROUND IMAGE WITH PARALLAX */}
            <motion.div
                style={{ y: y1 }}
                className="absolute inset-0 z-0 opacity-40 md:opacity-60"
            >
                <Image
                    src="/assets/Hero Image Side On.png"
                    alt="Gentech Guard Protected Car"
                    fill
                    priority
                    className="object-cover object-right md:object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-dark-bg via-dark-bg/80 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-transparent to-transparent" />
            </motion.div>

            {/* CONTENT */}
            <div className="container mx-auto px-4 md:px-8 relative z-10 w-full">
                <div className="max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <span className="inline-block bg-primary-blue/10 border border-primary-blue/30 text-primary-blue px-4 py-1 rounded-full text-xs font-black tracking-widest uppercase mb-6 neon-glow">
                            Next-Gen Protection
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-6">
                            NEXT-GENERATION <br />
                            <span className="blue-text italic tracking-wider">AUTOMOTIVE PROTECTION</span>
                        </h1>
                        <p className="text-base md:text-lg text-text-grey max-w-xl mb-8 font-medium leading-relaxed">
                            Step into the future of car care. Our international-grade Aliphatic TPU
                            Film provides invisible, self-healing armor for your vehicle.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 mb-12">
                            <button className="bg-primary-blue hover:bg-white hover:text-dark-bg text-white px-8 py-3 rounded-full font-black text-base transition-all neon-glow flex items-center justify-center gap-2 group">
                                GET A QUOTE
                                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                            <button className="border border-white/20 hover:border-primary-blue text-white px-8 py-3 rounded-full font-black text-base transition-all backdrop-blur-sm">
                                EXPLORE TECH
                            </button>
                        </div>
                    </motion.div>

                    {/* MICRO FEATURES */}
                    <motion.div
                        style={{ y: y2, opacity }}
                        className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-12 border-t border-white/10"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-elevated-bg border border-white/10 flex items-center justify-center text-primary-blue">
                                <Shield size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-sm tracking-widest">SELF-HEALING</h3>
                                <p className="text-xs text-text-grey uppercase font-bold tracking-tighter">Surface Tech</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-elevated-bg border border-white/10 flex items-center justify-center text-primary-blue">
                                <Droplets size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-sm tracking-widest">HYDROPHOBIC</h3>
                                <p className="text-xs text-text-grey uppercase font-bold tracking-tighter">High Clarity</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-elevated-bg border border-white/10 flex items-center justify-center text-primary-blue">
                                <Zap size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-sm tracking-widest">ANTI-YELLOW</h3>
                                <p className="text-xs text-text-grey uppercase font-bold tracking-tighter">10 Year Warranty</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* DECORATIVE LINE */}
            <div className="absolute bottom-0 right-0 w-1/3 h-[1px] bg-gradient-to-r from-transparent to-primary-blue opacity-50" />
        </section>
    );
}
