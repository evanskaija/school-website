import { motion } from "framer-motion";
import directorImage from "@/assets/schol director.jpg";
import { useLanguage } from "@/contexts/LanguageContext";

export function DirectorMessage() {
    const { t } = useLanguage();

    return (
        <section className="py-32 bg-background relative overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative w-full max-w-md lg:w-1/3 flex-shrink-0"
                    >
                        <div className="aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl relative">
                            <img
                                src={directorImage}
                                alt="School Director"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            <div className="absolute bottom-6 left-6 text-white">
                                <p className="font-medium text-lg">Mr. Director Name</p>
                                <p className="text-white/80 text-sm">{t("life.directorRole")}</p>
                            </div>
                        </div>
                        {/* Decorative refined element */}
                        <div className="absolute -z-10 top-12 -right-12 w-full h-full border border-primary/20 rounded-[2rem]" />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="lg:w-2/3"
                    >
                        <h2 className="text-sm font-semibold tracking-widest text-primary uppercase mb-6">
                            {t("life.leadershipPerspective")}
                        </h2>
                        <blockquote className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-foreground mb-8">
                            "{t("life.directorQuote")}"
                        </blockquote>
                        <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
                            {t("life.directorDesc")}
                        </p>

                        <div className="mt-10">
                            <img src="/signature.png" alt="Signature" className="h-12 opacity-50" onError={(e) => e.currentTarget.style.display = 'none'} />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
