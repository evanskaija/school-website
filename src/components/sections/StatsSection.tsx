import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Users, GraduationCap, Trophy, BookOpen } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const stats = [
    { labelKey: "stats.students", value: 1200, icon: Users, suffix: "+" },
    { labelKey: "stats.faculty", value: 60, icon: BookOpen, suffix: "+" },
    { labelKey: "stats.success", value: 98, icon: GraduationCap, suffix: "%" },
    { labelKey: "stats.years", value: 15, icon: Trophy, suffix: "+" },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (isInView) {
            let start = 0;
            const duration = 2000;
            const increment = value / (duration / 16);
            const timer = setInterval(() => {
                start += increment;
                if (start >= value) {
                    setCount(value);
                    clearInterval(timer);
                } else {
                    setCount(Math.floor(start));
                }
            }, 16);
            return () => clearInterval(timer);
        }
    }, [isInView, value]);

    return (
        <span ref={ref}>
            {count}
            {suffix}
        </span>
    );
}

export function StatsSection() {
    const { t } = useLanguage();

    return (
        <section className="py-12 container mx-auto px-6 overflow-hidden">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-primary rounded-[3rem] p-12 md:p-20 relative overflow-hidden shadow-2xl"
            >
                {/* Background patterns */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_white,_transparent)] scale-150" />
                </div>

                <div className="relative z-10">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 max-w-5xl mx-auto text-primary-foreground">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={stat.labelKey}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="flex flex-col items-center text-center group"
                            >
                                <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mb-6 backdrop-blur-md group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                                    <stat.icon className="w-8 h-8" />
                                </div>
                                <div className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-2 font-display">
                                    <Counter value={stat.value} suffix={stat.suffix} />
                                </div>
                                <div className="text-primary-foreground/70 font-medium uppercase tracking-widest text-sm">
                                    {t(stat.labelKey)}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
