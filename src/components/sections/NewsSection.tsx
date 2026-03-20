import { motion } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const newsItems = [
  {
    date: "Dec 20, 2025",
    categoryKey: "news.category.announcement",
    titleKey: "news.item1.title",
    descriptionKey: "news.item1.desc",
    featured: true,
  },
  {
    date: "Dec 15, 2025",
    categoryKey: "news.category.achievement",
    titleKey: "news.item2.title",
    descriptionKey: "news.item2.desc",
    featured: false,
  },
  {
    date: "Dec 10, 2025",
    categoryKey: "news.category.event",
    titleKey: "news.item3.title",
    descriptionKey: "news.item3.desc",
    featured: false,
  },
  {
    date: "Dec 5, 2025",
    categoryKey: "news.category.news",
    titleKey: "news.item4.title",
    descriptionKey: "news.item4.desc",
    featured: false,
  },
];

export function NewsSection() {
  const { t } = useLanguage();

  return (
    <section id="news" className="py-32 container mx-auto px-6">
      <div className="flex items-center justify-between mb-16">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight">{t("news.badge")}.</h2>
        <Button variant="link" className="text-primary text-lg">{t("news.viewAll")}</Button>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Featured Item */}
        <motion.div
          className="bg-black text-white rounded-[2rem] p-10 flex flex-col justify-end min-h-[500px] relative overflow-hidden group cursor-pointer"
          whileHover={{ scale: 1.01 }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
          {/* Abstract BG or Image would go here */}
          <div className="absolute inset-0 bg-secondary/20 group-hover:bg-secondary/30 transition-colors" />

          <div className="relative z-20">
            <span className="inline-block px-4 py-1 rounded-full bg-white/20 backdrop-blur-md text-sm font-medium mb-4">
              {t(newsItems[0].categoryKey)}
            </span>
            <h3 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">{t(newsItems[0].titleKey)}</h3>
            <p className="text-white/80 text-lg mb-6">{t(newsItems[0].descriptionKey)}</p>
            <div className="flex items-center gap-2 font-medium">{t("news.readMore")} <ArrowRight className="w-4 h-4" /></div>
          </div>
        </motion.div>

        {/* List of other items */}
        <div className="grid gap-6">
          {newsItems.slice(1).map((item, idx) => (
            <motion.div
              key={item.titleKey}
              className="bg-muted/20 hover:bg-muted/40 p-8 rounded-[2rem] flex flex-col justify-center transition-colors cursor-pointer"
              whileHover={{ scale: 1.01 }}
              transition={{ delay: idx * 0.1 }}
            >
              <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
                <span className="font-semibold text-primary">{t(item.categoryKey)}</span>
                <span>•</span>
                <span>{item.date}</span>
              </div>
              <h3 className="text-xl font-bold mb-2">{t(item.titleKey)}</h3>
              <p className="text-muted-foreground">{t(item.descriptionKey)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
