"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Flame, Zap, Droplets } from "lucide-react";

const features = [
    {
        title: "Self-Healing Tech",
        description: "Our Aliphatic TPU heals light scratches and swirl marks automatically with ambient heat or warm water.",
        icon: Flame,
        color: "from-blue-500 to-cyan-400",
    },
    {
        title: "Anti-Yellowing",
        description: "Advanced UV resistance ensures your car maintains its original brilliance without oxidation or staining.",
        icon: ShieldCheck,
        color: "from-blue-600 to-indigo-500",
    },
    {
        title: "Hyper-Gloss Finish",
        description: "Experience a deep, mirror-like shine that enhances your vehicle's paint depth and clarity.",
        icon: Zap,
        color: "from-cyan-500 to-blue-400",
    },
    {
        title: "Hydrophobic Armor",
        description: "Repels water, dirt, and grime, making car washes effortless and keeping your car cleaner for longer.",
        icon: Droplets,
        color: "from-indigo-600 to-blue-500",
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function WhySection() {
    return (
        <section id="about" className="py-24 bg-dark-bg relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-blue/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-4 md:px-8 relative z-10">
                <div className="text-center mb-16">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-primary-blue font-black tracking-[0.2em] uppercase text-sm mb-4 inline-block"
                    >
                        Why Gentech Guard?
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl md:text-5xl font-black text-white"
                    >
                        THE ULTIMATE <span className="blue-text italic text-4xl md:text-6xl">SHIELD</span> FOR YOUR CAR
                    </motion.h2>
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            whileHover={{ y: -10 }}
                            className="glass p-8 rounded-3xl border border-white/5 hover:border-primary-blue/30 transition-colors group relative overflow-hidden"
                        >
                            {/* Card Gradient Overlay */}
                            <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 blur-3xl transition-opacity`} />

                            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                <feature.icon className="text-white" size={28} />
                            </div>

                            <h3 className="text-xl font-black text-white mb-4 tracking-tight">
                                {feature.title}
                            </h3>
                            <p className="text-text-grey text-sm leading-relaxed font-medium">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
