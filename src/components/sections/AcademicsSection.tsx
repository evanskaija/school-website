import { motion } from "framer-motion";
import { BookOpen, Award, FlaskConical, Globe, Palette, Calculator, Zap, Users, GraduationCap, Trophy, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const subjects = [
    { nameKey: "subject.sciences", icon: FlaskConical, color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { nameKey: "subject.maths", icon: Calculator, color: "text-blue-500", bg: "bg-blue-500/10" },
    { nameKey: "subject.languages", icon: Globe, color: "text-amber-500", bg: "bg-amber-500/10" },
    { nameKey: "subject.arts", icon: Palette, color: "text-rose-500", bg: "bg-rose-500/10" },
    { nameKey: "subject.social", icon: BookOpen, color: "text-indigo-500", bg: "bg-indigo-500/10" },
    { nameKey: "subject.ict", icon: Zap, color: "text-violet-500", bg: "bg-violet-500/10" },
];

export function AcademicsSection() {
    const { t } = useLanguage();

    return (
        <section id="academics" className="py-32 bg-background relative overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto text-center mb-20">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-primary font-bold tracking-[0.3em] uppercase text-sm mb-4 block"
                    >
                        {t("academics.badge")}
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-5xl md:text-7xl font-bold tracking-tight mb-8"
                    >
                        {t("academics.title")}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-muted-foreground leading-relaxed"
                    >
                        {t("academics.desc")}
                    </motion.p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 mb-20">
                    {/* Nursery */}
                    <motion.div
                        whileHover={{ y: -10 }}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="p-8 rounded-[2.5rem] bg-card border shadow-lg transition-all h-full flex flex-col group/card"
                    >
                        <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6 group-hover/card:scale-110 transition-transform">
                            <Palette className="w-8 h-8 text-emerald-500" />
                        </div>
                        <h3 className="text-2xl font-bold mb-4">{t("academics.nursery")}</h3>
                        <p className="text-muted-foreground mb-6 flex-grow">
                            {t("academics.nursery.desc")}
                        </p>
                        <div className="space-y-4">
                            <div className="flex flex-wrap gap-2">
                                <span className="px-3 py-1 rounded-full bg-emerald-500/5 text-emerald-600 text-xs font-bold">{t("tags.ages35")}</span>
                                <span className="px-3 py-1 rounded-full bg-emerald-500/5 text-emerald-600 text-xs font-bold">{t("tags.creativePlay")}</span>
                            </div>
                            <Link to="/nursery" className="text-emerald-600 font-bold text-sm h-10 px-6 rounded-xl border border-emerald-500/20 hover:bg-emerald-500 hover:text-white transition-all uppercase tracking-wider flex items-center gap-2 group/btn">
                                {t("academics.readMore")}
                                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </motion.div>

                    {/* Primary */}
                    <motion.div
                        whileHover={{ y: -10 }}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="p-8 rounded-[2.5rem] bg-primary text-white shadow-2xl transition-all h-full flex flex-col relative overflow-hidden group/card"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2 group-hover/card:scale-150 transition-transform duration-700" />
                        <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center mb-6 group-hover/card:scale-110 transition-transform">
                            <Globe className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold mb-4">{t("academics.primary")}</h3>
                        <p className="text-white/80 mb-6 flex-grow">
                            {t("academics.primary.desc")}
                        </p>
                        <div className="space-y-4">
                            <div className="flex flex-wrap gap-2">
                                <span className="px-3 py-1 rounded-full bg-white/10 text-white text-xs font-bold">{t("tags.ages612")}</span>
                                <span className="px-3 py-1 rounded-full bg-white/10 text-white text-xs font-bold">{t("tags.foundation")}</span>
                            </div>
                            <Link to="/primary" className="bg-white text-primary font-bold text-sm h-10 px-6 rounded-xl hover:bg-white/90 transition-all uppercase tracking-wider flex items-center gap-2 group/btn">
                                {t("academics.readMore")}
                                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </motion.div>

                    {/* Secondary */}
                    <motion.div
                        whileHover={{ y: -10 }}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="p-8 rounded-[2.5rem] bg-card border shadow-lg transition-all h-full flex flex-col group/card"
                    >
                        <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6 group-hover/card:scale-110 transition-transform">
                            <Award className="w-8 h-8 text-blue-500" />
                        </div>
                        <h3 className="text-2xl font-bold mb-4">{t("academics.secondary")}</h3>
                        <p className="text-muted-foreground mb-6 flex-grow">
                            {t("academics.secondary.desc")}
                        </p>
                        <div className="space-y-4">
                            <div className="flex flex-wrap gap-2">
                                <span className="px-3 py-1 rounded-full bg-blue-500/5 text-blue-600 text-xs font-bold">{t("tags.ages1317")}</span>
                                <span className="px-3 py-1 rounded-full bg-blue-500/5 text-blue-600 text-xs font-bold">{t("tags.leadership")}</span>
                            </div>
                            <Link to="/academics" className="text-blue-600 font-bold text-sm h-10 px-6 rounded-xl border border-blue-500/20 hover:bg-blue-500 hover:text-white transition-all uppercase tracking-wider flex items-center gap-2 group/btn">
                                {t("academics.readMore")}
                                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </motion.div>
                </div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: { staggerChildren: 0.1 }
                        }
                    }}
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
                >
                    {subjects.map((subject) => (
                        <motion.div
                            key={subject.nameKey}
                            variants={{
                                hidden: { opacity: 0, scale: 0.9, y: 20 },
                                visible: { opacity: 1, scale: 1, y: 0 }
                            }}
                            whileHover={{ y: -5, backgroundColor: "hsl(var(--card))", borderColor: "hsl(var(--primary) / 0.2)" }}
                            className="p-6 rounded-3xl bg-muted/30 border border-transparent transition-all duration-300 shadow-sm hover:shadow-xl group flex flex-col items-center text-center"
                        >
                            <div className={`w-12 h-12 rounded-xl ${subject.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                <subject.icon className={`w-6 h-6 ${subject.color}`} />
                            </div>
                            <h4 className="font-bold text-sm">{t(subject.nameKey)}</h4>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
