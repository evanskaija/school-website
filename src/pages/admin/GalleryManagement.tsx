import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Pencil,
  Trash2,
  Search,
  Star,
  MoreHorizontal,
  Image as ImageIcon
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

interface GalleryImage {
  id: string;
  title: string;
  description: string | null;
  image_url: string;
  category: string | null;
  is_featured: boolean | null;
  created_at: string;
}

const categories = ["All", "Campus", "Sports", "Events", "Academic", "Culture", "General"];

export default function GalleryManagement() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const { data, error } = await supabase
        .from("gallery")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setImages(data || []);
    } catch (error: unknown) {
      toast.error("Failed to fetch gallery images");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      const { error } = await supabase
        .from("gallery")
        .delete()
        .eq("id", deleteId);

      if (error) throw error;

      setImages(images.filter((img) => img.id !== deleteId));
      toast.success("Image deleted successfully");
    } catch (error: unknown) {
      toast.error("Failed to delete image");
      console.error(error);
    } finally {
      setDeleteId(null);
    }
  };

  const toggleFeatured = async (id: string, currentStatus: boolean | null) => {
    try {
      const { error } = await supabase
        .from("gallery")
        .update({ is_featured: !currentStatus })
        .eq("id", id);

      if (error) throw error;

      setImages(images.map((img) =>
        img.id === id ? { ...img, is_featured: !currentStatus } : img
      ));
      toast.success(currentStatus ? "Removed from featured" : "Added to featured");
    } catch (error: unknown) {
      toast.error("Failed to update status");
      console.error(error);
    }
  };

  const filteredImages = images.filter((img) => {
    const matchesSearch = img.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "All" || img.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        >
          <div>
            <h1 className="text-3xl font-bold">Gallery</h1>
            <p className="text-muted-foreground mt-1">
              Manage all gallery images
            </p>
          </div>
          <Link to="/admin/gallery/upload">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Upload Images
            </Button>
          </Link>
        </motion.div>

        {/* Filters */}
        <Card className="border-0 shadow-md">
          <CardContent className="p-4 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search images..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <Button
                  key={cat}
                  variant={activeCategory === cat ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Gallery Grid */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-lg">
              Images ({filteredImages.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="aspect-square bg-muted/50 rounded-xl animate-pulse" />
                ))}
              </div>
            ) : filteredImages.length === 0 ? (
              <div className="text-center py-12">
                <ImageIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No images found</p>
                <Link to="/admin/gallery/upload">
                  <Button variant="outline" className="mt-4">
                    Upload your first image
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredImages.map((image, index) => (
                  <motion.div
                    key={image.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="group relative aspect-square rounded-xl overflow-hidden bg-muted"
                  >
                    <img
                      src={image.image_url}
                      alt={image.title}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className="font-semibold text-background truncate">{image.title}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="secondary" className="text-xs">
                            {image.category || "General"}
                          </Badge>
                          {image.is_featured && (
                            <Star className="h-4 w-4 text-secondary fill-secondary" />
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="secondary"
                          size="icon"
                          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link to={`/admin/gallery/edit/${image.id}`} className="flex items-center gap-2">
                            <Pencil className="h-4 w-4" />
                            Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => toggleFeatured(image.id, image.is_featured)}>
                          <Star className="h-4 w-4 mr-2" />
                          {image.is_featured ? "Remove Featured" : "Set Featured"}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onClick={() => setDeleteId(image.id)}
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
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this image.
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
