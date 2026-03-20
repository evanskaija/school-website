import { motion, useScroll, useSpring } from "framer-motion";
import { ReactNode, useState, useEffect } from "react";
import { PageSkeleton } from "./Skeletons";

interface PageTransitionProps {
  children: ReactNode;
  showSkeleton?: boolean;
  skeletonDuration?: number;
}

const pageVariants = {
  initial: {
    opacity: 0,
    y: 10,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: -10,
  },
};

export function PageTransition({
  children,
  showSkeleton = false,
  skeletonDuration = 300
}: PageTransitionProps) {
  const [isLoading, setIsLoading] = useState(showSkeleton);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const scrollY = useScroll().scrollY;
  const bgTranslateY1 = useSpring(scrollY, { stiffness: 50, damping: 20 });
  const bgTranslateY2 = useSpring(scrollY, { stiffness: 40, damping: 20 });

  useEffect(() => {
    if (showSkeleton) {
      const timer = setTimeout(() => setIsLoading(false), skeletonDuration);
      return () => clearTimeout(timer);
    }
  }, [showSkeleton, skeletonDuration]);

  if (isLoading) {
    return <PageSkeleton />;
  }

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={{
        type: "tween",
        ease: [0.25, 0.46, 0.45, 0.94] as const,
        duration: 0.4,
      }}
      className="relative"
    >
      {/* Page Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-[70] origin-left"
        style={{ scaleX }}
      />

      {/* Unified Decorative Background */}
      <div className="fixed inset-0 pointer-events-none opacity-20 dark:opacity-[0.15] overflow-hidden -z-10">
        <motion.div
          style={{ translateY: bgTranslateY1 }}
          className="absolute top-0 right-0 w-[500px] h-[1000px] bg-primary/10 blur-[130px] rounded-full -rotate-45"
        />
        <motion.div
          style={{ translateY: bgTranslateY2 }}
          className="absolute bottom-0 left-0 w-[600px] h-[1200px] bg-secondary/10 blur-[160px] rounded-full rotate-45"
        />
      </div>

      <div className="relative z-10 w-full min-h-screen">
        {children}
      </div>
    </motion.div>
  );
}
