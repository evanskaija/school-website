import { useState, useMemo } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { PageHero } from "@/components/shared/PageHero";
import { AnimatedCard } from "@/components/shared/AnimatedCard";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { CardGridSkeleton, StatsSkeleton } from "@/components/shared/Skeletons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, GraduationCap, Award, User, Search, Filter, X, ChevronRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import heroImage from "@/assets/staff.jpg";
import fridaImg from "@/assets/uploads/Madam frida.jpg";
import samsonImg from "@/assets/uploads/Mr samson.jpg";
import sarahImg from "@/assets/uploads/Madam sarah.jpg";
import paulImg from "@/assets/uploads/Mr paul.jpg";

const administration = [
  {
    name: "Madam Frida",
    position: "Principal",
    qualification: "Masters in Education Management",
    email: "principal@sacredheart.ac.tz",
    image: fridaImg,
  },
  {
    name: "Mr. Samson",
    position: "Deputy Principal - Academics",
    qualification: "M.Ed in Science Education",
    email: "academics@sacredheart.ac.tz",
    image: samsonImg,
  },
  {
    name: "Madam Sarah",
    position: "Deputy Principal - Administration",
    qualification: "MBA in Human Resource",
    email: "admin@sacredheart.ac.tz",
    image: sarahImg,
  },
];

const departmentFilters = [
  { labelKey: "staff.filter.all", value: "All" },
  { labelKey: "staff.filter.mathematics", value: "Mathematics" },
  { labelKey: "staff.filter.sciences", value: "Sciences" },
  { labelKey: "staff.filter.languages", value: "Languages" },
  { labelKey: "staff.filter.humanities", value: "Humanities" },
  { labelKey: "subject.ict", value: "ICT" },
  { labelKey: "staff.filter.artsSports", value: "Arts & Sports" },
];

