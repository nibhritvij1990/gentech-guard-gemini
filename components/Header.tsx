"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { usePathname } from "next/navigation";

const navLinks = [
    { name: "About Us", href: "/about" },
    { name: "Solutions", href: "/#solutions" },
    { name: "Process", href: "/#process" },
    { name: "E-Warranty", href: "/warranty" },
    { name: "Contact Us", href: "/#contact" },
];

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();
    const isAboutPage = pathname === "/about";

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 120);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? "glass py-3" : "bg-transparent py-5"
                }`}
            style={{
                background: "linear-gradient(to right, #000, #111111b3 50%)",
            }}
        >
            <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
                <Link href="/" className="relative z-50">
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{
                            opacity: isAboutPage || scrolled ? 1 : 0,
                            x: isAboutPage || scrolled ? 0 : -10
                        }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="w-40 md:w-48 h-10 md:h-12 relative"
                    >
                        <Image
                            src="/assets/logo-final-wide.png"
                            alt="Gentech Guard"
                            fill
                            className="object-contain"
                            priority
                        />
                    </motion.div>
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
