import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Pencil,
  Trash2,
  Search,
  UserCheck,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Teacher {
  id: string;
  employee_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  subjects: string[];
  classes: string[];
  qualification: string | null;
  status: string;
  photo_url: string | null;
}

const statusColors: Record<string, string> = {
  active: "bg-accent/10 text-accent border-accent/30",
  on_leave: "bg-secondary/10 text-secondary-foreground border-secondary/30",
  resigned: "bg-muted text-muted-foreground border-muted-foreground/30",
  retired: "bg-primary/10 text-primary border-primary/30",
};

export default function TeacherManagement() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const { data, error } = await supabase
          .from("teachers")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;
        setTeachers(data || []);
      } catch (error: unknown) {
        toast.error("Failed to fetch teachers");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeachers();
  }, []);



  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      const { error } = await supabase
        .from("teachers")
        .delete()
        .eq("id", deleteId);

      if (error) throw error;

      setTeachers(teachers.filter((t) => t.id !== deleteId));
      toast.success("Teacher deleted successfully");
    } catch (error: unknown) {
      toast.error("Failed to delete teacher");
      console.error(error);
    } finally {
      setDeleteId(null);
    }
  };

  const filteredTeachers = teachers.filter((teacher) => {
    const matchesSearch =
      teacher.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.employee_id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = filterStatus === "all" || teacher.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: teachers.length,
    active: teachers.filter(t => t.status === "active").length,
    onLeave: teachers.filter(t => t.status === "on_leave").length,
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
            <h1 className="text-2xl font-bold">Teacher Management</h1>
            <p className="text-sm text-muted-foreground">
              Manage staff and subject assignments
            </p>
          </div>
          <Link to="/admin/teachers/create">
            <Button size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              Add Teacher
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
                <UserCheck className="h-5 w-5 text-accent" />
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
                <UserCheck className="h-5 w-5 text-secondary-foreground" />
              </div>
              <div>
                <p className="text-xl font-bold">{stats.onLeave}</p>
                <p className="text-xs text-muted-foreground">On Leave</p>
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
                  placeholder="Search teachers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 h-9"
                />
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full sm:w-32 h-9">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="on_leave">On Leave</SelectItem>
                  <SelectItem value="resigned">Resigned</SelectItem>
                  <SelectItem value="retired">Retired</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Teachers List */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="p-3 pb-0">
            <CardTitle className="text-base">
              Teachers ({filteredTeachers.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3">
            {loading ? (
              <div className="space-y-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-14 bg-muted/50 rounded-lg animate-pulse" />
                ))}
              </div>
            ) : filteredTeachers.length === 0 ? (
              <div className="text-center py-8">
                <UserCheck className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground text-sm">No teachers found</p>
                <Link to="/admin/teachers/create">
                  <Button variant="outline" size="sm" className="mt-3">
                    Add first teacher
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-2">
                {filteredTeachers.map((teacher, index) => (
                  <motion.div
                    key={teacher.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.03 }}
                    className="flex items-center gap-3 p-3 rounded-lg border bg-card hover:bg-muted/30 transition-colors"
                  >
                    {/* Avatar */}
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-muted shrink-0">
                      {teacher.photo_url ? (
                        <img
                          src={teacher.photo_url}
                          alt={teacher.first_name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground font-medium">
                          {teacher.first_name[0]}{teacher.last_name[0]}
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-sm truncate">
                          {teacher.first_name} {teacher.last_name}
                        </h3>
                        <Badge variant="outline" className={`text-xs shrink-0 ${statusColors[teacher.status]}`}>
                          {teacher.status.replace('_', ' ')}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{teacher.employee_id}</span>
                        <span>•</span>
                        <span className="truncate">{teacher.subjects.slice(0, 2).join(", ")}{teacher.subjects.length > 2 ? '...' : ''}</span>
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
                          <Link to={`/admin/teachers/edit/${teacher.id}`} className="flex items-center gap-2">
                            <Pencil className="h-4 w-4" />
                            Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onClick={() => setDeleteId(teacher.id)}
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
            <AlertDialogTitle>Delete Teacher?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently remove the teacher record. This action cannot be undone.
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