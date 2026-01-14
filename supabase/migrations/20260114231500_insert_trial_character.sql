do $$
declare
  test_email text := 'test_user@example.com';
  owner_id uuid;
  character_id uuid;
  quality_id uuid;
  skill_id uuid;
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

  character_id := gen_random_uuid();

  insert into character (
    id,
    user_id,
    street_name,
    legal_name,
    metatype,
    archetype,
    keywords,
    behaviors,
    catchphrases
  )
  values (
    character_id,
    owner_id,
    'Capitan',
    'Gustavo Araya',
    'DWARF',
    'Face militaire',
    jsonb_build_array('Nain', 'Amazonie', 'Face', 'Mercenaire', 'Train de vie bas'),
    jsonb_build_array(
      'Social : favorise l''entraide et la protection du groupe',
      'Conciliant : evite la confrontation tant que possible',
      'Tourne tout en derision pour detendre l''atmosphere',
      'Deteste la magie du sang, les Azzies et d''etre confondu avec l''un d''entre eux'
    ),
    jsonb_build_array(
      'La fin ne justifie pas tous les moyens',
      'Je suis sur que l''on peut regler cela en gens civilises',
      'Comment on s''en sort ? En rangs serres et tirs groupes.',
      'Me cago en tu puta estirpe, cabron!'
    )
  );

  insert into character_attribute (character_id, name, value)
  values
    (character_id, 'FORCE', 3),
    (character_id, 'AGILITY', 3),
    (character_id, 'VOLONTE', 3),
    (character_id, 'LOGIQUE', 2),
    (character_id, 'CHARISME', 4);

  insert into character_skill (id, character_id, skill_name, rating, linked_attribute_default)
  values (gen_random_uuid(), character_id, 'ARMES_A_DISTANCE', 5, 'AGILITY');

  insert into character_skill (id, character_id, skill_name, rating, linked_attribute_default)
  values (gen_random_uuid(), character_id, 'COMBAT_RAPPROCHE', 4, 'AGILITY');

  insert into character_skill (id, character_id, skill_name, rating, linked_attribute_default)
  values (gen_random_uuid(), character_id, 'PERCEPTION', 4, 'LOGIQUE');

  insert into character_skill (id, character_id, skill_name, rating, linked_attribute_default)
  values (gen_random_uuid(), character_id, 'RESEAU', 3, 'CHARISME');

  insert into character_skill (id, character_id, skill_name, rating, linked_attribute_default)
  values (gen_random_uuid(), character_id, 'ATHLETISME', 3, 'FORCE')
  returning id into skill_id;

  insert into character_skill_specialization (skill_id, name, bonus)
  values (skill_id, 'defense a distance', 2);

  insert into character_skill (id, character_id, skill_name, rating, linked_attribute_default)
  values (gen_random_uuid(), character_id, 'FURTIVITE', 4, 'AGILITY')
  returning id into skill_id;

  insert into character_skill_specialization (skill_id, name, bonus)
  values (skill_id, 'discretion physique', 2);

  insert into character_skill (id, character_id, skill_name, rating, linked_attribute_default)
  values (gen_random_uuid(), character_id, 'INFLUENCE', 4, 'CHARISME')
  returning id into skill_id;

  insert into character_skill_specialization (skill_id, name, bonus)
  values (skill_id, 'negociation', 2);

  insert into character_skill (id, character_id, skill_name, rating, linked_attribute_default)
  values (gen_random_uuid(), character_id, 'SURVIE', 5, 'LOGIQUE')
  returning id into skill_id;

  insert into character_skill_specialization (skill_id, name, bonus)
  values (skill_id, 'sang-froid', 2);

  insert into character_resource (
    character_id,
    cash,
    anarchy_current,
    anarchy_max_base,
    essence_current,
    essence_max
  )
  values (character_id, null, null, 3, 6, 6);

  insert into character_quality (
    character_id,
    name,
    source,
    level,
    essence_cost,
    notes
  )
  values (
    character_id,
    'Eveille : adepte',
    'trait',
    1,
    0,
    '[]'::jsonb
  );

  insert into character_quality (
    character_id,
    name,
    source,
    level,
    essence_cost,
    notes
  )
  values (
    character_id,
    'Esprit mentor : Capybara',
    'trait',
    0,
    0,
    jsonb_build_array(
      jsonb_build_object(
        'label',
        'Comportement associe',
        'text',
        'Social : favorise l''entraide et la protection du groupe'
      )
    )
  )
  returning id into quality_id;

  insert into character_modifier (quality_id, type, value, applies_to)
  values
    (
      quality_id,
      'RISK_REDUCTION',
      1,
      jsonb_build_object('skill', 'SURVIE', 'specialization', 'sang-froid', 'attribute', null)
    ),
    (
      quality_id,
      'RISK_REDUCTION',
      1,
      jsonb_build_object(
        'skill',
        'FURTIVITE',
        'specialization',
        'discretion physique',
        'attribute',
        null
      )
    );

  insert into character_quality (
    character_id,
    name,
    source,
    level,
    essence_cost,
    notes
  )
  values (
    character_id,
    'Controle vocal',
    'pouvoir d''adepte',
    0,
    0,
    '[]'::jsonb
  )
  returning id into quality_id;

  insert into character_modifier (quality_id, type, value, applies_to)
  values
    (
      quality_id,
      'RISK_REDUCTION',
      1,
      jsonb_build_object('skill', 'INFLUENCE', 'specialization', null, 'attribute', null)
    ),
    (
      quality_id,
      'RISK_REDUCTION',
      1,
      jsonb_build_object('skill', 'INFLUENCE', 'specialization', 'imposture', 'attribute', null)
    );

  insert into character_quality (
    character_id,
    name,
    source,
    level,
    essence_cost,
    notes
  )
  values (
    character_id,
    'Sens du combat',
    'pouvoir d''adepte',
    0,
    0,
    '[]'::jsonb
  )
  returning id into quality_id;

  insert into character_modifier (quality_id, type, value, applies_to)
  values
    (
      quality_id,
      'RISK_REDUCTION',
      1,
      jsonb_build_object('skill', 'COMBAT_RAPPROCHE', 'specialization', null, 'attribute', null)
    ),
    (
      quality_id,
      'RISK_REDUCTION',
      1,
      jsonb_build_object(
        'skill',
        'ATHLETISME',
        'specialization',
        'defense a distance',
        'attribute',
        null
      )
    );

  insert into character_quality (
    character_id,
    name,
    source,
    level,
    essence_cost,
    notes
  )
  values (
    character_id,
    'Sens du danger',
    'pouvoir d''adepte',
    0,
    0,
    jsonb_build_array(
      jsonb_build_object(
        'label',
        'Effet',
        'text',
        'Permet de ressentir un danger imminent, sans test de Perception, mais sans detail.'
      )
    )
  );

  insert into character_quality (
    character_id,
    name,
    source,
    level,
    essence_cost,
    notes
  )
  values (
    character_id,
    'Fusil d''assaut AK-97',
    'equipement',
    0,
    0,
    jsonb_build_array(
      jsonb_build_object('label', 'Detail', 'text', 'Baionnette demontable')
    )
  );

  insert into character_item (character_id, name, category, tags, value)
  values
    (character_id, 'Faux SIN', 'SIN', '[]'::jsonb, null),
    (character_id, 'Commlink', 'COMMLINK', '[]'::jsonb, null),
    (character_id, 'Medikit', 'GENERAL', '[]'::jsonb, null),
    (
      character_id,
      'Veste pare-balle',
      'ARMOR',
      jsonb_build_array(jsonb_build_object('label', 'Armure', 'text', '3')),
      null
    ),
    (character_id, 'Mains nues', 'WEAPON', '[]'::jsonb, null),
    (
      character_id,
      'Colt Manhunter',
      'WEAPON',
      jsonb_build_array(
        jsonb_build_object('label', 'Type', 'text', 'pistolet lourd'),
        jsonb_build_object('label', 'VD', 'text', '5')
      ),
      null
    ),
    (
      character_id,
      'AK-97',
      'WEAPON',
      jsonb_build_array(
        jsonb_build_object('label', 'Type', 'text', 'fusil d''assaut'),
        jsonb_build_object('label', 'VD', 'text', '7')
      ),
      null
    ),
    (
      character_id,
      'Baionnette (couteau)',
      'WEAPON',
      jsonb_build_array(
        jsonb_build_object('label', 'Type', 'text', 'lame'),
        jsonb_build_object('label', 'VD', 'text', '4')
      ),
      null
    ),
    (
      character_id,
      'Baionnette (montee sur AK-97)',
      'WEAPON',
      jsonb_build_array(
        jsonb_build_object('label', 'Type', 'text', 'lame'),
        jsonb_build_object('label', 'VD', 'text', '5')
      ),
      null
    );

  insert into character_magic (character_id, awakened, spirits)
  values (
    character_id,
    true,
    jsonb_build_array(jsonb_build_object('label', 'Mentor', 'text', 'Capybara'))
  );

  insert into character_defense (character_id, armor_primary, threshold_notes)
  values (
    character_id,
    3,
    jsonb_build_array(
      jsonb_build_object('label', 'Physique sans armure', 'text', '3 / 6 / 9'),
      jsonb_build_object('label', 'Physique avec veste pare-balle 3', 'text', '6 / 9 / 12'),
      jsonb_build_object('label', 'Mental', 'text', '3 / 6 / 9')
    )
  );

  insert into character_damage_state (
    character_id,
    physical,
    mental,
    matrix,
    vehicle,
    stabilized
  )
  values (character_id, 'OK', 'OK', 'OK', 'OK', false);
end $$;
