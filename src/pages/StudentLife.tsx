import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { AnimatedCard } from "@/components/shared/AnimatedCard";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import {
    Users,
    Trophy,
    Music,
    Heart,
    Calendar,
    ShieldCheck,
    Compass,
    Globe,
    Award,
    GraduationCap
} from "lucide-react";
import heroImage from "@/assets/graduation 1.jpg";

export default function StudentLife() {
    const { t } = useLanguage();
    const clubs = [
        { title: t("life.club.debate"), icon: Globe, desc: t("life.club.debate.desc") },
        { title: t("life.club.science"), icon: Compass, desc: t("life.club.science.desc") },
        { title: t("life.club.ict"), icon: Compass, desc: t("life.club.ict.desc") },
        { title: t("life.club.environment"), icon: Heart, desc: t("life.club.environment.desc") },
        { title: t("life.club.music"), icon: Music, desc: t("life.club.music.desc") }
    ];

    const sports = [
        t("life.sport.football"), t("life.sport.netball"), t("life.sport.volleyball"), t("life.sport.athletics"), t("life.sport.basketball")
    ];

    const events = [
        { name: t("life.event.sports"), month: t("month.june"), desc: t("life.event.sports.desc") },
        { name: t("life.event.cultural"), month: t("month.september"), desc: t("life.event.cultural.desc") },
        { name: t("life.event.academic"), month: t("month.october"), desc: t("life.event.academic.desc") },
        { name: t("life.event.graduation"), month: t("month.december"), desc: t("life.event.graduation.desc") }
    ];

    const leadership = [
        { position: t("life.leadership.head"), role: t("life.leadership.head.role") },
        { position: t("life.leadership.prefects"), role: t("life.leadership.prefects.role") },
        { position: t("life.leadership.council"), role: t("life.leadership.council.role") }
    ];

    return (
        <div className="min-h-screen bg-background">
            <Header />

            <PageHero
                title={t("life.hero.title")}
                subtitle={t("life.hero.subtitle")}
                backgroundImage={heroImage}
                breadcrumbs={[
                    { label: t("nav.home"), href: "/" },
                    { label: t("life.hero.title") }
                ]}
            />

            <main className="py-20">
                <div className="container mx-auto px-4 lg:px-8">

                    {/* 1. Introduction */}
                    <div className="max-w-4xl mx-auto text-center mb-24">
                        <SectionHeader
                            title={t("life.intro.title")}
                            subtitle={t("life.intro.subtitle")}
                        />
                        <p className="text-lg text-muted-foreground leading-relaxed mt-6">
                            {t("life.intro.desc")}
                        </p>
                    </div>

                    {/* 2. Clubs and Societies */}
                    <div className="mb-24">
                        <SectionHeader
                            title={t("life.clubs.title")}
                            subtitle={t("life.clubs.subtitle")}
                        />
                        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6 mt-12">
                            {clubs.map((club, index) => (
                                <AnimatedCard key={index} delay={index * 0.1}>
                                    <div className="p-6 text-center">
                                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto mb-4">
                                            <club.icon className="h-6 w-6" />
                                        </div>
                                        <h4 className="font-bold mb-2 text-sm">{club.title}</h4>
                                        <p className="text-xs text-muted-foreground">{club.desc}</p>
                                    </div>
                                </AnimatedCard>
                            ))}
                        </div>
                    </div>

                    {/* 3. Sports and Games */}
                    <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-3xl font-bold mb-6">{t("life.sports.title")}</h2>
                            <p className="text-muted-foreground mb-8">
                                {t("life.sports.desc")}
                            </p>
                            <div className="grid grid-cols-2 gap-4">
                                {sports.map((sport) => (
                                    <div key={sport} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                                        <Trophy className="h-5 w-5 text-secondary" />
                                        <span className="font-semibold">{sport}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                        <div className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-3xl" />
                            <div className="bg-card border border-border rounded-3xl p-8 relative overflow-hidden">
                                <Award className="h-24 w-24 text-primary/10 absolute -right-4 -bottom-4 rotate-12" />
                                <h3 className="text-2xl font-bold mb-4">{t("life.champions.title")}</h3>
                                <p className="text-muted-foreground">
                                    {t("life.champions.desc")}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* 4. Student Leadership */}
                    <div className="mb-24">
                        <div className="bg-primary text-primary-foreground rounded-3xl p-12 overflow-hidden relative">
                            <Users className="absolute -left-12 -bottom-12 h-64 w-64 opacity-10" />
                            <div className="relative z-10 max-w-2xl">
                                <h2 className="text-3xl font-bold mb-8">{t("life.leadership.title")}</h2>
                                <div className="space-y-6">
                                    {leadership.map((lead, i) => (
                                        <div key={i} className="flex gap-4 items-start">
                                            <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center shrink-0 font-bold">
                                                {i + 1}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-xl">{lead.position}</h4>
                                                <p className="text-primary-foreground/80">{lead.role}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 5. School Events */}
                    <div className="mb-24">
                        <SectionHeader
                            title={t("life.events.title")}
                            subtitle={t("life.events.subtitle")}
                        />
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
                            {events.map((event, index) => (
                                <div key={index} className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-all border-l-4 border-l-secondary">
                                    <div className="text-secondary font-bold text-sm mb-2 uppercase">{event.month}</div>
                                    <h4 className="font-bold text-lg mb-2">{event.name}</h4>
                                    <p className="text-sm text-muted-foreground">{event.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 6. Guidance & 7. Community */}
                    <div className="grid lg:grid-cols-2 gap-8 mb-24">
                        <div className="glass-card p-10 rounded-3xl border border-accent/10">
                            <div className="h-12 w-12 rounded-xl bg-accent/20 flex items-center justify-center text-accent mb-6">
                                <Heart className="h-6 w-6" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">{t("life.guidance.title")}</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                {t("life.guidance.desc")}
                            </p>
                        </div>
                        <div className="glass-card p-10 rounded-3xl border border-primary/10">
                            <div className="h-12 w-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary mb-6">
                                <Globe className="h-6 w-6" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">{t("life.community.title")}</h3>
                            <ul className="space-y-3 text-muted-foreground">
                                <li className="flex items-center gap-2">
                                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                                    {t("life.community.item1")}
                                </li>
                                <li className="flex items-center gap-2">
                                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                                    {t("life.community.item2")}
                                </li>
                                <li className="flex items-center gap-2">
                                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                                    {t("life.community.item3")}
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* 8. School Rules & Discipline */}
                    <div className="mb-24 bg-card border border-border rounded-3xl p-12">
                        <div className="max-w-3xl mx-auto text-center">
                            <ShieldCheck className="h-16 w-16 text-secondary mx-auto mb-6" />
                            <h2 className="text-3xl font-bold mb-6">{t("life.rules.title")}</h2>
                            <p className="text-muted-foreground mb-8 text-lg">
                                {t("life.rules.desc")}
                            </p>
                            <div className="grid sm:grid-cols-2 gap-4 text-left border-t border-border pt-8">
                                <div>
                                    <h4 className="font-bold mb-2">{t("life.rules.conduct")}</h4>
                                    <p className="text-sm text-muted-foreground">{t("life.rules.conduct.desc")}</p>
                                </div>
                                <div>
                                    <h4 className="font-bold mb-2">{t("life.rules.uniform")}</h4>
                                    <p className="text-sm text-muted-foreground">{t("life.rules.uniform.desc")}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Student Portal CTA */}
                    <motion.div
                        className="text-center bg-gradient-to-br from-accent/20 to-primary/20 rounded-3xl p-12 border border-white/10"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        <GraduationCap className="h-16 w-16 text-accent mx-auto mb-4" />
                        <h2 className="text-4xl font-bold mb-4">{t("life.portal.title")}</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto mb-8 text-lg">
                            {t("life.portal.desc")}
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <a
                                href="/student"
                                className="px-8 py-4 bg-accent text-accent-foreground rounded-2xl font-bold hover:shadow-xl hover:scale-105 transition-all"
                            >
                                {t("life.portal.button")}
                            </a>
                            <a
                                href="/contact"
                                className="px-8 py-4 glass-card rounded-2xl font-bold hover:bg-muted/50 transition-all"
                            >
                                {t("common.contact")}
                            </a>
                        </div>
                    </motion.div>

                </div>
            </main>

            <Footer />
        </div>
    );
}
