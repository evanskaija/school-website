import { useState, useCallback } from "react";
import { Upload, X, Image as ImageIcon, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface ImageUploadProps {
  onUpload: (url: string) => void;
  currentImage?: string;
  bucket?: string;
  folder?: string;
  className?: string;
}

export function ImageUpload({
  onUpload,
  currentImage,
  bucket = "school-media",
  folder = "uploads",
  className
}: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [preview, setPreview] = useState<string | null>(currentImage || null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragging(true);
    } else if (e.type === "dragleave") {
      setIsDragging(false);
    }
  }, []);

  const uploadFile = useCallback(async (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      toast.error("Image must be smaller than 5MB");
      return;
    }

    setIsUploading(true);
    setProgress(0);

    try {
      // Create unique filename
      const fileExt = file.name.split(".").pop();
      const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

      // Simulate progress
      const progressInterval = setInterval(() => {
        setProgress((prev) => Math.min(prev + 10, 90));
      }, 100);

      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: false,
        });

      clearInterval(progressInterval);

      if (error) {
        throw error;
      }

      setProgress(100);

      // Get public URL
      const { data: urlData } = supabase.storage
        .from(bucket)
        .getPublicUrl(data.path);

      setPreview(urlData.publicUrl);
      onUpload(urlData.publicUrl);
      toast.success("Image uploaded successfully!");
    } catch (error: unknown) {
      console.error("Upload error:", error);
      const message = error instanceof Error ? error.message : "Failed to upload image";
      toast.error(message);
    } finally {
      setIsUploading(false);
      setProgress(0);
    }
  }, [bucket, folder, onUpload]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files?.[0]) {
      uploadFile(files[0]);
    }
  }, [uploadFile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files?.[0]) {
      uploadFile(files[0]);
    }
  };

  const removeImage = () => {
    setPreview(null);
    onUpload("");
  };

  return (
    <div className={cn("w-full", className)}>
      {preview ? (
        <div className="relative rounded-xl overflow-hidden border-2 border-border bg-muted/30">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-48 object-cover"
          />
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2"
            onClick={removeImage}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <label
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={cn(
            "relative flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-200",
            isDragging
              ? "border-primary bg-primary/5"
              : "border-border hover:border-primary/50 hover:bg-muted/30",
            isUploading && "pointer-events-none opacity-70"
          )}
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleChange}
            className="hidden"
            disabled={isUploading}
          />

          {isUploading ? (
            <div className="flex flex-col items-center gap-3 px-6">
              <Loader2 className="h-10 w-10 text-primary animate-spin" />
              <p className="text-sm text-muted-foreground">Uploading...</p>
              <Progress value={progress} className="w-full max-w-xs h-2" />
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3 px-6 text-center">
              {isDragging ? (
                <>
                  <ImageIcon className="h-10 w-10 text-primary" />
                  <p className="text-sm font-medium text-primary">Drop image here</p>
                </>
              ) : (
                <>
                  <Upload className="h-10 w-10 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">
                      <span className="text-primary">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      PNG, JPG up to 5MB
                    </p>
                  </div>
                </>
              )}
            </div>
          )}
        </label>
      )}
    </div>
  );
}
