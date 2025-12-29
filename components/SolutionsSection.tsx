"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, X, ShieldCheck, Zap } from "lucide-react";

const ppfFeatures = [
    "Self-healing technology",
    "High gloss & matte finish options",
    "UV & stain resistance"
];

const sunfilmFeatures = [
    "Superior heat & UV rejection",
    "Enhanced cabin privacy",
    "Crystal clear & scratch-resistant"
];

const products = [
    {
        id: "gen-5",
        name: "GEN 5 PPF",
        shortDesc: "Engineered for Hot Climate Performance",
        features: [
            "190 micron High-Clarity TPU",
            "Fast Self-Healing Top Coat",
            "Hydrophobic + Anti-Contamination Layer",
            "Superior Tensile Strength",
            "Outstanding Gloss Depth"
        ],
        specs: [
            { label: "Thickness", value: "190 microns" },
            { label: "Warranty", value: "5 Years" },
            { label: "Finish", value: "Gloss" },
            { label: "Max Temp", value: "120°C" }
        ]
    },
    {
        id: "gen-4",
        name: "GEN 4 PPF",
        shortDesc: "Reliable TPU Gloss Protection",
        features: [
            "175 Micron TPU Gloss Film",
            "High-Gloss Clear Finish",
            "Standard Self-Healing Technology",
            "Excellent Weather Resistance",
            "Strong Surface Protection"
        ],
        specs: [
            { label: "Thickness", value: "175 microns" },
            { label: "Warranty", value: "4 Years" },
            { label: "Finish", value: "High-Gloss" },
            { label: "Max Temp", value: "115°C" }
        ]
    },
    {
        id: "gen-pro-6",
        name: "GEN PRO 6",
        shortDesc: "High-clarity TPU with hydrophobic properties",
        features: [
            "190 micron High-Clarity TPU",
            "Fast Self-Healing (Heat Activated)",
            "Superior Tensile Strength",
            "Advanced UV Inhibitors",
            "Excellent High-Temp Stability"
        ],
        specs: [
            { label: "Thickness", value: "190 microns" },
            { label: "Warranty", value: "6 Years" },
            { label: "Finish", value: "Ultra Gloss" },
            { label: "Max Temp", value: "120°C" }
        ]
    },
    {
        id: "gen-ultra-pro-8",
        name: "GEN ULTRA PRO 8",
        shortDesc: "Advanced instant self-healing TPU",
        features: [
            "215 micron Ultra-Premium TPU",
            "Instant Self-Healing (No Heat)",
            "Best-In-Class Stain Resistance",
            "Ultra Hydrophobic Top-Coat",
            "150% Stretch"
        ],
        specs: [
            { label: "Thickness", value: "215 microns" },
            { label: "Warranty", value: "8 Years" },
            { label: "Finish", value: "Crystal Gloss" },
            { label: "Max Temp", value: "120°C" }
        ]
    },
    {
        id: "gen-matte-5",
        name: "GEN MATTE 5",
        shortDesc: "Stealth Matte Finish with TPU Protection",
        features: [
            "190 micron TPU Matte Film",
            "Satin-Matte Uniform Texture",
            "Anti-Fingerprint & Anti-Glare",
            "UV-Resistant Polymer",
            "OEM-Style Matte Finish"
        ],
        specs: [
            { label: "Thickness", value: "190 microns" },
            { label: "Warranty", value: "5 Years" },
            { label: "Finish", value: "Satin Matte" },
            { label: "Max Temp", value: "120°C" }
        ]
    }
];

