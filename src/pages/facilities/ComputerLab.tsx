import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/shared/PageHero";
import { AnimatedCard } from "@/components/shared/AnimatedCard";
import { useLanguage } from "@/contexts/LanguageContext";
import { Monitor, Wifi, Printer, Code, Shield, Headphones, Clock, Users } from "lucide-react";
import heroImage from "@/assets/computer-lab (1).jpg";

const features = [
  { icon: Monitor, title: "50+ Workstations", description: "Modern computers with latest specifications" },
  { icon: Wifi, title: "High-Speed Internet", description: "Fiber optic connection for seamless browsing" },
  { icon: Printer, title: "Printing Services", description: "Color and black & white printing available" },
  { icon: Code, title: "Programming Software", description: "Visual Studio, Python, Java development tools" },
  { icon: Shield, title: "Antivirus Protection", description: "Enterprise-level security for all systems" },
  { icon: Headphones, title: "Audio/Video Editing", description: "Adobe Creative Suite for multimedia projects" },
];

const courses = [
  "Introduction to Computing",
  "Microsoft Office Suite",
  "Web Development (HTML, CSS, JavaScript)",
  "Python Programming",
  "Database Management",
  "Graphic Design Basics",
  "Cyber Security Awareness",
  "Digital Literacy"
];

const specs = [
  { label: "Processor", value: "Intel Core i5 / AMD Ryzen 5" },
  { label: "RAM", value: "16GB DDR4" },
  { label: "Storage", value: "512GB SSD" },
  { label: "Display", value: "24\" Full HD Monitor" },
  { label: "Internet Speed", value: "100 Mbps Fiber" },
  { label: "Operating System", value: "Windows 11 Pro" },
];

export default function ComputerLab() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <PageHero
        title={t("facility.computerLab")}
        subtitle={t("facility.computerLab.desc")}
        backgroundImage={heroImage}
        breadcrumbs={[
          { label: "Facilities", href: "/facilities/library" },
          { label: t("facility.computerLab") }
        ]}
      />

      {/* Features */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <motion.span
              className="inline-block px-4 py-2 rounded-full bg-secondary/20 text-secondary font-medium text-sm mb-4"
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
              State-of-the-Art Computing
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

      {/* Specs & Courses */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Specifications */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <Monitor className="w-8 h-8 text-secondary" />
                <h2 className="font-display text-2xl font-bold text-foreground">
                  System Specifications
                </h2>
              </div>
              <div className="bg-foreground rounded-2xl p-6">
                {specs.map((spec, index) => (
                  <motion.div
                    key={spec.label}
                    className="flex items-center justify-between py-4 border-b border-muted/20 last:border-0"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <span className="text-muted-foreground">{spec.label}</span>
                    <span className="text-secondary font-semibold">{spec.value}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Courses */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <Code className="w-8 h-8 text-secondary" />
                <h2 className="font-display text-2xl font-bold text-foreground">
                  Courses Offered
                </h2>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {courses.map((course, index) => (
                  <motion.div
                    key={course}
                    className="flex items-center gap-3 p-4 bg-card rounded-xl border-l-4 border-l-secondary"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                  >
                    <div className="w-2 h-2 rounded-full bg-secondary" />
                    <span className="text-foreground">{course}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Lab Hours */}
      <section className="py-20 bg-foreground">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div
              className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary/20 mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <Clock className="w-8 h-8 text-secondary" />
            </motion.div>
            <motion.h2
              className="font-display text-3xl font-bold text-primary-foreground mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Lab Operating Hours
            </motion.h2>
            <motion.div
              className="grid grid-cols-2 gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="p-6 rounded-xl bg-muted/10">
                <p className="text-muted-foreground mb-2">Weekdays</p>
                <p className="text-secondary font-bold text-xl">7:00 AM - 8:00 PM</p>
              </div>
              <div className="p-6 rounded-xl bg-muted/10">
                <p className="text-muted-foreground mb-2">Weekends</p>
                <p className="text-secondary font-bold text-xl">9:00 AM - 4:00 PM</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
