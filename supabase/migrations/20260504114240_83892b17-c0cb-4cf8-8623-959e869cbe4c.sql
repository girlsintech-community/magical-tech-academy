-- Reduce program seat caps from 150/50 to 75/25
CREATE OR REPLACE FUNCTION public.get_seat_counts()
RETURNS TABLE(girls_applied INT, boys_applied INT, girls_accepted INT, boys_accepted INT, girls_cap INT, boys_cap INT)
LANGUAGE SQL STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT
    COUNT(*) FILTER (WHERE gender='girl' AND status IN ('applied','task_invited','task_submitted','accepted'))::INT,
    COUNT(*) FILTER (WHERE gender='boy'  AND status IN ('applied','task_invited','task_submitted','accepted'))::INT,
    COUNT(*) FILTER (WHERE gender='girl' AND status='accepted')::INT,
    COUNT(*) FILTER (WHERE gender='boy'  AND status='accepted')::INT,
    75::INT, 25::INT
  FROM public.student_applications;
$$;

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
  IF EXISTS (SELECT 1 FROM public.student_applications WHERE lower(email)=lower(_email)) THEN
    RETURN QUERY SELECT FALSE, NULL::UUID, NULL::application_status, 'You have already applied with this email';
    RETURN;
  END IF;

  SELECT
    COUNT(*) FILTER (WHERE gender='girl' AND status IN ('applied','task_invited','task_submitted','accepted')),
    COUNT(*) FILTER (WHERE gender='boy'  AND status IN ('applied','task_invited','task_submitted','accepted'))
  INTO _girls, _boys FROM public.student_applications;

  IF _gender='girl' AND _girls >= 75 THEN _new_status := 'waitlisted'; END IF;
  IF _gender='boy'  AND _boys  >= 25 THEN _new_status := 'waitlisted'; END IF;

  INSERT INTO public.student_applications
    (full_name,age,gender,city,email,parent_email,school,grade,why_interested,status,magic_token)
  VALUES
    (_full_name,_age,_gender,_city,_email,_parent_email,_school,_grade,_why,_new_status,_new_token);

  RETURN QUERY SELECT TRUE, _new_token, _new_status,
    CASE WHEN _new_status='waitlisted'
      THEN 'The hall is full this year, you are on the waitlist'
      ELSE 'Your owl is on its way' END;
END; $$;