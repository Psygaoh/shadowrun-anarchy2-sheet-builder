do $$
declare
  test_email text := 'test_user@example.com';
  owner_id uuid;
begin
  if not exists (select 1 from auth.users where email = test_email) then
    insert into auth.users (
      id,
      aud,
      role,
      email,
      encrypted_password,
      email_confirmed_at,
      created_at,
      updated_at,
      raw_app_meta_data,
      raw_user_meta_data
    )
    values (
      gen_random_uuid(),
      'authenticated',
      'authenticated',
      test_email,
      extensions.crypt('test_user', extensions.gen_salt('bf')),
      now(),
      now(),
      now(),
      '{}'::jsonb,
      '{}'::jsonb
    );
  end if;

  select id into owner_id
  from auth.users
  where email = test_email;

  if owner_id is null then
    raise exception 'Failed to create or find test user.';
  end if;

  update character
  set user_id = owner_id
  where street_name = 'Capitan'
    and legal_name = 'Gustavo Araya'
    and user_id <> owner_id;
end $$;
