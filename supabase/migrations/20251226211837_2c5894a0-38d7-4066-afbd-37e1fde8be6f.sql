-- Create timetables table for class schedules
CREATE TABLE public.timetables (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  teacher_id UUID REFERENCES public.teachers(id) ON DELETE CASCADE NOT NULL,
  day_of_week TEXT NOT NULL CHECK (day_of_week IN ('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday')),
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  subject TEXT NOT NULL,
  class_name TEXT NOT NULL,
  room TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.timetables ENABLE ROW LEVEL SECURITY;

-- Admins can manage all timetables
CREATE POLICY "Admins can manage timetables"
ON public.timetables
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

-- Teachers can view their own timetables
CREATE POLICY "Teachers can view own timetables"
ON public.timetables
FOR SELECT
USING (
  teacher_id IN (
    SELECT id FROM public.teachers WHERE user_id = auth.uid()
  )
);

-- Anyone can view timetables (for public schedule display)
CREATE POLICY "Anyone can view timetables"
ON public.timetables
FOR SELECT
USING (true);

-- Add trigger for updated_at
CREATE TRIGGER update_timetables_updated_at
BEFORE UPDATE ON public.timetables
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();