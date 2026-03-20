import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight, BookOpen, Users, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import graduation1 from "@/assets/graduation 1.jpg";
import graduation2 from "@/assets/graduation 2.jpg";
import staff from "@/assets/staff.jpg";

interface Slide {
  id: number;
  image: string;
  titleKey: string;
  subtitleKey: string;
}

const slides: Slide[] = [
  {
    id: 1,
    image: graduation1,
    titleKey: "Celebrating Excellence",
    subtitleKey: "Honoring our graduates' achievements",
  },
  {
    id: 2,
    image: graduation2,
    titleKey: "Future Leaders",
    subtitleKey: "Equipping students for success",
  },
  {
    id: 3,
    image: staff,
    titleKey: "Dedicated Faculty",
    subtitleKey: "Committed to quality education",
  },
];

const stats = [
  { icon: Users, valueKey: "1,200+", labelKey: "hero.students" },
  { icon: BookOpen, valueKey: "50+", labelKey: "hero.teachers" },
  { icon: Award, valueKey: "95%", labelKey: "hero.passRate" },
];

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const { t } = useLanguage();

  const [direction, setDirection] = useState(0);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 1.1,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 1.05,
    }),
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24">
      {/* Background Slides */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentSlide}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.5 },
            scale: { duration: 0.5 }
          }}
          className="absolute inset-0 z-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/60 to-foreground/40" />
        </motion.div>
      </AnimatePresence>

      {/* Decorative Elements - lower z-index and no pointer events */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl z-0 pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl z-0 pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-20">
        <div className="max-w-3xl lg:max-w-4xl">
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/30 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-sm font-medium text-primary-foreground">
              {t("hero.badge")}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            className="font-display text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-primary-foreground leading-tight mb-4 md:mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {t("hero.title1")}{" "}
            <span className="text-gradient-gold">{t("hero.title2")}</span>{" "}
            <span className="text-primary">{t("hero.title3")}</span>
          </motion.h1>

          {/* Slide Title */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="mb-4"
            >
              <h2 className="font-display text-xl sm:text-2xl text-secondary font-semibold">
                {slides[currentSlide].titleKey}
              </h2>
              <p className="text-primary-foreground/80">
                {slides[currentSlide].subtitleKey}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Description */}
          <motion.p
            className="text-base md:text-lg text-primary-foreground/80 max-w-xl mb-6 md:mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {t("hero.description")}
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 mb-12 relative z-30"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Button variant="hero" size="xl" className="relative z-30">
              {t("hero.cta1")}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="hero-outline" size="xl" className="relative z-30">
              {t("hero.cta2")}
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-3 gap-4 md:gap-6 pt-6 md:pt-8 border-t border-primary-foreground/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {stats.map((stat) => (
              <div key={stat.labelKey}>
                <div className="flex items-center gap-1.5 md:gap-2 mb-1 md:mb-2">
                  <stat.icon className="h-4 w-4 md:h-5 md:w-5 text-secondary" />
                  <span className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-primary-foreground">
                    {stat.valueKey}
                  </span>
                </div>
                <p className="text-xs md:text-sm text-primary-foreground/70">{t(stat.labelKey)}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full glass-card hover:bg-primary/20 transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6 text-primary-foreground" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full glass-card hover:bg-primary/20 transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6 text-primary-foreground" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${index === currentSlide
              ? "bg-primary w-8"
              : "bg-primary-foreground/30 hover:bg-primary-foreground/50"
              }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.2 }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-primary-foreground/70">{t("hero.scroll")}</span>
          <div className="w-6 h-10 border-2 border-primary-foreground/30 rounded-full flex justify-center pt-2">
            <motion.div
              className="w-1.5 h-1.5 bg-primary rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
