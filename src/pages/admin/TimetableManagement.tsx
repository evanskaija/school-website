import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Plus, Trash2, Edit2, Calendar, Clock } from "lucide-react";
import { TableSkeleton } from "@/components/shared/Skeletons";

interface Teacher {
  id: string;
  first_name: string;
  last_name: string;
}

interface TimetableEntry {
  id: string;
  teacher_id: string;
  day_of_week: string;
  start_time: string;
  end_time: string;
  subject: string;
  class_name: string;
  room: string | null;
  teachers?: Teacher;
}

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const TIME_SLOTS = [
  "07:00", "07:30", "08:00", "08:30", "09:00", "09:30", 
  "10:00", "10:30", "11:00", "11:30", "12:00", "12:30",
  "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00"
];

export default function TimetableManagement() {
  const [entries, setEntries] = useState<TimetableEntry[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<TimetableEntry | null>(null);
  const [selectedDay, setSelectedDay] = useState<string>("all");
  
  const [formData, setFormData] = useState({
    teacher_id: "",
    day_of_week: "Monday",
    start_time: "08:00",
    end_time: "09:00",
    subject: "",
    class_name: "",
    room: ""
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const [timetableRes, teachersRes] = await Promise.all([
      supabase.from("timetables").select("*, teachers(id, first_name, last_name)").order("day_of_week").order("start_time"),
      supabase.from("teachers").select("id, first_name, last_name").eq("status", "active")
    ]);

    if (timetableRes.data) setEntries(timetableRes.data);
    if (teachersRes.data) setTeachers(teachersRes.data);
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const payload = {
      teacher_id: formData.teacher_id,
      day_of_week: formData.day_of_week,
      start_time: formData.start_time,
      end_time: formData.end_time,
      subject: formData.subject,
      class_name: formData.class_name,
      room: formData.room || null
    };

    if (editingEntry) {
      const { error } = await supabase
        .from("timetables")
        .update(payload)
        .eq("id", editingEntry.id);
      
      if (error) {
        toast.error("Failed to update entry");
        return;
      }
      toast.success("Timetable entry updated");
    } else {
      const { error } = await supabase.from("timetables").insert(payload);
      if (error) {
        toast.error("Failed to create entry");
        return;
      }
      toast.success("Timetable entry created");
    }

    setIsDialogOpen(false);
    setEditingEntry(null);
    resetForm();
    fetchData();
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("timetables").delete().eq("id", id);
    if (error) {
      toast.error("Failed to delete entry");
      return;
    }
    toast.success("Entry deleted");
    fetchData();
  };

  const handleEdit = (entry: TimetableEntry) => {
    setEditingEntry(entry);
    setFormData({
      teacher_id: entry.teacher_id,
      day_of_week: entry.day_of_week,
      start_time: entry.start_time.slice(0, 5),
      end_time: entry.end_time.slice(0, 5),
      subject: entry.subject,
      class_name: entry.class_name,
      room: entry.room || ""
    });
    setIsDialogOpen(true);
  };

  const resetForm = () => {
    setFormData({
      teacher_id: "",
      day_of_week: "Monday",
      start_time: "08:00",
      end_time: "09:00",
      subject: "",
      class_name: "",
      room: ""
    });
  };

  const filteredEntries = selectedDay === "all" 
    ? entries 
    : entries.filter(e => e.day_of_week === selectedDay);

  const formatTime = (time: string) => {
    return time.slice(0, 5);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <Calendar className="h-6 w-6 text-primary" />
              Timetable Management
            </h1>
            <p className="text-muted-foreground mt-1">Manage class schedules for all teachers</p>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) {
              setEditingEntry(null);
              resetForm();
            }
          }}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Add Schedule
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>{editingEntry ? "Edit Schedule" : "Add New Schedule"}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label>Teacher</Label>
                  <Select value={formData.teacher_id} onValueChange={(v) => setFormData({...formData, teacher_id: v})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select teacher" />
                    </SelectTrigger>
                    <SelectContent>
                      {teachers.map(t => (
                        <SelectItem key={t.id} value={t.id}>
                          {t.first_name} {t.last_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Day</Label>
                    <Select value={formData.day_of_week} onValueChange={(v) => setFormData({...formData, day_of_week: v})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {DAYS.map(day => (
                          <SelectItem key={day} value={day}>{day}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Room</Label>
                    <Input 
                      value={formData.room} 
                      onChange={(e) => setFormData({...formData, room: e.target.value})}
                      placeholder="e.g., Room 12"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Start Time</Label>
                    <Select value={formData.start_time} onValueChange={(v) => setFormData({...formData, start_time: v})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {TIME_SLOTS.map(time => (
                          <SelectItem key={time} value={time}>{time}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>End Time</Label>
                    <Select value={formData.end_time} onValueChange={(v) => setFormData({...formData, end_time: v})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {TIME_SLOTS.map(time => (
                          <SelectItem key={time} value={time}>{time}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label>Subject</Label>
                  <Input 
                    value={formData.subject} 
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    placeholder="e.g., Mathematics"
                    required
                  />
                </div>

                <div>
                  <Label>Class</Label>
                  <Input 
                    value={formData.class_name} 
                    onChange={(e) => setFormData({...formData, class_name: e.target.value})}
                    placeholder="e.g., Form 3A"
                    required
                  />
                </div>

                <Button type="submit" className="w-full">
                  {editingEntry ? "Update Schedule" : "Add Schedule"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Filter */}
        <div className="flex items-center gap-4">
          <Label>Filter by Day:</Label>
          <Select value={selectedDay} onValueChange={setSelectedDay}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Days</SelectItem>
              {DAYS.map(day => (
                <SelectItem key={day} value={day}>{day}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        {loading ? (
          <TableSkeleton rows={6} />
        ) : (
          <div className="bg-card rounded-lg border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Day</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Class</TableHead>
                  <TableHead>Teacher</TableHead>
                  <TableHead>Room</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEntries.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      No timetable entries found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredEntries.map((entry) => (
                    <TableRow key={entry.id}>
                      <TableCell className="font-medium">{entry.day_of_week}</TableCell>
                      <TableCell>
                        <span className="flex items-center gap-1 text-sm">
                          <Clock className="h-3 w-3" />
                          {formatTime(entry.start_time)} - {formatTime(entry.end_time)}
                        </span>
                      </TableCell>
                      <TableCell>{entry.subject}</TableCell>
                      <TableCell>{entry.class_name}</TableCell>
                      <TableCell>
                        {entry.teachers ? `${entry.teachers.first_name} ${entry.teachers.last_name}` : "-"}
                      </TableCell>
                      <TableCell>{entry.room || "-"}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" onClick={() => handleEdit(entry)}>
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDelete(entry.id)}>
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
