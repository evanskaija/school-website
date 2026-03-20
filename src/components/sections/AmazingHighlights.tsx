import { motion } from "framer-motion";
import {
    GraduationCap, BookOpen, Users, Trophy,
    Laptop, Heart
} from "lucide-react";

const highlights = [
    {
        icon: GraduationCap,
        title: "Academic Excellence",
        description: "100% pass rate in national exams.",
        color: "bg-rose-500",
    },
    {
        icon: BookOpen,
        title: "Modern Curriculum",
        description: "STEM & digital literacy focused.",
        color: "bg-indigo-500",
    },
    {
        icon: Trophy,
        title: "Championship Sports",
        description: "Winning teams in every field.",
        color: "bg-amber-500",
    },
    {
        icon: Laptop,
        title: "Innovation Hub",
        description: "Robotics & AI labs.",
        color: "bg-emerald-500",
    },
    {
        icon: Users,
        title: "Expert Faculty",
        description: "Masters & PhD qualified teachers.",
        color: "bg-violet-500",
    },
    {
        icon: Heart,
        title: "Holistic Care",
        description: "Mental & physical well-being.",
        color: "bg-cyan-500",
    }
];

export function AmazingHighlights() {
    return (
        <section className="py-32 bg-background relative overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-5xl font-bold tracking-tight text-foreground"
                        >
                            Why Sacred Heart?
                        </motion.h2>
                    </div>
                    <motion.p
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="text-xl text-muted-foreground max-w-sm"
                    >
                        Detailed attention to every aspect of the student experience.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {highlights.map((item, index) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05, duration: 0.5 }}
                            whileHover={{ y: -5 }}
                            className="group p-8 rounded-[2rem] bg-secondary/5 border border-white/5 hover:bg-secondary/10 transition-colors"
                        >
                            <div className={`w-12 h-12 rounded-2xl ${item.color} flex items-center justify-center mb-6`}>
                                <item.icon className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-2xl font-semibold mb-2">{item.title}</h3>
                            <p className="text-muted-foreground text-lg">{item.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
