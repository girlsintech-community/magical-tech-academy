
-- Application status enum
CREATE TYPE public.application_status AS ENUM (
  'applied','task_invited','task_submitted','accepted','rejected','waitlisted'
);

CREATE TYPE public.gender_option AS ENUM ('girl','boy','prefer_not_to_say');

CREATE TYPE public.house_name AS ENUM ('fireforge','brightmind','codecraft','sparkroot');

-- Roles
CREATE TYPE public.app_role AS ENUM ('admin','user');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN LANGUAGE SQL STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role);
$$;

CREATE POLICY "users can view own roles" ON public.user_roles
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "admins manage roles" ON public.user_roles
  FOR ALL USING (public.has_role(auth.uid(),'admin'));

-- Student applications
CREATE TABLE public.student_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  age INT NOT NULL,
  gender gender_option NOT NULL,
  city TEXT NOT NULL,
  email TEXT NOT NULL,
  parent_email TEXT NOT NULL,
  school TEXT NOT NULL,
  grade TEXT NOT NULL,
  why_interested TEXT NOT NULL,
  status application_status NOT NULL DEFAULT 'applied',
  task_response TEXT,
  task_link TEXT,
  task_submitted_at TIMESTAMPTZ,
  house house_name,
  magic_token UUID NOT NULL DEFAULT gen_random_uuid() UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.student_applications ENABLE ROW LEVEL SECURITY;

-- Anyone can apply (insert)
CREATE POLICY "public can apply" ON public.student_applications
  FOR INSERT WITH CHECK (true);
-- Admins read/update everything
CREATE POLICY "admins read all apps" ON public.student_applications
  FOR SELECT USING (public.has_role(auth.uid(),'admin'));
CREATE POLICY "admins update apps" ON public.student_applications
  FOR UPDATE USING (public.has_role(auth.uid(),'admin'));

-- Mentor applications
CREATE TABLE public.mentor_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  profession TEXT NOT NULL,
  linkedin_url TEXT,
  expertise TEXT[] NOT NULL DEFAULT '{}',
  why_mentor TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.mentor_applications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public can apply mentor" ON public.mentor_applications FOR INSERT WITH CHECK (true);
CREATE POLICY "admins read mentor apps" ON public.mentor_applications
  FOR SELECT USING (public.has_role(auth.uid(),'admin'));

-- Public seat counts (security definer, returns just numbers)
CREATE OR REPLACE FUNCTION public.get_seat_counts()
RETURNS TABLE(girls_applied INT, boys_applied INT, girls_accepted INT, boys_accepted INT, girls_cap INT, boys_cap INT)
LANGUAGE SQL STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT
    COUNT(*) FILTER (WHERE gender='girl' AND status IN ('applied','task_invited','task_submitted','accepted'))::INT,
    COUNT(*) FILTER (WHERE gender='boy'  AND status IN ('applied','task_invited','task_submitted','accepted'))::INT,
    COUNT(*) FILTER (WHERE gender='girl' AND status='accepted')::INT,
    COUNT(*) FILTER (WHERE gender='boy'  AND status='accepted')::INT,
    150::INT, 50::INT
  FROM public.student_applications;
$$;
GRANT EXECUTE ON FUNCTION public.get_seat_counts() TO anon, authenticated;

-- Public function: lookup application by magic token (for task and letter pages)
CREATE OR REPLACE FUNCTION public.get_application_by_token(_token UUID)
RETURNS TABLE(
  id UUID, full_name TEXT, status application_status, house house_name,
  task_response TEXT, task_link TEXT, magic_token UUID
)
LANGUAGE SQL STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT id, full_name, status, house, task_response, task_link, magic_token
  FROM public.student_applications WHERE magic_token = _token LIMIT 1;
$$;
GRANT EXECUTE ON FUNCTION public.get_application_by_token(UUID) TO anon, authenticated;

-- Public function: submit task response
CREATE OR REPLACE FUNCTION public.submit_task(_token UUID, _response TEXT, _link TEXT)
RETURNS BOOLEAN LANGUAGE PLPGSQL SECURITY DEFINER SET search_path = public AS $$
DECLARE _app RECORD;
BEGIN
  SELECT * INTO _app FROM public.student_applications WHERE magic_token=_token;
  IF _app IS NULL THEN RETURN FALSE; END IF;
  IF _app.status NOT IN ('task_invited','task_submitted') THEN RETURN FALSE; END IF;
  IF length(_response) < 100 OR length(_response) > 5000 THEN RETURN FALSE; END IF;
  UPDATE public.student_applications
    SET task_response=_response, task_link=_link, status='task_submitted',
        task_submitted_at=now(), updated_at=now()
    WHERE magic_token=_token;
  RETURN TRUE;
