/** In-memory session state: last list query (so the tab bar returns to the same filters) and per-query scroll positions. */
class Session {
  listQuery = $state('');
  scroll: Record<string, number> = {};
}
export const session = new Session();
