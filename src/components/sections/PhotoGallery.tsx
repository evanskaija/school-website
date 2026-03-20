import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Camera, ExternalLink } from "lucide-react";
import evansImg from "@/assets/uploads/Evans kai.jpg";
import gorrethImg from "@/assets/uploads/Gorreth muochi.jpg";
import happyImg from "@/assets/uploads/Happy france.jpg";
import tamalaImg from "@/assets/uploads/Tamala nguzu.webp";
import yuniaImg from "@/assets/uploads/Yunia faraja.jpg";
import fredrickImg from "@/assets/uploads/fredrick.png";

export function PhotoGallery() {
    const { t } = useLanguage();

    const photos = [
        { title: "Evans Kai", category: t("category.studentLife"), image: evansImg, span: "md:col-span-2 md:row-span-2" },
        { title: "Gorreth Muochi", category: t("category.academic"), image: gorrethImg, span: "col-span-1" },
        { title: "Happy France", category: t("category.events"), image: happyImg, span: "col-span-1" },
        { title: "Tamala Nguzu", category: t("category.leadership"), image: tamalaImg, span: "md:col-span-2" },
        { title: "Yunia Faraja", category: t("category.arts"), image: yuniaImg, span: "col-span-1" },
        { title: "Fredrick", category: t("category.athletics"), image: fredrickImg, span: "col-span-1" },
    ];

    return (
        <section id="gallery" className="py-32 bg-background relative overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
                    <div className="max-w-2xl">
                        <motion.span
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="text-primary font-bold tracking-[0.2em] uppercase text-sm mb-4 block"
                        >
                            {t("nav.gallery")}
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-5xl md:text-7xl font-bold tracking-tight"
                        >
                            {t("gallery.title")} <span className="text-muted-foreground">{t("gallery.legacy")}</span>
                        </motion.h2>
                    </div>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-xl text-muted-foreground max-w-sm"
                    >
                        {t("gallery.desc")}
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 min-h-[800px]">
                    {photos.map((photo, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.05 }}
                            className={`group relative overflow-hidden rounded-[2.5rem] bg-muted ${photo.span}`}
                        >
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

                            {/* Image from uploads */}
                            <img
                                src={photo.image}
                                alt={photo.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            />

                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10">
                                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                                    <Camera className="w-8 h-8 text-white" />
                                </div>
                            </div>

                            <div className="absolute bottom-0 left-0 p-8 z-20 translate-y-10 group-hover:translate-y-0 transition-transform duration-500 opacity-0 group-hover:opacity-100">
                                <p className="text-primary font-bold tracking-widest uppercase text-xs mb-2">{photo.category}</p>
                                <h3 className="text-2xl font-bold text-white mb-4">{photo.title}</h3>
                                <button className="flex items-center gap-2 text-white/70 text-sm hover:text-white transition-colors">
                                    {t("gallery.viewFull")} <ExternalLink className="w-4 h-4" />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-20 text-center">
                    <button className="h-16 px-12 rounded-2xl bg-primary text-white font-bold text-lg shadow-xl shadow-primary/20 hover:scale-105 transition-transform">
                        {t("gallery.explore")}
                    </button>
                </div>
            </div>
        </section>
    );
}
