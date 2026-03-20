import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ChevronRight, GraduationCap, BookOpen, Trophy, Palette, Users } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import heroImage1 from "@/assets/graduation 1.jpg";
import heroImage2 from "@/assets/graduation 2.jpg";
import heroImage3 from "@/assets/staff.jpg";

const slides = [
    {
        image: heroImage1,
        titleKey: "hero.excellence",
        subtitleKey: "hero.tradition",
    },
    {
        image: heroImage2,
        titleKey: "hero.innovation",
        subtitleKey: "hero.brightestMinds",
    },
    {
        image: heroImage3,
        titleKey: "hero.character",
        subtitleKey: "hero.futureLeaders",
    }
];

import sacredLogo from "@/assets/sacred-logo.png";

export function AmazingHero() {
    const { t } = useLanguage();
    const [currentSlide, setCurrentSlide] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollY } = useScroll();

    const y = useTransform(scrollY, [0, 500], [0, 200]);
    const opacityHero = useTransform(scrollY, [0, 400], [1, 0]);
    const scale = useTransform(scrollY, [0, 500], [1, 1.1]);

    const chapterNavItems = [
        { name: t("nav.academics"), icon: BookOpen, href: "#academics" },
        { name: t("nav.admissions"), icon: Users, href: "/admissions" },
        { name: t("nav.sports"), icon: Trophy, href: "#student-life" },
        { name: t("nav.arts"), icon: Palette, href: "/gallery" },
        { name: t("nav.alumni"), icon: GraduationCap, href: "/about" },
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 6000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section
            ref={containerRef}
            className="relative h-[110vh] -mt-20 overflow-hidden bg-black"
        >
            {/* Background Slideshow with Parallax */}
            <motion.div
                style={{ y, scale }}
                className="absolute inset-0 z-0"
            >
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentSlide}
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 2, ease: "easeInOut" }}
                        className="absolute inset-0"
                    >
                        <div
                            className="absolute inset-0 bg-cover bg-center"
                            style={{ backgroundImage: `url("${slides[currentSlide].image}")` }}
                        />
                        {/* Immersive overlays */}
                        <div className="absolute inset-0 bg-black/40 md:bg-black/30" />
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-black/20" />
                        <div className="absolute inset-0 bg-gradient-to-r from-background/40 via-transparent to-transparent hidden md:block" />
                    </motion.div>
                </AnimatePresence>
            </motion.div>

            {/* Main Hero Content */}
            <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 md:px-6 pt-20">
                <motion.div
                    style={{ opacity: opacityHero }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="max-w-6xl mx-auto flex flex-col items-center"
                >
                    {/* Floating Logo */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5, y: -20 }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            y: [0, -25, 0],
                            rotate: [-1, 1, -1]
                        }}
                        transition={{
                            opacity: { duration: 1.5, delay: 0.2 },
                            scale: { duration: 1.5, delay: 0.2 },
                            y: {
                                duration: 5,
                                repeat: Infinity,
                                ease: "easeInOut"
                            },
                            rotate: {
                                duration: 6,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }
                        }}
                        className="mb-10 relative"
                    >
                        <div className="absolute -inset-12 bg-white/20 blur-[100px] rounded-full opacity-40" />
                        <img
                            src={sacredLogo}
                            alt="School Logo"
                            className="h-40 md:h-56 w-auto relative z-10 drop-shadow-[0_0_50px_rgba(255,255,255,0.4)]"
                        />
                    </motion.div>
                    {/* Animated Eyebrow */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="flex items-center gap-2 mb-6"
                    >
                        <div className="w-8 h-[1px] bg-white/50" />
                        <span className="text-sm md:text-base font-bold tracking-[0.3em] text-white/90 uppercase drop-shadow-md">
                            {t("school.name")}
                        </span>
                        <div className="w-8 h-[1px] bg-white/50" />
                    </motion.div>

                    {/* Headline with Type Effect or staggered letters */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentSlide}
                            initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <h1 className="text-7xl md:text-9xl lg:text-[10rem] font-bold tracking-tighter mb-4 text-white drop-shadow-2xl leading-[0.8]">
                                {t(slides[currentSlide].titleKey)}
                            </h1>
                            <span className="block text-3xl md:text-5xl lg:text-6xl font-display font-medium text-white/80 drop-shadow-lg tracking-tight">
                                {t(slides[currentSlide].subtitleKey)}
                            </span>
                        </motion.div>
                    </AnimatePresence>

                    {/* Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1 }}
                        className="flex flex-col sm:flex-row gap-6 mt-12"
                    >
                        <a href="/admissions" className="group relative px-10 py-5 bg-primary text-primary-foreground rounded-full font-bold text-lg overflow-hidden transition-all hover:pr-12 active:scale-95 shadow-[0_0_40px_rgba(var(--primary),0.3)]">
                            <span className="relative z-10 flex items-center gap-2">
                                {t("hero.apply2026")} <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </span>
                            <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
                        </a>
                        <a href="#video-tour" className="px-10 py-5 bg-white/10 backdrop-blur-xl border border-white/20 text-white rounded-full font-bold text-lg hover:bg-white/20 transition-all flex items-center gap-2 group active:scale-95">
                            {t("hero.watchFilm")} <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors ml-2"><div className="w-0 h-0 border-t-[5px] border-t-transparent border-l-[8px] border-l-white border-b-[5px] border-b-transparent ml-1" /></div>
                        </a>
                    </motion.div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="absolute bottom-32 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50"
            >
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold">{t("common.discover")}</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-white/50 to-transparent relative overflow-hidden">
                    <motion.div
                        animate={{ y: [0, 48, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-0 left-0 w-full h-4 bg-white"
                    />
                </div>
            </motion.div>

            {/* Apple-style Chapter Navigation (Bottom Bar) */}
            <motion.div
                className="absolute bottom-0 left-0 right-0 z-20 bg-background/60 backdrop-blur-2xl border-t border-white/10"
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                transition={{ delay: 1.2, duration: 0.8 }}
            >
                <div className="container mx-auto px-4 overflow-x-auto no-scrollbar">
                    <div className="flex md:justify-center items-center py-8 gap-8 md:gap-20 min-w-max">
                        {chapterNavItems.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                className="flex flex-col items-center gap-3 text-muted-foreground hover:text-foreground transition-all group active:scale-90"
                            >
                                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 group-hover:bg-primary group-hover:border-primary group-hover:text-primary-foreground transition-all duration-300">
                                    <item.icon className="w-6 h-6 md:w-7 md:h-7" />
                                </div>
                                <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest">{item.name}</span>
                            </a>
                        ))}
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
