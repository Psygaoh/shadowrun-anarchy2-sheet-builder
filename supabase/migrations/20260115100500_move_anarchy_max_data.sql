insert into character_attribute (character_id, name, value)
select character_id, 'ANARCHY_MAX', anarchy_max_base
from character_resource
where anarchy_max_base is not null
on conflict (character_id, name) do update
set value = excluded.value;

alter table character_resource drop column if exists anarchy_max_base;
