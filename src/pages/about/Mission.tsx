import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/shared/PageHero";
import { AnimatedCard } from "@/components/shared/AnimatedCard";
import { useLanguage } from "@/contexts/LanguageContext";
import { Target, BookOpen, Heart, Users, Lightbulb, Shield } from "lucide-react";
import heroImage from "@/assets/graduation 1.jpg";

const missionPoints = [
  {
    icon: BookOpen,
    titleKey: "mission.point1.title",
    descKey: "mission.point1.desc"
  },
  {
    icon: Heart,
    titleKey: "mission.point2.title",
    descKey: "mission.point2.desc"
  },
  {
    icon: Users,
    titleKey: "mission.point3.title",
    descKey: "mission.point3.desc"
  },
  {
    icon: Lightbulb,
    titleKey: "mission.point4.title",
    descKey: "mission.point4.desc"
  },
  {
    icon: Shield,
    titleKey: "mission.point5.title",
    descKey: "mission.point5.desc"
  },
  {
    icon: Target,
    titleKey: "mission.point6.title",
    descKey: "mission.point6.desc"
  },
];

export default function Mission() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <PageHero
        title={t("about.mission.title")}
        subtitle={t("mission.hero.subtitle")}
        backgroundImage={heroImage}
        breadcrumbs={[
          { label: t("nav.about"), href: "/about" },
          { label: t("about.mission.title") }
        ]}
      />

      {/* Main Mission Statement */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-secondary/20 mb-8"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Target className="w-10 h-10 text-secondary" />
            </motion.div>
            <motion.h2
              className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-8 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              "{t("about.mission.text")}"
            </motion.h2>
            <motion.div
              className="w-24 h-1 bg-secondary mx-auto"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
          </div>
        </div>
      </section>

      {/* Mission Pillars */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <motion.span
              className="inline-block px-4 py-2 rounded-full bg-secondary/20 text-secondary font-medium text-sm mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {t("mission.commitments.badge")}
            </motion.span>
            <motion.h2
              className="font-display text-3xl md:text-4xl font-bold text-foreground"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              {t("mission.commitments.title")}
            </motion.h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {missionPoints.map((point, index) => (
              <AnimatedCard key={point.titleKey} delay={index * 0.1} variant="gold">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-secondary/20 mb-4">
                    <point.icon className="w-7 h-7 text-secondary" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-foreground mb-3">
                    {t(point.titleKey)}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {t(point.descKey)}
                  </p>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* Daily Practice */}
      <section className="py-20 bg-foreground">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-2 md:order-1"
            >
              <img
                src={heroImage}
                alt="Students learning"
                className="rounded-2xl shadow-xl"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-1 md:order-2"
            >
              <span className="inline-block px-4 py-2 rounded-full bg-secondary/20 text-secondary font-medium text-sm mb-4">
                {t("mission.practice.badge")}
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
                {t("mission.practice.title")}
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {t("mission.practice.desc")}
              </p>
              <div className="space-y-4">
                {[
                  { titleKey: "mission.practice.item1.title", descKey: "mission.practice.item1.desc" },
                  { titleKey: "mission.practice.item2.title", descKey: "mission.practice.item2.desc" },
                  { titleKey: "mission.practice.item3.title", descKey: "mission.practice.item3.desc" },
                  { titleKey: "mission.practice.item4.title", descKey: "mission.practice.item4.desc" }
                ].map((item, index) => (
                  <motion.div
                    key={item.titleKey}
                    className="flex items-start gap-4 p-4 rounded-xl bg-muted/10"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <div className="w-2 h-2 rounded-full bg-secondary mt-2 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-primary-foreground">{t(item.titleKey)}</h4>
                      <p className="text-muted-foreground text-sm">{t(item.descKey)}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
