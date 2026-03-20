import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/shared/PageHero";
import { AnimatedCard } from "@/components/shared/AnimatedCard";
import { useLanguage } from "@/contexts/LanguageContext";
import { Eye, Target, Lightbulb, Globe, Award, Users } from "lucide-react";
import heroImage from "@/assets/graduation 2.jpg";

const visionPoints = [
  {
    icon: Globe,
    titleKey: "vision.point1.title",
    descKey: "vision.point1.desc"
  },
  {
    icon: Lightbulb,
    titleKey: "vision.point2.title",
    descKey: "vision.point2.desc"
  },
  {
    icon: Award,
    titleKey: "vision.point3.title",
    descKey: "vision.point3.desc"
  },
  {
    icon: Users,
    titleKey: "vision.point4.title",
    descKey: "vision.point4.desc"
  },
];

export default function Vision() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <PageHero
        title={t("about.vision.title")}
        subtitle={t("vision.hero.subtitle")}
        backgroundImage={heroImage}
        breadcrumbs={[
          { label: t("nav.about"), href: "/about" },
          { label: t("about.vision.title") }
        ]}
      />

      {/* Main Vision Statement */}
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
              <Eye className="w-10 h-10 text-secondary" />
            </motion.div>
            <motion.h2
              className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-8 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              "{t("about.vision.text")}"
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

      {/* Vision Pillars */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <motion.span
              className="inline-block px-4 py-2 rounded-full bg-secondary/20 text-secondary font-medium text-sm mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {t("vision.pillars.badge")}
            </motion.span>
            <motion.h2
              className="font-display text-3xl md:text-4xl font-bold text-foreground"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              {t("vision.pillars.title")}
            </motion.h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {visionPoints.map((point, index) => (
              <AnimatedCard key={point.titleKey} delay={index * 0.1}>
                <div className="flex gap-5">
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 rounded-xl bg-secondary/20 flex items-center justify-center">
                      <point.icon className="w-7 h-7 text-secondary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold text-foreground mb-2">
                      {t(point.titleKey)}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {t(point.descKey)}
                    </p>
                  </div>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* Vision in Action */}
      <section className="py-20 bg-foreground">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-2 rounded-full bg-secondary/20 text-secondary font-medium text-sm mb-4">
                {t("vision.action.badge")}
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
                {t("vision.action.title")}
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {t("vision.action.desc")}
              </p>
              <ul className="space-y-4">
                {[
                  "vision.action.item1",
                  "vision.action.item2",
                  "vision.action.item3",
                  "vision.action.item4"
                ].map((key, index) => (
                  <motion.li
                    key={index}
                    className="flex items-start gap-3 text-primary-foreground/80"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <Target className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                    {t(key)}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img
                src={heroImage}
                alt="Students in classroom"
                className="rounded-2xl shadow-xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
