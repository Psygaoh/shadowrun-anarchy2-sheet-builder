import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';

import { Character, CharacterSheet } from '../domain/character-models';
import { CharacterService } from '../data/character.service';
import { CharacterSheetService } from '../data/character-sheet.service';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-character-search-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="page">
      <header class="page-header">
        <div>
          <p class="eyebrow">Characters</p>
          <h1>Character lookup</h1>
          <p class="muted">Search by name, player id, or character id.</p>
        </div>
      </header>

      <form class="card" (submit)="onSearch($event)">
        @if (!user()) {
          <p class="muted">
            Login required. Character search is scoped to the signed-in player.
          </p>
        }
        <label class="field">
          <span>Name</span>
          <input
            type="text"
            [value]="nameQuery()"
            (input)="onNameInput($event)"
            placeholder="Street name or legal name"
          />
        </label>

        <label class="field">
          <span>Player id</span>
          <input
            type="text"
            [value]="playerIdQuery()"
            (input)="onPlayerIdInput($event)"
            placeholder="Supabase user id"
          />
        </label>

        <label class="field">
          <span>Character id</span>
          <input
            type="text"
            [value]="characterIdQuery()"
            (input)="onCharacterIdInput($event)"
            placeholder="UUID"
          />
        </label>

        <div class="actions">
          <button class="button" type="submit" [disabled]="loading() || !user()">
            Search
          </button>
          <button class="button ghost" type="button" (click)="reset()">Reset</button>
        </div>
      </form>

      @if (errorMessage()) {
        <div class="card alert">{{ errorMessage() }}</div>
      }

      @if (results().length) {
        <div class="card">
          <h2>Matches</h2>
          <ul class="result-list">
            @for (character of results(); track character.id) {
              <li>
                <button class="link" type="button" (click)="selectCharacter(character)">
                  {{ character.street_name }}
                </button>
                <span class="muted">
                  {{ character.legal_name || 'No legal name' }} · {{ character.id }}
                </span>
              </li>
            }
          </ul>
        </div>
      } @else if (hasSearched() && !loading()) {
        <div class="card muted">No characters found.</div>
      }

      @if (selectedSheet()) {
        <div class="card">
          <h2>Identity</h2>
          <p><strong>Street name:</strong> {{ selectedSheet()!.character.street_name }}</p>
          <p><strong>Legal name:</strong> {{ selectedSheet()!.character.legal_name || 'N/A' }}</p>
          <p><strong>Metatype:</strong> {{ selectedSheet()!.character.metatype || 'N/A' }}</p>
          <p><strong>Archetype:</strong> {{ selectedSheet()!.character.archetype || 'N/A' }}</p>
          <p><strong>Player id:</strong> {{ selectedSheet()!.character.user_id }}</p>
          <p><strong>Character id:</strong> {{ selectedSheet()!.character.id }}</p>
          <p><strong>Keywords:</strong> {{ formatList(selectedSheet()!.character.keywords) }}</p>
          <p><strong>Behaviors:</strong> {{ formatList(selectedSheet()!.character.behaviors) }}</p>
          <p><strong>Catchphrases:</strong> {{ formatList(selectedSheet()!.character.catchphrases) }}</p>
        </div>

        <div class="card">
          <h2>Attributes</h2>
          <ul>
            @for (attribute of selectedSheet()!.attributes; track attribute.id) {
              <li>{{ attribute.name }}: {{ attribute.value }}</li>
            }
          </ul>
        </div>

        <div class="card">
          <h2>Skills</h2>
          <ul>
            @for (skill of selectedSheet()!.skills; track skill.id) {
              <li>
                {{ skill.skill_name }} ({{ skill.rating }}) · {{ skill.linked_attribute_default || 'N/A' }}
                <span class="muted">{{ formatSpecializations(skill.id) }}</span>
              </li>
            }
          </ul>
        </div>

        <div class="card">
          <h2>Resources</h2>
          <p><strong>Cash:</strong> {{ selectedSheet()!.resources?.cash ?? 'N/A' }}</p>
          <p>
            <strong>Current anarchy:</strong>
            {{ selectedSheet()!.resources?.anarchy_current ?? 'N/A' }}
          </p>
          <p><strong>Essence:</strong> {{ selectedSheet()!.resources?.essence_current ?? 'N/A' }}</p>
          <p><strong>Essence max:</strong> {{ selectedSheet()!.resources?.essence_max ?? 'N/A' }}</p>
        </div>

        <div class="card">
          <h2>Qualities</h2>
          <ul>
            @for (quality of selectedSheet()!.qualities; track quality.id) {
              <li>
                {{ quality.name }} ({{ quality.source || 'Unknown' }}) · Level
                {{ quality.level ?? 0 }}
                <span class="muted">{{ formatNotes(quality.notes) }}</span>
              </li>
            }
          </ul>
          @if (selectedSheet()!.modifiers.length) {
            <h3>Modifiers</h3>
            <ul>
              @for (modifier of selectedSheet()!.modifiers; track modifier.id) {
                <li>
                  {{ modifier.type }} +{{ modifier.value }} ·
                  {{ formatNotes(modifier.applies_to) }}
                </li>
              }
            </ul>
          }
        </div>

        <div class="card">
          <h2>Items</h2>
          <ul>
            @for (item of selectedSheet()!.items; track item.id) {
              <li>
                {{ item.name }} ({{ item.category || 'Unknown' }}) ·
                {{ formatNotes(item.tags) }}
              </li>
            }
          </ul>
        </div>

        <div class="card">
          <h2>Magic</h2>
          <p><strong>Awakened:</strong> {{ selectedSheet()!.magic?.awakened ? 'Yes' : 'No' }}</p>
          <p><strong>Spirits:</strong> {{ formatNotes(selectedSheet()!.magic?.spirits) }}</p>
          @if (selectedSheet()!.spells.length) {
            <h3>Spells</h3>
            <ul>
              @for (spell of selectedSheet()!.spells; track spell.id) {
                <li>{{ spell.name }} ({{ spell.category || 'Unknown' }})</li>
              }
            </ul>
          }
        </div>

        <div class="card">
          <h2>Contacts</h2>
          <ul>
            @for (contact of selectedSheet()!.contacts; track contact.id) {
              <li>
                {{ contact.name }} ({{ contact.role || 'Unknown' }}) · Loyalty
                {{ contact.loyalty ?? 0 }} · Connection {{ contact.connection ?? 0 }}
              </li>
            }
          </ul>
        </div>

        <div class="card">
          <h2>Defense</h2>
          <p><strong>Armor:</strong> {{ selectedSheet()!.defense?.armor_primary ?? 'N/A' }}</p>
          <p><strong>Thresholds:</strong> {{ formatNotes(selectedSheet()!.defense?.threshold_notes) }}</p>
        </div>

        <div class="card">
          <h2>Damage</h2>
          <p><strong>Physical:</strong> {{ selectedSheet()!.damageState?.physical ?? 'N/A' }}</p>
          <p><strong>Mental:</strong> {{ selectedSheet()!.damageState?.mental ?? 'N/A' }}</p>
          <p><strong>Matrix:</strong> {{ selectedSheet()!.damageState?.matrix ?? 'N/A' }}</p>
          <p><strong>Vehicle:</strong> {{ selectedSheet()!.damageState?.vehicle ?? 'N/A' }}</p>
          <p><strong>Stabilized:</strong> {{ selectedSheet()!.damageState?.stabilized ? 'Yes' : 'No' }}</p>
        </div>
      }
    </section>
  `,
  styles: [
    `
      .page {
        padding: 2.5rem 1.5rem;
        display: grid;
        gap: 1.5rem;
      }

      .page-header {
        display: flex;
        justify-content: space-between;
        gap: 1.5rem;
        align-items: center;
      }

      .eyebrow {
        text-transform: uppercase;
        letter-spacing: 0.16em;
        font-size: 0.72rem;
        color: hsl(var(--muted-foreground));
      }

      .card {
        background: hsl(var(--card));
        border-radius: 20px;
        padding: 1.5rem;
        border: 1px solid var(--feature-card-border);
        box-shadow: 0 16px 40px var(--feature-card-shadow);
      }

      .field {
        display: grid;
        gap: 0.5rem;
        margin-bottom: 1rem;
      }

      .field input {
        padding: 0.65rem 0.8rem;
        border-radius: 10px;
        border: 1px solid var(--feature-card-border);
        background: hsl(var(--muted));
        color: hsl(var(--foreground));
      }

      .actions {
        display: flex;
        gap: 0.75rem;
      }

      .alert {
        color: hsl(var(--destructive-foreground));
        background: hsl(var(--destructive));
      }

      .result-list {
        list-style: none;
        padding: 0;
        margin: 1rem 0 0;
        display: grid;
        gap: 0.6rem;
      }

      .link {
        background: none;
        border: none;
        color: hsl(var(--foreground));
        font-weight: 600;
        cursor: pointer;
        padding: 0;
      }

      .muted {
        color: hsl(var(--muted-foreground));
      }
    `,
  ],
})
export class CharacterSearchPageComponent {
  nameQuery = signal('');
  playerIdQuery = signal('');
  characterIdQuery = signal('');
  results = signal<Character[]>([]);
  selectedSheet = signal<CharacterSheet | null>(null);
  loading = signal(false);
  hasSearched = signal(false);
  errorMessage = signal('');
  private readonly auth = inject(AuthService);
  readonly user = this.auth.user;

  constructor(
    private readonly characters: CharacterService,
    private readonly sheets: CharacterSheetService
  ) {}

  async onSearch(event: Event) {
    event.preventDefault();
    this.errorMessage.set('');
    this.loading.set(true);
    this.hasSearched.set(true);
    this.selectedSheet.set(null);

    try {
      if (!this.user()) {
        this.results.set([]);
        this.errorMessage.set('Login required to search for characters.');
        return;
      }
      const results = await this.characters.search({
        name: this.nameQuery(),
        playerId: this.playerIdQuery(),
        characterId: this.characterIdQuery(),
      });
      this.results.set(results);
    } catch (error) {
      this.results.set([]);
      this.errorMessage.set(
        error instanceof Error ? error.message : 'Failed to search characters.'
      );
    } finally {
      this.loading.set(false);
    }
  }

  async selectCharacter(character: Character) {
    this.errorMessage.set('');
    this.loading.set(true);
    try {
      const sheet = await this.sheets.getCharacterSheet(character.id);
      this.selectedSheet.set(sheet);
    } catch (error) {
      this.errorMessage.set(
        error instanceof Error ? error.message : 'Failed to load character data.'
      );
    } finally {
      this.loading.set(false);
    }
  }

  reset() {
    this.nameQuery.set('');
    this.playerIdQuery.set('');
    this.characterIdQuery.set('');
    this.results.set([]);
    this.selectedSheet.set(null);
    this.hasSearched.set(false);
    this.errorMessage.set('');
  }

  onNameInput(event: Event) {
    this.nameQuery.set(this.readInputValue(event));
  }

  onPlayerIdInput(event: Event) {
    this.playerIdQuery.set(this.readInputValue(event));
  }

  onCharacterIdInput(event: Event) {
    this.characterIdQuery.set(this.readInputValue(event));
  }

  private readInputValue(event: Event) {
    const target = event.target as HTMLInputElement | null;
    return target?.value ?? '';
  }

  formatList(items: string[] | null | undefined) {
    if (!items || items.length === 0) {
      return 'N/A';
    }
    return items.join(', ');
  }

  formatSpecializations(skillId: string) {
    const matches = this.selectedSheet()
      ?.specializations.filter((specialization) => specialization.skill_id === skillId)
      .map((specialization) => `${specialization.name} (+${specialization.bonus})`);
    if (!matches || matches.length === 0) {
      return '';
    }
    return `· ${matches.join(', ')}`;
  }

  formatNotes(notes: unknown) {
    if (!notes) {
      return 'N/A';
    }
    if (Array.isArray(notes)) {
      return notes.map((entry) => this.stringifyNote(entry)).filter(Boolean).join(' · ');
    }
    return this.stringifyNote(notes);
  }

  private stringifyNote(note: unknown) {
    if (!note || typeof note !== 'object') {
      return String(note ?? '');
    }
    const record = note as Record<string, unknown>;
    if (record['label'] && record['text']) {
      return `${record['label']}: ${record['text']}`;
    }
    return Object.entries(record)
      .map(([key, value]) => `${key}: ${value}`)
      .join(', ');
  }
}
