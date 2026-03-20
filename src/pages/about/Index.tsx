import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { AnimatedCard } from "@/components/shared/AnimatedCard";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Users, Award, BookOpen, Target, Eye, Heart,
  GraduationCap, ArrowRight, CheckCircle2
} from "lucide-react";
import heroImage from "@/assets/graduation 1.jpg";
import guardianImage from "@/assets/school guadian.jpg";

import fridaImg from "@/assets/uploads/Madam frida.jpg";
import samsonImg from "@/assets/uploads/Mr samson.jpg";
import sarahImg from "@/assets/uploads/Madam sarah.jpg";
import paulImg from "@/assets/uploads/Mr paul.jpg";

const stats = [
  { icon: GraduationCap, value: "2,500+", labelKey: "hero.students" },
  { icon: Users, value: "120+", labelKey: "hero.teachers" },
  { icon: Award, value: "98%", labelKey: "hero.passRate" },
  { icon: BookOpen, value: "40+", labelKey: "hero.yearsExcellence" },
];

const values = [
  { titleKey: "about.value1", icon: Award },
  { titleKey: "about.value2", icon: Heart },
  { titleKey: "about.value3", icon: Users },
  { titleKey: "about.value4", icon: Target },
];

const leadership = [
  { name: "Madam Frida", role: "Principal", image: fridaImg },
  { name: "Mr. Samson", role: "Deputy Principal - Academics", image: samsonImg },
  { name: "Madam Sarah", role: "Deputy Principal - Administration", image: sarahImg },
  { name: "Mr. Paul", role: "Dean of Students", image: paulImg },
];

export default function About() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <PageHero
        title={t("nav.about")}
        subtitle={t("about.description")}
        backgroundImage={heroImage}
        breadcrumbs={[{ label: t("nav.about") }]}
      />

      {/* Stats Section */}
      <section className="py-16 bg-foreground">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.labelKey}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary/20 mb-4">
                  <stat.icon className="w-8 h-8 text-secondary" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-primary-foreground mb-2">
                  {stat.value}
                </div>
                <div className="text-muted-foreground">{t(stat.labelKey)}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* History Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-2 rounded-full bg-secondary/20 text-secondary font-medium text-sm mb-4">
                {t("about.badge")}
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                {t("about.title1")} <span className="text-secondary">1985</span>
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {t("about.description")}
              </p>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                {t("about.history.desc")}
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild className="btn-glow-gold bg-secondary text-secondary-foreground hover:bg-secondary/90">
                  <Link to="/about/vision">
                    <Eye className="w-4 h-4 mr-2" />
                    {t("nav.vision")}
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/about/mission">
                    <Target className="w-4 h-4 mr-2" />
                    {t("nav.mission")}
                  </Link>
                </Button>
              </div>
            </motion.div>
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img
                src={heroImage}
                alt="School Campus"
                className="rounded-2xl shadow-xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-secondary text-secondary-foreground p-6 rounded-xl shadow-lg">
                <div className="text-4xl font-bold">40+</div>
                <div className="text-sm">{t("hero.yearsExcellence")}</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* School Guardian Section */}
      <section className="py-20 bg-muted/20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              className="relative order-2 md:order-1"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img
                src={guardianImage}
                alt="School Guardian"
                className="rounded-2xl shadow-xl w-full max-w-md mx-auto aspect-[3/4] object-cover"
              />
            </motion.div>
            <motion.div
              className="order-1 md:order-2"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-2 rounded-full bg-primary/20 text-primary font-medium text-sm mb-4">
                {t("about.guardian.badge")}
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                {t("about.guardian.title")}
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {t("about.guardian.desc1")}
              </p>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                {t("about.guardian.desc2")}
              </p>
              <div>
                <h4 className="font-display text-xl font-bold text-foreground">
                  {t("about.guardian.name")}
                </h4>
                <p className="text-primary font-medium">{t("about.guardian.role")}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <SectionHeader
            badge={t("about.values.title")}
            title={t("about.values.title")}
            subtitle={t("about.values.subtitle")}
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <AnimatedCard key={value.titleKey} delay={index * 0.1} variant="gold">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-secondary/20 mb-4">
                    <value.icon className="w-7 h-7 text-secondary" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-foreground">
                    {t(value.titleKey)}
                  </h3>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <SectionHeader
            badge={t("about.leadership.badge")}
            title={t("about.leadership.title")}
            subtitle={t("about.leadership.subtitle")}
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {leadership.map((leader, index) => (
              <motion.div
                key={leader.name}
                className="group text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="relative mb-4 overflow-hidden rounded-2xl">
                  <img
                    src={leader.image}
                    alt={leader.name}
                    className="w-full aspect-[3/4] object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <h3 className="font-display text-lg font-bold text-foreground mb-1">
                  {leader.name}
                </h3>
                <p className="text-secondary text-sm">{leader.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-foreground">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              {t("about.cta.title")}
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              {t("about.cta.desc")}
            </p>
            <Button asChild size="lg" className="btn-glow-gold bg-secondary text-secondary-foreground hover:bg-secondary/90">
              <Link to="/admissions">
                {t("nav.apply")}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
