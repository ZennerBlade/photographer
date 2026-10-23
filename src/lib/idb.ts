/** Tiny IndexedDB key-value wrapper. Every call is wrapped in try/catch and falls back to an in-memory Map, so private windows or blocked storage never break the app (data just won't survive a reload). */
const DB = 'photographer-demo';
const STORES = ['drafts', 'profiles'] as const;
export type Store = (typeof STORES)[number];

const mem: Record<Store, Map<string, unknown>> = { drafts: new Map(), profiles: new Map() };
let opening: Promise<IDBDatabase | null> | null = null;

function open(): Promise<IDBDatabase | null> {
  opening ??= new Promise((resolve) => {
    try {
      const req = indexedDB.open(DB, 1);
      req.onupgradeneeded = () => STORES.forEach((s) => req.result.objectStoreNames.contains(s) || req.result.createObjectStore(s));
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => resolve(null);
      req.onblocked = () => resolve(null);
    } catch {
      resolve(null);
    }
  });
  return opening;
}

function run<T>(store: Store, mode: IDBTransactionMode, fn: (s: IDBObjectStore) => IDBRequest): Promise<T | undefined> {
  return open().then(
    (db) =>
      new Promise<T | undefined>((resolve, reject) => {
        if (!db) return reject(new Error('no idb'));
        try {
          const tx = db.transaction(store, mode);
          const req = fn(tx.objectStore(store));
          tx.oncomplete = () => resolve(req.result as T);
          tx.onerror = tx.onabort = () => reject(tx.error);
        } catch (e) {
          reject(e);
        }
      }),
  );
}

export async function idbGet<T>(store: Store, key: string): Promise<T | undefined> {
  try {
    return await run<T>(store, 'readonly', (s) => s.get(key));
  } catch {
    return mem[store].get(key) as T | undefined;
  }
}
export async function idbPut(store: Store, key: string, value: unknown): Promise<boolean> {
  mem[store].set(key, value);
  try {
    await run(store, 'readwrite', (s) => s.put(value, key));
    return true;
  } catch {
    return false;
  }
}
export async function idbDelete(store: Store, key: string): Promise<void> {
  mem[store].delete(key);
  try {
    await run(store, 'readwrite', (s) => s.delete(key));
  } catch {
    /* memory copy already removed */
  }
}
export async function idbAll<T>(store: Store): Promise<T[]> {
  try {
    return ((await run<T[]>(store, 'readonly', (s) => s.getAll())) ?? []) as T[];
  } catch {
    return [...mem[store].values()] as T[];
  }
}
