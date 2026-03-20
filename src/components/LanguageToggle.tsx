import { motion } from "framer-motion";
import { Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <motion.button
      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors text-sm font-medium"
      onClick={() => setLanguage(language === "en" ? "sw" : "en")}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      aria-label={`Switch to ${language === "en" ? "Swahili" : "English"}`}
    >
      <Globe className="h-4 w-4 text-primary" />
      <span className="text-foreground">{language === "en" ? "SW" : "EN"}</span>
    </motion.button>
  );
}
