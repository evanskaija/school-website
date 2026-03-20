import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { ProtectedRoute } from "@/components/shared/ProtectedRoute";
import { PageTransition } from "@/components/shared/PageTransition";
import { SwipeIndicator } from "@/components/shared/SwipeIndicator";
import { useSwipeNavigation } from "@/hooks/useSwipeNavigation";
import { useIsMobile } from "@/hooks/use-mobile";

// Pages
import Index from "@/pages/Index";
import Auth from "@/pages/Auth";
import NotFound from "@/pages/NotFound";
import About from "@/pages/about/Index";
import Vision from "@/pages/about/Vision";
import Mission from "@/pages/about/Mission";
import Library from "@/pages/facilities/Library";
import ComputerLab from "@/pages/facilities/ComputerLab";
import BiologyLab from "@/pages/facilities/BiologyLab";
import PhysicsLab from "@/pages/facilities/PhysicsLab";
import ChemistryLab from "@/pages/facilities/ChemistryLab";
import DiningHall from "@/pages/facilities/DiningHall";
import Services from "@/pages/Services";
import Admissions from "@/pages/Admissions";
import NewsEvents from "@/pages/NewsEvents";
import Students from "@/pages/Students";
import Staff from "@/pages/Staff";
import TeacherProfile from "@/pages/staff/TeacherProfile";
import Academics from "@/pages/Academics";
import Nursery from "@/pages/Nursery";
import Primary from "@/pages/Primary";
import StudentLife from "@/pages/StudentLife";
import Contact from "@/pages/Contact";
import Gallery from "@/pages/Gallery";
import Results from "@/pages/Results";
import TeacherDashboard from "@/pages/portals/TeacherDashboard";
import StudentDashboard from "@/pages/portals/StudentDashboard";
import ParentDashboard from "@/pages/portals/ParentDashboard";
import AdminIndex from "@/pages/admin/Index";
import NewsManagement from "@/pages/admin/NewsManagement";
import NewsForm from "@/pages/admin/NewsForm";
import GalleryManagement from "@/pages/admin/GalleryManagement";
import GalleryUpload from "@/pages/admin/GalleryUpload";
import StudentManagement from "@/pages/admin/StudentManagement";
import StudentForm from "@/pages/admin/StudentForm";
import TeacherManagement from "@/pages/admin/TeacherManagement";
import TeacherForm from "@/pages/admin/TeacherForm";
import TimetableManagement from "@/pages/admin/TimetableManagement";

const mainRoutes = [
  "/",
  "/about",
  "/academics",
  "/student-life",
  "/services",
  "/admissions",
  "/news",
  "/gallery",
  "/contact",
];

