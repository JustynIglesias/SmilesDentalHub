-- Restrict procedure archiving to admins.
-- Safe to rerun.

drop policy if exists services_update_staff on public.services;
create policy services_update_staff
on public.services
for update
to authenticated
using (
  public.has_staff_role('admin'::public.staff_role)
  or is_active = true
)
with check (
  public.has_staff_role('admin'::public.staff_role)
  or is_active = true
);

drop policy if exists tooth_conditions_update_staff on public.tooth_conditions;
create policy tooth_conditions_update_staff
on public.tooth_conditions
for update
to authenticated
using (
  public.has_staff_role('admin'::public.staff_role)
  or is_active = true
)
with check (
  public.has_staff_role('admin'::public.staff_role)
  or is_active = true
);
