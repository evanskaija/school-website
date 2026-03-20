import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { AnimatedCard } from "@/components/shared/AnimatedCard";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";
import {
    Baby,
    Palette,
    Music,
    Heart,
    Smile,
    Sun,
    CheckCircle2,
    Users
} from "lucide-react";
import heroImage from "@/assets/uploads/Yunia faraja.jpg";

export default function SiimaNursery() {
    const { t } = useLanguage();

    const sections = [
        {
            title: t("nursery.class.baby"),
            desc: t("nursery.class.baby.desc"),
            icon: Baby
        },
        {
            title: t("nursery.class.middle"),
            desc: t("nursery.class.middle.desc"),
            icon: Smile
        },
        {
            title: t("nursery.class.preunit"),
            desc: t("nursery.class.preunit.desc"),
            icon: Sun
        }
    ];

    return (
        <div className="min-h-screen bg-background">
            <Header />

            <PageHero
                title={t("academics.nursery")}
                subtitle={t("nursery.hero.subtitle")}
                backgroundImage={heroImage}
                breadcrumbs={[
                    { label: t("nav.home"), href: "/" },
                    { label: t("nav.academics") }
                ]}
            />

            <main className="py-20">
                <div className="container mx-auto px-4 lg:px-8">

                    <div className="max-w-4xl mx-auto text-center mb-24">
                        <motion.span
                            className="text-primary font-bold tracking-[0.3em] uppercase text-sm mb-4 block"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                        >
                            {t("nursery.hero.badge")}
                        </motion.span>
                        <SectionHeader
                            title={t("nursery.title")}
                            subtitle={t("nursery.subtitle")}
                        />
                        <p className="text-lg text-muted-foreground leading-relaxed mt-6">
                            {t("nursery.desc")}
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 mb-24">
                        {sections.map((section, idx) => (
                            <AnimatedCard key={idx} delay={idx * 0.1}>
                                <div className="p-8 text-center h-full flex flex-col items-center">
                                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                                        <section.icon className="h-8 w-8" />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-4">{section.title}</h3>
                                    <p className="text-muted-foreground flex-grow">{section.desc}</p>
                                </div>
                            </AnimatedCard>
                        ))}
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-4xl font-bold mb-6">{t("nursery.goals.title")}</h2>
                            <div className="space-y-4">
                                {[
                                    "nursery.goal1",
                                    "nursery.goal2",
                                    "nursery.goal3",
                                    "nursery.goal4",
                                    "nursery.goal5"
                                ].map((key, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <CheckCircle2 className="text-primary h-6 w-6 shrink-0" />
                                        <span className="text-lg font-medium">{t(key)}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-accent/10 p-6 rounded-3xl text-center">
                                <Palette className="h-10 w-10 text-accent mx-auto mb-2" />
                                <h4 className="font-bold">{t("nursery.activity.arts")}</h4>
                            </div>
                            <div className="bg-primary/10 p-6 rounded-3xl text-center">
                                <Music className="h-10 w-10 text-primary mx-auto mb-2" />
                                <h4 className="font-bold">{t("nursery.activity.music")}</h4>
                            </div>
                            <div className="bg-secondary/10 p-6 rounded-3xl text-center">
                                <Users className="h-10 w-10 text-secondary mx-auto mb-2" />
                                <h4 className="font-bold">{t("nursery.activity.social")}</h4>
                            </div>
                            <div className="bg-emerald-500/10 p-6 rounded-3xl text-center">
                                <Heart className="h-10 w-10 text-emerald-500 mx-auto mb-2" />
                                <h4 className="font-bold">{t("nursery.activity.values")}</h4>
                            </div>
                        </div>
                    </div>

                    <div className="bg-muted p-12 rounded-[3.5rem] text-center border border-border">
                        <h2 className="text-3xl font-bold mb-6">{t("nursery.join.title")}</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto mb-8 text-lg">
                            {t("nursery.join.desc")}
                        </p>
                        <div className="flex justify-center gap-4">
                            <Link to="/admissions" className="px-8 py-4 bg-primary text-white rounded-2xl font-bold hover:scale-105 transition-all">
                                {t("nav.apply")}
                            </Link>
                            <Link to="/contact" className="px-8 py-4 border border-primary text-primary rounded-2xl font-bold hover:bg-primary/5 transition-all">
                                {t("nav.contact")}
                            </Link>
                        </div>
                    </div>

                </div>
            </main>

            <Footer />
        </div>
    );
}
