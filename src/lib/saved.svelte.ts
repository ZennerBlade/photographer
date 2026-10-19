const KEY = 'pd:saved:v1';

function load(): string[] {
  try {
    const raw = localStorage.getItem(KEY);
    const v = raw ? JSON.parse(raw) : [];
    return Array.isArray(v) ? v.filter((x) => typeof x === 'string') : [];
  } catch {
    return [];
  }
}

class Saved {
  ids = $state<string[]>(load());
  has = (id: string) => this.ids.includes(id);
  toggle = (id: string) => {
    this.ids = this.has(id) ? this.ids.filter((x) => x !== id) : [...this.ids, id];
    try {
      localStorage.setItem(KEY, JSON.stringify(this.ids));
    } catch {
      /* storage blocked: stay in memory */
    }
  };
}
export const saved = new Saved();
