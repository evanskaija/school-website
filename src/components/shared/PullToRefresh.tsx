import { useState, useRef, ReactNode } from "react";
import { motion, useAnimation, PanInfo } from "framer-motion";
import { RefreshCw } from "lucide-react";

interface PullToRefreshProps {
  children: ReactNode;
  onRefresh: () => Promise<void>;
  disabled?: boolean;
}

export function PullToRefresh({ children, onRefresh, disabled = false }: PullToRefreshProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  const threshold = 80;
  const maxPull = 120;

  const handlePan = (_: Event, info: PanInfo) => {
    if (disabled || isRefreshing) return;

    const scrollTop = containerRef.current?.scrollTop || 0;
    if (scrollTop > 0) return;

    const pull = Math.min(Math.max(0, info.offset.y), maxPull);
    setPullDistance(pull);
  };

  const handlePanEnd = async () => {
    if (disabled || isRefreshing) return;

    if (pullDistance >= threshold) {
      setIsRefreshing(true);
      await onRefresh();
      setIsRefreshing(false);
    }

    setPullDistance(0);
    controls.start({ y: 0 });
  };

  const progress = Math.min(pullDistance / threshold, 1);
  const rotation = progress * 180;

  return (
    <div ref={containerRef} className="relative overflow-auto h-full">
      {/* Pull indicator */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 z-50 flex items-center justify-center"
        style={{ top: pullDistance - 50 }}
        animate={{ opacity: pullDistance > 20 ? 1 : 0 }}
      >
        <motion.div
          className={`w-10 h-10 rounded-full bg-primary/10 backdrop-blur-sm flex items-center justify-center border border-primary/20 ${isRefreshing ? 'animate-pulse' : ''}`}
          animate={{ rotate: isRefreshing ? 360 : rotation }}
          transition={isRefreshing ? { duration: 1, repeat: Infinity, ease: "linear" } : { duration: 0 }}
        >
          <RefreshCw className={`h-5 w-5 text-primary ${isRefreshing ? 'animate-spin' : ''}`} />
        </motion.div>
      </motion.div>

      {/* Content */}
      <motion.div
        onPan={handlePan}
        onPanEnd={handlePanEnd}
        animate={controls}
        style={{ y: pullDistance * 0.5 }}
        className="touch-manipulation"
      >
        {children}
      </motion.div>
    </div>
  );
}
