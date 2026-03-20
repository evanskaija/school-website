import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SwipeIndicatorProps {
  currentIndex: number;
  totalPages: number;
  showLabels?: boolean;
  prevLabel?: string;
  nextLabel?: string;
}

export function SwipeIndicator({ 
  currentIndex, 
  totalPages, 
  showLabels = false,
  prevLabel,
  nextLabel 
}: SwipeIndicatorProps) {
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < totalPages - 1;

  return (
    <div className="fixed bottom-20 left-0 right-0 z-40 flex justify-center items-center gap-4 pointer-events-none md:hidden">
      <motion.div
        className="flex items-center gap-1 px-3 py-2 rounded-full bg-background/80 backdrop-blur-sm border border-border shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        {hasPrev && (
          <motion.div 
            className="flex items-center text-xs text-muted-foreground"
            animate={{ x: [-2, 0, -2] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <ChevronLeft className="h-4 w-4" />
            {showLabels && prevLabel && <span className="mr-2">{prevLabel}</span>}
          </motion.div>
        )}
        
        <div className="flex items-center gap-1.5 px-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <div
              key={i}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                i === currentIndex 
                  ? "bg-primary w-4" 
                  : "bg-muted-foreground/30"
              }`}
            />
          ))}
        </div>
        
        {hasNext && (
          <motion.div 
            className="flex items-center text-xs text-muted-foreground"
            animate={{ x: [0, 2, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            {showLabels && nextLabel && <span className="ml-2">{nextLabel}</span>}
            <ChevronRight className="h-4 w-4" />
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
