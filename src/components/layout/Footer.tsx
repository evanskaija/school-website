import { motion } from "framer-motion";
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, Send, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import sacredLogo from "@/assets/sacred-logo.png";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function Footer() {
  const { t } = useLanguage();

  const footerLinks = {
    [t("footer.quickLinks")]: [
      { name: t("nav.home"), href: "/" },
      { name: t("footer.nursery"), href: "/nursery" },
      { name: t("footer.primary"), href: "/primary" },
      { name: t("footer.secondary"), href: "/academics" },
      { name: t("nav.studentLife"), href: "/student-life" },
      { name: t("nav.admissions"), href: "/admissions" },
      { name: t("nav.news"), href: "/news" },
    ],
    [t("footer.portals")]: [
      { name: t("auth.login"), href: "/auth" },
      { name: t("footer.student.portal"), href: "/student" },
      { name: t("footer.teacher.portal"), href: "/teacher" },
      { name: t("footer.parent.portal"), href: "/parent" },
    ],
    [t("nav.facilities")]: [
      { name: t("facility.library"), href: "/facilities/library" },
      { name: t("facility.computerLab"), href: "/facilities/computer-lab" },
      { name: t("facility.biologyLab"), href: "/facilities/biology-lab" },
      { name: t("nav.gallery"), href: "/gallery" },
    ],
  };

  return (
    <footer className="bg-[#0A0A0A] text-white pt-24 pb-12 relative overflow-hidden border-t border-white/5">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-secondary/5 blur-[150px] rounded-full" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-20">

          {/* Brand Column */}
          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <img src={sacredLogo} alt="Sacred Heart" className="h-16 w-auto mb-6 brightness-0 invert object-contain" />
              <p className="text-neutral-400 text-lg leading-relaxed max-w-sm mb-8 font-medium italic">
                &ldquo;{t("footer.tagline")}&rdquo;
              </p>
              <div className="flex gap-3">
                {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                  <motion.a
                    key={i}
                    href="#"
                    whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.2)" }}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 transition-colors"
                  >
                    <Icon className="w-5 h-5 text-white/80" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([category, links], idx) => (
            <div key={category} className="lg:col-span-2">
              <motion.h4
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="font-bold text-sm tracking-[0.2em] uppercase mb-8 text-primary"
              >
                {category}
              </motion.h4>
              <ul className="space-y-4">
                {links.map((link, lIdx) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: (idx * 0.1) + (lIdx * 0.05) }}
                  >
                    <Link to={link.href} className="text-neutral-400 hover:text-white transition-colors flex items-center group">
                      <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-all -ml-5 group-hover:ml-0" />
                      {link.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact & Newsletter Column */}
          <div className="lg:col-span-2">
            <motion.h4
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-bold text-sm tracking-[0.2em] uppercase mb-8 text-primary"
            >
              {t("footer.contactUs")}
            </motion.h4>
            <ul className="space-y-6">
              <li className="flex items-start gap-4 text-neutral-400 group/addr">
                <MapPin className="w-5 h-5 text-primary shrink-0" />
                <a
                  href="https://mapcarta.com/W412339215"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium leading-relaxed hover:text-primary transition-colors"
                >
                  {t("footer.address")}
                </a>
              </li>
              <li className="flex items-center gap-4 text-neutral-400">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <span className="text-sm font-medium">{t("footer.phone")}</span>
              </li>
              <li className="flex items-center gap-4 text-neutral-400">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <span className="text-sm font-medium">{t("footer.email")}</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 text-neutral-500 text-sm">
            <p>© 2026 Sacred Heart Secondary School. {t("footer.rights")}</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-primary transition-colors">{t("footer.privacyPolicy")}</a>
              <a href="#" className="hover:text-primary transition-colors">{t("footer.termsOfService")}</a>
            </div>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs text-neutral-400">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            {t("footer.system.online")} • {t("footer.secure")}
          </div>
        </div>
      </div>
    </footer>
  );
}
