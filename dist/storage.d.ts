export interface SavedTeam {
    id: string;
    name: string;
    paste: string;
    roles?: string[][];
    tagsVisible?: boolean;
}
export declare function loadSavedTeams(): SavedTeam[];
export declare function saveSavedTeams(teams: SavedTeam[]): void;
export declare function getNextTeamNumber(): number;
//# sourceMappingURL=storage.d.ts.map