export default function SolutionsSection() {
    const ref = useRef(null);
    const [activeProduct, setActiveProduct] = useState<typeof products[0] | null>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 0.5, 1], ["10%", "0%", "20%"]);
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.05, 1, 1]);

    return (
        <>
            <section
                id="solutions"
                ref={ref}
                className="relative min-h-screen flex items-center py-24 overflow-hidden bg-dark-bg"
            >
                {/* BACKGROUND IMAGE WITH PARALLAX */}
                <motion.div
                    style={{ y, scale }}
                    className="absolute inset-0 z-0"
                >
                    <Image
                        src="/assets/solutions_hero.png"
                        alt="Gentech Guard Solutions"
                        fill
                        priority
                        className="object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-dark-bg/20" />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-transparent to-transparent" />
                </motion.div>

                {/* CONTENT */}
                <div className="container mx-auto px-4 md:px-8 relative z-10 w-full translate-y-[-10%]">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        {/* Logo */}
                        <div className="hidden w-24 h-24 md:w-32 md:h-32 mx-auto mb-6 relative">
                            <Image
                                src="/assets/gentech-tall.png"
                                alt="Gentech Guard"
                                fill
                                className="object-contain"
                            />
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tight mb-2">
                            OUR <span className="text-primary-blue">SOLUTIONS</span>
                        </h2>
                    </motion.div>

                    {/* Cards Container */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        {/* PPF Card */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="relative group"
                        >
                            {/* Neon Border Glow */}
                            <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-b from-primary-blue/30 via-primary-blue/10 to-primary-blue/20 opacity-10 group-hover:opacity-40 transition-opacity blur-[1px]" />

                            {/* Card Content */}
                            <div className="relative bg-dark-bg/0 backdrop-blur-md rounded-2xl p-8 border border-primary-blue/30">
                                {/* Fixed height title area for alignment */}
                                <div className="h-20 flex items-center justify-center mb-4">
                                    <h3 className="text-2xl md:text-3xl font-black text-white text-center">
                                        Paint Protection Film&nbsp;
                                        <span className="text-primary-blue">(PPF)</span>
                                    </h3>
                                </div>

                                {/* Spread Neon Separator */}
                                <div className="relative h-[2px] w-full mb-8">
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-blue to-transparent" />
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-blue to-transparent blur-sm" />
                                </div>

                                {/* Features List */}
                                <ul className="space-y-4 mb-8">
                                    {ppfFeatures.map((feature) => (
                                        <li key={feature} className="flex items-center gap-3 text-white/90 text-base font-medium">
                                            <span className="w-2 h-2 rounded-full bg-primary-blue shadow-[0_0_8px_rgba(0,170,255,0.8)]" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                {/* Button */}
                                <Link
                                    href="#product-showcase"
                                    className="group/btn inline-flex items-center gap-2 px-6 py-3 border border-primary-blue/50 rounded-lg text-white bg-primary-blue/50 font-bold uppercase tracking-widest text-sm hover:bg-primary-blue/100 transition-all"
                                >
                                    View PPF Solutions
                                    <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </motion.div>

                        {/* Sunfilm Card */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="relative group"
                        >
                            {/* Neon Border Glow */}
                            <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-b from-primary-blue/30 via-primary-blue/10 to-primary-blue/20 opacity-10 group-hover:opacity-40 transition-opacity blur-[1px]" />

                            {/* Card Content */}
                            <div className="relative bg-dark-bg/0 backdrop-blur-md rounded-2xl p-8 border border-primary-blue/30">
                                {/* Fixed height title area for alignment */}
                                <div className="h-20 flex items-center justify-center mb-4">
                                    <h3 className="text-2xl md:text-3xl font-black text-white text-center">
                                        Sunfilm
                                    </h3>
                                </div>

                                {/* Spread Neon Separator */}
                                <div className="relative h-[2px] w-full mb-8">
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-blue to-transparent" />
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-blue to-transparent blur-sm" />
                                </div>

                                {/* Features List */}
                                <ul className="space-y-4 mb-8">
                                    {sunfilmFeatures.map((feature) => (
                                        <li key={feature} className="flex items-center gap-3 text-white/90 text-base font-medium">
                                            <span className="w-2 h-2 rounded-full bg-primary-blue shadow-[0_0_8px_rgba(0,170,255,0.8)]" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                {/* Button */}
                                <Link
                                    href="#product-showcase"
                                    className="group/btn inline-flex items-center gap-2 px-6 py-3 border border-primary-blue/50 rounded-lg text-white bg-primary-blue font-bold uppercase tracking-widest text-sm hover:bg-primary-blue/100 transition-all"
                                >
                                    View Sunfilm Options
                                    <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* PRODUCT SHOWCASE SUB-SECTION */}
            <section id="product-showcase" className="relative h-[80vh] w-full bg-dark-bg overflow-hidden flex flex-col my-24 container mx-auto px-8">
                <h4 className="text-xl md:text-2xl font-black text-white uppercase tracking-tighter text-center">
                    OUR <span className="blue-text">PPF</span> SOLUTION RANGE
                </h4>
                <div className="relative z-10 h-full gap-8 flex flex-col md:flex-row m-8">
                    {products.map((product, index) => (
                        <div
                            key={product.id}
                            className="group relative flex-1 hover:flex-[2] transition-[flex] duration-500 ease-out overflow-hidden cursor-pointer border border-white/5 bg-dark-bg"
                            onClick={() => setActiveProduct(product)}
                        >
                            {/* Individual Card Background Image */}
                            <div className="absolute inset-0 z-0">
                                <div className="absolute inset-0 bg-dark-bg/40 z-10 group-hover:bg-transparent transition-colors duration-500" />
                                <Image
                                    src="/assets/solutions_bg.png"
                                    alt="Gentech Product Range"
                                    fill
                                    className="object-cover transition-transform duration-700 md:group-hover:scale-105"
                                    style={{
                                        objectPosition: `${index * 24}% center`,
                                        scale: "1.2"
                                    }}
                                />
                            </div>

                            {/* Vertical Text */}
                            <div className="absolute top-0 bottom-0 left-0 w-16 md:w-20 flex flex-col items-center justify-center pointer-events-none z-20">
                                <h3 className="whitespace-nowrap -rotate-180 md:-rotate-90 text-2xl md:text-2xl font-black tracking-widest text-white/80 group-hover:text-primary-blue transition-colors uppercase">
                                    {product.name}
                                </h3>
                            </div>

                            {/* Hover Overlay Content */}
                            <div className="absolute inset-0 pl-20 p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none z-20">
                                <span className="text-primary-blue font-bold tracking-widest uppercase text-sm mb-2 opacity-0 group-hover:animate-fade-in-up">
                                    Click for Details
                                </span>
                                <h4 className="text-3xl font-black text-white mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                                    {product.name}
                                </h4>
                                <p className="text-white/80 line-clamp-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                                    {product.shortDesc}
                                </p>
                                <span className="text-primary-blue font-bold tracking-widest uppercase text-sm my-4 group-hover:animate-fade-in-up border border-primary-blue px-6 py-2 w-fit hover:bg-primary-blue hover:text-white transition-colors">
                                    Click for Details
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* PRODUCT DETAIL MODAL */}
            <AnimatePresence>
                {activeProduct && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-lg"
                        onClick={() => setActiveProduct(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-[#0a0a0a] border border-white/10 rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative flex flex-col md:flex-row shadow-2xl shadow-primary-blue/10"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setActiveProduct(null)}
                                className="absolute top-6 right-6 z-20 text-white/50 hover:text-white transition-colors"
                            >
                                <X size={24} />
                            </button>

                            {/* Modal Left: Visual */}
                            <div className="w-full md:w-1/3 bg-gradient-to-br from-primary-blue/20 to-dark-bg relative overflow-hidden p-8 flex flex-col justify-between min-h-[300px]">
                                <div className="absolute inset-0 z-0">
                                    <Image
                                        src="/assets/solutions_bg.png"
                                        alt="Product Background"
                                        fill
                                        className="object-cover opacity-60"
                                        style={{
                                            objectPosition: `${products.indexOf(activeProduct) * 25}% center`,
                                            scale: "1.2"
                                        }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/40 to-primary-blue/10 mix-blend-multiply" />
                                </div>

                                <Image
                                    src="/assets/gentech-tall.png"
                                    alt="Logo"
                                    width={100}
                                    height={100} // Keep 100 as per previous code
                                    className="hidden opacity-60 absolute top-4 left-4 z-10"
                                />
                                <div className="relative z-10 mt-auto">
                                    <h2 className="text-4xl md:text-5xl font-black text-white mb-2 uppercase leading-none drop-shadow-lg">
                                        {activeProduct.name}
                                    </h2>
                                    <div className="h-1 w-20 bg-primary-blue mt-4 shadow-[0_0_15px_rgba(0,170,255,0.8)]" />
                                </div>
                            </div>

                            {/* Modal Right: Details */}
                            <div className="w-full md:w-2/3 p-8 md:p-12">
                                <h3 className="text-xl font-bold text-primary-blue mb-4 uppercase tracking-widest">
                                    Product Highlights
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mb-10">
                                    {activeProduct.features.map((feature, i) => (
                                        <div key={i} className="flex items-start gap-3">
                                            <ShieldCheck size={18} className="text-primary-blue shrink-0 mt-1" />
                                            <span className="text-white/80 text-sm font-medium">{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                <h3 className="text-xl font-bold text-white mb-6 uppercase tracking-widest flex items-center gap-3">
                                    <Zap size={20} className="text-primary-blue" />
                                    Technical Specs
                                </h3>
                                <div className="grid grid-cols-2 gap-4">
                                    {activeProduct.specs.map((spec, i) => (
                                        <div key={i} className="bg-white/5 rounded-xl p-4 border border-white/5">
                                            <p className="text-white/40 text-xs uppercase font-bold tracking-wider mb-1">{spec.label}</p>
                                            <p className="text-white font-bold text-lg">{spec.value}</p>
                                        </div>
                                    ))}
                                </div>

                                <div className="hidden mt-10 pt-8 border-t border-white/10 flex justify-end">
                                    <Link
                                        href="/#contact"
                                        className="bg-primary-blue text-white px-8 py-3 rounded-lg font-black uppercase tracking-widest hover:bg-blue-600 transition-colors"
                                        onClick={() => setActiveProduct(null)}
                                    >
                                        Inquire Now
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
