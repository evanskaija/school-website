-- Create news_events table
CREATE TABLE public.news_events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT,
  category TEXT NOT NULL DEFAULT 'General',
  image_url TEXT,
  published_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  is_event BOOLEAN DEFAULT false,
  event_date TIMESTAMP WITH TIME ZONE,
  event_time TEXT,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create gallery table
CREATE TABLE public.gallery (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  category TEXT DEFAULT 'General',
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.news_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;

-- Public read access for news and gallery
CREATE POLICY "Anyone can view published news" 
ON public.news_events 
FOR SELECT 
USING (is_published = true);

CREATE POLICY "Admins can manage all news" 
ON public.news_events 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Anyone can view gallery" 
ON public.gallery 
FOR SELECT 
USING (true);

CREATE POLICY "Admins can manage gallery" 
ON public.gallery 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Triggers for updated_at
CREATE TRIGGER update_news_events_updated_at
BEFORE UPDATE ON public.news_events
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample news data
INSERT INTO public.news_events (title, excerpt, content, category, image_url, is_event, event_date, event_time) VALUES
('Form Six Students Excel in ACSEE 2024', 'Sacred Heart students achieve outstanding results in the Advanced Certificate of Secondary Education Examination, with 95% passing.', 'Our Form Six students have demonstrated exceptional academic prowess in the recently released ACSEE results. We are proud to announce that 95% of our students passed, with 30% achieving Division I. This achievement reflects the dedication of our students and the commitment of our teaching staff.', 'Academic', 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=600&h=400&fit=crop', false, NULL, NULL),
('Annual Sports Day 2025 Announced', 'Mark your calendars! The annual sports day will be held on January 15th with various athletic events and competitions.', 'We are excited to announce our Annual Sports Day 2025! This year''s event promises to be bigger and better than ever, featuring track and field events, team sports, and inter-house competitions.', 'Sports', 'https://images.unsplash.com/photo-1461896836934- voices28c04a?w=600&h=400&fit=crop', true, '2025-01-15 08:00:00+03', '8:00 AM - 5:00 PM'),
('New Computer Lab Inaugurated', 'State-of-the-art computer laboratory with 50 new computers inaugurated to enhance digital learning capabilities.', 'Sacred Heart Secondary School has inaugurated a new state-of-the-art computer laboratory equipped with 50 modern computers, high-speed internet, and the latest educational software.', 'Facilities', 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&h=400&fit=crop', false, NULL, NULL),
('Christmas Celebration & Talent Show', 'Students showcase their talents in music, dance, and drama during the annual Christmas celebration event.', 'The annual Christmas celebration was a spectacular showcase of student talent. From traditional dances to modern performances, our students demonstrated their artistic abilities.', 'Events', 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=600&h=400&fit=crop', false, NULL, NULL),
('Parent-Teacher Meeting Scheduled', 'All parents are invited to attend the first term parent-teacher meeting to discuss student progress.', 'We invite all parents and guardians to attend our first term Parent-Teacher Meeting. This is an opportunity to discuss your child''s academic progress and address any concerns.', 'Academic', 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=600&h=400&fit=crop', true, '2025-01-20 14:00:00+03', '2:00 PM - 5:00 PM'),
('Science Fair Winners Announced', 'Congratulations to our students who won top prizes at the Regional Science Fair competition.', 'Our students have made us proud at the Regional Science Fair! John Mwamba from Form 4 won first place for his innovative water purification project.', 'Academic', 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&h=400&fit=crop', false, NULL, NULL);

-- Insert sample gallery data
INSERT INTO public.gallery (title, description, image_url, category, is_featured) VALUES
('School Main Building', 'The main administrative building of Sacred Heart Secondary School', 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&h=600&fit=crop', 'Campus', true),
('Students in Science Lab', 'Form 4 students conducting chemistry experiments', 'https://images.unsplash.com/photo-1562774053-701939374585?w=800&h=600&fit=crop', 'Academics', true),
('Football Team Practice', 'Our football team during morning practice session', 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=600&fit=crop', 'Sports', false),
('Library Study Session', 'Students studying in the school library', 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=800&h=600&fit=crop', 'Facilities', true),
('Computer Lab Class', 'ICT class in the new computer laboratory', 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=600&fit=crop', 'Academics', false),
('Annual Sports Day', 'Students participating in athletics competition', 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800&h=600&fit=crop', 'Sports', true),
('School Assembly', 'Morning assembly at the school grounds', 'https://images.unsplash.com/photo-1594608661623-aa0bd3a69d98?w=800&h=600&fit=crop', 'Campus', false),
('Graduation Ceremony', '2024 Form 4 graduation ceremony', 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&h=600&fit=crop', 'Events', true),
('Art Class Exhibition', 'Student artwork on display during the annual exhibition', 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&h=600&fit=crop', 'Academics', false),
('Chemistry Laboratory', 'Modern chemistry lab facilities', 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&h=600&fit=crop', 'Facilities', false),
('Basketball Court', 'Students playing basketball during sports period', 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&h=600&fit=crop', 'Sports', false),
('School Dining Hall', 'Students having lunch in the dining hall', 'https://images.unsplash.com/photo-1567521464027-f127ff144326?w=800&h=600&fit=crop', 'Facilities', false);