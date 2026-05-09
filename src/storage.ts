// LocalStorage save/load for teams

export interface SavedTeam {
  id: string;
  name: string;
  paste: string;
  roles?: string[][];
  tagsVisible?: boolean;
}

const STORAGE_KEY = 'pokepaste-saved-teams';

export function loadSavedTeams(): SavedTeam[] {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); }
  catch { return []; }
}

export function saveSavedTeams(teams: SavedTeam[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(teams));
}

export function getNextTeamNumber(): number {
  return loadSavedTeams().length + 1;
}
