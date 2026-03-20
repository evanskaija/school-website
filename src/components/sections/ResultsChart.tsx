import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useLanguage } from "@/contexts/LanguageContext";
import { TrendingUp, Award, CheckCircle2 } from "lucide-react";

const resultsData = [
    { year: '2015', rate: 88, distinction: 45 },
    { year: '2016', rate: 91, distinction: 48 },
    { year: '2017', rate: 90, distinction: 52 },
    { year: '2018', rate: 94, distinction: 58 },
    { year: '2019', rate: 96, distinction: 65 },
    { year: '2020', rate: 95, distinction: 62 },
    { year: '2021', rate: 98, distinction: 75 },
    { year: '2022', rate: 97, distinction: 78 },
    { year: '2023', rate: 99, distinction: 85 },
    { year: '2024', rate: 100, distinction: 92 },
];

export function ResultsChart() {
    const { t } = useLanguage();

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-background/95 backdrop-blur-md border border-primary/20 p-4 rounded-2xl shadow-2xl">
                    <p className="text-primary font-bold mb-1">{label}</p>
                    <p className="text-foreground flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        Pass Rate: <span className="font-bold">{payload[0].value}%</span>
                    </p>
                    <p className="text-muted-foreground text-xs mt-1">
                        Official NECTA CSEE Statistics
                    </p>
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
                            <span>Academic Growth</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                            A Decade of <span className="text-primary">Excellence</span>
                        </h2>
                        <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                            Since 2015, Sacred Heart Secondary has maintained a trajectory of consistent improvement, culminating in a perfect 100% pass rate in 2024.
                        </p>
                        
                        <div className="grid grid-cols-2 gap-6">
                            <div className="p-4 rounded-2xl bg-muted/50 border border-border">
                                <p className="text-3xl font-bold text-primary mb-1">100%</p>
                                <p className="text-xs text-muted-foreground uppercase font-bold tracking-tighter">Current Pass Rate</p>
                            </div>
                            <div className="p-4 rounded-2xl bg-muted/50 border border-border">
                                <p className="text-3xl font-bold text-secondary mb-1">92%</p>
                                <p className="text-xs text-muted-foreground uppercase font-bold tracking-tighter">Distinction Rate</p>
                            </div>
                        </div>

                        <div className="mt-8 flex items-center gap-3 text-sm text-primary font-bold group cursor-pointer">
                            <Award className="w-5 h-5" />
                            <span className="border-b-2 border-primary/20 group-hover:border-primary transition-all">View all official NECTA certificates</span>
                        </div>
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
                            <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Passing Rate (2015 - 2024)</span>
                        </div>
                        
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart
                                data={resultsData}
                                margin={{ top: 60, right: 30, left: 0, bottom: 0 }}
                            >
                                <defs>
                                    <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3}/>
                                        <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                                <XAxis 
                                    dataKey="year" 
                                    axisLine={false} 
                                    tickLine={false} 
                                    tick={{ fill: 'var(--muted-foreground)', fontSize: 12, fontWeight: 600 }}
                                    dy={10}
                                />
                                <YAxis 
                                    domain={[80, 100]} 
                                    axisLine={false} 
                                    tickLine={false}
                                    tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}
                                    hide
                                />
                                <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'var(--primary)', strokeWidth: 2, strokeDasharray: '5 5' }} />
                                <Area 
                                    type="monotone" 
                                    dataKey="rate" 
                                    stroke="var(--primary)" 
                                    strokeWidth={4} 
                                    fillOpacity={1} 
                                    fill="url(#colorRate)" 
                                    animationDuration={3000}
                                    animationBegin={500}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </motion.div>
                </div>
            </div>

            {/* Background elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10 animate-pulse" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl -z-10" />
        </section>
    );
}
