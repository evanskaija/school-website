import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/shared/PageHero";
import { AnimatedCard } from "@/components/shared/AnimatedCard";
import { useLanguage } from "@/contexts/LanguageContext";
import { Atom, Zap, Gauge, Users, BookOpen, Shield, Settings } from "lucide-react";
import heroImage from "@/assets/physics.jpg";

const features = [
    { icon: Atom, title: "Modern Physics Kits", description: "Equipment for atomic and nuclear physics experiments" },
    { icon: Zap, title: "Electricity & Magnetism", description: "Circuit boards, power supplies, and magnetic apparatus" },
    { icon: Gauge, title: "Precision Measuring", description: "Digital vernier calipers, micrometers, and stopwatches" },
    { icon: Settings, title: "Mechanics Station", description: "Pulleys, inclined planes, and force tables" },
    { icon: Gauge, title: "Optics Bench", description: "Lasers, lenses, prisms, and optical benches" },
    { icon: Users, title: "Team Research", description: "Collaborative workspaces for physics projects" },
];

const experiments = [
    "Newtons Laws of Motion",
    "Ohm's Law & Circuit Analysis",
    "Wave Interference & Diffraction",
    "Thermodynamic Cycles",
    "Electromagnetic Induction",
    "Photoelectric Effect",
    "Projectile Motion Studies",
    "Pendulum & SHM Analysis"
];

const equipment = [
    { name: "Digital Oscilloscopes", quantity: "6" },
    { name: "Laser Sources", quantity: "12" },
    { name: "Multimeters", quantity: "40" },
    { name: "Power Supplies", quantity: "20" },
    { name: "Air Tracks", quantity: "5" },
    { name: "Van de Graaff Generator", quantity: "1" },
];

export default function PhysicsLab() {
    const { t } = useLanguage();

    return (
        <div className="min-h-screen bg-background">
            <Header />

            <PageHero
                title="Physics Laboratory"
                subtitle="Unveiling the fundamental laws of the universe through experimentation."
                backgroundImage={heroImage}
                breadcrumbs={[
                    { label: "Facilities", href: "/facilities/library" },
                    { label: "Physics Lab" }
                ]}
            />

            {/* Features */}
            <section className="py-20">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-12">
                        <motion.span
                            className="inline-block px-4 py-2 rounded-full bg-blue-500/20 text-blue-500 font-medium text-sm mb-4"
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
                            Experimental Physics Excellence
                        </motion.h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {features.map((feature, index) => (
                            <AnimatedCard key={feature.title} delay={index * 0.1}>
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                                        <feature.icon className="w-6 h-6 text-blue-500" />
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
                                <Gauge className="w-8 h-8 text-blue-500" />
                                <h2 className="font-display text-2xl font-bold text-foreground">
                                    Physics Apparatus
                                </h2>
                            </div>
                            <div className="space-y-3">
                                {equipment.map((item, index) => (
                                    <motion.div
                                        key={item.name}
                                        className="flex items-center justify-between p-4 bg-card rounded-xl border-l-4 border-l-blue-500"
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.4, delay: index * 0.1 }}
                                    >
                                        <span className="text-foreground font-medium">{item.name}</span>
                                        <span className="text-blue-500 font-bold">{item.quantity}</span>
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
                                <BookOpen className="w-8 h-8 text-blue-500" />
                                <h2 className="font-display text-2xl font-bold text-foreground">
                                    Practical Experiments
                                </h2>
                            </div>
                            <div className="grid grid-cols-1 gap-3">
                                {experiments.map((experiment, index) => (
                                    <motion.div
                                        key={experiment}
                                        className="flex items-center gap-3 p-4 bg-card rounded-xl border-l-4 border-l-secondary"
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.4, delay: index * 0.05 }}
                                    >
                                        <div className="w-2 h-2 rounded-full bg-secondary" />
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
                                className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-500/20 mb-6"
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                            >
                                <Shield className="w-8 h-8 text-blue-500" />
                            </motion.div>
                            <motion.h2
                                className="font-display text-3xl font-bold text-primary-foreground"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                            >
                                Physics Lab Safety
                            </motion.h2>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                            {[
                                "Turn off power supplies when making circuit changes",
                                "Do not look directly into laser beams",
                                "Handle heavy apparatus with proper care",
                                "Ensure all electrical connections are secure",
                                "Report any frayed cables or broken glass",
                                "Keep working area clear of unnecessary items"
                            ].map((rule, index) => (
                                <motion.div
                                    key={index}
                                    className="flex items-start gap-3 p-4 rounded-xl bg-muted/10"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: index * 0.1 }}
                                >
                                    <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                                        <span className="text-blue-500 text-sm font-bold">{index + 1}</span>
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
