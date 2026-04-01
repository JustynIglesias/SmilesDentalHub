-- Hotfix:
-- Save a dental record and its required service record in one transaction.
--
-- Safe to re-run.

create or replace function public.save_dental_record_with_service(
  p_patient_id uuid,
  p_findings text,
  p_treatment text,
  p_chart_data jsonb,
  p_recorded_at timestamptz,
  p_visit_date date,
  p_service_lines jsonb,
  p_discount_type text default 'peso'
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  actor_id uuid;
  actor_role public.staff_role;
  dental_record_id uuid;
  existing_dental_record_id uuid;
  replace_existing_service boolean;
  visit_at_ts timestamptz;
  line_item jsonb;
  line_service_id uuid;
  line_quantity integer;
  line_unit_price numeric;
  line_discount numeric;
  line_total numeric;
  existing_row_id uuid;
  existing_quantity integer;
  existing_discount numeric;
  next_quantity integer;
  next_discount numeric;
  next_amount numeric;
begin
  actor_id := auth.uid();
  actor_role := public.current_staff_role();

  if actor_id is null or actor_role is null then
    raise exception 'Forbidden: active staff account required.';
  end if;

  if actor_role not in ('associate_dentist'::public.staff_role, 'admin'::public.staff_role) then
    raise exception 'Forbidden: only associate dentists and admins can save dental records with service records.';
  end if;

  if p_visit_date is null then
    raise exception 'Service date is required.';
  end if;

  if jsonb_typeof(coalesce(p_service_lines, '[]'::jsonb)) <> 'array' or jsonb_array_length(coalesce(p_service_lines, '[]'::jsonb)) = 0 then
    raise exception 'At least one service line is required.';
  end if;

  existing_dental_record_id := nullif(coalesce(p_chart_data ->> '_recordId', ''), '')::uuid;
  replace_existing_service := coalesce((p_chart_data ->> '_replaceExistingService')::boolean, false);
  visit_at_ts := ((p_visit_date::text || 'T12:00:00Z')::timestamptz);

  if existing_dental_record_id is not null then
    update public.dental_records
    set
      findings = p_findings,
      treatment = p_treatment,
      chart_data = (coalesce(p_chart_data, '{}'::jsonb) - '_recordId' - '_replaceExistingService'),
      recorded_at = coalesce(p_recorded_at, recorded_at),
      updated_by = actor_id
    where id = existing_dental_record_id
      and patient_id = p_patient_id
    returning id into dental_record_id;

    if dental_record_id is null then
      raise exception 'Existing dental record was not found for the patient.';
    end if;
  else
    insert into public.dental_records (
      patient_id,
      tooth_number,
      findings,
      treatment,
      chart_data,
      recorded_at,
      created_by,
      updated_by
    ) values (
      p_patient_id,
      'ALL',
      p_findings,
      p_treatment,
      (coalesce(p_chart_data, '{}'::jsonb) - '_recordId' - '_replaceExistingService'),
      coalesce(p_recorded_at, now()),
      actor_id,
      actor_id
    )
    returning id into dental_record_id;
  end if;

  if replace_existing_service then
    update public.service_records
    set
      archived_at = coalesce(archived_at, now()),
      archived_by = coalesce(archived_by, actor_id),
      updated_by = actor_id
    where patient_id = p_patient_id
      and archived_at is null
      and (visit_at at time zone 'UTC')::date = p_visit_date;
  end if;

  for line_item in
    select value
    from jsonb_array_elements(p_service_lines) as value
  loop
    line_service_id := nullif(line_item ->> 'serviceId', '')::uuid;
    line_quantity := greatest(coalesce((line_item ->> 'quantity')::integer, 1), 1);
    line_unit_price := round(greatest(coalesce((line_item ->> 'unitPrice')::numeric, 0), 0::numeric), 2);
    line_discount := round(greatest(coalesce((line_item ->> 'discountAmount')::numeric, 0), 0::numeric), 2);
    line_total := round(greatest(coalesce((line_item ->> 'totalAmount')::numeric, 0), 0::numeric), 2);

    if line_service_id is null then
      raise exception 'Service ID is required for every service line.';
    end if;

    if line_discount > round(line_quantity::numeric * line_unit_price, 2) then
      raise exception 'Discount cannot be greater than amount.';
    end if;

    if not replace_existing_service then
      select sr.id, greatest(coalesce(sr.quantity, 1), 1), greatest(coalesce(sr.discount_amount, 0), 0::numeric)
        into existing_row_id, existing_quantity, existing_discount
      from public.service_records sr
      where sr.patient_id = p_patient_id
        and sr.service_id = line_service_id
        and sr.archived_at is null
        and (sr.visit_at at time zone 'UTC')::date = p_visit_date
      order by coalesce(sr.created_at, sr.visit_at) asc, sr.id asc
      limit 1
      for update;
    else
      existing_row_id := null;
      existing_quantity := null;
      existing_discount := null;
    end if;

    if existing_row_id is not null and not replace_existing_service then
      next_quantity := existing_quantity + line_quantity;
      next_discount := round(existing_discount + line_discount, 2);
      next_amount := round((next_quantity::numeric * line_unit_price) - next_discount, 2);

      update public.service_records
      set
        quantity = next_quantity,
        unit_price = line_unit_price,
        discount_amount = greatest(0::numeric, next_discount),
        amount = greatest(0::numeric, next_amount),
        notes = jsonb_build_object('discountType', coalesce(nullif(trim(p_discount_type), ''), 'peso'))::text,
        visit_at = visit_at_ts,
        updated_by = actor_id
      where id = existing_row_id;
    else
      insert into public.service_records (
        patient_id,
        service_id,
        quantity,
        unit_price,
        discount_amount,
        amount,
        notes,
        visit_at,
        created_by,
        updated_by
      ) values (
        p_patient_id,
        line_service_id,
        line_quantity,
        line_unit_price,
        line_discount,
        greatest(0::numeric, line_total),
        jsonb_build_object('discountType', coalesce(nullif(trim(p_discount_type), ''), 'peso'))::text,
        visit_at_ts,
        actor_id,
        actor_id
      );
    end if;
  end loop;

  return dental_record_id;
end;
$$;

grant execute on function public.save_dental_record_with_service(uuid, text, text, jsonb, timestamptz, date, jsonb, text) to authenticated;
