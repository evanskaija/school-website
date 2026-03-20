-- Create students table
CREATE TABLE public.students (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  admission_number TEXT NOT NULL UNIQUE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  date_of_birth DATE,
  gender TEXT CHECK (gender IN ('male', 'female')),
  class_name TEXT NOT NULL,
  stream TEXT,
  admission_date DATE NOT NULL DEFAULT CURRENT_DATE,
  parent_name TEXT,
  parent_phone TEXT,
  parent_email TEXT,
  address TEXT,
  photo_url TEXT,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'graduated', 'transferred', 'suspended')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create teachers table
CREATE TABLE public.teachers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  employee_id TEXT NOT NULL UNIQUE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  date_of_birth DATE,
  gender TEXT CHECK (gender IN ('male', 'female')),
  qualification TEXT,
  specialization TEXT,
  subjects TEXT[] NOT NULL DEFAULT '{}',
  classes TEXT[] NOT NULL DEFAULT '{}',
  join_date DATE NOT NULL DEFAULT CURRENT_DATE,
  photo_url TEXT,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'on_leave', 'resigned', 'retired')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teachers ENABLE ROW LEVEL SECURITY;

-- RLS policies for students - admins can manage all
CREATE POLICY "Admins can manage students" ON public.students
FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Teachers can view students" ON public.students
FOR SELECT USING (has_role(auth.uid(), 'teacher'::app_role));

-- RLS policies for teachers - admins can manage all
CREATE POLICY "Admins can manage teachers" ON public.teachers
FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Teachers can view own profile" ON public.teachers
FOR SELECT USING (user_id = auth.uid());

-- Create triggers for updated_at
CREATE TRIGGER update_students_updated_at
BEFORE UPDATE ON public.students
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_teachers_updated_at
BEFORE UPDATE ON public.teachers
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();