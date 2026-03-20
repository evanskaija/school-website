import { motion } from "framer-motion";
import { Eye, Heart, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export function AboutSection() {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-32 container mx-auto px-6">
      <div className="max-w-3xl mb-16">
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
          {t("about.title1")} <br />
          <span className="text-muted-foreground">{t("about.legacy")}</span>
        </h2>
        <p className="text-xl text-muted-foreground leading-relaxed">
          {t("about.description")}
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Mission Card */}
        <motion.div
          className="bg-neutral-900 text-white rounded-[2.5rem] p-10 flex flex-col justify-between min-h-[400px]"
          whileHover={{ scale: 1.01 }}
        >
          <div>
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mb-6 backdrop-blur-md">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="text-3xl font-bold mb-4">{t("about.mission.title")}</h3>
            <p className="text-white/70 text-lg leading-relaxed">
              {t("about.mission.text")}
            </p>
          </div>
          <div className="text-sm font-medium tracking-widest uppercase opacity-50 mt-8"> Sacred Heart </div>
        </motion.div>

        {/* Vision Card */}
        <motion.div
          className="bg-neutral-100 dark:bg-white/5 rounded-[2.5rem] p-10 flex flex-col justify-between min-h-[400px]"
          whileHover={{ scale: 1.01 }}
        >
          <div>
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-6">
              <Eye className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-3xl font-bold mb-4">{t("about.vision.title")}</h3>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {t("about.vision.text")}
            </p>
          </div>
        </motion.div>

        {/* Values Card - Split rows if needed, or vertical list */}
        <motion.div
          className="bg-white dark:bg-black border border-neutral-200 dark:border-white/10 rounded-[2.5rem] p-10 flex flex-col justify-center min-h-[400px]"
          whileHover={{ scale: 1.01 }}
        >
          <h3 className="text-2xl font-bold mb-8">{t("about.values.title")}</h3>
          <ul className="space-y-6">
            {["about.value1", "about.value2", "about.value3", "about.value4"].map((key) => (
              <li key={key} className="flex items-center gap-4">
                <CheckCircle2 className="w-6 h-6 text-green-500" />
                <span className="text-lg font-medium">{t(key)}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
