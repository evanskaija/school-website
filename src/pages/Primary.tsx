import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { AnimatedCard } from "@/components/shared/AnimatedCard";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";
import {
    BookOpen,
    Calculator,
    Globe,
    Microscope,
    CheckCircle2,
    Trophy,
    Users,
    Award
} from "lucide-react";
import heroImage from "@/assets/uploads/Happy france.jpg";

export default function SiimaPrimary() {
    const { t } = useLanguage();

    const subjects = [
        { name: t("subject.maths"), icon: Calculator, color: "text-blue-500" },
        { name: t("subject.languages"), icon: Globe, color: "text-purple-500" },
        { name: t("subject.kiswahili"), icon: Globe, color: "text-emerald-500" },
        { name: t("subject.sciences"), icon: Microscope, color: "text-amber-500" },
        { name: t("subject.arts"), icon: Globe, color: "text-blue-500" },
        { name: t("subject.vocational"), icon: Trophy, color: "text-rose-500" }
    ];

    return (
        <div className="min-h-screen bg-background">
            <Header />

            <PageHero
                title={t("academics.primary")}
                subtitle={t("primary.hero.subtitle")}
                backgroundImage={heroImage}
                breadcrumbs={[
                    { label: t("nav.home"), href: "/" },
                    { label: t("academics.primary") }
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
                            {t("primary.hero.badge")}
                        </motion.span>
                        <SectionHeader
                            title={t("primary.title")}
                            subtitle={t("primary.subtitle")}
                        />
                        <p className="text-lg text-muted-foreground leading-relaxed mt-6">
                            {t("primary.desc.full")}
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12 mb-24">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="bg-card border border-border rounded-[3rem] p-10 shadow-xl"
                        >
                            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                                <BookOpen className="text-primary" /> {t("primary.curriculum.title")}
                            </h2>
                            <p className="text-muted-foreground mb-8">
                                {t("primary.curriculum.desc")}
                            </p>
                            <div className="space-y-4">
                                {[
                                    "primary.curr.item1",
                                    "primary.curr.item2",
                                    "primary.curr.item3",
                                    "primary.curr.item4",
                                    "primary.curr.item5"
                                ].map((key, i) => (
                                    <div key={i} className="flex gap-3 items-center">
                                        <CheckCircle2 className="text-secondary h-5 w-5 shrink-0" />
                                        <span className="font-medium">{t(key)}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        <div>
                            <h2 className="text-3xl font-bold mb-8">{t("primary.subjects.title")}</h2>
                            <div className="grid grid-cols-2 gap-4">
                                {subjects.map((s, idx) => (
                                    <motion.div
                                        key={idx}
                                        className="p-6 bg-muted/50 rounded-2xl border border-transparent hover:border-primary/20 transition-all group"
                                        whileHover={{ y: -5 }}
                                    >
                                        <s.icon className={`h-8 w-8 ${s.color} mb-4 group-hover:scale-110 transition-transform`} />
                                        <h4 className="font-bold">{s.name}</h4>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="mb-24">
                        <SectionHeader
                            title={t("primary.achievements.title")}
                            subtitle={t("primary.achievements.subtitle")}
                        />
                        <div className="grid md:grid-cols-4 gap-6 mt-12">
                            {[
                                { label: t("primary.stats.passrate"), value: "100%", icon: Award },
                                { label: t("primary.stats.staff"), value: "30+", icon: Users },
                                { label: t("primary.stats.experience"), value: "15+", icon: Trophy },
                                { label: t("primary.stats.digital"), value: t("primary.stats.digital.value"), icon: Microscope }
                            ].map((stat, i) => (
                                <div key={i} className="bg-primary/5 p-8 rounded-3xl border border-primary/10 text-center">
                                    <stat.icon className="h-10 w-10 text-primary mx-auto mb-4" />
                                    <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                                    <div className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-4xl font-bold mb-6">{t("primary.facilities.title")}</h2>
                            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                                {t("primary.facilities.desc")}
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <span className="px-4 py-2 bg-muted rounded-full text-sm font-bold">{t("primary.facility.tag1")}</span>
                                <span className="px-4 py-2 bg-muted rounded-full text-sm font-bold">{t("primary.facility.tag2")}</span>
                                <span className="px-4 py-2 bg-muted rounded-full text-sm font-bold">{t("primary.facility.tag3")}</span>
                                <span className="px-4 py-2 bg-muted rounded-full text-sm font-bold">{t("primary.facility.tag4")}</span>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-0 bg-primary/20 blur-[100px] -z-10 rounded-full" />
                            <div className="bg-card border border-border p-8 rounded-[3rem] shadow-2xl">
                                <h3 className="text-2xl font-bold mb-4">{t("nav.admissions")}</h3>
                                <p className="text-muted-foreground mb-6">
                                    {t("primary.admissions.desc")}
                                </p>
                                <Link to="/admissions" className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-2xl font-bold hover:gap-4 transition-all group">
                                    {t("auth.welcomeBack")}
                                    <span className="group-hover:translate-x-1 transition-transform">\u2192</span>
                                </Link>
                            </div>
                        </div>
                    </div>

                </div>
            </main>

            <Footer />
        </div>
    );
}
