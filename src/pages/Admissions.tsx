import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/shared/PageHero";
import { AnimatedCard } from "@/components/shared/AnimatedCard";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { motion } from "framer-motion";
import {
  FileText, Calendar, CheckCircle, Clock,
  Download, Phone, Mail, MapPin
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import heroImage from "@/assets/uploads/Evans kai.jpg";

const requirements = [
  "admissions.req.psle",
  "admissions.req.birth",
  "admissions.req.photo",
  "admissions.req.medical",
  "admissions.req.reports",
  "admissions.req.id",
];

const steps = [
  { step: 1, titleKey: "admissions.step1.title", descKey: "admissions.step1.desc" },
  { step: 2, titleKey: "admissions.step2.title", descKey: "admissions.step2.desc" },
  { step: 3, titleKey: "admissions.step3.title", descKey: "admissions.step3.desc" },
  { step: 4, titleKey: "admissions.step4.title", descKey: "admissions.step4.desc" },
  { step: 5, titleKey: "admissions.step5.title", descKey: "admissions.step5.desc" },
  { step: 6, titleKey: "admissions.step6.title", descKey: "admissions.step6.desc" },
];

const fees = [
  { itemKey: "admissions.fee.tuition", amount: "450,000" },
  { itemKey: "admissions.fee.boarding", amount: "350,000" },
  { itemKey: "admissions.fee.dev", amount: "100,000" },
  { itemKey: "admissions.fee.reg", amount: "50,000" },
  { itemKey: "admissions.fee.uniform", amount: "200,000" },
];

export default function Admissions() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <PageHero
        title={t("nav.admissions")}
        subtitle={t("admissions.hero.subtitle")}
        backgroundImage={heroImage}
        breadcrumbs={[
          { label: t("nav.home"), href: "/" },
          { label: t("nav.admissions") }
        ]}
      />

      <main className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Important Dates */}
          <motion.div
            className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-8 text-primary-foreground mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <Calendar className="h-8 w-8" />
              <h2 className="text-2xl font-bold">{t("admissions.dates.title")}</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <p className="font-semibold">{t("admissions.dates.opens")}</p>
                <p className="opacity-90">January 2, 2025</p>
              </div>
              <div>
                <p className="font-semibold">{t("admissions.dates.deadline")}</p>
                <p className="opacity-90">March 31, 2025</p>
              </div>
              <div>
                <p className="font-semibold">{t("admissions.dates.exam")}</p>
                <p className="opacity-90">April 15, 2025</p>
              </div>
            </div>
          </motion.div>

          {/* Admission Process */}
          <SectionHeader
            title={t("admissions.process.title")}
            subtitle={t("admissions.process.subtitle")}
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {steps.map((item, index) => (
              <AnimatedCard key={item.step} delay={index * 0.1}>
                <div className="p-6 flex gap-4">
                  <div className="w-12 h-12 bg-secondary text-secondary-foreground rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-1">{t(item.titleKey)}</h3>
                    <p className="text-muted-foreground text-sm">{t(item.descKey)}</p>
                  </div>
                </div>
              </AnimatedCard>
            ))}
          </div>

          {/* Requirements */}
          <div className="mt-20">
            <SectionHeader
              title={t("admissions.requirements.title")}
              subtitle={t("admissions.requirements.subtitle")}
            />

            <motion.div
              className="mt-12 bg-card rounded-2xl border border-border p-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="grid md:grid-cols-2 gap-4">
                {requirements.map((req, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{t(req)}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Fee Structure */}
          <div className="mt-20">
            <SectionHeader
              title={t("admissions.fees.title")}
              subtitle={t("admissions.fees.subtitle")}
            />

            <motion.div
              className="mt-12 bg-card rounded-2xl border border-border overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <table className="w-full">
                <thead className="bg-muted">
                  <tr>
                    <th className="text-left p-4 font-semibold text-foreground">{t("staff.filters.reset")} Item</th>
                    <th className="text-right p-4 font-semibold text-foreground">Amount (TZS)</th>
                  </tr>
                </thead>
                <tbody>
                  {fees.map((fee, index) => (
                    <tr key={index} className="border-t border-border">
                      <td className="p-4 text-foreground">{t(fee.itemKey)}</td>
                      <td className="p-4 text-right font-semibold text-primary">{fee.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          </div>

          {/* Download & Contact */}
          <div className="mt-20 grid md:grid-cols-2 gap-8">
            <motion.div
              className="bg-secondary/10 rounded-2xl p-8 border border-secondary/20"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Download className="h-10 w-10 text-secondary mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-2">{t("admissions.download.title")}</h3>
              <p className="text-muted-foreground mb-6">
                {t("admissions.download.desc")}
              </p>
              <button className="px-6 py-3 bg-secondary text-secondary-foreground rounded-lg font-semibold hover:bg-secondary/90 transition-colors">
                {t("admissions.download.button")}
              </button>
            </motion.div>

            <motion.div
              className="bg-primary/10 rounded-2xl p-8 border border-primary/20"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Phone className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-2">{t("admissions.help.title")}</h3>
              <p className="text-muted-foreground mb-6">
                {t("admissions.help.desc")}
              </p>
              <div className="space-y-2 text-foreground">
                <p className="flex items-center gap-2"><Phone className="h-4 w-4" /> +255 123 456 789</p>
                <p className="flex items-center gap-2"><Mail className="h-4 w-4" /> admissions@sacredheart.ac.tz</p>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
