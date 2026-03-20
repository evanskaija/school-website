import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { 
  User, BookOpen, TrendingUp, Calendar, 
  CreditCard, MessageSquare, FileText, Bell 
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const childInfo = {
  name: "John Mwamba",
  class: "Form 3A",
  admission: "SHS/2022/0145",
  house: "Blue House",
};

const academicSummary = [
  { subject: "Mathematics", grade: "A", trend: "up" },
  { subject: "English", grade: "B+", trend: "stable" },
  { subject: "Physics", grade: "A-", trend: "up" },
  { subject: "Chemistry", grade: "B", trend: "down" },
  { subject: "Biology", grade: "A", trend: "up" },
];

const fees = {
  total: "2,500,000",
  paid: "1,800,000",
  balance: "700,000",
  dueDate: "January 15, 2025",
};

export default function ParentDashboard() {
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
              Welcome, <span className="text-primary">{profile?.full_name || "Parent"}</span>
            </h1>
            <p className="text-muted-foreground">Stay connected with your child's education journey.</p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Child Info Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-1"
            >
              <div className="bg-card rounded-xl border border-border p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-foreground">{childInfo.name}</h2>
                    <p className="text-muted-foreground">{childInfo.class}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Admission No:</span>
                    <span className="font-medium text-foreground">{childInfo.admission}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">House:</span>
                    <span className="font-medium text-foreground">{childInfo.house}</span>
                  </div>
                </div>
              </div>

              {/* Fee Status */}
              <div className="bg-card rounded-xl border border-border p-6 mt-6">
                <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-secondary" />
                  Fee Status
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Fees:</span>
                    <span className="font-medium text-foreground">TZS {fees.total}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Paid:</span>
                    <span className="font-medium text-accent">TZS {fees.paid}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Balance:</span>
                    <span className="font-medium text-primary">TZS {fees.balance}</span>
                  </div>
                  <div className="pt-3 border-t border-border">
                    <p className="text-sm text-muted-foreground">Due Date: <span className="text-foreground">{fees.dueDate}</span></p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Academic Performance */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-2"
            >
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-primary" />
                Academic Performance
              </h2>
              <div className="bg-card rounded-xl border border-border overflow-hidden">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left p-4 font-semibold text-foreground">Subject</th>
                      <th className="text-center p-4 font-semibold text-foreground">Grade</th>
                      <th className="text-center p-4 font-semibold text-foreground">Trend</th>
                    </tr>
                  </thead>
                  <tbody>
                    {academicSummary.map((item, index) => (
                      <tr key={index} className="border-t border-border hover:bg-muted/30 transition-colors">
                        <td className="p-4 text-foreground">{item.subject}</td>
                        <td className="p-4 text-center">
                          <span className="px-3 py-1 bg-accent/10 text-accent rounded-full font-medium">
                            {item.grade}
                          </span>
                        </td>
                        <td className="p-4 text-center">
                          <TrendingUp className={`h-5 w-5 mx-auto ${
                            item.trend === "up" ? "text-accent" : 
                            item.trend === "down" ? "text-primary rotate-180" : "text-muted-foreground"
                          }`} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                {[
                  { label: "View Report Card", icon: FileText },
                  { label: "Contact Teacher", icon: MessageSquare },
                  { label: "School Calendar", icon: Calendar },
                  { label: "Announcements", icon: Bell },
                ].map((action) => (
                  <button
                    key={action.label}
                    className="flex flex-col items-center gap-2 p-4 bg-card rounded-xl border border-border hover:border-primary hover:shadow-md transition-all group"
                  >
                    <action.icon className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
                    <span className="text-xs font-medium text-foreground text-center">{action.label}</span>
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
