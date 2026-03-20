import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

export function CallToAction() {
    const { t } = useLanguage();

    const containerVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.8,
                ease: "easeOut" as const,
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <section className="py-24 container mx-auto px-6 overflow-hidden">
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={containerVariants}
                className="relative rounded-[3rem] overflow-hidden bg-primary shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
            >
                {/* Background Patterns */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-black/20" />
                    <div className="absolute inset-0 opacity-10"
                        style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}>
                    </div>
                    {/* Animated Glow */}
                    <motion.div
                        animate={{
                            opacity: [0.3, 0.5, 0.3],
                            scale: [1, 1.1, 1],
                        }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                        className="absolute -top-1/2 -left-1/4 w-full h-full bg-white/10 blur-[120px] rounded-full"
                    />
                </div>

                <div className="relative z-10 px-8 py-16 md:px-16 md:py-24 text-white">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-12 max-w-6xl mx-auto">

                        <div className="lg:w-3/5">
                            <motion.h2 variants={itemVariants} className="text-4xl md:text-6xl font-bold tracking-tight mb-8 leading-[1.1]">
                                {t("cta.title")}
                            </motion.h2>
                            <motion.p variants={itemVariants} className="text-xl md:text-2xl text-white/90 mb-10 leading-relaxed max-w-2xl">
                                {t("cta.desc")}
                            </motion.p>

                            <motion.ul variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                                {['cta.feature1', 'cta.feature2', 'cta.feature3'].map((key) => (
                                    <li key={key} className="flex items-center gap-3 font-medium text-lg">
                                        <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-white flex-shrink-0">
                                            <CheckCircle2 className="w-4 h-4" />
                                        </div>
                                        {t(key)}
                                    </li>
                                ))}
                            </motion.ul>
                        </div>

                        <motion.div
                            variants={itemVariants}
                            className="w-full lg:w-auto"
                        >
                            <div className="bg-white/10 backdrop-blur-xl p-8 md:p-12 rounded-[2.5rem] border border-white/20 shadow-2xl relative group overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <div className="relative z-10">
                                    <h3 className="text-2xl md:text-3xl font-bold mb-4">{t("cta.start")}</h3>
                                    <p className="text-white/70 mb-8 max-w-xs">
                                        {t("cta.step")}
                                    </p>

                                    <div className="space-y-4">
                                        <Button size="lg" className="w-full bg-white text-primary hover:bg-neutral-100 text-lg h-14 rounded-2xl font-bold shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]" asChild>
                                            <a href="/admissions">{t("cta.apply")}</a>
                                        </Button>
                                        <Button size="lg" variant="outline" className="w-full border-white/30 text-white hover:bg-white/10 text-lg h-14 rounded-2xl transition-all duration-300" asChild>
                                            <a href="/contact" className="flex items-center justify-center gap-2">
                                                {t("cta.visit")} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                            </a>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                    </div>
                </div>
            </motion.div>
        </section>
    );
}
