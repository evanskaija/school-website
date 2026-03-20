import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Mail, Phone, MapPin, Send, Clock, Globe, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function ContactSection() {
    const { t } = useLanguage();

    return (
        <section id="contact" className="py-32 bg-background relative overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-20 items-start">

                    {/* Contact Info */}
                    <div className="space-y-12">
                        <div>
                            <motion.span
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="text-primary font-bold tracking-[0.3em] uppercase text-sm mb-4 block"
                            >
                                {t("contact.badge")}
                            </motion.span>
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="text-5xl md:text-7xl font-bold tracking-tight mb-8"
                            >
                                {t("contact.title")}
                            </motion.h2>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="text-xl text-muted-foreground leading-relaxed max-w-lg"
                            >
                                {t("contact.desc")}
                            </motion.p>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-8">
                            <div className="space-y-6">
                                <div className="flex gap-4 group">
                                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                        <MapPin className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm uppercase tracking-widest mb-1">{t("contact.address")}</p>
                                        <p className="text-muted-foreground">{t("footer.address")}</p>
                                    </div>
                                </div>
                                <div className="flex gap-4 group">
                                    <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0 group-hover:bg-secondary group-hover:text-white transition-all duration-300">
                                        <Phone className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm uppercase tracking-widest mb-1">{t("contact.phone")}</p>
                                        <p className="text-muted-foreground">{t("footer.phone")}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-6">
                                <div className="flex gap-4 group">
                                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                        <Mail className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm uppercase tracking-widest mb-1">{t("contact.email")}</p>
                                        <p className="text-muted-foreground">{t("footer.email")}</p>
                                    </div>
                                </div>
                                <div className="flex gap-4 group">
                                    <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0 group-hover:bg-secondary group-hover:text-white transition-all duration-300">
                                        <Clock className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm uppercase tracking-widest mb-1">{t("contact.hours")}</p>
                                        <p className="text-muted-foreground">{t("contact.hoursValue")}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Map Holder */}
                        <div className="space-y-4">
                            <div className="h-[300px] rounded-[2.5rem] bg-muted/50 border overflow-hidden relative group">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15849.208722!2d39.2202!3d-6.7025!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x185c4e09f59f9393%3A0xea1a5c4cc97c96d8!2sSacred+Heart+Secondary+School!5e0!3m2!1sen!2stz!4v1716612345678"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0, filter: "grayscale(1) invert(1) contrast(1.2) opacity(0.8)" }}
                                    allowFullScreen
                                    loading="lazy"
                                    title="Sacred Heart School Location"
                                ></iframe>
                            </div>
                            <a
                                href="https://mapcarta.com/W412339215"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-sm text-primary font-bold hover:underline ml-4"
                            >
                                <Globe className="w-4 h-4" />
                                {t("contact.map.view")}
                                <ArrowRight className="w-4 h-4" />
                            </a>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="p-12 rounded-[3.5rem] bg-card border shadow-2xl space-y-8"
                    >
                        <div className="space-y-2">
                            <h3 className="text-3xl font-bold">{t("contact.form.write")}</h3>
                            <p className="text-muted-foreground">{t("contact.form.respond")}</p>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-bold uppercase tracking-widest ml-1">{t("contact.form.name")}</label>
                                <Input placeholder="John Doe" className="bg-muted/50 border-0 h-14 rounded-2xl px-6 focus-visible:ring-primary" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold uppercase tracking-widest ml-1">{t("contact.form.email")}</label>
                                <Input placeholder="john@example.com" className="bg-muted/50 border-0 h-14 rounded-2xl px-6 focus-visible:ring-primary" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold uppercase tracking-widest ml-1">{t("contact.form.subject")}</label>
                                <Input placeholder="Admissions Inquiry" className="bg-muted/50 border-0 h-14 rounded-2xl px-6 focus-visible:ring-primary" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold uppercase tracking-widest ml-1">{t("contact.form.message")}</label>
                                <Textarea placeholder="How can we help you?" className="bg-muted/50 border-0 rounded-2xl p-6 focus-visible:ring-primary min-h-[150px]" />
                            </div>
                        </div>

                        <Button className="w-full h-16 rounded-2xl text-lg font-bold gap-3 group">
                            {t("contact.form.send")}
                            <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </Button>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
