import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Pencil,
  Trash2,
  Search,
  Calendar,
  Eye,
  EyeOff,
  MoreHorizontal
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

interface NewsEvent {
  id: string;
  title: string;
  excerpt: string | null;
  category: string;
  is_event: boolean;
  is_published: boolean;
  event_date: string | null;
  created_at: string;
  image_url: string | null;
}

export default function NewsManagement() {
  const [items, setItems] = useState<NewsEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const { data, error } = await supabase
        .from("news_events")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setItems(data || []);
    } catch (error: unknown) {
      toast.error("Failed to fetch news & events");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      const { error } = await supabase
        .from("news_events")
        .delete()
        .eq("id", deleteId);

      if (error) throw error;

      setItems(items.filter((item) => item.id !== deleteId));
      toast.success("Item deleted successfully");
    } catch (error: unknown) {
      toast.error("Failed to delete item");
      console.error(error);
    } finally {
      setDeleteId(null);
    }
  };

  const togglePublish = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from("news_events")
        .update({ is_published: !currentStatus })
        .eq("id", id);

      if (error) throw error;

      setItems(items.map((item) =>
        item.id === id ? { ...item, is_published: !currentStatus } : item
      ));
      toast.success(currentStatus ? "Item unpublished" : "Item published");
    } catch (error: unknown) {
      toast.error("Failed to update status");
      console.error(error);
    }
  };

  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            <h1 className="text-3xl font-bold">News & Events</h1>
            <p className="text-muted-foreground mt-1">
              Manage all news articles and events
            </p>
          </div>
          <Link to="/admin/news/create">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add New
            </Button>
          </Link>
        </motion.div>

        {/* Search */}
        <Card className="border-0 shadow-md">
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search news & events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </CardContent>
        </Card>

        {/* Items List */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-lg">
              All Items ({filteredItems.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-20 bg-muted/50 rounded-lg animate-pulse" />
                ))}
              </div>
            ) : filteredItems.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No items found</p>
                <Link to="/admin/news/create">
                  <Button variant="outline" className="mt-4">
                    Create your first item
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center gap-4 p-4 rounded-xl border bg-card hover:bg-muted/30 transition-colors"
                  >
                    {/* Image */}
                    <div className="hidden sm:block w-20 h-14 rounded-lg overflow-hidden bg-muted shrink-0">
                      {item.image_url ? (
                        <img
                          src={item.image_url}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                          <Calendar className="h-6 w-6" />
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold truncate">{item.title}</h3>
                        <Badge variant={item.is_event ? "secondary" : "default"} className="shrink-0">
                          {item.is_event ? "Event" : "News"}
                        </Badge>
                        {!item.is_published && (
                          <Badge variant="outline" className="shrink-0">Draft</Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <span>{item.category}</span>
                        <span>•</span>
                        <span>{format(new Date(item.created_at), "MMM d, yyyy")}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link to={`/admin/news/edit/${item.id}`} className="flex items-center gap-2">
                            <Pencil className="h-4 w-4" />
                            Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => togglePublish(item.id, item.is_published)}>
                          {item.is_published ? (
                            <>
                              <EyeOff className="h-4 w-4 mr-2" />
                              Unpublish
                            </>
                          ) : (
                            <>
                              <Eye className="h-4 w-4 mr-2" />
                              Publish
                            </>
                          )}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onClick={() => setDeleteId(item.id)}
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
              This action cannot be undone. This will permanently delete this item.
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