END; $$;
GRANT EXECUTE ON FUNCTION public.submit_task(UUID,TEXT,TEXT) TO anon, authenticated;

-- Apply with seat-cap check
CREATE OR REPLACE FUNCTION public.apply_to_program(
  _full_name TEXT, _age INT, _gender gender_option, _city TEXT, _email TEXT,
  _parent_email TEXT, _school TEXT, _grade TEXT, _why TEXT
) RETURNS TABLE(success BOOLEAN, magic_token UUID, status application_status, message TEXT)
LANGUAGE PLPGSQL SECURITY DEFINER SET search_path = public AS $$
DECLARE
  _new_token UUID := gen_random_uuid();
  _new_status application_status := 'applied';
  _girls INT; _boys INT;
BEGIN
  IF _age < 8 OR _age > 18 THEN
    RETURN QUERY SELECT FALSE, NULL::UUID, NULL::application_status, 'Age must be between 8 and 18';
    RETURN;
  END IF;
  IF length(_full_name) < 2 OR length(_email) < 5 THEN
    RETURN QUERY SELECT FALSE, NULL::UUID, NULL::application_status, 'Invalid input';
    RETURN;
  END IF;
  -- Duplicate email guard
  IF EXISTS (SELECT 1 FROM public.student_applications WHERE lower(email)=lower(_email)) THEN
    RETURN QUERY SELECT FALSE, NULL::UUID, NULL::application_status, 'You have already applied with this email';
    RETURN;
  END IF;

  SELECT
    COUNT(*) FILTER (WHERE gender='girl' AND status IN ('applied','task_invited','task_submitted','accepted')),
    COUNT(*) FILTER (WHERE gender='boy'  AND status IN ('applied','task_invited','task_submitted','accepted'))
  INTO _girls, _boys FROM public.student_applications;

  IF _gender='girl' AND _girls >= 150 THEN _new_status := 'waitlisted'; END IF;
  IF _gender='boy'  AND _boys  >= 50  THEN _new_status := 'waitlisted'; END IF;

  INSERT INTO public.student_applications
    (full_name,age,gender,city,email,parent_email,school,grade,why_interested,status,magic_token)
  VALUES
    (_full_name,_age,_gender,_city,_email,_parent_email,_school,_grade,_why,_new_status,_new_token);

  RETURN QUERY SELECT TRUE, _new_token, _new_status,
    CASE WHEN _new_status='waitlisted'
      THEN 'The hall is full this year — you are on the waitlist'
      ELSE 'Your owl is on its way' END;
END; $$;
GRANT EXECUTE ON FUNCTION public.apply_to_program(TEXT,INT,gender_option,TEXT,TEXT,TEXT,TEXT,TEXT,TEXT) TO anon, authenticated;

-- Mentor apply
CREATE OR REPLACE FUNCTION public.apply_as_mentor(
  _full_name TEXT, _email TEXT, _profession TEXT, _linkedin TEXT,
  _expertise TEXT[], _why TEXT
) RETURNS BOOLEAN LANGUAGE PLPGSQL SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF length(_full_name) < 2 OR length(_email) < 5 OR length(_why) < 20 THEN RETURN FALSE; END IF;
  INSERT INTO public.mentor_applications (full_name,email,profession,linkedin_url,expertise,why_mentor)
  VALUES (_full_name,_email,_profession,_linkedin,_expertise,_why);
  RETURN TRUE;
END; $$;
GRANT EXECUTE ON FUNCTION public.apply_as_mentor(TEXT,TEXT,TEXT,TEXT,TEXT[],TEXT) TO anon, authenticated;

-- updated_at trigger
CREATE OR REPLACE FUNCTION public.touch_updated_at() RETURNS TRIGGER
LANGUAGE PLPGSQL AS $$ BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;
CREATE TRIGGER touch_student_apps BEFORE UPDATE ON public.student_applications
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
