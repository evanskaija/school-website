import { useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

interface SwipeConfig {
  threshold?: number;
  enabled?: boolean;
  routes?: string[];
}

export function useSwipeNavigation({ threshold = 100, enabled = true, routes }: SwipeConfig = {}) {
  const navigate = useNavigate();
  const location = useLocation();
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const touchEnd = useRef<{ x: number; y: number } | null>(null);

  // Default routes for swipe navigation
  const defaultRoutes = [
    "/",
    "/about",
    "/services",
    "/admissions",
    "/news",
    "/gallery",
    "/contact",
  ];

  const navRoutes = routes || defaultRoutes;

  useEffect(() => {
    if (!enabled) return;

    const handleTouchStart = (e: TouchEvent) => {
      touchEnd.current = null;
      touchStart.current = {
        x: e.targetTouches[0].clientX,
        y: e.targetTouches[0].clientY,
      };
    };

    const handleTouchMove = (e: TouchEvent) => {
      touchEnd.current = {
        x: e.targetTouches[0].clientX,
        y: e.targetTouches[0].clientY,
      };
    };

    const handleTouchEnd = () => {
      if (!touchStart.current || !touchEnd.current) return;

      const deltaX = touchStart.current.x - touchEnd.current.x;
      const deltaY = touchStart.current.y - touchEnd.current.y;

      // Only trigger if horizontal swipe is more significant than vertical
      if (Math.abs(deltaX) < Math.abs(deltaY)) return;
      if (Math.abs(deltaX) < threshold) return;

      // Prevent swipe if started from edge (browser back gesture area)
      if (touchStart.current.x < 30 || touchStart.current.x > window.innerWidth - 30) return;

      const currentIndex = navRoutes.indexOf(location.pathname);
      if (currentIndex === -1) return;

      if (deltaX > 0 && currentIndex < navRoutes.length - 1) {
        // Swipe left - go to next page
        navigate(navRoutes[currentIndex + 1]);
      } else if (deltaX < 0 && currentIndex > 0) {
        // Swipe right - go to previous page
        navigate(navRoutes[currentIndex - 1]);
      }

      touchStart.current = null;
      touchEnd.current = null;
    };

    document.addEventListener("touchstart", handleTouchStart, { passive: true });
    document.addEventListener("touchmove", handleTouchMove, { passive: true });
    document.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [enabled, navigate, location.pathname, navRoutes, threshold]);

  return { currentRoute: location.pathname, routes: navRoutes };
}
