import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { 
  Users, BookOpen, Calendar, ClipboardCheck, 
  FileText, MessageSquare, Clock, Award 
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

interface TimetableEntry {
  id: string;
  day_of_week: string;
  start_time: string;
  end_time: string;
  subject: string;
  class_name: string;
  room: string | null;
}

interface TeacherData {
  id: string;
  subjects: string[];
  classes: string[];
}

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default function TeacherDashboard() {
  const { profile, user } = useAuth();
  const [schedule, setSchedule] = useState<TimetableEntry[]>([]);
  const [teacherData, setTeacherData] = useState<TeacherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    classes: 0,
    students: 0,
    pendingAssignments: 12,
    todayClasses: 0
  });

  const today = DAYS[new Date().getDay()];

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;

      // Fetch teacher profile
      const { data: teacher } = await supabase
        .from("teachers")
        .select("id, subjects, classes")
        .eq("user_id", user.id)
        .maybeSingle();

      if (teacher) {
        setTeacherData(teacher);
        
        // Fetch today's schedule
        const { data: timetable } = await supabase
          .from("timetables")
          .select("*")
          .eq("teacher_id", teacher.id)
          .eq("day_of_week", today)
          .order("start_time");

        if (timetable) {
          setSchedule(timetable);
        }

        // Count students in teacher's classes
        const { count: studentCount } = await supabase
          .from("students")
          .select("*", { count: "exact", head: true })
          .in("class_name", teacher.classes || []);

        setStats({
          classes: teacher.classes?.length || 0,
          students: studentCount || 0,
          pendingAssignments: 12,
          todayClasses: timetable?.length || 0
        });
      }

      setLoading(false);
    };

    fetchData();
  }, [user, today]);

  const formatTime = (time: string) => time.slice(0, 5);

  const statCards = [
    { label: "My Classes", value: stats.classes.toString(), icon: BookOpen, color: "bg-primary" },
    { label: "Total Students", value: stats.students.toString(), icon: Users, color: "bg-secondary" },
    { label: "Pending Assignments", value: stats.pendingAssignments.toString(), icon: ClipboardCheck, color: "bg-accent" },
    { label: "Today's Classes", value: stats.todayClasses.toString(), icon: Clock, color: "bg-primary" },
  ];

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
              Good Morning, <span className="text-primary">{profile?.full_name || "Teacher"}</span>
            </h1>
            <p className="text-muted-foreground">Manage your classes and track student progress.</p>
          </motion.div>

          {/* Stats Grid */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {statCards.map((stat) => (
              <div 
                key={stat.label}
                className="bg-card rounded-xl p-6 border-l-4 border-secondary shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm">{stat.label}</p>
                    {loading ? (
                      <Skeleton className="h-9 w-16 mt-1" />
                    ) : (
                      <p className="text-3xl font-bold text-foreground mt-1">{stat.value}</p>
                    )}
                  </div>
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <stat.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                </div>
              </div>
            ))}
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Today's Schedule */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                <Calendar className="h-6 w-6 text-primary" />
                Today's Schedule ({today})
              </h2>
              <div className="bg-card rounded-xl border border-border overflow-hidden">
                {loading ? (
                  <div className="p-4 space-y-4">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="flex justify-between">
                        <div className="space-y-2">
                          <Skeleton className="h-5 w-32" />
                          <Skeleton className="h-4 w-24" />
                        </div>
                        <Skeleton className="h-8 w-24 rounded-full" />
                      </div>
                    ))}
                  </div>
                ) : schedule.length === 0 ? (
                  <div className="p-8 text-center text-muted-foreground">
                    <Calendar className="h-12 w-12 mx-auto mb-3 opacity-50" />
                    <p>No classes scheduled for today</p>
                  </div>
                ) : (
                  schedule.map((item, index) => (
                    <div 
                      key={item.id} 
                      className="p-4 border-b border-border last:border-0 hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-semibold text-foreground">{item.subject}</p>
                          <p className="text-sm text-muted-foreground">
                            {item.class_name} {item.room && `• ${item.room}`}
                          </p>
                        </div>
                        <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                          {formatTime(item.start_time)} - {formatTime(item.end_time)}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h2 className="text-2xl font-bold text-foreground mb-6">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Take Attendance", icon: ClipboardCheck },
                  { label: "Grade Assignments", icon: Award },
                  { label: "Create Assignment", icon: FileText },
                  { label: "Message Parents", icon: MessageSquare },
                ].map((action) => (
                  <button
                    key={action.label}
                    className="flex flex-col items-center gap-3 p-6 bg-card rounded-xl border border-border hover:border-secondary hover:shadow-md transition-all group active:scale-95 touch-manipulation"
                  >
                    <div className="p-3 rounded-lg bg-muted group-hover:bg-secondary transition-colors">
                      <action.icon className="h-6 w-6 text-muted-foreground group-hover:text-secondary-foreground transition-colors" />
                    </div>
                    <span className="text-sm font-medium text-foreground text-center">{action.label}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}