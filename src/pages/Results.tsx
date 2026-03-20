import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { AnimatedCard } from "@/components/shared/AnimatedCard";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Search, ExternalLink, Calendar, GraduationCap, Award } from "lucide-react";
import { useState } from "react";
import { ResultsChart } from "@/components/sections/ResultsChart";
import heroImage from "@/assets/graduation 1.jpg";

const resultsData = [
    { year: 2024, url: "https://onlinesys.necta.go.tz/results/2024/csee/results/s4567.htm", type: "CSEE" },
    { year: 2023, url: "https://maktaba.tetea.org/exam-results/CSEE2023/s4567.htm", type: "CSEE" },
    { year: 2022, url: "https://maktaba.tetea.org/exam-results/CSEE2022/s4567.htm", type: "CSEE" },
    { year: 2021, url: "https://maktaba.tetea.org/exam-results/CSEE2021/s4567.htm", type: "CSEE" },
    { year: 2020, url: "https://maktaba.tetea.org/exam-results/CSEE2020/s4567.htm", type: "CSEE" },
    { year: 2019, url: "https://maktaba.tetea.org/exam-results/CSEE2019/s4567.htm", type: "CSEE" },
    { year: 2018, url: "https://maktaba.tetea.org/exam-results/CSEE2018/s4567.htm", type: "CSEE" },
    { year: 2017, url: "https://maktaba.tetea.org/exam-results/CSEE2017/s4567.htm", type: "CSEE" },
    { year: 2016, url: "https://maktaba.tetea.org/exam-results/CSEE2016/s4567.htm", type: "CSEE" },
    { year: 2015, url: "https://maktaba.tetea.org/exam-results/CSEE2015/s4567.htm", type: "CSEE" },
].sort((a, b) => b.year - a.year);

export default function Results() {
    const { t } = useLanguage();
    const [searchQuery, setSearchQuery] = useState("");

    const filteredResults = resultsData.filter(item => 
        item.year.toString().includes(searchQuery)
    );

    return (
        <div className="min-h-screen bg-background">
            <Header />

            <PageHero
                title={t("results.hero.title")}
                subtitle={t("results.hero.subtitle")}
                backgroundImage={heroImage}
                breadcrumbs={[
                    { label: t("nav.home"), href: "/" },
                    { label: t("nav.academics"), href: "/academics" },
                    { label: t("nav.results") }
                ]}
            />

            <main className="py-20">
                <ResultsChart />
                <div className="container mx-auto px-4 lg:px-8">
                    
                    {/* Search Section */}
                    <div className="max-w-xl mx-auto mb-16">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
                            <input
                                type="text"
                                placeholder={t("results.search.placeholder")}
                                className="w-full pl-12 pr-4 py-4 rounded-2xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-sm"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    <SectionHeader
                        title={t("results.necta.official")}
                        subtitle={t("results.form4.csee")}
                    />

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-12">
                        {filteredResults.map((item, index) => (
                            <AnimatedCard key={item.year} delay={index * 0.05}>
                                <div className="p-6 flex flex-col h-full">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="p-3 bg-primary/10 rounded-xl text-primary">
                                            <Calendar className="h-6 w-6" />
                                        </div>
                                        <span className="px-3 py-1 bg-secondary/10 text-secondary text-xs font-bold rounded-full uppercase tracking-wider">
                                            {item.type}
                                        </span>
                                    </div>
                                    
                                    <h3 className="text-2xl font-bold text-foreground mb-1">
                                        {item.year}
                                    </h3>
                                    <p className="text-sm text-muted-foreground mb-6">
                                        {t("results.form4.csee")}
                                    </p>

                                    <div className="mt-auto pt-4 border-t border-border/50">
                                        <a
                                            href={item.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-between w-full group py-2 text-primary font-semibold hover:text-primary/80 transition-colors"
                                        >
                                            <span>{t("results.view.external")}</span>
                                            <ExternalLink className="h-4 w-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                        </a>
                                    </div>
                                </div>
                            </AnimatedCard>
                        ))}
                    </div>

                    {filteredResults.length === 0 && (
                        <div className="text-center py-20 bg-muted/20 rounded-3xl border border-dashed border-border mt-12">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                                <Search className="h-8 w-8 text-muted-foreground" />
                            </div>
                            <h3 className="text-xl font-semibold text-foreground">
                                {t("staff.noResults.title")}
                            </h3>
                            <p className="text-muted-foreground mt-2">
                                {t("staff.noResults.desc")}
                            </p>
                        </div>
                    )}

                    {/* Performance Overview Section (Additional Pro Touch) */}
                    <div className="mt-32">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6 }}
                                viewport={{ once: true }}
                            >
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-bold uppercase tracking-wider mb-4">
                                    <Award className="h-4 w-4" />
                                    <span>{t("secondary.recognition.title")}</span>
                                </div>
                                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground leading-tight">
                                    {t("secondary.academicExcellence")}
                                </h2>
                                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                                    {t("secondary.recognition.quote")}
                                </p>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4 p-4 bg-primary/5 rounded-2xl border border-primary/10">
                                        <div className="p-3 bg-primary/20 rounded-xl text-primary">
                                            <GraduationCap className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-foreground">S4567</p>
                                            <p className="text-sm text-muted-foreground">Sacred Heart Secondary NECTA Center Code</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                className="relative"
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6 }}
                                viewport={{ once: true }}
                            >
                                <div className="aspect-video rounded-3xl overflow-hidden shadow-2xl relative z-10">
                                    <img 
                                        src={heroImage} 
                                        alt="Students Graduating" 
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                    <div className="absolute bottom-8 left-8 right-8 text-white">
                                        <p className="text-3xl font-bold mb-1">100%</p>
                                        <p className="text-sm font-medium opacity-90">{t("secondary.achievements.item2")}</p>
                                    </div>
                                </div>
                                {/* Decorative elements */}
                                <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent/20 rounded-full blur-2xl -z-0" />
                                <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-primary/20 rounded-full blur-3xl -z-0" />
                            </motion.div>
                        </div>
                    </div>

                    <div className="mt-20 p-8 bg-muted/10 rounded-2xl border border-border text-center">
                        <p className="text-muted-foreground italic text-sm">
                            {t("results.disclaimer")}
                        </p>
                    </div>

                </div>
            </main>

            <Footer />
        </div>
    );
}
