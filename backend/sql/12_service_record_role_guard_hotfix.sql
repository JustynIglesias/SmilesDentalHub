-- Hotfix:
-- 1) Restrict service-record creation to associate dentists and admins.
-- 2) Allow receptionists to update only discount-related fields on existing service records.
-- 3) Normalize service-record totals on write.
--
-- Safe to re-run.

create or replace function public.guard_service_record_write()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  actor_role public.staff_role;
  line_amount numeric;
begin
  actor_role := public.current_staff_role();

  if actor_role is null then
    raise exception 'Forbidden: active staff account required.';
  end if;

  line_amount := round(
    greatest(coalesce(new.quantity, 1), 1)::numeric
    * greatest(coalesce(new.unit_price, 0), 0::numeric),
    2
  );
  new.discount_amount := greatest(coalesce(new.discount_amount, 0), 0::numeric);

  if new.discount_amount > line_amount then
    raise exception 'Discount cannot be greater than amount.';
  end if;

  new.amount := greatest(0::numeric, round(line_amount - new.discount_amount, 2));

  if tg_op = 'INSERT' then
    if actor_role not in ('associate_dentist'::public.staff_role, 'admin'::public.staff_role) then
      raise exception 'Forbidden: receptionist cannot create service records.';
    end if;

    return new;
  end if;

  if actor_role = 'receptionist'::public.staff_role then
    if new.patient_id is distinct from old.patient_id
      or new.service_id is distinct from old.service_id
      or new.quantity is distinct from old.quantity
      or new.unit_price is distinct from old.unit_price
      or new.performed_by is distinct from old.performed_by
      or new.visit_at is distinct from old.visit_at
      or new.archived_at is distinct from old.archived_at
      or new.archived_by is distinct from old.archived_by
      or new.created_by is distinct from old.created_by
      or new.created_at is distinct from old.created_at then
      raise exception 'Forbidden: receptionist can only update service discounts.';
    end if;
  end if;

  return new;
end;
$$;

drop trigger if exists trg_service_records_role_guard on public.service_records;
create trigger trg_service_records_role_guard
before insert or update on public.service_records
for each row execute function public.guard_service_record_write();

drop policy if exists service_records_insert_staff on public.service_records;
drop policy if exists service_records_insert_clinical_staff on public.service_records;
create policy service_records_insert_clinical_staff
on public.service_records
for insert
to authenticated
with check (
  public.has_staff_role('associate_dentist'::public.staff_role)
  or public.has_staff_role('admin'::public.staff_role)
);
