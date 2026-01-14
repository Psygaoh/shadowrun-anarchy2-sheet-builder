# Shadowrun: Anarchy 2.0  
## Technical Specification — CharacterSheet Data Model & Persistence (v1.2)

> **Audience**: Backend & frontend developers (Angular + Supabase)  
> **Purpose**: Define a database-oriented specification for persisting and querying Shadowrun: Anarchy 2.0 character sheets.

---

## 0. Scope

This specification defines a **relational database schema and persistence model** for storing **Shadowrun: Anarchy 2.0 character sheets**, based on the CharacterSheet domain model.

It is designed with the following constraints:
- Backend: **Supabase (PostgreSQL)**
- Frontend: **Angular** (typed models, services, forms)
- Architecture: **API / data-driven**, not rules-engine-driven

This document:
- Specifies **tables, relationships, and constraints**
- Defines **data ownership and normalization boundaries**
- Encourages **testability and deterministic behavior**

Out of scope:
- SQL syntax specifics (indexes, policies, RLS)
- Angular implementation details
- Full rules automation (dice rolling, scene resolution)

---

## 1. Terminology (Normative)

The keywords **MUST**, **MUST NOT**, **SHOULD**, **SHOULD NOT**, and **MAY** are to be interpreted as in RFC 2119.

- **CharacterSheet**: the aggregate root representing a full character sheet.
- **Build-time data**: data that changes during character creation/progression.
- **Runtime state**: data that changes during play (wounds, current Anarchy, stabilization).
- **RR (Risk Reduction)**: a modifier that reduces the minimum risk dice for a test.

---

## 2. Architectural & Persistence Principles

### 2.1 Database-first, domain-aligned

- Each **aggregate component** maps to one or more database tables.
- Tables SHOULD mirror domain concepts closely to reduce impedance mismatch.
- JSON columns MAY be used for narrative or low-query fields.

### 2.2 Normalization vs pragmatism

- Highly queried or constrained data MUST be normalized.
- Purely narrative or rarely queried data SHOULD be stored as JSON.

### 2.3 Supabase constraints

- PostgreSQL is assumed.
- UUIDs MUST be used as primary keys.
- Foreign keys SHOULD enforce referential integrity.

### 2.4 Frontend compatibility (Angular)

- Table structures SHOULD map cleanly to typed Angular interfaces.
- Avoid polymorphic SQL magic that complicates client-side typing.

### 2.5 Testability (Normative)

The schema MUST be designed so that:
- Each table can be tested independently.
- Referential integrity rules can be unit-tested.
- Deterministic queries can be validated with fixtures.

---

## 3. Core Identifiers & Types

```text
id               : UUID (PK)
character_id     : UUID (FK → character.id)
created_at       : timestamp
updated_at       : timestamp
All tables:

MUST use UUID primary keys.

SHOULD include created_at / updated_at timestamps.

4. Enumerations
text
Copier le code
Metatype
- HUMAN | ELF | DWARF | ORK | TROLL
text
Copier le code
AttributeName
- FORCE | AGILITY | VOLONTE | LOGIQUE | CHARISME
text
Copier le code
SkillName
- ATHLETISME
- FURTIVITE
- PERCEPTION
- PILOTAGE
- ARMES_A_DISTANCE
- COMBAT_RAPPROCHE
- ELECTRONIQUE
- PIRATAGE
- INGENIERIE
- INFLUENCE
- RESEAU
- SURVIE
- SORCellerie
- CONJURATION
text
Copier le code
EdgeType
- RISK_REDUCTION | MECHANICAL | NARRATIVE
text
Copier le code
ItemCategory
- GENERAL | COMMLINK | SIN | ARMOR | WEAPON | CYBERDECK | VEHICLE | DRONE | TOOLKIT
text
Copier le code
SpellCategory
- COMBAT | DETECTION | SANTE | ILLUSION | MANIPULATION
text
Copier le code
WoundLevel
- OK | LEGERE | GRAVE | INCAPACITE
5. Character Identity (Table: character)
text
Copier le code
character
- id            : UUID (PK)
- street_name   : text (NOT NULL)
- legal_name    : text
- metatype      : text
- archetype     : text
- keywords      : jsonb
- behaviors     : jsonb
- catchphrases  : jsonb
Constraints:

street_name MUST be non-empty.

keywords SHOULD contain 5 entries.

behaviors SHOULD contain 4 entries.

catchphrases SHOULD contain 4 entries.

6. Attributes (Table: character_attribute)
text
Copier le code
character_attribute
- id            : UUID (PK)
- character_id  : UUID (FK → character.id)
- name          : text
- value         : int
Constraints:

Exactly one row per (character_id, name).

7. Skills & Specializations
7.1 Skills
text
Copier le code
character_skill
- id            : UUID (PK)
- character_id  : UUID (FK → character.id)
- skill_name    : text
- rating        : int
- linked_attribute_default : text
Constraints:

Exactly one row per (character_id, skill_name).

7.2 Specializations
text
Copier le code
character_skill_specialization
- id            : UUID (PK)
- skill_id      : UUID (FK → character_skill.id)
- name          : text
- bonus         : int
- linked_attribute_override : text
8. Resources
text
Copier le code
character_resource
- id               : UUID (PK)
- character_id     : UUID (FK)
- cash             : bigint
- anarchy_current  : int
- anarchy_max_base : int
- essence_current  : int
- essence_max      : int
9. Qualities & Modifiers
9.1 Qualities
text
Copier le code
character_quality
- id            : UUID (PK)
- character_id  : UUID (FK)
- name          : text
- source        : text
- level         : int
- essence_cost  : int
- notes         : jsonb
9.2 Modifiers
text
Copier le code
character_modifier
- id            : UUID (PK)
- quality_id    : UUID (FK)
- type          : text
- value         : int
- applies_to    : jsonb
10. Inventory
text
Copier le code
character_item
- id            : UUID (PK)
- character_id  : UUID (FK)
- name          : text
- category      : text
- tags          : jsonb
- value         : bigint
11. Magic
Magic Loadout
text
Copier le code
character_magic
- id            : UUID (PK)
- character_id  : UUID (FK)
- awakened      : boolean
- spirits       : jsonb
Spells
text
Copier le code
character_spell
- id            : UUID (PK)
- character_id  : UUID (FK)
- name          : text
- category      : text
- rules         : jsonb
12. Contacts
text
Copier le code
character_contact
- id            : UUID (PK)
- character_id  : UUID (FK)
- name          : text
- role          : text
- loyalty       : int
- connection    : int
- notes         : jsonb
13. Runtime State
Damage State
text
Copier le code
character_damage_state
- id            : UUID (PK)
- character_id  : UUID (FK)
- physical      : text
- mental        : text
- matrix        : text
- vehicle       : text
- stabilized    : boolean
Defense
text
Copier le code
character_defense
- id            : UUID (PK)
- character_id  : UUID (FK)
- armor_primary : int
- threshold_notes : jsonb
14. Business Rules (Normative)
Attribute resolution
Specialization override MUST take precedence over skill default.

Dice Pool
text
Copier le code
dicePool = skill.rating + attribute.value + specialization.bonus?
Risk Reduction
RR MUST be aggregated from all matching modifiers.

15. Testing Strategy (Strongly Encouraged)
Database tests
Enum & constraint validation

FK cascade delete tests

Unique constraint tests

Application tests (Angular)
Mapping domain ↔ DB

Round-trip serialization

Query contract tests

16. Versioning
v1.0 — Initial schema

v1.1 — Specialization attribute override

v1.2 — Database-oriented specification