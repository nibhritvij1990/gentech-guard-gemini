"use client";

import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";

const plans = [
    {
        name: "Gentech Standard",
        subtitle: "Value Protection",
        warranty: "5 Year Warranty",
        features: [
            "Aliphatic TPU Base",
            "Self-Healing Technology",
            "High Gloss Finish",
            "UV Protection",
            "Hydrophobic Coating",
        ],
        highlight: false,
    },
    {
        name: "Gentech Pro",
        subtitle: "Premium Armor",
        warranty: "7 Year Warranty",
        features: [
            "Enhanced Aliphatic TPU",
            "Advanced Self-Healing",
            "Deep-Mirror Gloss",
            "Superior UV/Heat Resistance",
            "Super-Hydrophobic Tech",
            "Edge Seal Compatibility",
        ],
        highlight: true,
    },
    {
        name: "Gentech Matte",
        subtitle: "Stealth Luxury",
        warranty: "7 Year Warranty",
        features: [
            "Premium Matte Finish",
            "Self-Healing Technology",
            "Zero-Glare Aesthetics",
            "Anti-Staining Surface",
            "Invisible Impact Shield",
        ],
        highlight: false,
    },
];

export default function SolutionsSection() {
    return (
        <section id="solutions" className="py-24 bg-dark-bg/50 border-y border-white/5 relative">
            <div className="container mx-auto px-4 md:px-8">
                <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
                    <div className="max-w-2xl">
                        <motion.span
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="text-primary-blue font-black tracking-[0.2em] uppercase text-sm mb-4 inline-block"
                        >
                            Our Solutions
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-3xl md:text-5xl font-black text-white"
                        >
                            TAILORED PROTECTION FOR <br />
                            <span className="blue-text italic text-4xl md:text-6xl">EVERY DRIVER</span>
                        </motion.h2>
                    </div>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-text-grey max-w-sm mb-2 font-medium"
                    >
                        Whether you want a daily-driver shield or a car-show level finish, we have the perfect film for your vehicle.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={plan.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className={`p-1 rounded-[2rem] relative group ${plan.highlight ? "bg-gradient-to-b from-primary-blue to-transparent" : "bg-white/5 hover:bg-white/10"
                                } transition-colors`}
                        >
                            <div className="bg-dark-bg h-full rounded-[1.9rem] p-8 flex flex-col items-start relative overflow-hidden">
                                {plan.highlight && (
                                    <div className="absolute top-0 right-0 bg-primary-blue text-white py-1 px-4 rounded-bl-xl text-[10px] font-black uppercase tracking-widest neon-glow">
                                        MOST POPULAR
                                    </div>
                                )}

                                <h3 className="text-2xl font-black text-white mb-1">{plan.name}</h3>
                                <p className="text-primary-blue text-sm font-black uppercase tracking-widest mb-6">
                                    {plan.subtitle}
                                </p>

                                <div className="mb-8 p-3 rounded-xl bg-white/5 border border-white/10 w-full text-center">
                                    <span className="text-white font-black text-xl italic">{plan.warranty}</span>
                                </div>

                                <ul className="space-y-4 mb-10 flex-grow">
                                    {plan.features.map((feature) => (
                                        <li key={feature} className="flex items-center gap-3 text-sm text-text-grey font-medium">
                                            <div className="w-5 h-5 rounded-full bg-primary-blue/10 flex items-center justify-center border border-primary-blue/20">
                                                <Check size={12} className="text-primary-blue" />
                                            </div>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                <button className={`w-full py-4 rounded-xl font-black text-sm uppercase tracking-widest transition-all flex items-center justify-center gap-2 group/btn ${plan.highlight ? "bg-primary-blue text-white neon-glow" : "border border-white/20 text-white hover:border-primary-blue hover:text-primary-blue"
                                    }`}>
                                    Configure Armor
                                    <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
