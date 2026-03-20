import { motion, useScroll, useTransform } from "framer-motion";
import { Play, Pause, Maximize, Volume2, Youtube } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

// TIP: Replace this with your YouTube URL for faster loading! 
// Example: const youtubeUrl = "https://www.youtube.com/embed/XXXXXXX";
const youtubeUrl = "https://www.youtube.com/embed/GGTekj9cVx0"; 
const videoSource = "/OurStory.mp4";

export function VideoTour() {
    const { t } = useLanguage();
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
    const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const updateProgress = () => {
            if (video.duration) {
                setProgress((video.currentTime / video.duration) * 100);
            }
        };

        video.addEventListener('timeupdate', updateProgress);
        return () => video.removeEventListener('timeupdate', updateProgress);
    }, []);

    return (
        <section ref={containerRef} className="py-32 bg-background relative" id="video-tour">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-primary font-bold tracking-[0.3em] uppercase text-sm mb-4 block"
                    >
                        {t("video.badge")}
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-bold tracking-tight mb-8"
                    >
                        {t("video.title")}
                    </motion.h2>
                </div>

                <motion.div
                    style={{ scale, opacity }}
                    className="relative group rounded-[2.5rem] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.2)] bg-black aspect-video"
                >
                    {youtubeUrl ? (
                        <iframe
                            className="w-full h-full border-0"
                            src={`${youtubeUrl}?autoplay=0&rel=0&modestbranding=1`}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    ) : (
                        <>
                            <video
                                ref={videoRef}
                                className="w-full aspect-video object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700"
                                onClick={togglePlay}
                                loop
                                playsInline
                            >
                                <source src={videoSource} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>

                            {/* Custom Video Controls Overlay */}
                            <div className={`absolute inset-0 bg-black/40 transition-opacity duration-500 ${isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}`}>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={togglePlay}
                                        className="w-24 h-24 rounded-full bg-primary text-white flex items-center justify-center shadow-2xl backdrop-blur-sm"
                                    >
                                        {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 fill-current ml-1" />}
                                    </motion.button>
                                </div>

                                {/* Progress Bar & Info */}
                                <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 bg-gradient-to-t from-black/80 to-transparent">
                                    <div className="flex items-center justify-between mb-4">
                                        <div>
                                            <h4 className="text-white font-bold text-xl">{t("video.story")}</h4>
                                            <p className="text-white/60 text-sm">{t("video.subtitle")}</p>
                                        </div>
                                        <div className="flex gap-4">
                                            <Volume2 className="w-5 h-5 text-white/70" />
                                            <Maximize className="w-5 h-5 text-white/70" />
                                        </div>
                                    </div>

                                    {/* Tracker */}
                                    <div className="h-1 w-full bg-white/20 rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full bg-primary"
                                            initial={{ width: 0 }}
                                            animate={{ width: `${progress}%` }}
                                            transition={{ ease: "linear" }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    {/* Branding overlay when not playing (Only for local video) */}
                    {!youtubeUrl && !isPlaying && (
                        <div className="absolute top-10 left-10 pointer-events-none">
                            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                                <img src="/sacred-logo.png" className="h-8 md:h-12 brightness-0 invert opacity-50" onError={(e) => e.currentTarget.style.display = 'none'} />
                            </div>
                        </div>
                    )}
                </motion.div>
            </div>
        </section>
    );
}
