import { motion } from "framer-motion";
import { ShieldCheck, Target, Sparkles, Zap, Heart, Award } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const reasons = [
    {
        icon: ShieldCheck,
        titleKey: "why.safe.title",
        descKey: "why.safe.desc",
        color: "text-blue-500",
        bg: "bg-blue-500/10"
    },
    {
        icon: Target,
        titleKey: "why.academic.title",
        descKey: "why.academic.desc",
        color: "text-rose-500",
        bg: "bg-rose-500/10"
    },
    {
        icon: Award,
        titleKey: "why.character.title",
        descKey: "why.character.desc",
        color: "text-amber-500",
        bg: "bg-amber-500/10"
    },
    {
        icon: Sparkles,
        titleKey: "why.holistic.title",
        descKey: "why.holistic.desc",
        color: "text-emerald-500",
        bg: "bg-emerald-500/10"
    },
    {
        icon: Zap,
        titleKey: "why.facilities.title",
        descKey: "why.facilities.desc",
        color: "text-indigo-500",
        bg: "bg-indigo-500/10"
    },
    {
        icon: Heart,
        titleKey: "why.mentorship.title",
        descKey: "why.mentorship.desc",
        color: "text-violet-500",
        bg: "bg-violet-500/10"
    }
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1] as [number, number, number, number]
        }
    }
};

export function WhyChooseUs() {
    const { t } = useLanguage();

    return (
        <section className="py-32 bg-background relative overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
                    <div className="max-w-2xl">
                        <motion.span
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="text-primary font-bold tracking-[0.2em] uppercase text-sm mb-4 block"
                        >
                            {t("why.badge")}
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="text-5xl md:text-7xl font-bold tracking-tight"
                        >
                            {t("why.title")}
                        </motion.h2>
                    </div>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="text-xl text-muted-foreground max-w-sm"
                    >
                        {t("why.desc")}
                    </motion.p>
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {reasons.map((reason) => (
                        <motion.div
                            key={reason.titleKey}
                            variants={itemVariants}
                            className="group p-10 rounded-[3rem] bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/20 hover:bg-card hover:shadow-2xl transition-all duration-500 cursor-default"
                        >
                            <div className={`w-16 h-16 rounded-2xl ${reason.bg} flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}>
                                <reason.icon className={`w-8 h-8 ${reason.color} group-hover:scale-110 transition-transform`} />
                            </div>
                            <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors duration-300">{t(reason.titleKey)}</h3>
                            <p className="text-muted-foreground leading-relaxed text-lg group-hover:text-foreground/90 transition-colors duration-300">
                                {t(reason.descKey)}
                            </p>
                            <div className="mt-8 overflow-hidden">
                                <motion.div
                                    initial={{ x: "-100%" }}
                                    whileHover={{ x: "0%" }}
                                    className="h-1 w-20 bg-primary/40 rounded-full"
                                />
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
