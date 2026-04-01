-- Hotfix:
-- Keep only the latest service_update patient log per patient per Manila calendar day
-- in the Patient Logs listing.
--
-- Safe to re-run.

create or replace function public.list_patient_logs()
returns table (
  id bigint,
  patient_id uuid,
  patient_code text,
  patient_name text,
  logged_at timestamptz,
  actor_name text,
  action text,
  details text
)
language sql
stable
security definer
set search_path = public
as $$
  with ranked_logs as (
    select
      pl.*,
      row_number() over (
        partition by pl.patient_id, ((pl.created_at at time zone 'Asia/Manila')::date)
        order by pl.created_at desc, pl.id desc
      ) as same_day_rank
    from public.patient_logs pl
    where pl.action = 'service_update'::public.patient_log_action
  )
  select
    pl.id,
    pl.patient_id,
    p.patient_code,
    concat_ws(', ', p.last_name, p.first_name) as patient_name,
    pl.created_at as logged_at,
    coalesce(dentist_sp.full_name, 'System') as actor_name,
    pl.action::text as action,
    pl.details
  from ranked_logs pl
  join public.patients p on p.id = pl.patient_id
  left join lateral (
    select
      dr.updated_by,
      dr.created_by
    from public.dental_records dr
    where dr.patient_id = pl.patient_id
      and dr.archived_at is null
    order by dr.recorded_at desc, dr.created_at desc
    limit 1
  ) latest_dr on true
  left join public.staff_profiles dentist_sp
    on dentist_sp.user_id = coalesce(latest_dr.updated_by, latest_dr.created_by)
  where public.is_active_staff()
    and pl.same_day_rank = 1
  order by pl.created_at desc;
$$;

grant execute on function public.list_patient_logs() to authenticated;
