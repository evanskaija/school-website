import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { z } from "zod";

const newsSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(200),
  content: z.string().min(10, "Content must be at least 10 characters"),
  excerpt: z.string().max(300).optional(),
  category: z.string().min(1, "Please select a category"),
  image_url: z.string().optional(),
  is_event: z.boolean(),
  is_published: z.boolean(),
  event_date: z.string().optional(),
  event_time: z.string().optional(),
});

type NewsFormData = z.infer<typeof newsSchema>;

const categories = [
  "Academic",
  "Sports",
  "Culture",
  "Events",
  "Announcements",
  "General",
];

export default function NewsForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEditing);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState<NewsFormData>({
    title: "",
    content: "",
    excerpt: "",
    category: "General",
    image_url: "",
    is_event: false,
    is_published: true,
    event_date: "",
    event_time: "",
  });

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const { data, error } = await supabase
          .from("news_events")
          .select("*")
          .eq("id", id)
          .maybeSingle();

        if (error) throw error;

        if (data) {
          setFormData({
            title: data.title,
            content: data.content || "",
            excerpt: data.excerpt || "",
            category: data.category,
            image_url: data.image_url || "",
            is_event: data.is_event || false,
            is_published: data.is_published ?? true,
            event_date: data.event_date ? data.event_date.split("T")[0] : "",
            event_time: data.event_time || "",
          });
        }
      } catch (error: unknown) {
        toast.error("Failed to fetch item");
        console.error(error);
      } finally {
        setFetching(false);
      }
    };

    if (isEditing) {
      fetchItem();
    }
  }, [id, isEditing]);


  const handleChange = (field: keyof NewsFormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validate form
    const result = newsSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);

    try {
      const payload = {
        title: formData.title,
        content: formData.content,
        excerpt: formData.excerpt || null,
        category: formData.category,
        image_url: formData.image_url || null,
        is_event: formData.is_event,
        is_published: formData.is_published,
        event_date: formData.is_event && formData.event_date
          ? new Date(formData.event_date).toISOString()
          : null,
        event_time: formData.is_event ? formData.event_time : null,
      };

      if (isEditing) {
        const { error } = await supabase
          .from("news_events")
          .update(payload)
          .eq("id", id);

        if (error) throw error;
        toast.success("Item updated successfully");
      } else {
        const { error } = await supabase
          .from("news_events")
          .insert([payload]);

        if (error) throw error;
        toast.success("Item created successfully");
      }

      navigate("/admin/news");
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Failed to save item";
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
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <Link to="/admin/news">
              <Button type="button" variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold">
                {isEditing ? "Edit Item" : "Create New Item"}
              </h1>
              <p className="text-muted-foreground mt-1">
                {isEditing ? "Update the details below" : "Fill in the details below"}
              </p>
            </div>
          </div>
          <Button type="submit" disabled={loading} className="gap-2">
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            {isEditing ? "Update" : "Create"}
          </Button>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle>Content</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleChange("title", e.target.value)}
                    placeholder="Enter title..."
                    className={errors.title ? "border-destructive" : ""}
                  />
                  {errors.title && (
                    <p className="text-sm text-destructive">{errors.title}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="excerpt">Excerpt</Label>
                  <Textarea
                    id="excerpt"
                    value={formData.excerpt}
                    onChange={(e) => handleChange("excerpt", e.target.value)}
                    placeholder="Brief summary..."
                    rows={2}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content">Content *</Label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => handleChange("content", e.target.value)}
                    placeholder="Full content..."
                    rows={8}
                    className={errors.content ? "border-destructive" : ""}
                  />
                  {errors.content && (
                    <p className="text-sm text-destructive">{errors.content}</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Image Upload */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle>Featured Image</CardTitle>
              </CardHeader>
              <CardContent>
                <ImageUpload
                  currentImage={formData.image_url}
                  onUpload={(url) => handleChange("image_url", url)}
                  folder="news"
                />
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Settings */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle>Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => handleChange("category", value)}
                  >
                    <SelectTrigger className={errors.category ? "border-destructive" : ""}>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between py-2">
                  <div>
                    <Label htmlFor="is_event">Is Event</Label>
                    <p className="text-sm text-muted-foreground">
                      Enable for events with date/time
                    </p>
                  </div>
                  <Switch
                    id="is_event"
                    checked={formData.is_event}
                    onCheckedChange={(checked) => handleChange("is_event", checked)}
                  />
                </div>

                {formData.is_event && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="event_date">Event Date</Label>
                      <Input
                        id="event_date"
                        type="date"
                        value={formData.event_date}
                        onChange={(e) => handleChange("event_date", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="event_time">Event Time</Label>
                      <Input
                        id="event_time"
                        type="time"
                        value={formData.event_time}
                        onChange={(e) => handleChange("event_time", e.target.value)}
                      />
                    </div>
                  </>
                )}

                <div className="flex items-center justify-between py-2 border-t pt-4">
                  <div>
                    <Label htmlFor="is_published">Published</Label>
                    <p className="text-sm text-muted-foreground">
                      Make this visible to public
                    </p>
                  </div>
                  <Switch
                    id="is_published"
                    checked={formData.is_published}
                    onCheckedChange={(checked) => handleChange("is_published", checked)}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </AdminLayout>
  );
}
