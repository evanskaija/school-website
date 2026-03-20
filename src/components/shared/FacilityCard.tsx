import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface FacilityCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  image: string;
  href: string;
  delay?: number;
}

export function FacilityCard({
  icon: Icon,
  title,
  description,
  image,
  href,
  delay = 0,
}: FacilityCardProps) {
  const { t } = useLanguage();

  return (
    <motion.div
      className="group relative overflow-hidden rounded-2xl bg-card shadow-lg border-l-4 border-l-secondary hover:shadow-xl transition-all duration-500"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent" />
        
        {/* Icon Badge */}
        <div className="absolute bottom-4 left-4 p-3 rounded-xl bg-secondary text-secondary-foreground">
          <Icon className="w-6 h-6" />
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-display text-xl font-bold text-foreground mb-2">
          {title}
        </h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {description}
        </p>
        <Button variant="outline" size="sm" asChild className="group/btn">
          <Link to={href}>
            {t("news.readMore")}
            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
          </Link>
        </Button>
      </div>
    </motion.div>
  );
}
