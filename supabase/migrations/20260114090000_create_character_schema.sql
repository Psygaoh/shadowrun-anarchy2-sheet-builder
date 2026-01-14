create extension if not exists "pgcrypto";

do $$
begin
  create type metatype as enum ('HUMAN', 'ELF', 'DWARF', 'ORK', 'TROLL');
exception
  when duplicate_object then null;
end $$;

do $$
begin
  create type attribute_name as enum ('FORCE', 'AGILITY', 'VOLONTE', 'LOGIQUE', 'CHARISME');
exception
  when duplicate_object then null;
end $$;

do $$
begin
  create type skill_name as enum (
    'ATHLETISME',
    'FURTIVITE',
    'PERCEPTION',
    'PILOTAGE',
    'ARMES_A_DISTANCE',
    'COMBAT_RAPPROCHE',
    'ELECTRONIQUE',
    'PIRATAGE',
    'INGENIERIE',
    'INFLUENCE',
    'RESEAU',
    'SURVIE',
    'SORCELLERIE',
    'CONJURATION'
  );
exception
  when duplicate_object then null;
end $$;

do $$
begin
  create type edge_type as enum ('RISK_REDUCTION', 'MECHANICAL', 'NARRATIVE');
exception
  when duplicate_object then null;
end $$;

do $$
begin
  create type item_category as enum (
    'GENERAL',
    'COMMLINK',
    'SIN',
    'ARMOR',
    'WEAPON',
    'CYBERDECK',
    'VEHICLE',
    'DRONE',
    'TOOLKIT'
  );
exception
  when duplicate_object then null;
end $$;

do $$
begin
  create type spell_category as enum ('COMBAT', 'DETECTION', 'SANTE', 'ILLUSION', 'MANIPULATION');
exception
  when duplicate_object then null;
end $$;

do $$
begin
  create type wound_level as enum ('OK', 'LEGERE', 'GRAVE', 'INCAPACITE');
exception
  when duplicate_object then null;
end $$;

