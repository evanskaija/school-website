import { motion } from "framer-motion";
import { ChevronRight, Home } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeroProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  breadcrumbs?: BreadcrumbItem[];
}

export function PageHero({ title, subtitle, backgroundImage, breadcrumbs }: PageHeroProps) {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        {backgroundImage ? (
          <img
            src={backgroundImage}
            alt=""
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-secondary via-secondary/90 to-secondary/80" />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/95 via-foreground/85 to-foreground/70" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-secondary/20 blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-primary/20 blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, delay: 2 }}
        />
      </div>

      {/* Gold Border Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-secondary to-transparent" />

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10 pt-24 pb-16">
        {/* Breadcrumbs */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <motion.nav
            className="flex items-center gap-2 text-sm mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              to="/"
              className="text-secondary/80 hover:text-secondary transition-colors flex items-center gap-1"
            >
              <Home className="w-4 h-4" />
              {t("nav.home")}
            </Link>
            {breadcrumbs.map((item, index) => (
              <span key={index} className="flex items-center gap-2">
                <ChevronRight className="w-4 h-4 text-muted-foreground/60" />
                {item.href ? (
                  <Link
                    to={item.href}
                    className="text-secondary/80 hover:text-secondary transition-colors"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-primary-foreground">{item.label}</span>
                )}
              </span>
            ))}
          </motion.nav>
        )}

        {/* Title */}
        <motion.h1
          className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {title}
        </motion.h1>

        {/* Subtitle */}
        {subtitle && (
          <motion.p
            className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {subtitle}
          </motion.p>
        )}

        {/* Gold Accent Line */}
        <motion.div
          className="w-24 h-1 bg-secondary mt-6"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        />
      </div>
    </section>
  );
}
