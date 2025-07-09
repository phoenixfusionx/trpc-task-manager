-- Create enum for task priority
CREATE TYPE IF NOT EXISTS task_priority AS ENUM ('low', 'medium', 'high');

-- Create tasks table in the public schema
CREATE TABLE IF NOT EXISTS public.tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text DEFAULT '',
  completed boolean DEFAULT false,
  priority task_priority DEFAULT 'medium',
  due_date timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;

-- Create policy for public access (since no authentication is implemented)
CREATE POLICY "Allow public access to tasks"
  ON public.tasks
  FOR ALL
  TO public
  USING (true)
  WITH CHECK (true);

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_tasks_updated_at
  BEFORE UPDATE ON public.tasks
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert some sample data
INSERT INTO public.tasks (title, description, priority, due_date) VALUES
  ('Complete tRPC setup', 'Set up tRPC server with proper routing and type safety', 'high', '2024-01-15'),
  ('Design beautiful UI', 'Create a modern, responsive interface with Tailwind CSS', 'medium', NULL),
  ('Integrate Supabase', 'Replace in-memory storage with Supabase PostgreSQL database', 'high', '2024-01-10');