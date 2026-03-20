import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, 
  Newspaper, 
  Image, 
  Users, 
  GraduationCap, 
  Settings,
  LogOut,
  Menu,
  X,
  ChevronRight,
  Calendar
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import sacredLogo from "@/assets/sacred-logo.png";

const menuItems = [
  { icon: LayoutDashboard, label: "Overview", path: "/admin" },
  { icon: Newspaper, label: "News & Events", path: "/admin/news" },
  { icon: Image, label: "Gallery", path: "/admin/gallery" },
  { icon: GraduationCap, label: "Students", path: "/admin/students" },
  { icon: Users, label: "Teachers", path: "/admin/teachers" },
  { icon: Calendar, label: "Timetable", path: "/admin/timetable" },
  { icon: Settings, label: "Settings", path: "/admin/settings" },
];

export function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const { signOut, profile } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate("/auth");
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-foreground/50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed md:sticky top-0 left-0 z-40 h-screen w-64 bg-foreground text-background flex flex-col transition-transform duration-300 md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo Section */}
        <div className="p-6 border-b border-muted/20">
          <div className="flex items-center gap-3">
            <img src={sacredLogo} alt="Sacred Heart" className="w-12 h-12 rounded-lg" />
            <div>
              <h2 className="font-bold text-lg">Sacred Heart</h2>
              <p className="text-sm text-muted-foreground/60">Admin Panel</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/admin"}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group",
                  isActive
                    ? "bg-secondary text-secondary-foreground"
                    : "text-muted-foreground/80 hover:bg-muted/10 hover:text-background"
                )
              }
            >
              {({ isActive }) => (
                <>
                  <item.icon className={cn("h-5 w-5", isActive && "text-secondary-foreground")} />
                  <span className="flex-1">{item.label}</span>
                  <ChevronRight className={cn(
                    "h-4 w-4 transition-opacity",
                    isActive ? "opacity-100" : "opacity-0 group-hover:opacity-50"
                  )} />
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* User Section */}
        <div className="p-4 border-t border-muted/20">
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-muted/10">
            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground font-bold">
              {profile?.full_name?.charAt(0)?.toUpperCase() || "A"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{profile?.full_name || "Administrator"}</p>
              <p className="text-xs text-muted-foreground/60 truncate">{profile?.email}</p>
            </div>
          </div>
          
          <Button
            variant="ghost"
            className="w-full mt-3 justify-start gap-3 text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5" />
            Logout
          </Button>
        </div>
      </aside>
    </>
  );
}
