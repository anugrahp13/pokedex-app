# Pokédex App

Aplikasi Pokédex modern yang dibangun dengan **React 19**, **TypeScript**, dan **Vite**. Menampilkan data Pokémon secara real-time dari [PokéAPI](https://pokeapi.co/) dengan fitur pencarian, filter berdasarkan tipe, serta halaman detail untuk setiap Pokémon.

## Tech Stack

- **React 19** + **TypeScript** — UI library & type safety
- **Vite** — Build tool & dev server
- **React Router v7** — Client-side routing
- **TanStack React Query** — Server state management & caching
- **Zustand** — Client state management
- **Axios** — HTTP client
- **Vitest** + **Testing Library** — Unit & component testing

---

## Cara Menjalankan di Lokal

### 1. Clone Repository

```bash
git clone https://github.com/anugrahp13/pokedex-app.git
cd pokedex-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Jalankan Development Server

```bash
npm run dev
```

Aplikasi akan berjalan di `http://localhost:5173` (default Vite).

### 4. Jalankan Unit Test

```bash
npm test
```

### 5. Build untuk Production

```bash
npm run build
```

Hasil build akan tersimpan di folder `dist/`.

---

## Perintah Lainnya

| Perintah | Keterangan |
|---|---|
| `npm run dev` | Jalankan dev server |
| `npm test` | Jalankan semua test sekali |
| `npm run test:watch` | Test dalam watch mode (auto-rerun saat file berubah) |
| `npm run test:ui` | Buka test viewer di browser |
| `npm run coverage` | Jalankan test dengan laporan coverage |
| `npm run build` | Build production bundle |

## Test Coverage

| File | Yang Ditest |
|---|---|
| `pokemonService.ts` | fetchPokemonList, fetchPokemonDetail, fetchPokemonByType |
| `TypeBadge.tsx` | render, color mapping, fallback |
| `StatBar.tsx` | label mapping, progress width, fallback |
| `PokemonCard.tsx` | loading skeleton, render, link, types, image |
| `usePokemonDetail.ts` | loading, success, error, disabled, cache |

## Struktur Folder

```
src/
├── api/          # Service layer (Axios calls ke PokéAPI)
├── components/   # Komponen reusable (TypeBadge, StatBar, PokemonCard, dll.)
├── hooks/        # Custom hooks (usePokemonDetail)
├── pages/        # Halaman utama (HomePage, DetailPage)
├── store/        # Zustand store (state management)
├── types/        # TypeScript type definitions
├── utils/        # Utility & helper functions
└── __tests__/    # Unit & component tests
```