export function AnimatedRoutes() {
  const location = useLocation();
  const isMobile = useIsMobile();
  const { currentRoute, routes } = useSwipeNavigation({
    enabled: isMobile,
    routes: mainRoutes
  });

  const currentIndex = routes.indexOf(currentRoute);
  const showSwipeIndicator = isMobile && currentIndex !== -1;

  return (
    <>
      {showSwipeIndicator && (
        <SwipeIndicator
          currentIndex={currentIndex}
          totalPages={routes.length}
        />
      )}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><Index /></PageTransition>} />
          <Route path="/auth" element={<PageTransition><Auth /></PageTransition>} />

          {/* About Routes */}
          <Route path="/about" element={<PageTransition><About /></PageTransition>} />
          <Route path="/about/vision" element={<PageTransition><Vision /></PageTransition>} />
          <Route path="/about/mission" element={<PageTransition><Mission /></PageTransition>} />

          {/* Facilities Routes */}
          <Route path="/facilities/library" element={<PageTransition><Library /></PageTransition>} />
          <Route path="/facilities/computer-lab" element={<PageTransition><ComputerLab /></PageTransition>} />
          <Route path="/facilities/biology-lab" element={<PageTransition><BiologyLab /></PageTransition>} />
          <Route path="/facilities/physics-lab" element={<PageTransition><PhysicsLab /></PageTransition>} />
          <Route path="/facilities/chemistry-lab" element={<PageTransition><ChemistryLab /></PageTransition>} />
          <Route path="/facilities/dining-hall" element={<PageTransition><DiningHall /></PageTransition>} />

          {/* Main Pages */}
          <Route path="/nursery" element={<PageTransition><Nursery /></PageTransition>} />
          <Route path="/primary" element={<PageTransition><Primary /></PageTransition>} />
          <Route path="/academics" element={<PageTransition><Academics /></PageTransition>} />
          <Route path="/student-life" element={<PageTransition><StudentLife /></PageTransition>} />
          <Route path="/services" element={<PageTransition><Services /></PageTransition>} />
          <Route path="/admissions" element={<PageTransition><Admissions /></PageTransition>} />
          <Route path="/news" element={<PageTransition><NewsEvents /></PageTransition>} />
          <Route path="/students" element={<PageTransition><Students /></PageTransition>} />
          <Route path="/staff" element={<PageTransition><Staff /></PageTransition>} />
          <Route path="/staff/teacher/:id" element={<PageTransition><TeacherProfile /></PageTransition>} />
          <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
          <Route path="/gallery" element={<PageTransition><Gallery /></PageTransition>} />
          <Route path="/results" element={<PageTransition><Results /></PageTransition>} />

          {/* Protected Admin Routes */}
          <Route path="/admin" element={<ProtectedRoute allowedRoles={["admin"]}><PageTransition><AdminIndex /></PageTransition></ProtectedRoute>} />
          <Route path="/admin/news" element={<ProtectedRoute allowedRoles={["admin"]}><PageTransition><NewsManagement /></PageTransition></ProtectedRoute>} />
          <Route path="/admin/news/create" element={<ProtectedRoute allowedRoles={["admin"]}><PageTransition><NewsForm /></PageTransition></ProtectedRoute>} />
          <Route path="/admin/news/edit/:id" element={<ProtectedRoute allowedRoles={["admin"]}><PageTransition><NewsForm /></PageTransition></ProtectedRoute>} />
          <Route path="/admin/gallery" element={<ProtectedRoute allowedRoles={["admin"]}><PageTransition><GalleryManagement /></PageTransition></ProtectedRoute>} />
          <Route path="/admin/gallery/upload" element={<ProtectedRoute allowedRoles={["admin"]}><PageTransition><GalleryUpload /></PageTransition></ProtectedRoute>} />
          <Route path="/admin/gallery/edit/:id" element={<ProtectedRoute allowedRoles={["admin"]}><PageTransition><GalleryUpload /></PageTransition></ProtectedRoute>} />
          <Route path="/admin/students" element={<ProtectedRoute allowedRoles={["admin"]}><PageTransition><StudentManagement /></PageTransition></ProtectedRoute>} />
          <Route path="/admin/students/create" element={<ProtectedRoute allowedRoles={["admin"]}><PageTransition><StudentForm /></PageTransition></ProtectedRoute>} />
          <Route path="/admin/students/edit/:id" element={<ProtectedRoute allowedRoles={["admin"]}><PageTransition><StudentForm /></PageTransition></ProtectedRoute>} />
          <Route path="/admin/teachers" element={<ProtectedRoute allowedRoles={["admin"]}><PageTransition><TeacherManagement /></PageTransition></ProtectedRoute>} />
          <Route path="/admin/teachers/create" element={<ProtectedRoute allowedRoles={["admin"]}><PageTransition><TeacherForm /></PageTransition></ProtectedRoute>} />
          <Route path="/admin/teachers/edit/:id" element={<ProtectedRoute allowedRoles={["admin"]}><PageTransition><TeacherForm /></PageTransition></ProtectedRoute>} />
          <Route path="/admin/timetable" element={<ProtectedRoute allowedRoles={["admin"]}><PageTransition><TimetableManagement /></PageTransition></ProtectedRoute>} />

          {/* Other Protected Routes */}
          <Route path="/teacher" element={<ProtectedRoute allowedRoles={["admin", "teacher"]}><PageTransition><TeacherDashboard /></PageTransition></ProtectedRoute>} />
          <Route path="/student" element={<ProtectedRoute allowedRoles={["admin", "student"]}><PageTransition><StudentDashboard /></PageTransition></ProtectedRoute>} />
          <Route path="/parent" element={<ProtectedRoute allowedRoles={["admin", "parent"]}><PageTransition><ParentDashboard /></PageTransition></ProtectedRoute>} />

          <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
        </Routes>
      </AnimatePresence>
    </>
  );
}