export default function Staff() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [showFilters, setShowFilters] = useState(false);

  const { data: teachers, isLoading: teachersLoading } = useQuery({
    queryKey: ['teachers-public'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('teachers')
        .select('*')
        .eq('status', 'active')
        .order('first_name');

      if (error) throw error;
      return data;
    },
  });

  // Filter teachers based on search and department
  const filteredTeachers = useMemo(() => {
    if (!teachers) return [];

    return teachers.filter(teacher => {
      const matchesSearch = searchQuery === "" ||
        `${teacher.first_name} ${teacher.last_name}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
        teacher.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        teacher.specialization?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        teacher.subjects?.some((s: string) => s.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesDepartment = selectedDepartment === "All" ||
        teacher.specialization?.toLowerCase().includes(selectedDepartment.toLowerCase()) ||
        teacher.subjects?.some((s: string) => s.toLowerCase().includes(selectedDepartment.toLowerCase()));

      return matchesSearch && matchesDepartment;
    });
  }, [teachers, searchQuery, selectedDepartment]);

  const stats = [
    { label: t("staff.stats.totalTeachers"), value: teachers?.length?.toString() || "0" },
    { label: t("staff.stats.phd"), value: teachers?.filter(t => t.qualification?.includes('PhD'))?.length?.toString() || "0" },
    { label: t("staff.stats.masters"), value: teachers?.filter(t => t.qualification?.includes('Master'))?.length?.toString() || "0" },
    { label: t("staff.stats.support"), value: "35" },
  ];

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedDepartment("All");
  };

  const hasActiveFilters = searchQuery !== "" || selectedDepartment !== "All";

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <PageHero
        title={t("staff.hero.title")}
        subtitle={t("staff.hero.subtitle")}
        backgroundImage={heroImage}
        breadcrumbs={[
          { label: t("nav.home"), href: "/" },
          { label: t("staff.hero.title") }
        ]}
      />

      <main className="py-12 md:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Staff Statistics */}
          {teachersLoading ? (
            <div className="mb-16 md:mb-20">
              <StatsSkeleton />
            </div>
          ) : (
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16 md:mb-20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-card rounded-xl p-4 md:p-6 border-l-4 border-primary text-center shadow-sm"
                >
                  <p className="text-2xl md:text-3xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-muted-foreground text-xs md:text-sm">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          )}

          {/* Administration */}
          <SectionHeader
            title={t("staff.admin.title")}
            subtitle={t("staff.admin.subtitle")}
          />

          <div className="grid md:grid-cols-3 gap-6 md:gap-8 mt-8 md:mt-12">
            {administration.map((person, index) => (
              <AnimatedCard key={person.name} delay={index * 0.1}>
                <div className="p-4 md:p-6 text-center">
                  <div className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-4 overflow-hidden rounded-full shadow-lg border-2 border-primary/20">
                    {person.image ? (
                      <img
                        src={person.image}
                        alt={person.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                        <GraduationCap className="h-10 w-10 md:h-12 md:w-12 text-primary" />
                      </div>
                    )}
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-foreground">{person.name}</h3>
                  <p className="text-primary font-medium text-sm md:text-base">{person.position}</p>
                  <p className="text-muted-foreground text-xs md:text-sm mt-2 flex items-center justify-center gap-1">
                    <Award className="h-3 w-3 md:h-4 md:w-4" /> {person.qualification}
                  </p>
                  <a
                    href={`mailto:${person.email}`}
                    className="text-xs md:text-sm text-muted-foreground mt-3 flex items-center justify-center gap-1 hover:text-primary transition-colors active:scale-95 touch-manipulation"
                  >
                    <Mail className="h-3 w-3 md:h-4 md:w-4" /> {person.email}
                  </a>
                </div>
              </AnimatedCard>
            ))}
          </div>

          {/* Teachers Section with Search and Filter */}
          <div className="mt-16 md:mt-20">
            <SectionHeader
              title={t("staff.teachers.title")}
              subtitle={t("staff.teachers.subtitle")}
            />

            {/* Search and Filter Bar */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-8 space-y-4"
            >
              <div className="flex flex-col sm:flex-row gap-3">
                {/* Search Input */}
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
                  <Input
                    type="text"
                    placeholder={t("staff.search.placeholder")}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-12 rounded-xl border-border bg-card"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-muted transition-colors"
                    >
                      <X className="h-4 w-4 text-muted-foreground" />
                    </button>
                  )}
                </div>

                {/* Filter Toggle Button */}
                <Button
                  variant={showFilters ? "default" : "outline"}
                  onClick={() => setShowFilters(!showFilters)}
                  className="h-12 px-4 gap-2 rounded-xl shrink-0"
                >
                  <Filter className="h-4 w-4" />
                  <span className="hidden sm:inline">{t("staff.filter.button")}</span>
                  {hasActiveFilters && (
                    <span className="w-2 h-2 rounded-full bg-primary-foreground" />
                  )}
                </Button>
              </div>

              {/* Filter Options */}
              <AnimatePresence>
                {showFilters && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 bg-card rounded-xl border border-border">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-medium text-foreground">{t("staff.filter.dept")}</span>
                        {hasActiveFilters && (
                          <Button variant="ghost" size="sm" onClick={clearFilters} className="h-8 text-xs">
                            {t("staff.filter.clear")}
                          </Button>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {departmentFilters.map((dept) => (
                          <button
                            key={dept.value}
                            onClick={() => setSelectedDepartment(dept.value)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all active:scale-95 touch-manipulation ${selectedDepartment === dept.value
                              ? "bg-primary text-primary-foreground shadow-md"
                              : "bg-muted text-muted-foreground hover:bg-muted/80"
                              }`}
                          >
                            {t(dept.labelKey)}
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Results Count */}
              {!teachersLoading && teachers && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    Showing {filteredTeachers.length} of {teachers.length} teachers
                  </span>
                </div>
              )}
            </motion.div>

            {/* Teachers Grid */}
            {teachersLoading ? (
              <div className="mt-6">
                <CardGridSkeleton count={8} />
              </div>
            ) : filteredTeachers.length > 0 ? (
              <motion.div
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mt-6"
                layout
              >
                <AnimatePresence mode="popLayout">
                  {filteredTeachers.map((teacher, index) => (
                    <motion.div
                      key={teacher.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.2, delay: index * 0.02 }}
                    >
                      <Link to={`/staff/teacher/${teacher.id}`} className="block group">
                        <div className="bg-card rounded-xl border border-border p-3 md:p-4 text-center hover:shadow-lg hover:border-primary/30 transition-all duration-300 h-full">
                          <div className="relative w-20 h-20 md:w-28 md:h-28 mx-auto mb-3 md:mb-4">
                            {teacher.photo_url ? (
                              <img
                                src={teacher.photo_url}
                                alt={`${teacher.first_name} ${teacher.last_name}`}
                                className="w-full h-full object-cover rounded-full border-3 border-primary/20 group-hover:border-primary/40 transition-colors"
                                loading="lazy"
                              />
                            ) : (
                              <div className="w-full h-full bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full flex items-center justify-center border-2 border-primary/20 group-hover:border-primary/40 transition-colors">
                                <User className="h-8 w-8 md:h-12 md:w-12 text-muted-foreground" />
                              </div>
                            )}
                          </div>
                          <h3 className="text-sm md:text-base font-bold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                            {teacher.first_name} {teacher.last_name}
                          </h3>
                          {teacher.specialization && (
                            <p className="text-primary text-xs md:text-sm font-medium line-clamp-1">
                              {teacher.specialization}
                            </p>
                          )}
                          {teacher.subjects && teacher.subjects.length > 0 && (
                            <div className="flex flex-wrap justify-center gap-1 mt-2">
                              {teacher.subjects.slice(0, 2).map((subject: string) => (
                                <span
                                  key={subject}
                                  className="px-2 py-0.5 bg-secondary/10 text-secondary text-[10px] md:text-xs rounded-full"
                                >
                                  {subject}
                                </span>
                              ))}
                              {teacher.subjects.length > 2 && (
                                <span className="px-2 py-0.5 bg-muted text-muted-foreground text-[10px] md:text-xs rounded-full">
                                  +{teacher.subjects.length - 2}
                                </span>
                              )}
                            </div>
                          )}
                          <div className="mt-3 flex items-center justify-center text-xs text-muted-foreground group-hover:text-primary transition-colors">
                            <span>{t("staff.profile.view")}</span>
                            <ChevronRight className="h-3 w-3 ml-1 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-8 text-center py-16 bg-muted/30 rounded-xl"
              >
                <Search className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">{t("staff.noResults.title")}</h3>
                <p className="text-muted-foreground mb-6">{t("staff.noResults.desc")}</p>
                <Button onClick={clearFilters} variant="outline">
                  {t("staff.filter.clear")}
                </Button>
              </motion.div>
            )}
          </div>

          {/* Join Our Team */}
          <motion.div
            className="mt-16 md:mt-20 text-center bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl md:rounded-2xl p-8 md:p-12 border border-primary/20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">{t("staff.join.title")}</h2>
            <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto mb-6 md:mb-8">
              {t("staff.join.desc")}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
              <Button size="lg" asChild className="rounded-xl">
                <Link to="/contact">{t("staff.join.viewOpenings")}</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="rounded-xl">
                <a href="mailto:hr@sacredheart.ac.tz">
                  <Mail className="h-4 w-4 md:h-5 md:w-5 mr-2" /> {t("staff.join.sendCV")}
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
