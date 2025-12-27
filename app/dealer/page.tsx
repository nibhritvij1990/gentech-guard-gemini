"use client";

import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import { Handshake, TrendingUp, ShieldCheck, Globe } from "lucide-react";

const benefits = [
    {
        title: "India's Fastest Growing Brand",
        desc: "Join a network that's disrupting the automotive protection market with superior technology and aggressive branding.",
        icon: TrendingUp,
    },
    {
        title: "International Grade TPU",
        desc: "Supply your customers with world-class Aliphatic TPU films that offer industry-leading self-healing and gloss.",
        icon: ShieldCheck,
    },
    {
        title: "Exclusive Territories",
        desc: "We prioritize our partners by offering territory protection to ensure your business grows without internal competition.",
        icon: Globe,
    },
    {
        title: "Marketing Support",
        desc: "From digital leads to physical branding materials, we provide everything you need to dominate your local market.",
        icon: Handshake,
    },
];

export default function DealerPage() {
    return (
        <main className="min-h-screen bg-dark-bg text-white selection:bg-primary-blue selection:text-white">
            <Header />

            {/* Hero Section */}
            <section className="pt-32 pb-24 bg-gradient-to-b from-primary-blue/10 to-transparent relative overflow-hidden">
                {/* Background Decorative Element */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-blue/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />

                <div className="container mx-auto px-4 md:px-8 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-primary-blue font-black tracking-[0.3em] uppercase text-xs mb-4 inline-block border border-primary-blue/30 px-4 py-1 rounded-full bg-primary-blue/5">
                            Partnership Program
                        </span>
                        <h1 className="text-4xl md:text-7xl font-black mb-8 leading-tight">
                            GROW YOUR BUSINESS <br />
                            <span className="blue-text italic text-5xl md:text-8xl">WITH GENTECH</span>
                        </h1>
                        <p className="text-text-grey max-w-3xl mx-auto text-lg md:text-xl font-medium leading-relaxed">
                            Become an authorized Gentech Guard® installation partner. Access world-class premium protection films and a steady stream of high-intent leads.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Benefits Grid */}
            <section className="py-24 border-y border-white/5 bg-white/[0.02]">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {benefits.map((benefit, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="p-8 rounded-[2rem] bg-dark-bg border border-white/10 hover:border-primary-blue/50 transition-all group"
                            >
                                <div className="w-14 h-14 rounded-2xl bg-primary-blue/10 flex items-center justify-center text-primary-blue mb-6 group-hover:bg-primary-blue group-hover:text-white transition-all shadow-lg group-hover:neon-glow">
                                    <benefit.icon size={28} />
                                </div>
                                <h3 className="text-xl font-black text-white mb-4 uppercase tracking-tighter">
                                    {benefit.title}
                                </h3>
                                <p className="text-sm text-text-grey leading-relaxed font-medium">
                                    {benefit.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Focused Contact Section */}
            <div className="py-12">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-5xl font-black text-white uppercase italic">Apply For <span className="blue-text">Dealership</span></h2>
                        <p className="text-text-grey mt-4 font-medium uppercase tracking-widest text-xs">Our team will evaluate your application and reach out within 48 hours</p>
                    </div>
                    {/* We can pass an initial form type to ContactForm if we prop-drilled it, 
                but for now we'll just let users toggle or default it */}
                    <ContactForm />
                </div>
            </div>

            <Footer />
        </main>
    );
}
