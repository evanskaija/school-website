import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/shared/PageHero";
import { AnimatedCard } from "@/components/shared/AnimatedCard";
import { useLanguage } from "@/contexts/LanguageContext";
import { FlaskConical, Beaker, Shield, Users, BookOpen, Thermometer, Droplets } from "lucide-react";
import heroImage from "@/assets/lab.jpg";

const features = [
    { icon: FlaskConical, title: "Chemical Reagents", description: "Complete range of analytical grade chemicals" },
    { icon: Beaker, title: "Glassware", description: "Standard laboratory glassware for all experiments" },
    { icon: Shield, title: "Safety Stations", description: "Integrated eyewash and safety shower stations" },
    { icon: Thermometer, title: "Heating Equipment", description: "Bunsen burners, hot plates, and incubators" },
    { icon: Droplets, title: "Distilled Water", description: "Continuous supply of distilled water for experiments" },
    { icon: Users, title: "Spacious Layout", description: "Designed for safe group experiments" },
];

const experiments = [
    "Acid-Base Titrations",
    "Qualitative Analysis of Ions",
    "Rates of Reaction",
    "Enthalpy Changes",
    "Organic Synthesis",
    "Redox Reactions",
    "Equilibrium Studies",
    "Electrochemistry"
];

const equipment = [
    { name: "Digital Balances", quantity: "10" },
    { name: "Spectrophotometers", quantity: "2" },
    { name: "Centrifuge", quantity: "4" },
    { name: "Fume Hoods", quantity: "2" },
    { name: "Magnetic Stirrers", quantity: "15" },
    { name: "Distillation Kits", quantity: "8" },
];

export default function ChemistryLab() {
    const { t } = useLanguage();

    return (
        <div className="min-h-screen bg-background">
            <Header />

            <PageHero
                title="Chemistry Laboratory"
                subtitle="Exploring the building blocks of matter through scientific discovery."
                backgroundImage={heroImage}
                breadcrumbs={[
                    { label: "Facilities", href: "/facilities/library" },
                    { label: "Chemistry Lab" }
                ]}
            />

            {/* Features */}
            <section className="py-20">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-12">
                        <motion.span
                            className="inline-block px-4 py-2 rounded-full bg-primary/20 text-primary font-medium text-sm mb-4"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            Lab Features
                        </motion.span>
                        <motion.h2
                            className="font-display text-3xl md:text-4xl font-bold text-foreground"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                        >
                            Advanced Chemical Research
                        </motion.h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {features.map((feature, index) => (
                            <AnimatedCard key={feature.title} delay={index * 0.1}>
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                                        <feature.icon className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-display text-lg font-bold text-foreground mb-1">
                                            {feature.title}
                                        </h3>
                                        <p className="text-muted-foreground text-sm">
                                            {feature.description}
                                        </p>
                                    </div>
                                </div>
                            </AnimatedCard>
                        ))}
                    </div>
                </div>
            </section>

            {/* Equipment & Experiments */}
            <section className="py-20 bg-muted/30">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Equipment */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <FlaskConical className="w-8 h-8 text-primary" />
                                <h2 className="font-display text-2xl font-bold text-foreground">
                                    Laboratory Equipment
                                </h2>
                            </div>
                            <div className="space-y-3">
                                {equipment.map((item, index) => (
                                    <motion.div
                                        key={item.name}
                                        className="flex items-center justify-between p-4 bg-card rounded-xl border-l-4 border-l-primary"
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.4, delay: index * 0.1 }}
                                    >
                                        <span className="text-foreground font-medium">{item.name}</span>
                                        <span className="text-primary font-bold">{item.quantity}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Experiments */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <BookOpen className="w-8 h-8 text-primary" />
                                <h2 className="font-display text-2xl font-bold text-foreground">
                                    Practical Experiments
                                </h2>
                            </div>
                            <div className="grid grid-cols-1 gap-3">
                                {experiments.map((experiment, index) => (
                                    <motion.div
                                        key={experiment}
                                        className="flex items-center gap-3 p-4 bg-card rounded-xl border-l-4 border-l-accent"
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.4, delay: index * 0.05 }}
                                    >
                                        <div className="w-2 h-2 rounded-full bg-accent" />
                                        <span className="text-foreground">{experiment}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Safety Guidelines */}
            <section className="py-20 bg-foreground">
                <div className="container mx-auto px-6">
                    <div className="max-w-3xl mx-auto">
                        <div className="text-center mb-10">
                            <motion.div
                                className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mb-6"
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                            >
                                <Shield className="w-8 h-8 text-primary" />
                            </motion.div>
                            <motion.h2
                                className="font-display text-3xl font-bold text-primary-foreground"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                            >
                                Chemistry Safety Protocol
                            </motion.h2>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                            {[
                                "Wear lab coat and safety goggles at all times",
                                "Ensure proper ventilation when handling chemicals",
                                "Never taste or smell chemicals directly",
                                "Clean spills immediately according to protocol",
                                "Handle concentrated acids with extreme caution",
                                "Always label all contains and reagents"
                            ].map((rule, index) => (
                                <motion.div
                                    key={index}
                                    className="flex items-start gap-3 p-4 rounded-xl bg-muted/10"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: index * 0.1 }}
                                >
                                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                                        <span className="text-primary text-sm font-bold">{index + 1}</span>
                                    </div>
                                    <span className="text-primary-foreground/80">{rule}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
