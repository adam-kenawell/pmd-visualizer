# pmd-visualizer

A TypeScript library that provides the core logic for the PokePaste team visualizer with animated PMD (Pokémon Mystery Dungeon) sprites.

## Features

- **PokePaste Parser** — Parse PokePaste-formatted team exports into structured data
- **PMD Sprite Widgets** — Animated sprite rendering using PMDCollab sprite sheets (Idle, Walk, Attack)
- **PokeAPI Integration** — Fetch Pokémon type data, move types, and official artwork
- **Type Color Coding** — Color maps for all 18 Pokémon types, EV stat colors, and gradient utilities
- **LocalStorage Persistence** — Save/load teams with role tags

## Installation

```bash
npm install pmd-visualizer
```

## Usage

```typescript
import {
  parsePokepaste,
  createSpriteWidget,
  fetchPokemonData,
  fetchMoveType,
  TYPE_COLORS,
  colorizeEvs,
  loadSavedTeams,
  saveSavedTeams,
  ROLE_OPTIONS,
  DEFAULT_PASTE,
} from 'pmd-visualizer';

// Parse a PokePaste string
const team = parsePokepaste(pasteText);

// Create an animated sprite canvas element
const canvas = await createSpriteWidget(dexId);

// Fetch type data for color coding
const data = await fetchPokemonData('arcanine-hisui');
const moveType = await fetchMoveType('Flare Blitz');
```

## Modules

| Module | Exports |
|--------|---------|
| `parser` | `parsePokepaste`, `ParsedMon` |
| `colors` | `TYPE_COLORS`, `EV_COLORS`, `colorizeEvs`, `getTypeGradient` |
| `pokeapi` | `fetchPokemonData`, `nameToDexId`, `fetchMoveType` |
| `sprite-widget` | `createSpriteWidget`, `startAnimLoop`, `resetWidgets`, `SpriteWidget` |
| `sprites` | `spriteUrl`, `loadImage`, `fetchAnimData`, `calcFrameInfo`, `FrameInfo` |
| `storage` | `loadSavedTeams`, `saveSavedTeams`, `getNextTeamNumber`, `SavedTeam` |
| `roles` | `ROLE_OPTIONS` |
| `defaults` | `DEFAULT_PASTE` |
