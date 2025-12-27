import Link from "next/link";
import { Mail, Phone, MapPin, Instagram, Facebook, Youtube } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-elevated-bg border-t border-white/10 pt-20 pb-10">
            <div className="container mx-auto px-4 md:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
                    {/* BRAND */}
                    <div className="col-span-1 md:col-span-2 lg:col-span-1">
                        <Link href="/" className="flex items-center gap-2 mb-6">
                            <div className="w-8 h-8 bg-primary-blue rounded-md flex items-center justify-center font-bold text-white tracking-tighter neon-glow">
                                G
                            </div>
                            <span className="text-xl font-black tracking-tighter text-white font-montserrat">
                                GENTECH <span className="text-primary-blue">GUARD</span>
                            </span>
                        </Link>
                        <p className="text-text-grey text-sm font-medium leading-relaxed mb-8 max-w-xs">
                            Next-generation automotive protection solutions. We bridge the gap between
                            professional standards and real-world affordability.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 rounded-lg bg-dark-bg border border-white/10 flex items-center justify-center text-text-grey hover:text-primary-blue hover:border-primary-blue transition-all">
                                <Instagram size={20} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-lg bg-dark-bg border border-white/10 flex items-center justify-center text-text-grey hover:text-primary-blue hover:border-primary-blue transition-all">
                                <Facebook size={20} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-lg bg-dark-bg border border-white/10 flex items-center justify-center text-text-grey hover:text-primary-blue hover:border-primary-blue transition-all">
                                <Youtube size={20} />
                            </a>
                        </div>
                    </div>

                    {/* QUICK LINKS */}
                    <div>
                        <h4 className="text-white font-black tracking-widest uppercase mb-8 text-sm">Navigation</h4>
                        <ul className="flex flex-col gap-4">
                            {["Home", "Solutions", "Process", "Warranty", "Locations"].map((item) => (
                                <li key={item}>
                                    <Link href={`/${item.toLowerCase()}`} className="text-text-grey hover:text-primary-blue text-sm font-bold uppercase tracking-wider transition-colors">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* SERVICES */}
                    <div>
                        <h4 className="text-white font-black tracking-widest uppercase mb-8 text-sm">Solutions</h4>
                        <ul className="flex flex-col gap-4">
                            {["Gloss PPF", "Matte PPF", "Ceramic Coating", "Sun Film", "Interior Protection"].map((item) => (
                                <li key={item}>
                                    <Link href="#solutions" className="text-text-grey hover:text-white text-sm font-medium transition-colors">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* CONTACT */}
                    <div>
                        <h4 className="text-white font-black tracking-widest uppercase mb-8 text-sm">Get In Touch</h4>
                        <ul className="flex flex-col gap-6">
                            <li className="flex items-start gap-4">
                                <div className="text-primary-blue mt-1">
                                    <Phone size={18} />
                                </div>
                                <div>
                                    <p className="text-xs text-text-grey uppercase font-black tracking-tighter mb-1">Call Us</p>
                                    <p className="text-white font-bold text-sm">+91 911 222 3333</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-4">
                                <div className="text-primary-blue mt-1">
                                    <Mail size={18} />
                                </div>
                                <div>
                                    <p className="text-xs text-text-grey uppercase font-black tracking-tighter mb-1">Email</p>
                                    <p className="text-white font-bold text-sm">hello@gentechguard.com</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-4">
                                <div className="text-primary-blue mt-1">
                                    <MapPin size={18} />
                                </div>
                                <div>
                                    <p className="text-xs text-text-grey uppercase font-black tracking-tighter mb-1">Main Studio</p>
                                    <p className="text-white font-bold text-sm">New Delhi, India</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-text-grey text-xs font-bold uppercase tracking-widest">
                        © 2025 <span className="text-white">Gentech Guard®</span>. All Rights Reserved.
                    </p>
                    <div className="flex gap-8">
                        <Link href="/privacy" className="text-text-grey hover:text-white text-xs font-bold uppercase tracking-widest">Privacy Policy</Link>
                        <Link href="/terms" className="text-text-grey hover:text-white text-xs font-bold uppercase tracking-widest">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
