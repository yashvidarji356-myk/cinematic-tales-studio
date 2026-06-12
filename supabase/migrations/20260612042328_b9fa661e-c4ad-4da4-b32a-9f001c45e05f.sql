REVOKE SELECT, UPDATE, DELETE ON public.contact_submissions FROM anon, authenticated;

CREATE POLICY "Deny select to app users"
  ON public.contact_submissions FOR SELECT
  TO anon, authenticated
  USING (false);

CREATE POLICY "Deny update to app users"
  ON public.contact_submissions FOR UPDATE
  TO anon, authenticated
  USING (false) WITH CHECK (false);

CREATE POLICY "Deny delete to app users"
  ON public.contact_submissions FOR DELETE
  TO anon, authenticated
  USING (false);