import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import graduation1 from "@/assets/graduation 1.jpg";
import graduation2 from "@/assets/graduation 2.jpg";
import staff from "@/assets/staff.jpg";
import { Slider } from "@/components/ui/slider";
import { Settings2 } from "lucide-react";

interface GalleryImage {
  id: string;
  image_url: string;
  title: string;
}

const fallbackImages = [
  { src: graduation1, alt: "Graduation", label: "Celebrating Excellence" },
  { src: graduation2, alt: "Students", label: "Our Graduates" },
  { src: staff, alt: "Staff", label: "Dedicated Team" },
];

interface ImageMarqueeProps {
  showSpeedControl?: boolean;
}

export function ImageMarquee({ showSpeedControl = false }: ImageMarqueeProps) {
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [speed, setSpeed] = useState(25);
  const [showControls, setShowControls] = useState(false);

  useEffect(() => {
    const fetchGalleryImages = async () => {
      const { data, error } = await supabase
        .from("gallery")
        .select("id, image_url, title")
        .order("created_at", { ascending: false })
        .limit(20);

      if (!error && data && data.length > 0) {
        setGalleryImages(data);
      }
    };

    fetchGalleryImages();
  }, []);

  const images = galleryImages.length > 0
    ? galleryImages.map(img => ({
      src: img.image_url,
      alt: img.title,
      label: img.title
    }))
    : fallbackImages;

  const doubledImages = [...images, ...images, ...images];
  const totalWidth = images.length * 240;

  return (
    <section className="py-12 overflow-hidden bg-gradient-to-b from-muted/20 via-muted/40 to-muted/20 relative">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Section Header */}
      <div className="container mx-auto px-4 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-medium rounded-full mb-3">
            Gallery
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            Moments at Sacred Heart
          </h2>
        </motion.div>
      </div>

      {/* Speed Control */}
      {showSpeedControl && (
        <div className="container mx-auto px-4 mb-6">
          <button
            onClick={() => setShowControls(!showControls)}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mx-auto"
          >
            <Settings2 className="h-4 w-4" />
            Adjust Speed
          </button>
          {showControls && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="flex items-center gap-4 justify-center mt-4 p-4 bg-card rounded-lg shadow-sm max-w-xs mx-auto"
            >
              <span className="text-xs text-muted-foreground">Slow</span>
              <Slider
                value={[60 - speed]}
                onValueChange={(value) => setSpeed(60 - value[0])}
                min={10}
                max={50}
                step={5}
                className="w-32"
              />
              <span className="text-xs text-muted-foreground">Fast</span>
            </motion.div>
          )}
        </div>
      )}

      <div className="relative">
        {/* Gradient overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background via-background/80 to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background via-background/80 to-transparent z-10" />

        {/* Scrolling container */}
        <motion.div
          className="flex gap-6"
          animate={{ x: [0, -totalWidth] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: speed,
              ease: "linear",
            },
          }}
        >
          {doubledImages.map((image, index) => (
            <motion.div
              key={index}
              className="relative shrink-0 w-64 h-44 rounded-2xl overflow-hidden group cursor-pointer"
              whileHover={{ scale: 1.02, y: -4 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

              {/* Label */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <motion.span
                  className="text-sm font-semibold text-primary-foreground block truncate"
                  initial={{ y: 10, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                >
                  {image.label}
                </motion.span>
              </div>

              {/* Hover border effect */}
              <div className="absolute inset-0 border-2 border-primary/0 group-hover:border-primary/50 rounded-2xl transition-colors duration-300" />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Stats bar */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="container mx-auto px-4 mt-10"
      >
        <div className="flex flex-wrap justify-center gap-8 md:gap-16">
          {[
            { value: 500, label: "Students", suffix: "+" },
            { value: 50, label: "Staff", suffix: "+" },
            { value: 40, label: "Years", suffix: "+" },
            { value: 100, label: "Pass Rate", suffix: "%" },
          ].map((stat, i) => (
            <StatCounter key={stat.label} {...stat} delay={i * 0.1} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function StatCounter({ value, label, suffix, delay }: { value: number, label: string, suffix: string, delay: number }) {
  const [count, setCount] = useState(0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      onViewportEnter={() => {
        // Simple counter animation
        let start = 0;
        const end = value;
        const duration = 2000;
        const incrementTime = duration / end;

        let timer = setInterval(() => {
          start += 1;
          setCount(start);
          if (start === end) clearInterval(timer);
        }, Math.min(incrementTime, 50)); // Cap speed for performance, though math might need adjustment for large numbers

        // Better for larger numbers to jump
        if (incrementTime < 10) {
          clearInterval(timer);
          const step = Math.ceil(end / 100);
          timer = setInterval(() => {
            start += step;
            if (start > end) start = end;
            setCount(start);
            if (start === end) clearInterval(timer);
          }, 20);
        }
      }}
      className="text-center"
    >
      <div className="text-3xl md:text-5xl font-bold text-primary tabular-nums">
        {count}{suffix}
      </div>
      <div className="text-sm font-medium text-muted-foreground mt-1 uppercase tracking-wider">{label}</div>
    </motion.div>
  );
}
