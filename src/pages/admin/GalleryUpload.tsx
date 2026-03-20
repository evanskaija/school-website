import { useState } from "react";
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
import { useEffect } from "react";

const gallerySchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters").max(200),
  description: z.string().max(500).optional(),
  category: z.string().min(1, "Please select a category"),
  image_url: z.string().min(1, "Please upload an image"),
  is_featured: z.boolean(),
});

type GalleryFormData = z.infer<typeof gallerySchema>;

const categories = ["Campus", "Sports", "Events", "Academic", "Culture", "General"];

export default function GalleryUpload() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEditing);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState<GalleryFormData>({
    title: "",
    description: "",
    category: "General",
    image_url: "",
    is_featured: false,
  });

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const { data, error } = await supabase
          .from("gallery")
          .select("*")
          .eq("id", id)
          .maybeSingle();

        if (error) throw error;

        if (data) {
          setFormData({
            title: data.title,
            description: data.description || "",
            category: data.category || "General",
            image_url: data.image_url,
            is_featured: data.is_featured || false,
          });
        }
      } catch (error: unknown) {
        toast.error("Failed to fetch image");
        console.error(error);
      } finally {
        setFetching(false);
      }
    };

    if (isEditing) {
      fetchImage();
    }
  }, [id, isEditing]);


  const handleChange = (field: keyof GalleryFormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validate form
    const result = gallerySchema.safeParse(formData);
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
        description: formData.description || null,
        category: formData.category,
        image_url: formData.image_url,
        is_featured: formData.is_featured,
      };

      if (isEditing) {
        const { error } = await supabase
          .from("gallery")
          .update(payload)
          .eq("id", id);

        if (error) throw error;
        toast.success("Image updated successfully");
      } else {
        const { error } = await supabase
          .from("gallery")
          .insert([payload]);

        if (error) throw error;
        toast.success("Image uploaded successfully");
      }

      navigate("/admin/gallery");
      navigate("/admin/gallery");
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Failed to save image";
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
            <Link to="/admin/gallery">
              <Button type="button" variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold">
                {isEditing ? "Edit Image" : "Upload Image"}
              </h1>
              <p className="text-muted-foreground mt-1">
                {isEditing ? "Update the image details" : "Add a new image to the gallery"}
              </p>
            </div>
          </div>
          <Button type="submit" disabled={loading} className="gap-2">
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            {isEditing ? "Update" : "Upload"}
          </Button>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Image Upload */}
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle>Image *</CardTitle>
            </CardHeader>
            <CardContent>
              <ImageUpload
                currentImage={formData.image_url}
                onUpload={(url) => handleChange("image_url", url)}
                folder="gallery"
              />
              {errors.image_url && (
                <p className="text-sm text-destructive mt-2">{errors.image_url}</p>
              )}
            </CardContent>
          </Card>

          {/* Details */}
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle>Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  placeholder="Enter image title..."
                  className={errors.title ? "border-destructive" : ""}
                />
                {errors.title && (
                  <p className="text-sm text-destructive">{errors.title}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  placeholder="Add a description..."
                  rows={3}
                />
              </div>

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

              <div className="flex items-center justify-between py-4 border-t">
                <div>
                  <Label htmlFor="is_featured">Featured Image</Label>
                  <p className="text-sm text-muted-foreground">
                    Show this image prominently
                  </p>
                </div>
                <Switch
                  id="is_featured"
                  checked={formData.is_featured}
                  onCheckedChange={(checked) => handleChange("is_featured", checked)}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </AdminLayout>
  );
}
