export interface ParsedMon {
    species: string;
    item: string;
    ability: string;
    level: string;
    nature: string;
    evs: string;
    moves: string[];
}
export declare function parsePokepaste(text: string): ParsedMon[];
//# sourceMappingURL=parser.d.ts.map