create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create table if not exists character (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade default auth.uid(),
  street_name text not null,
  legal_name text,
  metatype metatype,
  archetype text,
  keywords jsonb,
  behaviors jsonb,
  catchphrases jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists character_attribute (
  id uuid primary key default gen_random_uuid(),
  character_id uuid not null references character(id) on delete cascade,
  name attribute_name not null,
  value int not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (character_id, name)
);

create table if not exists character_skill (
  id uuid primary key default gen_random_uuid(),
  character_id uuid not null references character(id) on delete cascade,
  skill_name skill_name not null,
  rating int not null,
  linked_attribute_default attribute_name,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (character_id, skill_name)
);

create table if not exists character_skill_specialization (
  id uuid primary key default gen_random_uuid(),
  skill_id uuid not null references character_skill(id) on delete cascade,
  name text not null,
  bonus int not null,
  linked_attribute_override attribute_name,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists character_resource (
  id uuid primary key default gen_random_uuid(),
  character_id uuid not null references character(id) on delete cascade,
  cash bigint,
  anarchy_current int,
  anarchy_max_base int,
  essence_current int,
  essence_max int,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (character_id)
);

create table if not exists character_quality (
  id uuid primary key default gen_random_uuid(),
  character_id uuid not null references character(id) on delete cascade,
  name text not null,
  source text,
  level int,
  essence_cost int,
  notes jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists character_modifier (
  id uuid primary key default gen_random_uuid(),
  quality_id uuid not null references character_quality(id) on delete cascade,
  type edge_type not null,
  value int not null,
  applies_to jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists character_item (
  id uuid primary key default gen_random_uuid(),
  character_id uuid not null references character(id) on delete cascade,
  name text not null,
  category item_category,
  tags jsonb,
  value bigint,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists character_magic (
  id uuid primary key default gen_random_uuid(),
  character_id uuid not null references character(id) on delete cascade,
  awakened boolean not null default false,
  spirits jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (character_id)
);

create table if not exists character_spell (
  id uuid primary key default gen_random_uuid(),
  character_id uuid not null references character(id) on delete cascade,
  name text not null,
  category spell_category,
  rules jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists character_contact (
  id uuid primary key default gen_random_uuid(),
  character_id uuid not null references character(id) on delete cascade,
  name text not null,
  role text,
  loyalty int,
  connection int,
  notes jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists character_damage_state (
  id uuid primary key default gen_random_uuid(),
  character_id uuid not null references character(id) on delete cascade,
  physical wound_level,
  mental wound_level,
  matrix wound_level,
  vehicle wound_level,
  stabilized boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (character_id)
);

create table if not exists character_defense (
  id uuid primary key default gen_random_uuid(),
  character_id uuid not null references character(id) on delete cascade,
  armor_primary int,
  threshold_notes jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (character_id)
);

drop trigger if exists set_updated_at on character;
create trigger set_updated_at before update on character
for each row execute function set_updated_at();

drop trigger if exists set_updated_at on character_attribute;
create trigger set_updated_at before update on character_attribute
for each row execute function set_updated_at();

drop trigger if exists set_updated_at on character_skill;
create trigger set_updated_at before update on character_skill
for each row execute function set_updated_at();

drop trigger if exists set_updated_at on character_skill_specialization;
create trigger set_updated_at before update on character_skill_specialization
for each row execute function set_updated_at();

drop trigger if exists set_updated_at on character_resource;
create trigger set_updated_at before update on character_resource
for each row execute function set_updated_at();

drop trigger if exists set_updated_at on character_quality;
create trigger set_updated_at before update on character_quality
for each row execute function set_updated_at();

drop trigger if exists set_updated_at on character_modifier;
create trigger set_updated_at before update on character_modifier
for each row execute function set_updated_at();

drop trigger if exists set_updated_at on character_item;
create trigger set_updated_at before update on character_item
for each row execute function set_updated_at();

drop trigger if exists set_updated_at on character_magic;
create trigger set_updated_at before update on character_magic
for each row execute function set_updated_at();

drop trigger if exists set_updated_at on character_spell;
create trigger set_updated_at before update on character_spell
for each row execute function set_updated_at();

drop trigger if exists set_updated_at on character_contact;
create trigger set_updated_at before update on character_contact
for each row execute function set_updated_at();

drop trigger if exists set_updated_at on character_damage_state;
create trigger set_updated_at before update on character_damage_state
for each row execute function set_updated_at();

drop trigger if exists set_updated_at on character_defense;
create trigger set_updated_at before update on character_defense
for each row execute function set_updated_at();

alter table character enable row level security;
alter table character_attribute enable row level security;
alter table character_skill enable row level security;
alter table character_skill_specialization enable row level security;
alter table character_resource enable row level security;
alter table character_quality enable row level security;
alter table character_modifier enable row level security;
alter table character_item enable row level security;
alter table character_magic enable row level security;
alter table character_spell enable row level security;
alter table character_contact enable row level security;
alter table character_damage_state enable row level security;
alter table character_defense enable row level security;

create policy "Characters are visible to their owners"
on character
for select
using (user_id = auth.uid());

create policy "Characters can be created by their owners"
on character
for insert
with check (user_id = auth.uid());

create policy "Characters can be updated by their owners"
on character
for update
using (user_id = auth.uid());

create policy "Characters can be deleted by their owners"
on character
for delete
using (user_id = auth.uid());

create policy "Attributes are scoped to character owners"
on character_attribute
for all
using (
  exists (
    select 1
    from character c
    where c.id = character_attribute.character_id
      and c.user_id = auth.uid()
  )
)
with check (
  exists (
    select 1
    from character c
    where c.id = character_attribute.character_id
      and c.user_id = auth.uid()
  )
);

create policy "Skills are scoped to character owners"
on character_skill
for all
using (
  exists (
    select 1
    from character c
    where c.id = character_skill.character_id
      and c.user_id = auth.uid()
  )
)
with check (
  exists (
    select 1
    from character c
    where c.id = character_skill.character_id
      and c.user_id = auth.uid()
  )
);

create policy "Skill specializations are scoped to character owners"
on character_skill_specialization
for all
using (
  exists (
    select 1
    from character_skill s
    join character c on c.id = s.character_id
    where s.id = character_skill_specialization.skill_id
      and c.user_id = auth.uid()
  )
)
with check (
  exists (
    select 1
    from character_skill s
    join character c on c.id = s.character_id
    where s.id = character_skill_specialization.skill_id
      and c.user_id = auth.uid()
  )
);

create policy "Resources are scoped to character owners"
on character_resource
for all
using (
  exists (
    select 1
    from character c
    where c.id = character_resource.character_id
      and c.user_id = auth.uid()
  )
)
with check (
  exists (
    select 1
    from character c
    where c.id = character_resource.character_id
      and c.user_id = auth.uid()
  )
);

create policy "Qualities are scoped to character owners"
on character_quality
for all
using (
  exists (
    select 1
    from character c
    where c.id = character_quality.character_id
      and c.user_id = auth.uid()
  )
)
with check (
  exists (
    select 1
    from character c
    where c.id = character_quality.character_id
      and c.user_id = auth.uid()
  )
);

create policy "Modifiers are scoped to character owners"
on character_modifier
for all
using (
  exists (
    select 1
    from character_quality q
    join character c on c.id = q.character_id
    where q.id = character_modifier.quality_id
      and c.user_id = auth.uid()
  )
)
with check (
  exists (
    select 1
    from character_quality q
    join character c on c.id = q.character_id
    where q.id = character_modifier.quality_id
      and c.user_id = auth.uid()
  )
);

create policy "Items are scoped to character owners"
on character_item
for all
using (
  exists (
    select 1
    from character c
    where c.id = character_item.character_id
      and c.user_id = auth.uid()
  )
)
with check (
  exists (
    select 1
    from character c
    where c.id = character_item.character_id
      and c.user_id = auth.uid()
  )
);

create policy "Magic loadouts are scoped to character owners"
on character_magic
for all
using (
  exists (
    select 1
    from character c
    where c.id = character_magic.character_id
      and c.user_id = auth.uid()
  )
)
with check (
  exists (
    select 1
    from character c
    where c.id = character_magic.character_id
      and c.user_id = auth.uid()
  )
);

create policy "Spells are scoped to character owners"
on character_spell
for all
using (
  exists (
    select 1
    from character c
    where c.id = character_spell.character_id
      and c.user_id = auth.uid()
  )
)
with check (
  exists (
    select 1
    from character c
    where c.id = character_spell.character_id
      and c.user_id = auth.uid()
  )
);

create policy "Contacts are scoped to character owners"
on character_contact
for all
using (
  exists (
    select 1
    from character c
    where c.id = character_contact.character_id
      and c.user_id = auth.uid()
  )
)
with check (
  exists (
    select 1
    from character c
    where c.id = character_contact.character_id
      and c.user_id = auth.uid()
  )
);

create policy "Damage states are scoped to character owners"
on character_damage_state
for all
using (
  exists (
    select 1
    from character c
    where c.id = character_damage_state.character_id
      and c.user_id = auth.uid()
  )
)
with check (
  exists (
    select 1
    from character c
    where c.id = character_damage_state.character_id
      and c.user_id = auth.uid()
  )
);

create policy "Defenses are scoped to character owners"
on character_defense
for all
using (
  exists (
    select 1
    from character c
    where c.id = character_defense.character_id
      and c.user_id = auth.uid()
  )
)
with check (
  exists (
    select 1
    from character c
    where c.id = character_defense.character_id
      and c.user_id = auth.uid()
  )
);
