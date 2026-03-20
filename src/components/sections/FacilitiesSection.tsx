import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FlaskConical, Microscope, Atom, MonitorSmartphone, BookOpen, Dumbbell } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import biologyImg from "@/assets/biology.jpg";
import physicsImg from "@/assets/physics.jpg";
import chemImg from "@/assets/lab.jpg";
import compImg from "@/assets/computer-lab (1).jpg";
import libImg from "@/assets/lib.jpeg";

const facilities = [
  { icon: FlaskConical, nameKey: "facility.biologyLab", descriptionKey: "facility.biologyLab.desc", image: chemImg, href: "/facilities/chemistry-lab" },
  { icon: MonitorSmartphone, nameKey: "facility.computerLab", descriptionKey: "facility.computerLab.desc", image: compImg, href: "/facilities/computer-lab" },
  { icon: BookOpen, nameKey: "facility.library", descriptionKey: "facility.library.desc", image: libImg, href: "/facilities/library" },
  { icon: Dumbbell, nameKey: "facility.sportsComplex", descriptionKey: "facility.sportsComplex.desc", image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop", href: "/gallery" },
  { icon: Atom, nameKey: "facility.physicsLab", descriptionKey: "facility.physicsLab.desc", image: physicsImg, href: "/facilities/physics-lab" },
  { icon: Microscope, nameKey: "facility.chemistryLab", descriptionKey: "facility.chemistryLab.desc", image: biologyImg, href: "/facilities/biology-lab" },
];

export function FacilitiesSection() {
  const { t } = useLanguage();

  return (
    <section id="facilities" className="py-32 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary font-semibold tracking-wider uppercase text-sm mb-4 block"
          >
            {t("facilities.badge")}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold tracking-tight mb-6"
          >
            {t("facilities.title1")} <span className="text-muted-foreground">{t("facilities.title2")}</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-xl max-w-2xl mx-auto"
          >
            {t("facilities.description")}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {facilities.map((facility, index) => (
            <Link key={facility.nameKey} to={facility.href}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="group relative overflow-hidden rounded-[2.5rem] bg-muted/30 aspect-[4/5] flex flex-col justify-end p-8 transition-all hover:bg-muted/50"
              >
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                  <img
                    src={facility.image}
                    alt={t(facility.nameKey)}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity group-hover:opacity-90" />
                </div>

                {/* Content */}
                <div className="relative z-10 transition-transform duration-500 group-hover:translate-y-[-10px]">
                  <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:border-primary transition-colors duration-500">
                    <facility.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{t(facility.nameKey)}</h3>
                  <p className="text-white/70 text-base leading-relaxed group-hover:text-white transition-colors">
                    {t(facility.descriptionKey)}
                  </p>
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileHover={{ opacity: 1, x: 0 }}
                    className="mt-6 flex items-center gap-2 text-white font-medium text-sm group-hover:opacity-100 opacity-0 transition-opacity"
                  >
                    {t("facility.explore")} <div className="w-5 h-[1px] bg-white" />
                  </motion.div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
