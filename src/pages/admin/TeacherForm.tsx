import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Save, Loader2, X } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const allSubjects = [
  "Mathematics", "English", "Kiswahili", "Physics", "Chemistry",
  "Biology", "History", "Geography", "Civics", "Commerce",
  "Book-Keeping", "Computer Science", "Bible Knowledge"
];

const allClasses = ["Form 1", "Form 2", "Form 3", "Form 4"];

export default function TeacherForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEditing);
  const [subjectInput, setSubjectInput] = useState("");
  const [classInput, setClassInput] = useState("");
  const [formData, setFormData] = useState({
    employee_id: "",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    date_of_birth: "",
    gender: "",
    qualification: "",
    specialization: "",
    subjects: [] as string[],
    classes: [] as string[],
    join_date: new Date().toISOString().split('T')[0],
    photo_url: "",
    status: "active",
  });

  useEffect(() => {
    const fetchTeacher = async (teacherId: string) => {
      try {
        const { data, error } = await supabase
          .from("teachers")
          .select("*")
          .eq("id", teacherId)
          .maybeSingle();

        if (error) throw error;
        if (!data) {
          toast.error("Teacher not found");
          navigate("/admin/teachers");
          return;
        }

        setFormData({
          employee_id: data.employee_id,
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email,
          phone: data.phone || "",
          date_of_birth: data.date_of_birth || "",
          gender: data.gender || "",
          qualification: data.qualification || "",
          specialization: data.specialization || "",
          subjects: data.subjects || [],
          classes: data.classes || [],
          join_date: data.join_date,
          photo_url: data.photo_url || "",
          status: data.status,
        });
      } catch (error: unknown) {
        toast.error("Failed to fetch teacher");
        console.error(error);
      } finally {
        setFetching(false);
      }
    };

    if (isEditing && id) {
      fetchTeacher(id);
    }
  }, [id, isEditing, navigate]);



  const addSubject = (subject: string) => {
    if (subject && !formData.subjects.includes(subject)) {
      setFormData(prev => ({ ...prev, subjects: [...prev.subjects, subject] }));
    }
    setSubjectInput("");
  };

  const removeSubject = (subject: string) => {
    setFormData(prev => ({ ...prev, subjects: prev.subjects.filter(s => s !== subject) }));
  };

  const addClass = (cls: string) => {
    if (cls && !formData.classes.includes(cls)) {
      setFormData(prev => ({ ...prev, classes: [...prev.classes, cls] }));
    }
    setClassInput("");
  };

  const removeClass = (cls: string) => {
    setFormData(prev => ({ ...prev, classes: prev.classes.filter(c => c !== cls) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.employee_id || !formData.first_name || !formData.last_name || !formData.email) {
      toast.error("Please fill in all required fields");
      return;
    }

    setLoading(true);

    try {
      const teacherData = {
        employee_id: formData.employee_id,
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        phone: formData.phone || null,
        date_of_birth: formData.date_of_birth || null,
        gender: formData.gender || null,
        qualification: formData.qualification || null,
        specialization: formData.specialization || null,
        subjects: formData.subjects,
        classes: formData.classes,
        join_date: formData.join_date,
        photo_url: formData.photo_url || null,
        status: formData.status,
      };

      if (isEditing && id) {
        const { error } = await supabase
          .from("teachers")
          .update(teacherData)
          .eq("id", id);

        if (error) throw error;
        toast.success("Teacher updated successfully");
      } else {
        const { error } = await supabase
          .from("teachers")
          .insert([teacherData]);

        if (error) throw error;
        toast.success("Teacher added successfully");
      }

      navigate("/admin/teachers");
      navigate("/admin/teachers");
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Failed to save teacher";
      toast.error(message);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-3xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <Link to="/admin/teachers">
              <Button type="button" variant="ghost" size="icon" className="h-8 w-8">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-bold">
                {isEditing ? "Edit Teacher" : "Add New Teacher"}
              </h1>
              <p className="text-xs text-muted-foreground">
                {isEditing ? "Update teacher information" : "Enter teacher details"}
              </p>
            </div>
          </div>
          <Button type="submit" size="sm" disabled={loading}>
            {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
            {isEditing ? "Update" : "Save"}
          </Button>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-4">
          {/* Photo Upload */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="p-3 pb-2">
              <CardTitle className="text-sm">Photo</CardTitle>
            </CardHeader>
            <CardContent className="p-3 pt-0">
              <ImageUpload
                currentImage={formData.photo_url}
                onUpload={(url) => setFormData(prev => ({ ...prev, photo_url: url }))}
                folder="teachers"
              />
            </CardContent>
          </Card>

          {/* Basic Info */}
          <Card className="border-0 shadow-sm md:col-span-2">
            <CardHeader className="p-3 pb-2">
              <CardTitle className="text-sm">Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="p-3 pt-0 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label className="text-xs">Employee ID *</Label>
                  <Input
                    value={formData.employee_id}
                    onChange={(e) => setFormData(prev => ({ ...prev, employee_id: e.target.value }))}
                    placeholder="TCH/2024/001"
                    className="h-9"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(v) => setFormData(prev => ({ ...prev, status: v }))}
                  >
                    <SelectTrigger className="h-9">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="on_leave">On Leave</SelectItem>
                      <SelectItem value="resigned">Resigned</SelectItem>
                      <SelectItem value="retired">Retired</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label className="text-xs">First Name *</Label>
                  <Input
                    value={formData.first_name}
                    onChange={(e) => setFormData(prev => ({ ...prev, first_name: e.target.value }))}
                    placeholder="John"
                    className="h-9"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Last Name *</Label>
                  <Input
                    value={formData.last_name}
                    onChange={(e) => setFormData(prev => ({ ...prev, last_name: e.target.value }))}
                    placeholder="Doe"
                    className="h-9"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label className="text-xs">Email *</Label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="teacher@school.com"
                    className="h-9"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Phone</Label>
                  <Input
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="+255..."
                    className="h-9"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <Label className="text-xs">Date of Birth</Label>
                  <Input
                    type="date"
                    value={formData.date_of_birth}
                    onChange={(e) => setFormData(prev => ({ ...prev, date_of_birth: e.target.value }))}
                    className="h-9"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Gender</Label>
                  <Select
                    value={formData.gender}
                    onValueChange={(v) => setFormData(prev => ({ ...prev, gender: v }))}
                  >
                    <SelectTrigger className="h-9">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Join Date</Label>
                  <Input
                    type="date"
                    value={formData.join_date}
                    onChange={(e) => setFormData(prev => ({ ...prev, join_date: e.target.value }))}
                    className="h-9"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Professional Info */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="p-3 pb-2">
            <CardTitle className="text-sm">Professional Information</CardTitle>
          </CardHeader>
          <CardContent className="p-3 pt-0 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label className="text-xs">Qualification</Label>
                <Input
                  value={formData.qualification}
                  onChange={(e) => setFormData(prev => ({ ...prev, qualification: e.target.value }))}
                  placeholder="e.g., B.Ed, M.Ed"
                  className="h-9"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Specialization</Label>
                <Input
                  value={formData.specialization}
                  onChange={(e) => setFormData(prev => ({ ...prev, specialization: e.target.value }))}
                  placeholder="e.g., Science Education"
                  className="h-9"
                />
              </div>
            </div>

            {/* Subjects */}
            <div className="space-y-2">
              <Label className="text-xs">Subjects</Label>
              <div className="flex gap-2">
                <Select value={subjectInput} onValueChange={addSubject}>
                  <SelectTrigger className="h-9 flex-1">
                    <SelectValue placeholder="Select subjects" />
                  </SelectTrigger>
                  <SelectContent>
                    {allSubjects.filter(s => !formData.subjects.includes(s)).map((subject) => (
                      <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {formData.subjects.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {formData.subjects.map((subject) => (
                    <Badge key={subject} variant="secondary" className="text-xs">
                      {subject}
                      <button type="button" onClick={() => removeSubject(subject)} className="ml-1">
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Classes */}
            <div className="space-y-2">
              <Label className="text-xs">Classes</Label>
              <div className="flex gap-2">
                <Select value={classInput} onValueChange={addClass}>
                  <SelectTrigger className="h-9 flex-1">
                    <SelectValue placeholder="Select classes" />
                  </SelectTrigger>
                  <SelectContent>
                    {allClasses.filter(c => !formData.classes.includes(c)).map((cls) => (
                      <SelectItem key={cls} value={cls}>{cls}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {formData.classes.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {formData.classes.map((cls) => (
                    <Badge key={cls} variant="outline" className="text-xs">
                      {cls}
                      <button type="button" onClick={() => removeClass(cls)} className="ml-1">
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </form>
    </AdminLayout>
  );
}