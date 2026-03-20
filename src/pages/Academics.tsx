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
    GraduationCap,
    Library,
    FlaskConical,
    Monitor,
    Calendar,
    Trophy,
    Users,
    CheckCircle2,
    BookMarked,
    Clock,
    CheckCircle
} from "lucide-react";
import heroImage from "@/assets/graduation 2.jpg";

export default function Academics() {
    const { t } = useLanguage();

    const subjects = {
        core: [
            t("subject.maths"), t("subject.languages") + " (English)", t("subject.kiswahili"), t("subject.sciences") + " (Biology)",
            t("subject.sciences") + " (Chemistry)", t("subject.sciences") + " (Physics)", t("subject.arts") + " (History)", t("subject.arts") + " (Geography)", t("secondary.civics")
        ],
        optional: [
            t("secondary.commerce"), t("secondary.bookkeeping"), t("secondary.computerStudies"),
            t("secondary.agriculture"), t("secondary.technical")
        ]
    };

    const levels = [
        {
            form: t("secondary.form1"),
            description: t("secondary.form1.desc")
        },
        {
            form: t("secondary.form2"),
            description: t("secondary.form2.desc")
        },
        {
            form: t("secondary.form3"),
            description: t("secondary.form3.desc")
        },
        {
            form: t("secondary.form4"),
            description: t("secondary.form4.desc")
        }
    ];

    const facilities = [
        {
            title: t("facility.library"),
            description: t("facility.library.desc"),
            icon: Library
        },
        {
            title: t("facility.biologyLab"),
            description: t("facility.biologyLab.desc"),
            icon: FlaskConical
        },
        {
            title: t("facility.computerLab"),
            description: t("facility.computerLab.desc"),
            icon: Monitor
        },
        {
            title: t("secondary.facility.studyRooms"),
            description: t("secondary.facility.studyRooms.desc"),
            icon: BookMarked
        }
    ];

    return (
        <div className="min-h-screen bg-background">
            <Header />

            <PageHero
                title={t("academics.secondary")}
                subtitle={t("secondary.hero.subtitle")}
                backgroundImage={heroImage}
                breadcrumbs={[
                    { label: t("nav.home"), href: "/" },
                    { label: t("nav.academics") }
                ]}
            />

            <main className="py-20">
                <div className="container mx-auto px-4 lg:px-8">

                    {/* 1. Introduction */}
                    <div className="max-w-4xl mx-auto text-center mb-24">
                        <SectionHeader
                            title={t("secondary.academicExcellence")}
                            subtitle={t("secondary.approach.title")}
                        />
                        <p className="text-lg text-muted-foreground leading-relaxed mt-6">
                            {t("secondary.approach.desc")}
                        </p>
                    </div>

                    {/* 2. Curriculum */}
                    <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-3xl font-bold mb-6">{t("primary.curriculum.title")}</h2>
                            <p className="text-muted-foreground mb-6">
                                {t("secondary.structure.desc")}
                            </p>
                            <div className="space-y-4">
                                {[
                                    "secondary.approach.item1",
                                    "secondary.approach.item2",
                                    "secondary.approach.item3",
                                    "secondary.approach.item4"
                                ].map((key, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <CheckCircle2 className="text-primary h-5 w-5" />
                                        <span className="font-medium">{t(key)}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                        <motion.div
                            className="bg-accent/5 rounded-3xl p-8 border border-accent/10"
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 bg-accent/20 rounded-xl text-accent">
                                    <GraduationCap className="h-8 w-8" />
                                </div>
                                <h3 className="text-2xl font-bold">{t("secondary.recognition.title")}</h3>
                            </div>
                            <p className="text-muted-foreground italic lg:text-lg">
                                "{t("secondary.recognition.quote")}"
                            </p>
                        </motion.div>
                    </div>

                    {/* 3. Subjects Offered */}
                    <div className="mb-24">
                        <SectionHeader
                            title={t("primary.subjects.title")}
                            subtitle={t("secondary.subjects.subtitle")}
                        />
                        <div className="grid md:grid-cols-2 gap-8 mt-12">
                            <div className="glass-card p-8 rounded-2xl border border-primary/10">
                                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                                    <BookOpen className="text-primary" /> {t("secondary.coreSubjects")}
                                </h3>
                                <div className="grid grid-cols-2 gap-4">
                                    {subjects.core.map((subject) => (
                                        <div key={subject} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                                            <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                                            <span>{subject}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="glass-card p-8 rounded-2xl border border-secondary/10">
                                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                                    <Trophy className="text-secondary" /> {t("secondary.optionalSubjects")}
                                </h3>
                                <div className="grid grid-cols-1 gap-4">
                                    {subjects.optional.map((subject) => (
                                        <div key={subject} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                                            <CheckCircle className="h-4 w-4 text-secondary" />
                                            <span>{subject}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 4. Academic Structure & 5. Examination System */}
                    <div className="grid lg:grid-cols-2 gap-12 mb-24">
                        <div>
                            <h2 className="text-3xl font-bold mb-8">{t("secondary.structure.title")}</h2>
                            <div className="space-y-6">
                                {levels.map((level, index) => (
                                    <motion.div
                                        key={level.form}
                                        className="flex gap-4 p-4 rounded-xl hover:bg-muted/50 transition-colors border border-transparent hover:border-border"
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        viewport={{ once: true }}
                                    >
                                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0 font-bold text-primary">
                                            {index + 1}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-lg">{level.form}</h4>
                                            <p className="text-muted-foreground text-sm">{level.description}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-card rounded-2xl p-8 border border-border">
                            <h2 className="text-3xl font-bold mb-8">{t("secondary.exams.title")}</h2>
                            <p className="text-muted-foreground mb-8">
                                {t("secondary.exams.desc")}
                            </p>
                            <div className="space-y-4">
                                {[
                                    { titleKey: "secondary.exam.monthly", descKey: "secondary.exam.monthly.desc" },
                                    { titleKey: "secondary.exam.midterm", descKey: "secondary.exam.midterm.desc" },
                                    { titleKey: "secondary.exam.annual", descKey: "secondary.exam.annual.desc" },
                                    { titleKey: "secondary.exam.national", descKey: "secondary.exam.national.desc" }
                                ].map((exam, i) => (
                                    <div key={i} className="flex gap-4 items-start pb-4 border-b border-border/50 last:border-0 last:pb-0">
                                        <div className="mt-1"><CheckCircle2 className="h-5 w-5 text-accent" /></div>
                                        <div>
                                            <h4 className="font-semibold">{t(exam.titleKey)}</h4>
                                            <p className="text-sm text-muted-foreground">{t(exam.descKey)}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* 6. Academic Calendar */}
                    <div className="mb-24 bg-primary/5 rounded-3xl p-12 border border-primary/10">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                            <div className="text-center md:text-left max-w-xl">
                                <h2 className="text-3xl font-bold mb-4">{t("secondary.calendar.title")}</h2>
                                <p className="text-muted-foreground">
                                    {t("secondary.calendar.desc")}
                                </p>
                            </div>
                            <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
                                <div className="bg-background p-6 rounded-2xl shadow-sm border border-border text-center">
                                    <Calendar className="h-8 w-8 text-primary mx-auto mb-2" />
                                    <p className="text-xs text-muted-foreground uppercase font-semibold">{t("secondary.nextTerm")}</p>
                                    <p className="font-bold">July 2026</p>
                                </div>
                                <div className="bg-background p-6 rounded-2xl shadow-sm border border-border text-center">
                                    <Clock className="h-8 w-8 text-secondary mx-auto mb-2" />
                                    <p className="text-xs text-muted-foreground uppercase font-semibold">{t("secondary.classHours")}</p>
                                    <p className="font-bold">7:30 - 15:30</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 7. Academic Facilities */}
                    <div className="mb-24">
                        <SectionHeader
                            title={t("primary.facilities.title")}
                            subtitle={t("secondary.facilities.subtitle")}
                        />
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
                            {facilities.map((fac, index) => (
                                <AnimatedCard key={index} delay={index * 0.1}>
                                    <div className="p-6">
                                        <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent mb-4">
                                            <fac.icon className="h-6 w-6" />
                                        </div>
                                        <h4 className="font-bold mb-2">{fac.title}</h4>
                                        <p className="text-sm text-muted-foreground">{fac.description}</p>
                                    </div>
                                </AnimatedCard>
                            ))}
                        </div>
                    </div>

                    {/* 8. Academic Achievements & 9. Teaching Staff */}
                    <div className="grid lg:grid-cols-2 gap-12">
                        <div>
                            <h2 className="text-3xl font-bold mb-8">{t("secondary.achievements.title")}</h2>
                            <div className="space-y-4">
                                {[
                                    "secondary.achievements.item1",
                                    "secondary.achievements.item2",
                                    "secondary.achievements.item3",
                                    "secondary.achievements.item4"
                                ].map((key, i) => (
                                    <div key={i} className="flex gap-3 items-center p-4 bg-muted/30 rounded-xl">
                                        <Trophy className="h-5 w-5 text-yellow-500 shrink-0" />
                                        <span className="font-medium">{t(key)}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold mb-8">{t("team.title")}</h2>
                            <p className="text-muted-foreground mb-6">
                                {t("secondary.staff.desc")}
                            </p>
                            <div className="flex -space-x-4 mb-8">
                                {[1, 2, 3, 4, 5].map(i => (
                                    <div key={i} className="h-12 w-12 rounded-full bg-muted border-2 border-background flex items-center justify-center">
                                        <Users className="h-6 w-6 text-muted-foreground" />
                                    </div>
                                ))}
                                <div className="h-12 w-12 rounded-full bg-primary text-primary-foreground border-2 border-background flex items-center justify-center text-xs font-bold">
                                    +35
                                </div>
                            </div>
                            <Link
                                to="/staff"
                                className="inline-flex items-center gap-2 text-primary font-bold hover:underline"
                            >
                                {t("secondary.staff.view")} <span className="text-xl">\u2192</span>
                            </Link>
                        </div>
                    </div>

                </div>
            </main>

            <Footer />
        </div>
    );
}
