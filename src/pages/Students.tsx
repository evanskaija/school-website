import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/shared/PageHero";
import { AnimatedCard } from "@/components/shared/AnimatedCard";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { motion } from "framer-motion";
import {
  BookOpen, Trophy, Users, Calendar,
  GraduationCap, Heart, Star, Award
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import heroImage from "@/assets/graduation 1.jpg";

const achievements = [
  { year: "2024", title: "Regional Science Competition - 1st Place" },
  { year: "2024", title: "National Debate Championship - Semi Finals" },
  { year: "2023", title: "Inter-School Athletics - Champions" },
  { year: "2023", title: "Mathematics Olympiad - Gold Medal" },
  { year: "2022", title: "Drama Festival - Best Performance" },
];

const studentLeaders = [
  { name: "Maria Joseph", positionKey: "life.headGirl", form: "Form 6" },
  { name: "Emmanuel Mwamba", positionKey: "life.headBoy", form: "Form 6" },
  { name: "Grace Kimaro", positionKey: "life.academicPrefect", form: "Form 5" },
  { name: "David Njau", positionKey: "life.sportsCapt", form: "Form 5" },
];

export default function Students() {
  const { t } = useLanguage();

  const studentLife = [
    {
      icon: BookOpen,
      titleKey: "students.life.clubs.title",
      descKey: "students.life.clubs.desc",
    },
    {
      icon: Trophy,
      titleKey: "students.life.sports.title",
      descKey: "students.life.sports.desc",
    },
    {
      icon: Heart,
      titleKey: "students.life.service.title",
      descKey: "students.life.service.desc",
    },
    {
      icon: Star,
      titleKey: "students.life.arts.title",
      descKey: "students.life.arts.desc",
    },
  ];

  const stats = [
    { labelKey: "students.stat.total", value: "1,247", icon: Users },
    { labelKey: "students.stat.form14", value: "980", icon: BookOpen },
    { labelKey: "students.stat.form56", value: "267", icon: GraduationCap },
    { labelKey: "students.stat.boarders", value: "856", icon: Calendar },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <PageHero
        title={t("students.page.title")}
        subtitle={t("students.page.subtitle")}
        backgroundImage={heroImage}
        breadcrumbs={[
          { label: t("nav.home"), href: "/" },
          { label: t("students.page.title") }
        ]}
      />

      <main className="py-20">
        <div className="container mx-auto px-4 lg:px-8">

          {/* Student Statistics */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {stats.map((stat, index) => (
              <div
                key={stat.labelKey}
                className="bg-card rounded-xl p-6 border-l-4 border-secondary text-center"
              >
                <stat.icon className="h-8 w-8 text-secondary mx-auto mb-3" />
                <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                <p className="text-muted-foreground text-sm">{t(stat.labelKey)}</p>
              </div>
            ))}
          </motion.div>

          {/* Student Life */}
          <SectionHeader
            title={t("students.life.title")}
            subtitle={t("students.life.subtitle")}
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {studentLife.map((item, index) => (
              <AnimatedCard key={item.titleKey} delay={index * 0.1}>
                <div className="p-6 text-center">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <item.icon className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="font-bold text-foreground mb-2">{t(item.titleKey)}</h3>
                  <p className="text-muted-foreground text-sm">{t(item.descKey)}</p>
                </div>
              </AnimatedCard>
            ))}
          </div>

          {/* Student Leaders */}
          <div className="mt-20">
            <SectionHeader
              title={t("students.leaders.title")}
              subtitle={t("students.leaders.subtitle")}
            />

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
              {studentLeaders.map((leader, index) => (
                <AnimatedCard key={leader.name} delay={index * 0.1}>
                  <div className="p-6 text-center">
                    <div className="w-20 h-20 bg-muted rounded-full mx-auto mb-4 flex items-center justify-center">
                      <Users className="h-10 w-10 text-muted-foreground" />
                    </div>
                    <h3 className="font-bold text-foreground">{leader.name}</h3>
                    <p className="text-primary font-medium text-sm">{t(leader.positionKey)}</p>
                    <p className="text-muted-foreground text-xs">{leader.form}</p>
                  </div>
                </AnimatedCard>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div className="mt-20">
            <SectionHeader
              title={t("students.achievements.title")}
              subtitle={t("students.achievements.subtitle")}
            />

            <motion.div
              className="mt-12 bg-card rounded-2xl border border-border p-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="space-y-4">
                {achievements.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                  >
                    <Award className="h-6 w-6 text-secondary flex-shrink-0" />
                    <div className="flex-1">
                      <p className="font-semibold text-foreground">{item.title}</p>
                    </div>
                    <span className="px-3 py-1 bg-secondary/10 text-secondary font-medium text-sm rounded-full">
                      {item.year}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Student Portal CTA */}
          <motion.div
            className="mt-20 text-center bg-gradient-to-r from-accent/10 to-primary/10 rounded-2xl p-12 border border-accent/20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <GraduationCap className="h-16 w-16 text-accent mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-foreground mb-4">{t("students.portal.title")}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              {t("students.portal.desc")}
            </p>
            <a
              href="/student"
              className="inline-flex items-center justify-center px-8 py-4 bg-accent text-accent-foreground rounded-xl font-semibold hover:bg-accent/90 transition-colors"
            >
              {t("students.portal.button")}
            </a>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
