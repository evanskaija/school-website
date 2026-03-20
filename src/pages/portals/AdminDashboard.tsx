import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { 
  Users, GraduationCap, BookOpen, Calendar, 
  Bell, Settings, BarChart3, FileText 
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const stats = [
  { label: "Total Students", value: "1,247", icon: GraduationCap, color: "bg-primary" },
  { label: "Total Teachers", value: "68", icon: Users, color: "bg-secondary" },
  { label: "Active Courses", value: "42", icon: BookOpen, color: "bg-accent" },
  { label: "Pending Requests", value: "15", icon: FileText, color: "bg-primary" },
];

const quickActions = [
  { label: "Manage Users", icon: Users, href: "#users" },
  { label: "View Reports", icon: BarChart3, href: "#reports" },
  { label: "Calendar", icon: Calendar, href: "#calendar" },
  { label: "Notifications", icon: Bell, href: "#notifications" },
  { label: "Settings", icon: Settings, href: "#settings" },
];

export default function AdminDashboard() {
  const { profile } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Welcome Section */}
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">
              Welcome, <span className="text-primary">{profile?.full_name || "Administrator"}</span>
            </h1>
            <p className="text-muted-foreground">Here's what's happening at Sacred Heart today.</p>
          </motion.div>

          {/* Stats Grid */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {stats.map((stat, index) => (
              <div 
                key={stat.label}
                className="bg-card rounded-xl p-6 border-l-4 border-primary shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm">{stat.label}</p>
                    <p className="text-3xl font-bold text-foreground mt-1">{stat.value}</p>
                  </div>
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <stat.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold text-foreground mb-6">Quick Actions</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {quickActions.map((action) => (
                <a
                  key={action.label}
                  href={action.href}
                  className="flex flex-col items-center gap-3 p-6 bg-card rounded-xl border border-border hover:border-primary hover:shadow-md transition-all group"
                >
                  <div className="p-3 rounded-lg bg-muted group-hover:bg-primary transition-colors">
                    <action.icon className="h-6 w-6 text-muted-foreground group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <span className="text-sm font-medium text-foreground text-center">{action.label}</span>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            className="mt-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h2 className="text-2xl font-bold text-foreground mb-6">Recent Activity</h2>
            <div className="bg-card rounded-xl border border-border p-6">
              <div className="space-y-4">
                {[
                  { action: "New student registered", time: "2 minutes ago", user: "John Doe" },
                  { action: "Teacher report submitted", time: "15 minutes ago", user: "Ms. Johnson" },
                  { action: "Grade updated", time: "1 hour ago", user: "Form 4A" },
                  { action: "Event scheduled", time: "3 hours ago", user: "Sports Day" },
                ].map((activity, index) => (
                  <div key={index} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                    <div>
                      <p className="font-medium text-foreground">{activity.action}</p>
                      <p className="text-sm text-muted-foreground">{activity.user}</p>
                    </div>
                    <span className="text-sm text-muted-foreground">{activity.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
