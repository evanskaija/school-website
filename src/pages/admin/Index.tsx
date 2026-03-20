import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  Users, 
  GraduationCap, 
  Newspaper, 
  Image,
  Plus,
  TrendingUp,
  Calendar,
  Eye,
  Activity,
  BarChart3
} from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { DashboardCharts } from "@/components/admin/DashboardCharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";

interface Stats {
  totalStudents: number;
  totalTeachers: number;
  totalNews: number;
  totalGallery: number;
}

export default function AdminIndex() {
  const { profile } = useAuth();
  const [stats, setStats] = useState<Stats>({
    totalStudents: 0,
    totalTeachers: 0,
    totalNews: 0,
    totalGallery: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [newsResult, galleryResult, studentsResult, teachersResult] = await Promise.all([
          supabase.from("news_events").select("id", { count: "exact", head: true }),
          supabase.from("gallery").select("id", { count: "exact", head: true }),
          supabase.from("students").select("id", { count: "exact", head: true }),
          supabase.from("teachers").select("id", { count: "exact", head: true }),
        ]);

        setStats({
          totalNews: newsResult.count || 0,
          totalGallery: galleryResult.count || 0,
          totalStudents: studentsResult.count || 0,
          totalTeachers: teachersResult.count || 0,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();

    // Real-time subscriptions
    const channels = [
      supabase.channel('students-changes')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'students' }, fetchStats)
        .subscribe(),
      supabase.channel('teachers-changes')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'teachers' }, fetchStats)
        .subscribe(),
      supabase.channel('news-changes')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'news_events' }, fetchStats)
        .subscribe(),
      supabase.channel('gallery-changes')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'gallery' }, fetchStats)
        .subscribe(),
    ];

    return () => {
      channels.forEach(channel => supabase.removeChannel(channel));
    };
  }, []);

  const statCards = [
    { 
      label: "Total Students", 
      value: stats.totalStudents, 
      icon: GraduationCap, 
      color: "bg-primary",
      trend: "+12%"
    },
    { 
      label: "Total Teachers", 
      value: stats.totalTeachers, 
      icon: Users, 
      color: "bg-accent",
      trend: "+3%"
    },
    { 
      label: "News & Events", 
      value: stats.totalNews, 
      icon: Newspaper, 
      color: "bg-secondary",
      trend: "+8%"
    },
    { 
      label: "Gallery Images", 
      value: stats.totalGallery, 
      icon: Image, 
      color: "bg-destructive",
      trend: "+24%"
    },
  ];

  const quickActions = [
    { label: "Add News", icon: Newspaper, path: "/admin/news/create", color: "text-primary" },
    { label: "Upload Images", icon: Image, path: "/admin/gallery/upload", color: "text-accent" },
    { label: "Add Student", icon: GraduationCap, path: "/admin/students/create", color: "text-secondary" },
    { label: "Add Teacher", icon: Users, path: "/admin/teachers/create", color: "text-destructive" },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
        >
          <div>
            <h1 className="text-3xl font-bold">
              Karibu, {profile?.full_name?.split(" ")[0] || "Admin"}! 👋
            </h1>
            <p className="text-muted-foreground mt-1">
              Hapa ni muhtasari wa shughuli za shule
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            {new Date().toLocaleDateString("sw-TZ", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
          {statCards.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-card to-muted/20 group overflow-hidden relative">
                <div className={`absolute top-0 right-0 w-24 h-24 rounded-bl-full ${stat.color} opacity-10 group-hover:opacity-20 transition-opacity`} />
                <CardContent className="p-4 md:p-6">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <p className="text-xs md:text-sm text-muted-foreground font-medium">{stat.label}</p>
                      <p className="text-2xl md:text-3xl font-bold tracking-tight">
                        {loading ? (
                          <span className="inline-block w-12 h-8 bg-muted animate-pulse rounded" />
                        ) : (
                          stat.value.toLocaleString()
                        )}
                      </p>
                      <div className="flex items-center gap-1 text-xs md:text-sm text-accent font-medium">
                        <TrendingUp className="h-3 w-3 md:h-4 md:w-4" />
                        {stat.trend}
                      </div>
                    </div>
                    <div className={`p-2 md:p-3 rounded-xl ${stat.color} shadow-lg`}>
                      <stat.icon className="h-4 w-4 md:h-5 md:w-5 text-primary-foreground" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Charts Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">Analytics Overview</h2>
          </div>
          <DashboardCharts stats={stats} />
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="border-0 shadow-lg bg-gradient-to-br from-card to-muted/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Plus className="h-4 w-4 text-primary" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 grid-cols-2 lg:grid-cols-4">
                {quickActions.map((action) => (
                  <Link key={action.label} to={action.path}>
                    <Button
                      variant="outline"
                      className="w-full h-auto py-4 flex flex-col items-center gap-2 hover:bg-primary/5 hover:border-primary/30 transition-all duration-200 group"
                    >
                      <div className={`p-2 rounded-lg bg-muted group-hover:bg-primary/10 transition-colors`}>
                        <action.icon className={`h-5 w-5 ${action.color}`} />
                      </div>
                      <span className="text-xs font-medium">{action.label}</span>
                    </Button>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="border-0 shadow-lg bg-gradient-to-br from-card to-muted/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Activity className="h-4 w-4 text-accent" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { action: "New student registered", time: "2 hours ago", type: "student" },
                  { action: "Gallery updated with new photos", time: "5 hours ago", type: "gallery" },
                  { action: "News article published", time: "1 day ago", type: "news" },
                  { action: "Teacher profile updated", time: "2 days ago", type: "teacher" },
                ].map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    className="flex items-center justify-between py-2.5 px-3 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full animate-pulse ${
                        activity.type === "student" ? "bg-primary" :
                        activity.type === "gallery" ? "bg-accent" : 
                        activity.type === "teacher" ? "bg-secondary" : "bg-muted-foreground"
                      }`} />
                      <span className="text-sm">{activity.action}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{activity.time}</span>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </AdminLayout>
  );
}
