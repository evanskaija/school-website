import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/shared/PageHero";
import { AnimatedCard } from "@/components/shared/AnimatedCard";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { motion } from "framer-motion";
import {
  GraduationCap, BookOpen, Users, Bus,
  Utensils, ShieldCheck, Trophy, Laptop
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import heroImage from "@/assets/graduation 2.jpg";

export default function Services() {
  const { t } = useLanguage();

  const services = [
    {
      icon: GraduationCap,
      titleKey: "services.quality.title",
      descKey: "services.quality.desc",
    },
    {
      icon: BookOpen,
      titleKey: "services.library.title",
      descKey: "services.library.desc",
    },
    {
      icon: Laptop,
      titleKey: "services.computer.title",
      descKey: "services.computer.desc",
    },
    {
      icon: Trophy,
      titleKey: "services.sports.title",
      descKey: "services.sports.desc",
    },
    {
      icon: Utensils,
      titleKey: "services.boarding.title",
      descKey: "services.boarding.desc",
    },
    {
      icon: Bus,
      titleKey: "services.transport.title",
      descKey: "services.transport.desc",
    },
    {
      icon: Users,
      titleKey: "services.counseling.title",
      descKey: "services.counseling.desc",
    },
    {
      icon: ShieldCheck,
      titleKey: "services.health.title",
      descKey: "services.health.desc",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <PageHero
        title={t("services.page.title")}
        subtitle={t("services.page.subtitle")}
        backgroundImage={heroImage}
        breadcrumbs={[
          { label: t("nav.home"), href: "/" },
          { label: t("services.page.title") }
        ]}
      />

      <main className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeader
            title={t("services.offer.title")}
            subtitle={t("services.offer.subtitle")}
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {services.map((service, index) => (
              <AnimatedCard key={service.titleKey} delay={index * 0.1}>
                <div className="p-6 h-full">
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                    <service.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{t(service.titleKey)}</h3>
                  <p className="text-muted-foreground text-sm">{t(service.descKey)}</p>
                </div>
              </AnimatedCard>
            ))}
          </div>

          {/* Call to Action */}
          <motion.div
            className="mt-20 text-center bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-12 border border-primary/20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-foreground mb-4">{t("services.cta.title")}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              {t("services.cta.desc")}
            </p>
            <a
              href="/admissions"
              className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-colors"
            >
              {t("services.cta.button")}
            </a>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
