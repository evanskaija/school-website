import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useLanguage } from "@/contexts/LanguageContext";
import { TrendingUp, Award, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

const chartData = [
    { year: '2015', rate: 88 },
    { year: '2016', rate: 91 },
    { year: '2017', rate: 90 },
    { year: '2018', rate: 94 },
    { year: '2019', rate: 96 },
    { year: '2020', rate: 95 },
    { year: '2021', rate: 98 },
    { year: '2022', rate: 97 },
    { year: '2023', rate: 99 },
    { year: '2024', rate: 100 },
];

export function ResultsChart() {
    const { t } = useLanguage();

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-background/95 backdrop-blur-md border border-primary/20 p-4 rounded-2xl shadow-2xl">
                    <p className="text-primary font-bold mb-1">{label}</p>
                    <p className="text-foreground flex items-center gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        {t("results.hero.title")}: <span className="font-bold ml-1">{payload[0].value}%</span>
                    </p>
                    <p className="text-muted-foreground text-xs mt-1">NECTA CSEE</p>
                </div>
            );
        }
        return null;
    };

    return (
        <section className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row gap-16 items-center">

                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:w-1/3"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-6">
                            <TrendingUp className="w-4 h-4" />
                            <span>{t("results.chart.badge")}</span>
                        </div>

                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                            {t("results.chart.title")}{" "}
                            <span className="text-primary">{t("results.chart.excellence")}</span>
                        </h2>

                        <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                            {t("results.chart.desc")}
                        </p>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="p-4 rounded-2xl bg-muted/50 border border-border">
                                <p className="text-3xl font-bold text-primary mb-1">100%</p>
                                <p className="text-xs text-muted-foreground uppercase font-bold tracking-tighter">
                                    {t("results.chart.currentRate")}
                                </p>
                            </div>
                            <div className="p-4 rounded-2xl bg-muted/50 border border-border">
                                <p className="text-3xl font-bold text-secondary mb-1">92%</p>
                                <p className="text-xs text-muted-foreground uppercase font-bold tracking-tighter">
                                    {t("results.chart.distinctionRate")}
                                </p>
                            </div>
                        </div>

                        <Link
                            to="/results"
                            className="mt-8 inline-flex items-center gap-3 text-sm text-primary font-bold group"
                        >
                            <Award className="w-5 h-5" />
                            <span className="border-b-2 border-primary/20 group-hover:border-primary transition-all">
                                {t("results.chart.viewCertificates")}
                            </span>
                        </Link>
                    </motion.div>

                    {/* Right Chart */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:w-2/3 w-full h-[400px] md:h-[500px] bg-card/30 backdrop-blur-sm border border-border rounded-[2.5rem] p-4 md:p-8 shadow-2xl relative"
                    >
                        <div className="absolute top-8 left-8 flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
                            <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                                {t("results.chart.passRateLabel")}
                            </span>
                        </div>

                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart
                                data={chartData}
                                margin={{ top: 60, right: 30, left: 0, bottom: 0 }}
                            >
                                <defs>
                                    <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(128,128,128,0.1)" />
                                <XAxis
                                    dataKey="year"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12, fontWeight: 600 }}
                                    dy={10}
                                />
                                <YAxis domain={[80, 100]} hide />
                                <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'hsl(var(--primary))', strokeWidth: 2, strokeDasharray: '5 5' }} />
                                <Area
                                    type="monotone"
                                    dataKey="rate"
                                    stroke="hsl(var(--primary))"
                                    strokeWidth={4}
                                    fillOpacity={1}
                                    fill="url(#colorRate)"
                                    animationDuration={2500}
                                    animationBegin={300}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </motion.div>
                </div>
            </div>

            {/* Background decorations */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10 animate-pulse" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl -z-10" />
        </section>
    );
}
