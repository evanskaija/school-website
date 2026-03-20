import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/shared/PageHero";
import { AnimatedCard } from "@/components/shared/AnimatedCard";
import { useLanguage } from "@/contexts/LanguageContext";
import { BookOpen, Clock, Users, Search, Wifi, BookMarked, Headphones, Coffee } from "lucide-react";
import heroImage from "@/assets/lib.jpeg";

const features = [
  { icon: BookOpen, title: "50,000+ Books", description: "Extensive collection of textbooks, reference materials, and literature" },
  { icon: Search, title: "Digital Catalog", description: "Easy-to-use online catalog system for quick book searches" },
  { icon: Wifi, title: "Free WiFi", description: "High-speed internet access for research and study" },
  { icon: Headphones, title: "Quiet Zones", description: "Dedicated quiet areas for focused individual study" },
  { icon: Users, title: "Group Study Rooms", description: "Private rooms for collaborative learning and discussions" },
  { icon: Coffee, title: "Reading Lounge", description: "Comfortable seating areas for relaxed reading" },
];

const resources = [
  { category: "Science & Mathematics", count: "12,000+" },
  { category: "Arts & Humanities", count: "8,500+" },
  { category: "Reference Materials", count: "5,000+" },
  { category: "Periodicals & Journals", count: "200+" },
  { category: "Digital Resources", count: "1,000+" },
  { category: "Past Papers Archive", count: "15 Years" },
];

const hours = [
  { day: "Monday - Friday", time: "7:00 AM - 9:00 PM" },
  { day: "Saturday", time: "8:00 AM - 5:00 PM" },
  { day: "Sunday", time: "10:00 AM - 4:00 PM" },
];

export default function Library() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <PageHero
        title={t("facility.library")}
        subtitle={t("facility.library.desc")}
        backgroundImage={heroImage}
        breadcrumbs={[
          { label: "Facilities", href: "/facilities/library" },
          { label: t("facility.library") }
        ]}
      />

      {/* Features Grid */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <motion.span
              className="inline-block px-4 py-2 rounded-full bg-secondary/20 text-secondary font-medium text-sm mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Library Features
            </motion.span>
            <motion.h2
              className="font-display text-3xl md:text-4xl font-bold text-foreground"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              A World of Knowledge Awaits
            </motion.h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <AnimatedCard key={feature.title} delay={index * 0.1}>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-secondary" />
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

      {/* Collection & Hours */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Collection */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <BookMarked className="w-8 h-8 text-secondary" />
                <h2 className="font-display text-2xl font-bold text-foreground">
                  Our Collection
                </h2>
              </div>
              <div className="space-y-4">
                {resources.map((resource, index) => (
                  <motion.div
                    key={resource.category}
                    className="flex items-center justify-between p-4 bg-card rounded-xl border-l-4 border-l-secondary"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <span className="text-foreground font-medium">{resource.category}</span>
                    <span className="text-secondary font-bold">{resource.count}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Hours */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <Clock className="w-8 h-8 text-secondary" />
                <h2 className="font-display text-2xl font-bold text-foreground">
                  Opening Hours
                </h2>
              </div>
              <div className="bg-foreground rounded-2xl p-8">
                <div className="space-y-6">
                  {hours.map((schedule, index) => (
                    <motion.div
                      key={schedule.day}
                      className="flex items-center justify-between pb-4 border-b border-muted/20 last:border-0"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <span className="text-primary-foreground">{schedule.day}</span>
                      <span className="text-secondary font-bold">{schedule.time}</span>
                    </motion.div>
                  ))}
                </div>
                <p className="text-muted-foreground text-sm mt-6">
                  * Extended hours during examination periods
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <motion.h2
              className="font-display text-3xl font-bold text-foreground"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Library Gallery
            </motion.h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((_, index) => (
              <motion.div
                key={index}
                className="relative aspect-square rounded-2xl overflow-hidden"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <img
                  src={heroImage}
                  alt={`Library view ${index + 1}`}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
