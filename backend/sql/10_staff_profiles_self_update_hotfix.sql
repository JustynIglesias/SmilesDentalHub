-- Allow any authenticated staff user to update their own staff profile row.
-- This fixes Settings profile edits for receptionist and associate dentist accounts.

drop policy if exists staff_profiles_update_own on public.staff_profiles;
create policy staff_profiles_update_own
on public.staff_profiles
for update
to authenticated
using (user_id = auth.uid())
with check (user_id = auth.uid());
