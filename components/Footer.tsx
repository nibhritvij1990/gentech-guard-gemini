"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Instagram, Facebook, Youtube, ArrowUpRight, Zap } from "lucide-react";

const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Solutions", href: "/#solutions" },
    { name: "Process", href: "/#process" },
    { name: "E-Warranty", href: "/warranty" },
    { name: "Contact", href: "/#contact" }
];

const products = [
    "Gloss PPF",
    "Matte PPF",
    "Sun Film"
];

export default function Footer() {
    return (
        <footer className="relative bg-[#030303] overflow-hidden">
            {/* Top Accent Line */}
            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-primary-blue/50 to-transparent" />

            {/* Decorative Background */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary-blue/5 rounded-full blur-[150px] pointer-events-none" />

            {/* CTA Section */}
            <div className="container mx-auto px-4 md:px-8 pt-24 pb-16 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-6">
                        Ready to <span className="text-primary-blue">Protect</span>?
                    </h2>
                    <p className="text-text-grey text-lg font-medium max-w-xl mx-auto mb-10">
                        Join India's fastest growing network of certified automotive protection specialists.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="/#contact"
                            className="group inline-flex items-center gap-3 px-8 py-4 bg-primary-blue text-white font-black uppercase tracking-widest rounded-full hover:bg-white hover:text-dark-bg transition-all duration-300 shadow-[0_0_30px_rgba(0,170,255,0.3)]"
                        >
                            Become a Dealer
                            <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </Link>
                        <Link
                            href="/warranty"
                            className="inline-flex items-center gap-3 px-8 py-4 border border-white/20 text-white font-black uppercase tracking-widest rounded-full hover:border-primary-blue hover:text-primary-blue transition-all duration-300"
                        >
                            Check Warranty
                        </Link>
                    </div>
                </motion.div>

                {/* Main Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 py-16 border-y border-white/5">
                    {/* Brand Column */}
                    <div className="lg:col-span-4">
                        <Link href="/" className="inline-block mb-8">
                            <div className="w-48 h-12 relative">
                                <Image
                                    src="/assets/logo-final-wide.png"
                                    alt="Gentech Guard"
                                    fill
                                    className="object-contain object-left"
                                />
                            </div>
                        </Link>
                        <p className="text-text-grey text-sm font-medium leading-relaxed mb-8 max-w-sm">
                            Next-generation automotive protection solutions backed by industry expertise and advanced Aliphatic TPU technology.
                        </p>

                        {/* Social Icons */}
                        <div className="flex gap-3">
                            {[
                                { icon: Instagram, label: "Instagram" },
                                { icon: Facebook, label: "Facebook" },
                                { icon: Youtube, label: "YouTube" }
                            ].map(({ icon: Icon, label }) => (
                                <a
                                    key={label}
                                    href="#"
                                    aria-label={label}
                                    className="group w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-text-grey hover:text-white hover:border-primary-blue hover:bg-primary-blue/10 transition-all duration-300"
                                >
                                    <Icon size={18} className="group-hover:scale-110 transition-transform" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Navigation */}
                    <div className="lg:col-span-2">
                        <h4 className="text-[11px] font-black text-primary-blue tracking-[0.3em] uppercase mb-6">Navigation</h4>
                        <ul className="flex flex-col gap-3">
                            {navLinks.map((item) => (
                                <li key={item.name}>
                                    <Link
                                        href={item.href}
                                        className="group flex items-center gap-2 text-text-grey hover:text-white text-sm font-bold uppercase tracking-wider transition-colors"
                                    >
                                        <span className="w-0 h-[2px] bg-primary-blue group-hover:w-3 transition-all duration-300" />
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Products */}
                    <div className="lg:col-span-2">
                        <h4 className="text-[11px] font-black text-primary-blue tracking-[0.3em] uppercase mb-6">Products</h4>
                        <ul className="flex flex-col gap-3">
                            {products.map((item) => (
                                <li key={item}>
                                    <Link
                                        href="/#solutions"
                                        className="group flex items-center gap-2 text-text-grey hover:text-white text-sm font-bold uppercase tracking-wider transition-colors"
                                    >
                                        <span className="w-0 h-[2px] bg-primary-blue group-hover:w-3 transition-all duration-300" />
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="lg:col-span-4">
                        <h4 className="text-[11px] font-black text-primary-blue tracking-[0.3em] uppercase mb-6">Get In Touch</h4>
                        <ul className="flex flex-col gap-5">
                            <li className="group flex items-start gap-4">
                                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-primary-blue group-hover:border-primary-blue/50 transition-colors shrink-0">
                                    <Phone size={18} />
                                </div>
                                <div>
                                    <p className="text-[10px] text-text-grey uppercase font-black tracking-widest mb-1">Call Us</p>
                                    <p className="text-white font-bold text-sm">+91 911 222 3333</p>
                                </div>
                            </li>
                            <li className="group flex items-start gap-4">
                                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-primary-blue group-hover:border-primary-blue/50 transition-colors shrink-0">
                                    <Mail size={18} />
                                </div>
                                <div>
                                    <p className="text-[10px] text-text-grey uppercase font-black tracking-widest mb-1">Email</p>
                                    <p className="text-white font-bold text-sm">hello@gentechguard.com</p>
                                </div>
                            </li>
                            <li className="group flex items-start gap-4">
                                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-primary-blue group-hover:border-primary-blue/50 transition-colors shrink-0">
                                    <MapPin size={18} />
                                </div>
                                <div>
                                    <p className="text-[10px] text-text-grey uppercase font-black tracking-widest mb-1">Headquarters</p>
                                    <p className="text-white font-bold text-sm">New Delhi, India</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-text-grey/60 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                        <Zap size={12} className="text-primary-blue" />
                        © 2025 <span className="text-white/80">Gentech Guard®</span>. All Rights Reserved.
                    </p>
                    <div className="flex gap-8">
                        <span className="text-text-grey/40 text-xs font-bold uppercase tracking-widest cursor-default">Privacy Policy</span>
                        <span className="text-text-grey/40 text-xs font-bold uppercase tracking-widest cursor-default">Terms of Service</span>
                    </div>
                </div>
            </div>

            {/* Giant Background Text */}
            <div className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none select-none">
                <div className="text-[20vw] font-black text-white/[0.015] uppercase tracking-tighter leading-none whitespace-nowrap translate-y-1/3">
                    GENTECH GUARD
                </div>
            </div>
        </footer>
    );
}
