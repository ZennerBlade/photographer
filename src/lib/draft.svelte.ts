import { demoDraft } from '../data/demoDraft';
import { clearDraft, emptyDraft, loadDraft, saveDraft, type Draft, type StoredProfile } from '../data/userProfiles';

/** The onboarding draft: one reactive object, autosaved to IndexedDB (debounced) on every change. */
class DraftStore {
  d = $state<Draft>(emptyDraft());
  loaded = $state(false);
  status = $state<'idle' | 'saving' | 'saved'>('idle');
  private timer: ReturnType<typeof setTimeout> | undefined;

  async load(force = false): Promise<void> {
    if (this.loaded && !force) return;
    this.d = (await loadDraft()) ?? emptyDraft();
    this.loaded = true;
  }
  /** Start a blank draft (discarding any stored one). */
  async startNew(): Promise<void> {
    clearTimeout(this.timer);
    await clearDraft();
    this.d = emptyDraft();
    this.loaded = true;
    this.status = 'idle';
  }
  /** Start a draft pre-filled with demo data (falls back to blank if the sample images can't load). */
  async startDemo(): Promise<void> {
    await this.startNew();
    try { this.d = await demoDraft(); } catch { /* keep blank draft */ }
    await this.flush();
  }
  /** Copy a published profile into the draft so it can be edited; publishing then overwrites it. */
  async startEdit(rec: StoredProfile): Promise<void> {
    clearTimeout(this.timer);
    this.d = { ...structuredClone(rec.draft), editingId: rec.id, step: 1 };
    this.loaded = true;
    await saveDraft($state.snapshot(this.d) as Draft);
  }
  schedule(): void {
    this.status = 'saving';
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.flush(), 350);
  }
  async flush(): Promise<void> {
    clearTimeout(this.timer);
    await saveDraft($state.snapshot(this.d) as Draft);
    this.status = 'saved';
  }
}
export const draft = new DraftStore();
