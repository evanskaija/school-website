import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/shared/PageHero";
import { ProfileSkeleton } from "@/components/shared/Skeletons";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Mail, Phone, Calendar, GraduationCap, BookOpen, Users, ArrowLeft, User } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useParams, Link } from "react-router-dom";
import { format } from "date-fns";

export default function TeacherProfile() {
  const { id } = useParams<{ id: string }>();

  const { data: teacher, isLoading, error } = useQuery({
    queryKey: ['teacher', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('teachers')
        .select('*')
        .eq('id', id)
        .maybeSingle();
      
      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-32 pb-20 px-4">
          <div className="container mx-auto max-w-4xl">
            <ProfileSkeleton />
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !teacher) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-32 pb-20 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <User className="h-20 w-20 mx-auto text-muted-foreground mb-6" />
            <h1 className="text-2xl font-bold text-foreground mb-4">Teacher Not Found</h1>
            <p className="text-muted-foreground mb-8">The teacher profile you're looking for doesn't exist or has been removed.</p>
            <Button asChild>
              <Link to="/staff">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Staff
              </Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <PageHero 
        title={`${teacher.first_name} ${teacher.last_name}`}
        subtitle={teacher.specialization || "Teacher"}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Staff", href: "/staff" },
          { label: `${teacher.first_name} ${teacher.last_name}` }
        ]}
      />

      <main className="py-12 md:py-20">
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8"
          >
            <Button variant="ghost" asChild className="gap-2">
              <Link to="/staff">
                <ArrowLeft className="h-4 w-4" />
                Back to Staff
              </Link>
            </Button>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Profile Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-1"
            >
              <div className="bg-card rounded-2xl border border-border p-6 sticky top-28">
                <div className="text-center">
                  {teacher.photo_url ? (
                    <img 
                      src={teacher.photo_url} 
                      alt={`${teacher.first_name} ${teacher.last_name}`}
                      className="w-32 h-32 md:w-40 md:h-40 object-cover rounded-full mx-auto mb-4 border-4 border-primary/20 shadow-lg"
                    />
                  ) : (
                    <div className="w-32 h-32 md:w-40 md:h-40 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full mx-auto mb-4 flex items-center justify-center border-4 border-primary/20">
                      <User className="h-16 w-16 text-muted-foreground" />
                    </div>
                  )}
                  
                  <h2 className="text-xl md:text-2xl font-bold text-foreground">
                    {teacher.first_name} {teacher.last_name}
                  </h2>
                  
                  {teacher.specialization && (
                    <p className="text-primary font-medium mt-1">{teacher.specialization}</p>
                  )}
                  
                  <div className="flex justify-center mt-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      teacher.status === 'active' 
                        ? 'bg-green-500/10 text-green-600' 
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {teacher.status === 'active' ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>

                {/* Contact Actions */}
                <div className="mt-6 space-y-3">
                  {teacher.email && (
                    <a 
                      href={`mailto:${teacher.email}`}
                      className="flex items-center gap-3 p-3 rounded-xl bg-primary/5 hover:bg-primary/10 transition-colors group"
                    >
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <Mail className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-muted-foreground">Email</p>
                        <p className="text-sm font-medium text-foreground truncate">{teacher.email}</p>
                      </div>
                    </a>
                  )}
                  
                  {teacher.phone && (
                    <a 
                      href={`tel:${teacher.phone}`}
                      className="flex items-center gap-3 p-3 rounded-xl bg-secondary/5 hover:bg-secondary/10 transition-colors group"
                    >
                      <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                        <Phone className="h-5 w-5 text-secondary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-muted-foreground">Phone</p>
                        <p className="text-sm font-medium text-foreground">{teacher.phone}</p>
                      </div>
                    </a>
                  )}
                </div>

                {/* Quick Info */}
                <div className="mt-6 pt-6 border-t border-border space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Joined:</span>
                    <span className="text-foreground font-medium">
                      {format(new Date(teacher.join_date), 'MMM yyyy')}
                    </span>
                  </div>
                  
                  {teacher.employee_id && (
                    <div className="flex items-center gap-3 text-sm">
                      <GraduationCap className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Employee ID:</span>
                      <span className="text-foreground font-medium">{teacher.employee_id}</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Details Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2 space-y-6"
            >
              {/* Qualification */}
              {teacher.qualification && (
                <div className="bg-card rounded-2xl border border-border p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <GraduationCap className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground">Qualification</h3>
                  </div>
                  <p className="text-foreground">{teacher.qualification}</p>
                </div>
              )}

              {/* Subjects */}
              {teacher.subjects && teacher.subjects.length > 0 && (
                <div className="bg-card rounded-2xl border border-border p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center">
                      <BookOpen className="h-5 w-5 text-secondary" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground">Subjects</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {teacher.subjects.map((subject: string) => (
                      <span 
                        key={subject}
                        className="px-4 py-2 bg-secondary/10 text-secondary rounded-full text-sm font-medium"
                      >
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Classes */}
              {teacher.classes && teacher.classes.length > 0 && (
                <div className="bg-card rounded-2xl border border-border p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                      <Users className="h-5 w-5 text-accent-foreground" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground">Classes</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {teacher.classes.map((className: string) => (
                      <span 
                        key={className}
                        className="px-4 py-2 bg-accent/10 text-accent-foreground rounded-full text-sm font-medium"
                      >
                        {className}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Personal Info */}
              <div className="bg-card rounded-2xl border border-border p-6">
                <h3 className="text-lg font-bold text-foreground mb-4">Personal Information</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {teacher.gender && (
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Gender</p>
                      <p className="text-foreground font-medium capitalize">{teacher.gender}</p>
                    </div>
                  )}
                  {teacher.date_of_birth && (
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Date of Birth</p>
                      <p className="text-foreground font-medium">
                        {format(new Date(teacher.date_of_birth), 'MMMM d, yyyy')}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
