import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Pencil,
  Trash2,
  Search,
  GraduationCap,
  MoreHorizontal,
  Users
} from "lucide-react";
import { Link } from "react-router-dom";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Student {
  id: string;
  admission_number: string;
  first_name: string;
  last_name: string;
  class_name: string;
  stream: string | null;
  gender: string | null;
  status: string;
  admission_date: string;
  photo_url: string | null;
}

const statusColors: Record<string, string> = {
  active: "bg-accent/10 text-accent border-accent/30",
  graduated: "bg-secondary/10 text-secondary-foreground border-secondary/30",
  transferred: "bg-muted text-muted-foreground border-muted-foreground/30",
  suspended: "bg-destructive/10 text-destructive border-destructive/30",
};

export default function StudentManagement() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterClass, setFilterClass] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const { data, error } = await supabase
          .from("students")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;
        setStudents(data || []);
      } catch (error: unknown) {
        toast.error("Failed to fetch students");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);



  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      const { error } = await supabase
        .from("students")
        .delete()
        .eq("id", deleteId);

      if (error) throw error;

      setStudents(students.filter((s) => s.id !== deleteId));
      toast.success("Student deleted successfully");
    } catch (error: unknown) {
      toast.error("Failed to delete student");
      console.error(error);
    } finally {
      setDeleteId(null);
    }
  };

  const uniqueClasses = [...new Set(students.map((s) => s.class_name))].sort();

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.admission_number.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesClass = filterClass === "all" || student.class_name === filterClass;
    const matchesStatus = filterStatus === "all" || student.status === filterStatus;

    return matchesSearch && matchesClass && matchesStatus;
  });

  const stats = {
    total: students.length,
    active: students.filter(s => s.status === "active").length,
    graduated: students.filter(s => s.status === "graduated").length,
  };

  return (
    <AdminLayout>
      <div className="space-y-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
        >
          <div>
            <h1 className="text-2xl font-bold">Student Management</h1>
            <p className="text-sm text-muted-foreground">
              Manage student records and enrollment
            </p>
          </div>
          <Link to="/admin/students/create">
            <Button size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              Add Student
            </Button>
          </Link>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-3 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-xl font-bold">{stats.total}</p>
                <p className="text-xs text-muted-foreground">Total</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-3 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <GraduationCap className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="text-xl font-bold">{stats.active}</p>
                <p className="text-xs text-muted-foreground">Active</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-3 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                <GraduationCap className="h-5 w-5 text-secondary-foreground" />
              </div>
              <div>
                <p className="text-xl font-bold">{stats.graduated}</p>
                <p className="text-xs text-muted-foreground">Graduated</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-3">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search students..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 h-9"
                />
              </div>
              <Select value={filterClass} onValueChange={setFilterClass}>
                <SelectTrigger className="w-full sm:w-32 h-9">
                  <SelectValue placeholder="Class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Classes</SelectItem>
                  {uniqueClasses.map((cls) => (
                    <SelectItem key={cls} value={cls}>{cls}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full sm:w-32 h-9">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="graduated">Graduated</SelectItem>
                  <SelectItem value="transferred">Transferred</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Students List */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="p-3 pb-0">
            <CardTitle className="text-base">
              Students ({filteredStudents.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3">
            {loading ? (
              <div className="space-y-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-14 bg-muted/50 rounded-lg animate-pulse" />
                ))}
              </div>
            ) : filteredStudents.length === 0 ? (
              <div className="text-center py-8">
                <GraduationCap className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground text-sm">No students found</p>
                <Link to="/admin/students/create">
                  <Button variant="outline" size="sm" className="mt-3">
                    Add first student
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-2">
                {filteredStudents.map((student, index) => (
                  <motion.div
                    key={student.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.03 }}
                    className="flex items-center gap-3 p-3 rounded-lg border bg-card hover:bg-muted/30 transition-colors"
                  >
                    {/* Avatar */}
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-muted shrink-0">
                      {student.photo_url ? (
                        <img
                          src={student.photo_url}
                          alt={student.first_name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground font-medium">
                          {student.first_name[0]}{student.last_name[0]}
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-sm truncate">
                          {student.first_name} {student.last_name}
                        </h3>
                        <Badge variant="outline" className={`text-xs shrink-0 ${statusColors[student.status]}`}>
                          {student.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{student.admission_number}</span>
                        <span>•</span>
                        <span>{student.class_name}{student.stream ? ` - ${student.stream}` : ''}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link to={`/admin/students/edit/${student.id}`} className="flex items-center gap-2">
                            <Pencil className="h-4 w-4" />
                            Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onClick={() => setDeleteId(student.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </motion.div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Student?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently remove the student record. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
}