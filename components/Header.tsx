"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const navLinks = [
    //  { name: "Home", href: "/" },
    { name: "About Us", href: "/#about" },
    { name: "Solutions", href: "/#solutions" },
    { name: "E-Warranty", href: "/warranty" },
    { name: "Contact Us", href: "/#contact" },
    { name: "Become a Dealer", href: "/dealer" },
];

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? "glass py-3" : "bg-transparent py-5"
                }`}
        >
            <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-3 relative z-50 group">
                    <div className="w-10 h-10 md:w-12 md:h-12 relative">
                        <Image
                            src="/assets/logo-final.png"
                            alt="Gentech Guard"
                            fill
                            className="object-contain"
                        />
                    </div>
                    <span className="text-xl font-black tracking-tighter text-white font-montserrat hidden group-hover:text-primary-blue transition-colors">
                        GENTECH <span className="text-primary-blue">GUARD</span>
                    </span>
                </Link>

                {/* DESKTOP NAV */}
                <nav className="hidden lg:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-sm font-bold uppercase tracking-widest text-text-grey hover:text-primary-blue transition-colors"
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Link
                        href="/#contact"
                        className="bg-primary-blue hover:bg-white hover:text-dark-bg text-white px-6 py-2 rounded-full text-sm font-black transition-all neon-glow uppercase tracking-wider"
                    >
                        Become a Dealer
                    </Link>
                </nav>

                {/* MOBILE TOGGLE */}
                <button
                    className="lg:hidden text-white p-2"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* MOBILE MENU */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="lg:hidden bg-dark-bg border-b border-white/10 overflow-hidden"
                    >
                        <div className="flex flex-col p-6 gap-6">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="text-lg font-bold uppercase tracking-widest text-text-grey hover:text-primary-blue flex items-center justify-between group"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.name}
                                    <ChevronRight size={20} className="text-primary-blue group-hover:translate-x-1 transition-transform" />
                                </Link>
                            ))}
                            <Link
                                href="/#contact"
                                className="bg-primary-blue text-white px-6 py-3 rounded-lg text-center font-black uppercase tracking-wider neon-glow"
                                onClick={() => setIsOpen(false)}
                            >
                                Become a Dealer
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
