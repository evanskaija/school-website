import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { 
  BookOpen, Calendar, ClipboardCheck, 
  FileText, Award, TrendingUp, Clock, Bell 
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const stats = [
  { label: "Enrolled Courses", value: "8", icon: BookOpen, color: "bg-primary" },
  { label: "Assignments Due", value: "4", icon: ClipboardCheck, color: "bg-secondary" },
  { label: "Average Grade", value: "B+", icon: Award, color: "bg-accent" },
  { label: "Attendance", value: "94%", icon: TrendingUp, color: "bg-primary" },
];

const upcomingAssignments = [
  { subject: "Mathematics", title: "Algebra Problem Set 5", due: "Tomorrow", status: "pending" },
  { subject: "Physics", title: "Lab Report - Motion", due: "In 3 days", status: "pending" },
  { subject: "English", title: "Essay: Modern Literature", due: "In 5 days", status: "started" },
  { subject: "Chemistry", title: "Chemical Equations Quiz", due: "In 1 week", status: "pending" },
];

const todayClasses = [
  { time: "08:00 - 09:00", subject: "Mathematics", teacher: "Mr. Mwamba", room: "Room 12" },
  { time: "09:15 - 10:15", subject: "English", teacher: "Ms. Kimaro", room: "Room 5" },
  { time: "11:00 - 12:00", subject: "Physics", teacher: "Mr. Njau", room: "Lab 3" },
  { time: "14:00 - 15:00", subject: "Kiswahili", teacher: "Mwl. Hamisi", room: "Room 8" },
];

export default function StudentDashboard() {
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
              Hello, <span className="text-primary">{profile?.full_name || "Student"}</span>!
            </h1>
            <p className="text-muted-foreground">Keep up the great work! Here's your daily overview.</p>
          </motion.div>

          {/* Stats Grid */}
          <motion.div 
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {stats.map((stat) => (
              <div 
                key={stat.label}
                className="bg-card rounded-xl p-4 lg:p-6 border-l-4 border-accent shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-xs lg:text-sm">{stat.label}</p>
                    <p className="text-2xl lg:text-3xl font-bold text-foreground mt-1">{stat.value}</p>
                  </div>
                  <div className={`${stat.color} p-2 lg:p-3 rounded-lg hidden sm:block`}>
                    <stat.icon className="h-5 w-5 lg:h-6 lg:w-6 text-primary-foreground" />
                  </div>
                </div>
              </div>
            ))}
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Today's Classes */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                <Clock className="h-6 w-6 text-primary" />
                Today's Classes
              </h2>
              <div className="bg-card rounded-xl border border-border overflow-hidden">
                {todayClasses.map((item, index) => (
                  <div 
                    key={index} 
                    className="p-4 border-b border-border last:border-0 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold text-foreground">{item.subject}</p>
                        <p className="text-sm text-muted-foreground">{item.teacher} • {item.room}</p>
                      </div>
                      <span className="text-sm font-medium text-accent bg-accent/10 px-3 py-1 rounded-full">
                        {item.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Upcoming Assignments */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                <FileText className="h-6 w-6 text-secondary" />
                Upcoming Assignments
              </h2>
              <div className="bg-card rounded-xl border border-border overflow-hidden">
                {upcomingAssignments.map((item, index) => (
                  <div 
                    key={index} 
                    className="p-4 border-b border-border last:border-0 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold text-foreground">{item.title}</p>
                        <p className="text-sm text-muted-foreground">{item.subject}</p>
                      </div>
                      <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                        item.due === "Tomorrow" 
                          ? "text-primary bg-primary/10" 
                          : "text-secondary bg-secondary/10"
                      }`}>
                        {item.due}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Announcements */}
          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
              <Bell className="h-6 w-6 text-primary" />
              Announcements
            </h2>
            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-6 border border-primary/20">
              <h3 className="font-semibold text-foreground mb-2">Sports Day Coming Soon!</h3>
              <p className="text-muted-foreground">
                Annual Sports Day will be held on January 15th. All students are encouraged to participate. 
                Sign up with your class teacher before December 30th.
              </p>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
