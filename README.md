## Running Tests

```bash
# Run semua test sekali
npm test

# Watch mode (development)
npm run test:watch

# UI mode (browser-based test viewer)
npm run test:ui

# Coverage report
npm run coverage
```

## Test Coverage

| File | Yang ditest |
|---|---|
| `pokemonService.ts` | fetchPokemonList, fetchPokemonDetail, fetchPokemonByType |
| `TypeBadge.tsx` | render, color mapping, fallback |
| `StatBar.tsx` | label mapping, progress width, fallback |
| `PokemonCard.tsx` | loading skeleton, render, link, types, image |
| `usePokemonDetail.ts` | loading, success, error, disabled, cache |