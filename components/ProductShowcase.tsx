"use client";

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, Zap } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export interface Product {
    id: string;
    name: string;
    shortDesc: string;
    features: string[];
    specs: { label: string; value: string }[];
}

interface Props {
    products: Product[];
}

const ProductShowcase: React.FC<Props> = ({ products }) => {
    // Modal State
    const [activeProduct, setActiveProduct] = useState<Product | null>(null);

    // Mobile "Hover" State (Tracks which card is expanded on mobile)
    const [mobileExpandedId, setMobileExpandedId] = useState<string | null>(null);

    // --- BACKGROUND SYNC LOGIC ---
    const containerRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    // Smart Click Handler
    const handleCardClick = (product: Product) => {
        // Check if mobile (md breakpoint is 768px)
        const isMobile = window.innerWidth < 768;

        if (isMobile) {
            // TOGGLE LOGIC: 
            // If this card is already expanded, close it (set to null).
            // If it's not expanded, open it.
            setMobileExpandedId(mobileExpandedId === product.id ? null : product.id);
        } else {
            // Desktop: always open modal (hover handles expansion)
            setActiveProduct(product);
        }
    };

    useEffect(() => {
        let animationFrameId: number;

        const syncBackgrounds = () => {
            const container = containerRef.current;
            if (!container || cardsRef.current.length === 0) return;

            const containerRect = container.getBoundingClientRect();
            const isMobile = window.innerWidth < 768;

            cardsRef.current.forEach((card) => {
                if (!card) return;
                const cardRect = card.getBoundingClientRect();

                // --- NEW LOGIC: PREVENT DISTORTION ---
                const imageAspectRatio = 16 / 9;
                const containerAspectRatio = containerRect.width / containerRect.height;

                //if (containerAspectRatio > imageAspectRatio) {
                if (containerAspectRatio > 1) {
                    //card.style.backgroundSize = `${containerRect.width}px auto`;
                    card.style.backgroundSize = `${containerRect.width}px ${containerRect.height}px`;
                } else {
                    //card.style.backgroundSize = `auto ${containerRect.height}px`;
                    card.style.backgroundSize = `auto ${containerRect.height}px`;
                }

                if (isMobile) {
                    const yOffset = containerRect.top - cardRect.top;
                    card.style.backgroundPosition = `center ${yOffset}px`;
                } else {
                    const xOffset = containerRect.left - cardRect.left;
                    card.style.backgroundPosition = `${xOffset}px center`;
                }
            });

            animationFrameId = requestAnimationFrame(syncBackgrounds);
        };

        syncBackgrounds();
        return () => cancelAnimationFrame(animationFrameId);
    }, [products]);

    return (
        <>
            {/* --- THE EXPANDING CARDS SECTION --- */}
            <div
                ref={containerRef}
                className="relative z-10 flex flex-col md:flex-row gap-4 mx-4 md:mx-20 my-0 md:my-8 pt-6 pb-20 md:pt-0 md:pb-0 aspect-[9/16] md:aspect-video"
            >
                {products.map((product, index) => {
                    // Helper: Is this card currently expanded on mobile?
                    const isExpanded = mobileExpandedId === product.id;

                    return (
                        <div
                            key={product.id}
                            ref={(el) => { cardsRef.current[index] = el; }}
                            // Use our smart handler instead of setting activeProduct directly
                            onClick={() => handleCardClick(product)}
                            className={`
                                group relative 
                                transition-[flex] duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] 
                                overflow-hidden cursor-pointer 
                                border border-white/5 bg-[#111] rounded-2xl
                                
                                /* WIDTH LOGIC:
                                   Desktop: Default flex-1, Hover flex-2.
                                   Mobile: Default flex-1, If Expanded flex-2.
                                */
                                ${isExpanded ? 'flex-[2]' : 'flex-1 hover:flex-[2]'}
                            `}
                            style={{
                                backgroundImage: "url('/assets/solutions_bg.png')",
                                backgroundRepeat: "no-repeat",
                                backgroundAttachment: "scroll",
                            }}
                        >
                            {/* Dark Overlay */}
                            <div className="absolute inset-0 bg-black/60 group-hover:bg-transparent transition-colors duration-500 z-10" />

                            {/* 
                                TITLE (COLLAPSED STATE)
                                Logic: Hide if Hovered (Desktop) OR if Expanded (Mobile)
                            */}
                            <div className={`
                                absolute inset-0 flex items-center justify-center pointer-events-none z-20 transition-opacity duration-300
                                ${isExpanded ? 'opacity-0' : 'opacity-100 group-hover:opacity-0'}
                            `}>
                                <h3 className="whitespace-nowrap text-xl md:text-2xl font-black tracking-widest text-white/80 uppercase rotate-0 md:-rotate-90">
                                    {product.name}
                                </h3>
                            </div>

                            {/* 
                                EXPANDED CONTENT
                                Logic: Show if Hovered (Desktop) OR if Expanded (Mobile)
                            */}
                            <div className={`
                                absolute inset-0 p-4 md:p-8 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none z-20
                                transition-opacity duration-500 delay-100
                                ${isExpanded ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}
                            `}>
                                <div className="w-full md:w-[20vw] text-left">
                                    <span className={`
                                        text-blue-500 font-bold tracking-widest uppercase text-[10px] md:text-xs mb-1 md:mb-2 block transition-transform duration-500
                                        ${isExpanded ? 'translate-y-0' : 'translate-y-4 group-hover:translate-y-0'}
                                    `}>
                                        Click for Details
                                    </span>
                                    <h4 className={`
                                        text-xl md:text-3xl font-black text-white mb-1 md:mb-2 transition-transform duration-500 delay-75
                                        ${isExpanded ? 'translate-y-0' : 'translate-y-4 group-hover:translate-y-0'}
                                    `}>
                                        {product.name}
                                    </h4>
                                    <p className={`
                                        text-white/80 text-sm md:text-base line-clamp-2 transition-transform duration-500 delay-100 mb-3 md:mb-6
                                        ${isExpanded ? 'translate-y-0' : 'translate-y-4 group-hover:translate-y-0'}
                                    `}>
                                        {product.shortDesc}
                                    </p>
                                    <button onClick={(e) => {
                                        e.stopPropagation(); // Prevent the click from bubbling up and closing the card
                                        setActiveProduct(product); // Open the modal
                                    }} className={`
                                        border border-blue-500 text-blue-500 font-bold tracking-widest uppercase text-[10px] md:text-xs px-4 py-1.5 md:px-6 md:py-2 hover:bg-blue-500 hover:text-white transition-colors duration-500 delay-150 pointer-events-auto
                                        ${isExpanded ? 'translate-y-0' : 'translate-y-4 group-hover:translate-y-0'}
                                    `}>
                                        View Solution
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* --- PRODUCT DETAIL MODAL --- */}
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
                            className="bg-[#0a0a0a] border border-white/10 rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative flex flex-col md:flex-row shadow-2xl shadow-blue-500/10"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setActiveProduct(null)}
                                className="absolute top-6 right-6 z-20 text-white/50 hover:text-white transition-colors"
                            >
                                <X size={24} />
                            </button>

                            {/* Modal Left: Visual */}
                            <div className="w-full md:w-1/3 bg-gradient-to-br from-blue-900/20 to-black relative overflow-hidden p-8 flex flex-col justify-between min-h-[200px] md:min-h-[300px]">
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
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-blue-500/10 mix-blend-multiply" />
                                </div>

                                <div className="relative z-10 mt-auto">
                                    <h2 className="text-3xl md:text-5xl font-black text-white mb-2 uppercase leading-none drop-shadow-lg">
                                        {activeProduct.name}
                                    </h2>
                                    <div className="h-1 w-20 bg-blue-500 mt-4 shadow-[0_0_15px_rgba(0,170,255,0.8)]" />
                                </div>
                            </div>

                            {/* Modal Right: Details */}
                            <div className="w-full md:w-2/3 p-6 md:p-12">
                                <h3 className="text-lg md:text-xl font-bold text-blue-500 mb-4 uppercase tracking-widest">
                                    Product Highlights
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mb-8 md:mb-10">
                                    {activeProduct.features.map((feature, i) => (
                                        <div key={i} className="flex items-start gap-3">
                                            <ShieldCheck size={18} className="text-blue-500 shrink-0 mt-1" />
                                            <span className="text-white/80 text-sm font-medium">{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                <h3 className="text-lg md:text-xl font-bold text-white mb-6 uppercase tracking-widest flex items-center gap-3">
                                    <Zap size={20} className="text-blue-500" />
                                    Technical Specs
                                </h3>
                                <div className="grid grid-cols-2 gap-4">
                                    {activeProduct.specs.map((spec, i) => (
                                        <div key={i} className="bg-white/5 rounded-xl p-3 md:p-4 border border-white/5">
                                            <p className="text-white/40 text-[10px] md:text-xs uppercase font-bold tracking-wider mb-1">{spec.label}</p>
                                            <p className="text-white font-bold text-sm md:text-lg">{spec.value}</p>
                                        </div>
                                    ))}
                                </div>

                                <div className="hidden mt-8 md:mt-10 pt-8 border-t border-white/10 flex justify-end">
                                    <Link
                                        href="/#contact"
                                        className="bg-blue-600 text-white px-8 py-3 rounded-lg font-black uppercase tracking-widest hover:bg-blue-500 transition-colors w-full md:w-auto text-center"
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
};

export default ProductShowcase;