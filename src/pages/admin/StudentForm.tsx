import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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

const classes = ["Form 1", "Form 2", "Form 3", "Form 4"];
const streams = ["A", "B", "C", "D"];

export default function StudentForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEditing);
  const [formData, setFormData] = useState({
    admission_number: "",
    first_name: "",
    last_name: "",
    date_of_birth: "",
    gender: "",
    class_name: "",
    stream: "",
    admission_date: new Date().toISOString().split('T')[0],
    parent_name: "",
    parent_phone: "",
    parent_email: "",
    address: "",
    photo_url: "",
    status: "active",
  });

  useEffect(() => {
    const fetchStudent = async (studentId: string) => {
      try {
        const { data, error } = await supabase
          .from("students")
          .select("*")
          .eq("id", studentId)
          .maybeSingle();

        if (error) throw error;
        if (!data) {
          toast.error("Student not found");
          navigate("/admin/students");
          return;
        }

        setFormData({
          admission_number: data.admission_number,
          first_name: data.first_name,
          last_name: data.last_name,
          date_of_birth: data.date_of_birth || "",
          gender: data.gender || "",
          class_name: data.class_name,
          stream: data.stream || "",
          admission_date: data.admission_date,
          parent_name: data.parent_name || "",
          parent_phone: data.parent_phone || "",
          parent_email: data.parent_email || "",
          address: data.address || "",
          photo_url: data.photo_url || "",
          status: data.status,
        });
      } catch (error: unknown) {
        toast.error("Failed to fetch student");
        console.error(error);
      } finally {
        setFetching(false);
      }
    };

    if (isEditing && id) {
      fetchStudent(id);
    }
  }, [id, isEditing, navigate]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.admission_number || !formData.first_name || !formData.last_name || !formData.class_name) {
      toast.error("Please fill in all required fields");
      return;
    }

    setLoading(true);

    try {
      const studentData = {
        admission_number: formData.admission_number,
        first_name: formData.first_name,
        last_name: formData.last_name,
        date_of_birth: formData.date_of_birth || null,
        gender: formData.gender || null,
        class_name: formData.class_name,
        stream: formData.stream || null,
        admission_date: formData.admission_date,
        parent_name: formData.parent_name || null,
        parent_phone: formData.parent_phone || null,
        parent_email: formData.parent_email || null,
        address: formData.address || null,
        photo_url: formData.photo_url || null,
        status: formData.status,
      };

      if (isEditing && id) {
        const { error } = await supabase
          .from("students")
          .update(studentData)
          .eq("id", id);

        if (error) throw error;
        toast.success("Student updated successfully");
      } else {
        const { error } = await supabase
          .from("students")
          .insert([studentData]);

        if (error) throw error;
        toast.success("Student added successfully");
      }

      navigate("/admin/students");
      navigate("/admin/students");
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Failed to save student";
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
            <Link to="/admin/students">
              <Button type="button" variant="ghost" size="icon" className="h-8 w-8">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-bold">
                {isEditing ? "Edit Student" : "Add New Student"}
              </h1>
              <p className="text-xs text-muted-foreground">
                {isEditing ? "Update student information" : "Enter student details"}
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
                folder="students"
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
                  <Label className="text-xs">Admission No. *</Label>
                  <Input
                    value={formData.admission_number}
                    onChange={(e) => setFormData(prev => ({ ...prev, admission_number: e.target.value }))}
                    placeholder="SH/2024/001"
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
                      <SelectItem value="graduated">Graduated</SelectItem>
                      <SelectItem value="transferred">Transferred</SelectItem>
                      <SelectItem value="suspended">Suspended</SelectItem>
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
                  <Label className="text-xs">Admission Date</Label>
                  <Input
                    type="date"
                    value={formData.admission_date}
                    onChange={(e) => setFormData(prev => ({ ...prev, admission_date: e.target.value }))}
                    className="h-9"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label className="text-xs">Class *</Label>
                  <Select
                    value={formData.class_name}
                    onValueChange={(v) => setFormData(prev => ({ ...prev, class_name: v }))}
                  >
                    <SelectTrigger className="h-9">
                      <SelectValue placeholder="Select class" />
                    </SelectTrigger>
                    <SelectContent>
                      {classes.map((cls) => (
                        <SelectItem key={cls} value={cls}>{cls}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Stream</Label>
                  <Select
                    value={formData.stream}
                    onValueChange={(v) => setFormData(prev => ({ ...prev, stream: v }))}
                  >
                    <SelectTrigger className="h-9">
                      <SelectValue placeholder="Select stream" />
                    </SelectTrigger>
                    <SelectContent>
                      {streams.map((stream) => (
                        <SelectItem key={stream} value={stream}>{stream}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Parent/Guardian Info */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="p-3 pb-2">
            <CardTitle className="text-sm">Parent/Guardian Information</CardTitle>
          </CardHeader>
          <CardContent className="p-3 pt-0 space-y-3">
            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-1">
                <Label className="text-xs">Parent/Guardian Name</Label>
                <Input
                  value={formData.parent_name}
                  onChange={(e) => setFormData(prev => ({ ...prev, parent_name: e.target.value }))}
                  placeholder="Parent name"
                  className="h-9"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Phone</Label>
                <Input
                  value={formData.parent_phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, parent_phone: e.target.value }))}
                  placeholder="+255..."
                  className="h-9"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Email</Label>
                <Input
                  type="email"
                  value={formData.parent_email}
                  onChange={(e) => setFormData(prev => ({ ...prev, parent_email: e.target.value }))}
                  placeholder="parent@email.com"
                  className="h-9"
                />
              </div>
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Address</Label>
              <Textarea
                value={formData.address}
                onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                placeholder="Home address"
                rows={2}
                className="resize-none"
              />
            </div>
          </CardContent>
        </Card>
      </form>
    </AdminLayout>
  );
}