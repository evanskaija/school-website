-- Create storage bucket for school media
INSERT INTO storage.buckets (id, name, public) VALUES ('school-media', 'school-media', true);

-- RLS policy: Anyone can view public media
CREATE POLICY "Anyone can view school media" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'school-media');

-- RLS policy: Admins can upload media
CREATE POLICY "Admins can upload school media" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'school-media' AND has_role(auth.uid(), 'admin'::app_role));

-- RLS policy: Admins can update media
CREATE POLICY "Admins can update school media" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'school-media' AND has_role(auth.uid(), 'admin'::app_role));

-- RLS policy: Admins can delete media
CREATE POLICY "Admins can delete school media" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'school-media' AND has_role(auth.uid(), 'admin'::app_role));