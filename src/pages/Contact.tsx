import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/shared/PageHero";
import { motion } from "framer-motion";
import {
  MapPin, Phone, Mail, Clock,
  Send, Facebook, Twitter, Instagram, Youtube, Globe, ArrowRight
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import heroImage from "@/assets/staff.jpg";

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Youtube, href: "#", label: "YouTube" },
];

export default function Contact() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const contactInfo = [
    {
      icon: MapPin,
      titleKey: "contact.info.address",
      details: [t("footer.address")],
    },
    {
      icon: Phone,
      titleKey: "contact.info.phone",
      details: [t("footer.phone")],
    },
    {
      icon: Mail,
      titleKey: "contact.info.email",
      details: [t("footer.email")],
    },
    {
      icon: Clock,
      titleKey: "contact.info.hours",
      details: [t("contact.hoursValue")],
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));

    toast({
      title: t("contact.form.success.title"),
      description: t("contact.form.success.desc"),
    });

    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <PageHero
        title={t("nav.contact")}
        subtitle={t("contact.page.hero.subtitle")}
        backgroundImage={heroImage}
        breadcrumbs={[
          { label: t("nav.home"), href: "/" },
          { label: t("nav.contact") }
        ]}
      />

      <main className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold text-foreground mb-6">{t("contact.page.sendMsg")}</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">{t("contact.form.fullname")} *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-card border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      placeholder={t("contact.form.name.placeholder")}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">{t("contact.form.email")} *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-card border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">{t("contact.form.phone.label")}</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 bg-card border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      placeholder="+255 XXX XXX XXX"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">{t("contact.form.subject")} *</label>
                    <select
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 bg-card border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    >
                      <option value="">{t("contact.form.subject.placeholder")}</option>
                      <option value="admissions">{t("contact.form.admissions")}</option>
                      <option value="academics">{t("contact.form.academic")}</option>
                      <option value="fees">{t("contact.form.fees")}</option>
                      <option value="general">{t("contact.form.general")}</option>
                      <option value="other">{t("contact.form.other")}</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">{t("contact.form.message")} *</label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 bg-card border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                    placeholder={t("contact.form.msg.placeholder")}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full md:w-auto px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                      {t("contact.form.sending")}
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      {t("contact.form.sendMsg")}
                    </>
                  )}
                </button>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h2 className="text-2xl font-bold text-foreground mb-6">{t("contact.page.info")}</h2>

              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <div
                    key={index}
                    className="flex gap-4 p-4 bg-card rounded-xl border border-border"
                  >
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <item.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{t(item.titleKey)}</h3>
                      {item.details.map((detail, i) => (
                        <p key={i} className="text-muted-foreground text-sm">{detail}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Links */}
              <div className="mt-8">
                <h3 className="font-semibold text-foreground mb-4">{t("contact.follow")}</h3>
                <div className="flex gap-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      className="w-12 h-12 bg-card border border-border rounded-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
                      aria-label={social.label}
                    >
                      <social.icon className="h-5 w-5" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Map */}
              <div className="mt-8 space-y-4">
                <h3 className="font-semibold text-foreground mb-4">{t("contact.findUs")}</h3>
                <div className="bg-card rounded-xl border border-border overflow-hidden h-64 relative group">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15849.208722!2d39.2202!3d-6.7025!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x185c4e09f59f9393%3A0xea1a5c4cc97c96d8!2sSacred+Heart+Secondary+School!5e0!3m2!1sen!2stz!4v1716612345678"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Sacred Heart Location"
                  />
                </div>
                <a
                  href="https://mapcarta.com/W412339215"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-primary font-bold hover:underline transition-all"
                >
                  <Globe className="h-4 w-4" />
                  {t("contact.map.viewMapcarta")}
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
