do $$
begin
  create policy "Characters are visible to all authenticated users"
  on character
  for select
  using (auth.role() = 'authenticated');

  create policy "Attributes are visible to all authenticated users"
  on character_attribute
  for select
  using (auth.role() = 'authenticated');

  create policy "Skills are visible to all authenticated users"
  on character_skill
  for select
  using (auth.role() = 'authenticated');

  create policy "Skill specializations are visible to all authenticated users"
  on character_skill_specialization
  for select
  using (auth.role() = 'authenticated');

  create policy "Resources are visible to all authenticated users"
  on character_resource
  for select
  using (auth.role() = 'authenticated');

  create policy "Qualities are visible to all authenticated users"
  on character_quality
  for select
  using (auth.role() = 'authenticated');

  create policy "Modifiers are visible to all authenticated users"
  on character_modifier
  for select
  using (auth.role() = 'authenticated');

  create policy "Items are visible to all authenticated users"
  on character_item
  for select
  using (auth.role() = 'authenticated');

  create policy "Magic loadouts are visible to all authenticated users"
  on character_magic
  for select
  using (auth.role() = 'authenticated');

  create policy "Spells are visible to all authenticated users"
  on character_spell
  for select
  using (auth.role() = 'authenticated');

  create policy "Contacts are visible to all authenticated users"
  on character_contact
  for select
  using (auth.role() = 'authenticated');

  create policy "Damage states are visible to all authenticated users"
  on character_damage_state
  for select
  using (auth.role() = 'authenticated');

  create policy "Defenses are visible to all authenticated users"
  on character_defense
  for select
  using (auth.role() = 'authenticated');
exception
  when duplicate_object then null;
end $$;
