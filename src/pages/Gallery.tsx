import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { X, ZoomIn } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import heroImage from "@/assets/graduation 2.jpg";

interface GalleryImage {
  id: string;
  title: string;
  description: string | null;
  image_url: string;
  category: string;
  is_featured: boolean;
}

export default function Gallery() {
  const { t } = useLanguage();
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  // Categories with translatable labels mapped to their DB values
  const categories = [
    { label: t("gallery.cat.all"), value: "All" },
    { label: t("gallery.cat.campus"), value: "Campus" },
    { label: t("gallery.cat.academics"), value: "Academics" },
    { label: t("gallery.cat.sports"), value: "Sports" },
    { label: t("gallery.cat.facilities"), value: "Facilities" },
    { label: t("gallery.cat.events"), value: "Events" },
  ];

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    const { data, error } = await supabase
      .from("gallery")
      .select("*")
      .order("is_featured", { ascending: false })
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching gallery:", error);
    } else {
      setImages(data || []);
    }
    setLoading(false);
  };

  const filteredImages = activeCategory === "All"
    ? images
    : images.filter(img => img.category === activeCategory);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <PageHero
        title={t("gallery.hero.title")}
        subtitle={t("gallery.hero.subtitle")}
        backgroundImage={heroImage}
        breadcrumbs={[
          { label: t("nav.home"), href: "/" },
          { label: t("nav.gallery") }
        ]}
      />

      <main className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeader
            title={t("gallery.page.title")}
            subtitle={t("gallery.page.subtitle")}
          />

          {/* Category Filter */}
          <motion.div
            className="flex flex-wrap justify-center gap-3 mt-8 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${activeCategory === cat.value
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
              >
                {cat.label}
              </button>
            ))}
          </motion.div>

          {/* Gallery Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="aspect-[4/3] bg-muted animate-pulse rounded-xl" />
              ))}
            </div>
          ) : (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              layout
            >
              <AnimatePresence>
                {filteredImages.map((image, index) => (
                  <motion.div
                    key={image.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className={`group relative overflow-hidden rounded-xl cursor-pointer ${image.is_featured ? "md:col-span-2 md:row-span-2" : ""
                      }`}
                    onClick={() => setSelectedImage(image)}
                  >
                    <div className={`${image.is_featured ? "aspect-square" : "aspect-[4/3]"}`}>
                      <img
                        src={image.image_url}
                        alt={image.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className="text-white font-bold text-lg">{image.title}</h3>
                        <p className="text-white/80 text-sm">{image.category}</p>
                      </div>
                      <div className="absolute top-4 right-4">
                        <ZoomIn className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    {image.is_featured && (
                      <div className="absolute top-4 left-4 px-3 py-1 bg-secondary text-secondary-foreground text-xs font-bold rounded-full">
                        {t("gallery.featured")}
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}

          {filteredImages.length === 0 && !loading && (
            <div className="text-center py-20">
              <p className="text-muted-foreground">{t("gallery.noImages")}</p>
            </div>
          )}
        </div>
      </main>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-4 right-4 p-2 text-white hover:text-primary transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X className="h-8 w-8" />
            </button>
            <motion.div
              className="max-w-5xl w-full"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.image_url}
                alt={selectedImage.title}
                className="w-full max-h-[80vh] object-contain rounded-lg"
              />
              <div className="mt-4 text-center">
                <h3 className="text-white font-bold text-xl">{selectedImage.title}</h3>
                {selectedImage.description && (
                  <p className="text-white/70 mt-2">{selectedImage.description}</p>
                )}
                <span className="inline-block mt-2 px-4 py-1 bg-primary/20 text-primary rounded-full text-sm">
                  {selectedImage.category}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}