import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/shared/PageHero";
import { AnimatedCard } from "@/components/shared/AnimatedCard";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { useLanguage } from "@/contexts/LanguageContext";
import heroImage from "@/assets/graduation 1.jpg";

interface NewsEvent {
  id: string;
  title: string;
  excerpt: string | null;
  content: string | null;
  category: string;
  image_url: string | null;
  published_at: string;
  is_event: boolean;
  event_date: string | null;
  event_time: string | null;
}

export default function NewsEvents() {
  const { t } = useLanguage();
  const [news, setNews] = useState<NewsEvent[]>([]);
  const [events, setEvents] = useState<NewsEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedArticle, setSelectedArticle] = useState<NewsEvent | null>(null);

  useEffect(() => {
    fetchNewsAndEvents();
  }, []);

  const fetchNewsAndEvents = async () => {
    const { data, error } = await supabase
      .from("news_events")
      .select("*")
      .eq("is_published", true)
      .order("published_at", { ascending: false });

    if (error) {
      console.error("Error fetching news:", error);
    } else {
      const newsItems = data?.filter(item => !item.is_event) || [];
      const eventItems = data?.filter(item => item.is_event) || [];
      setNews(newsItems);
      setEvents(eventItems);
    }
    setLoading(false);
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMMM d, yyyy");
    } catch {
      return dateString;
    }
  };

  const formatEventDate = (dateString: string | null) => {
    if (!dateString) return { month: "", day: "" };
    try {
      const date = new Date(dateString);
      return {
        month: format(date, "MMM"),
        day: format(date, "d"),
      };
    } catch {
      return { month: "", day: "" };
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <PageHero
        title={t("nav.news")}
        subtitle={t("news.page.hero.subtitle")}
        backgroundImage={heroImage}
        breadcrumbs={[
          { label: t("nav.home"), href: "/" },
          { label: t("nav.news") }
        ]}
      />

      <main className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-12">
              {/* News Section */}
              <div className="lg:col-span-2">
                <SectionHeader
                  title={t("news.page.latest")}
                  subtitle={t("news.page.latest.subtitle")}
                />

                <div className="mt-8 space-y-6">
                  {news.length === 0 ? (
                    <p className="text-muted-foreground text-center py-10">{t("news.page.noArticles")}</p>
                  ) : (
                    news.map((item, index) => (
                      <AnimatedCard key={item.id} delay={index * 0.1}>
                        <div className="flex flex-col md:flex-row gap-6 p-6">
                          {item.image_url && (
                            <img
                              src={item.image_url}
                              alt={item.title}
                              className="w-full md:w-48 h-40 object-cover rounded-lg"
                            />
                          )}
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                                {item.category}
                              </span>
                              <span className="text-muted-foreground text-sm flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                {formatDate(item.published_at)}
                              </span>
                            </div>
                            <h3
                              className="text-xl font-bold text-foreground mb-2 hover:text-primary transition-colors cursor-pointer"
                              onClick={() => setSelectedArticle(item)}
                            >
                              {item.title}
                            </h3>
                            <p className="text-muted-foreground text-sm mb-4">{item.excerpt}</p>
                            <button
                              onClick={() => setSelectedArticle(item)}
                              className="inline-flex items-center text-primary font-medium text-sm hover:gap-2 transition-all"
                            >
                              {t("news.page.readMore")} <ArrowRight className="h-4 w-4 ml-1" />
                            </button>
                          </div>
                        </div>
                      </AnimatedCard>
                    ))
                  )}
                </div>
              </div>

              {/* Events Sidebar */}
              <div className="lg:col-span-1">
                <motion.div
                  className="sticky top-32"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                    <Calendar className="h-6 w-6 text-secondary" />
                    {t("news.page.upcoming")}
                  </h2>

                  <div className="bg-card rounded-xl border border-border overflow-hidden">
                    {events.length === 0 ? (
                      <p className="text-muted-foreground text-center py-10 px-4">{t("news.page.noEvents")}</p>
                    ) : (
                      events.map((event) => {
                        const eventDate = formatEventDate(event.event_date);
                        return (
                          <div
                            key={event.id}
                            className="p-4 border-b border-border last:border-0 hover:bg-muted/50 transition-colors cursor-pointer"
                            onClick={() => setSelectedArticle(event)}
                          >
                            <div className="flex gap-4">
                              <div className="w-14 h-14 bg-primary/10 rounded-lg flex flex-col items-center justify-center flex-shrink-0">
                                <span className="text-xs text-primary font-medium">{eventDate.month}</span>
                                <span className="text-lg font-bold text-primary">{eventDate.day}</span>
                              </div>
                              <div>
                                <h3 className="font-semibold text-foreground text-sm">{event.title}</h3>
                                {event.event_time && (
                                  <p className="text-muted-foreground text-xs flex items-center gap-1 mt-1">
                                    <Clock className="h-3 w-3" /> {event.event_time}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>

                  <a
                    href="/gallery"
                    className="block mt-4 text-center py-3 bg-secondary text-secondary-foreground rounded-lg font-medium hover:bg-secondary/90 transition-colors"
                  >
                    {t("news.page.viewGallery")}
                  </a>
                </motion.div>
              </div>
            </div>
          )}

          {/* Article Modal */}
          {selectedArticle && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={() => setSelectedArticle(null)}
            >
              <motion.div
                className="bg-card max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-2xl"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                onClick={(e) => e.stopPropagation()}
              >
                {selectedArticle.image_url && (
                  <img
                    src={selectedArticle.image_url}
                    alt={selectedArticle.title}
                    className="w-full h-64 object-cover"
                  />
                )}
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
                      {selectedArticle.category}
                    </span>
                    <span className="text-muted-foreground text-sm">
                      {formatDate(selectedArticle.published_at)}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">{selectedArticle.title}</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {selectedArticle.content || selectedArticle.excerpt}
                  </p>
                  {selectedArticle.is_event && selectedArticle.event_date && (
                    <div className="mt-6 p-4 bg-muted rounded-lg">
                      <p className="font-semibold text-foreground flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-primary" />
                        {formatDate(selectedArticle.event_date)}
                      </p>
                      {selectedArticle.event_time && (
                        <p className="text-muted-foreground flex items-center gap-2 mt-2">
                          <Clock className="h-5 w-5" />
                          {selectedArticle.event_time}
                        </p>
                      )}
                    </div>
                  )}
                  <button
                    onClick={() => setSelectedArticle(null)}
                    className="mt-6 px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
                  >
                    {t("news.page.close")}
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}