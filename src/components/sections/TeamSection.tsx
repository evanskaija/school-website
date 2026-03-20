import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { User, Linkedin, Mail, Twitter } from "lucide-react";
import paulImg from "@/assets/uploads/Mr paul.jpg";
import sarahImg from "@/assets/uploads/Madam sarah.jpg";
import samsonImg from "@/assets/uploads/Mr samson.jpg";
import eliasImg from "@/assets/uploads/Mr elias.jpg";
import doreenImg from "@/assets/uploads/Madam doreen.jpg";
import fridaImg from "@/assets/uploads/Madam frida.jpg";

const team = [
    {
        name: "Mr. Samson",
        roleKey: "team.head",
        image: samsonImg,
    },
    {
        name: "Madam Sarah",
        roleKey: "team.academic",
        image: sarahImg,
    },
    {
        name: "Mr. Paul",
        roleKey: "team.humanities",
        image: paulImg,
    },
    {
        name: "Mr. Elias",
        roleKey: "team.academic",
        image: eliasImg,
    },
    {
        name: "Madam Doreen",
        roleKey: "team.humanities",
        image: doreenImg,
    },
    {
        name: "Madam Frida",
        roleKey: "team.academic",
        image: fridaImg,
    },
];

export function TeamSection() {
    const { t } = useLanguage();

    return (
        <section className="py-32 bg-background relative overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto text-center mb-20">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-primary font-bold tracking-[0.3em] uppercase text-sm mb-4 block"
                    >
                        {t("team.badge")}
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-5xl md:text-7xl font-bold tracking-tight mb-8"
                    >
                        {t("team.title")}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-muted-foreground leading-relaxed"
                    >
                        {t("team.desc")}
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {team.map((member, idx) => (
                        <motion.div
                            key={member.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="group relative"
                        >
                            <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] bg-muted/50 border mb-6">
                                {member.image ? (
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/5 to-secondary/5">
                                        <User className="w-24 h-24 text-primary/20 group-hover:scale-110 transition-transform duration-500" />
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                                    <button className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                                        <Linkedin className="w-5 h-5" />
                                    </button>
                                    <button className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                                        <Twitter className="w-5 h-5" />
                                    </button>
                                    <button className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                                        <Mail className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                            <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">{member.name}</h3>
                            <p className="text-muted-foreground font-medium uppercase tracking-widest text-sm">{t(member.roleKey)}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
