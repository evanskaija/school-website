import { motion } from "framer-motion";
import { Music, Trophy, Users, Heart, Camera, Languages, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import studentLifeImg from "@/assets/uploads/happy.jpg";

const activities = [
    { icon: Music, titleKey: "life.activities.music", descKey: "life.activities.music.desc" },
    { icon: Trophy, titleKey: "life.activities.sports", descKey: "life.activities.sports.desc" },
    { icon: Users, titleKey: "life.activities.debate", descKey: "life.activities.debate.desc" },
    { icon: Camera, titleKey: "life.activities.media", descKey: "life.activities.media.desc" },
    { icon: Languages, titleKey: "life.activities.languages", descKey: "life.activities.languages.desc" },
    { icon: Heart, titleKey: "life.activities.charity", descKey: "life.activities.charity.desc" },
];

export function StudentLifeSection() {
    const { t } = useLanguage();

    return (
        <section id="student-life" className="py-32 bg-neutral-950 text-white relative overflow-hidden">
            {/* Dynamic background elements */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 blur-[120px] rounded-full translate-x-1/2" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    <div className="lg:w-1/2">
                        <motion.span
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="text-secondary font-bold tracking-[0.3em] uppercase text-sm mb-4 block"
                        >
                            {t("life.badge")}
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-5xl md:text-7xl font-bold tracking-tight mb-8"
                        >
                            {t("life.title")}
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-xl text-white/60 leading-relaxed mb-10"
                        >
                            {t("life.desc")}
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="mb-12"
                        >
                            <Link
                                to="/student-life"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-2xl font-bold hover:shadow-xl hover:shadow-primary/20 hover:scale-105 transition-all group"
                            >
                                {t("nav.studentLife")}
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </motion.div>

                        <div className="grid grid-cols-2 gap-6">
                            {activities.map((item, idx) => (
                                <motion.div
                                    key={item.titleKey}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="p-6 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group"
                                >
                                    <item.icon className="w-8 h-8 text-primary mb-4 group-hover:scale-110 transition-transform" />
                                    <h4 className="font-bold text-lg mb-1">{t(item.titleKey)}</h4>
                                    <p className="text-white/40 text-sm">{t(item.descKey)}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="lg:w-1/2 relative"
                    >
                        <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl relative z-10 border border-white/10">
                            <img
                                src={studentLifeImg}
                                alt="Student Life"
                                className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        </div>
                        {/* Background floating card */}
                        <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-secondary rounded-[3rem] -rotate-6 -z-10 opacity-20 blur-2xl" />
                        <div className="absolute -top-10 -right-10 w-64 h-64 bg-primary rounded-[3rem] rotate-12 -z-10 opacity-20 blur-2xl" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
