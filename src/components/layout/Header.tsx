import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { LanguageToggle } from "@/components/LanguageToggle";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link, useLocation } from "react-router-dom";
import sacredLogo from "@/assets/sacred-logo.png";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { t } = useLanguage();
  const location = useLocation();

  const navLinks = [
    { name: t("nav.home"), href: "/" },
    {
      name: t("nav.academics"),
      href: "/academics",
      dropdown: [
        { name: t("school.siimaName") + " (Nursery)", href: "/nursery" },
        { name: t("school.siimaName") + " (Primary)", href: "/primary" },
        { name: t("school.name"), href: "/academics" },
        { name: t("nav.results"), href: "/results" },
      ]
    },
    { name: t("nav.studentLife"), href: "/student-life" },
    { name: t("nav.services"), href: "/services" },
    {
      name: t("nav.about"),
      href: "/about",
      dropdown: [
        { name: t("nav.about"), href: "/about" },
        { name: t("nav.vision"), href: "/about/vision" },
        { name: t("nav.mission"), href: "/about/mission" },
      ]
    },
    { name: t("nav.admissions"), href: "/admissions" },
    { name: t("nav.news"), href: "/news" },
    { name: t("nav.students"), href: "/students" },
    { name: t("nav.staff"), href: "/staff" },
    {
      name: t("nav.facilities"),
      href: "/facilities/library",
      dropdown: [
        { name: t("facility.library"), href: "/facilities/library" },
        { name: t("facility.computerLab"), href: "/facilities/computer-lab" },
        { name: t("facility.biologyLab"), href: "/facilities/biology-lab" },
        { name: t("facility.diningHall"), href: "/facilities/dining-hall" },
      ]
    },
    { name: t("nav.gallery"), href: "/gallery" },
    { name: t("nav.contact"), href: "/contact" },
  ];

  const isActive = (href: string) => location.pathname === href || location.pathname.startsWith(href + "/");

  return (
    <header className="fixed top-0 left-0 right-0 z-50 safe-area-inset">
      <div className="glass-card mx-2 sm:mx-4 mt-2 sm:mt-4 rounded-xl sm:rounded-2xl border border-white/10 shadow-2xl">
        <div className="container mx-auto px-3 sm:px-6 py-2 sm:py-3">
          <div className="flex items-center justify-between">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
              <Link to="/" className="flex items-center gap-2 sm:gap-3 active:scale-95 transition-transform touch-manipulation">
                <img src={sacredLogo} alt="Sacred Heart Secondary School Logo" className="h-10 sm:h-12 w-auto" />
                <div className="hidden xs:block sm:block">
                  <h1 className="font-display text-base sm:text-lg font-bold text-foreground leading-tight">{t("school.name.short")}</h1>
                  <p className="text-[10px] sm:text-xs text-muted-foreground">{t("school.type.secondary")}</p>
                </div>
              </Link>
            </motion.div>

            <nav className="hidden xl:flex items-center gap-1">
              {navLinks.map((link) => (
                <div key={link.name} className="relative" onMouseEnter={() => link.dropdown && setActiveDropdown(link.name)} onMouseLeave={() => setActiveDropdown(null)}>
                  <Link to={link.href} className={`flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors rounded-lg hover:bg-muted/50 ${isActive(link.href) ? "text-primary" : "text-foreground/80 hover:text-primary"}`}>
                    {link.name}
                    {link.dropdown && <ChevronDown className={`h-4 w-4 transition-transform ${activeDropdown === link.name ? 'rotate-180' : ''}`} />}
                  </Link>
                  {link.dropdown && (
                    <AnimatePresence>
                      {activeDropdown === link.name && (
                        <motion.div className="absolute top-full left-0 mt-2 w-48 bg-card border border-border rounded-xl shadow-lg overflow-hidden z-50" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
                          {link.dropdown.map((item) => (
                            <Link key={item.name} to={item.href} className="block px-4 py-3 text-sm text-foreground/80 hover:text-primary hover:bg-muted/50 transition-colors">{item.name}</Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              ))}
            </nav>

            <motion.div className="hidden xl:flex items-center gap-3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
              <LanguageToggle />
              <ThemeToggle />
            </motion.div>

            <button
              className="xl:hidden p-3 -mr-2 rounded-xl hover:bg-muted/50 active:bg-muted active:scale-95 transition-all touch-manipulation"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6 text-foreground" /> : <Menu className="h-6 w-6 text-foreground" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="xl:hidden glass-card mx-2 sm:mx-4 mt-2 rounded-xl sm:rounded-2xl overflow-hidden max-h-[75vh] overflow-y-auto overscroll-contain border border-white/10 shadow-2xl"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <nav className="py-3 sm:py-4">
              <div className="px-4 sm:px-6 pb-4 flex justify-between items-center gap-3">
                <div className="flex gap-2">
                  <LanguageToggle />
                  <ThemeToggle />
                </div>
              </div>
              {navLinks.map((link) => (
                <div key={link.name}>
                  <Link
                    to={link.href}
                    className={`block px-4 sm:px-6 py-3.5 font-medium transition-all active:bg-muted touch-manipulation ${isActive(link.href) ? "text-primary bg-muted/50" : "text-foreground/80 hover:text-primary hover:bg-muted/50"}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                  {link.dropdown?.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className="block px-8 sm:px-10 py-2.5 text-sm text-muted-foreground hover:text-primary active:bg-muted/50 transition-all touch-manipulation"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}