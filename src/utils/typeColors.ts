export interface TypeStyle {
  badge:  string;
  accent: string;
  glow:   string;
}

export const TYPE_STYLES: Record<string, TypeStyle> = {
  normal:   { badge: 'bg-stone-700/40   text-stone-300',  accent: '#a8a8a0', glow: 'rgba(168,168,160,0.15)' },
  fire:     { badge: 'bg-orange-500/20  text-orange-300', accent: '#EF9F27', glow: 'rgba(239,159,39,0.15)'  },
  water:    { badge: 'bg-blue-500/20    text-blue-300',   accent: '#85b7eb', glow: 'rgba(133,183,235,0.15)' },
  electric: { badge: 'bg-yellow-500/20  text-yellow-300', accent: '#FAC775', glow: 'rgba(250,199,117,0.15)' },
  grass:    { badge: 'bg-green-500/20   text-green-300',  accent: '#97c459', glow: 'rgba(151,196,89,0.15)'  },
  ice:      { badge: 'bg-cyan-500/20    text-cyan-300',   accent: '#5DCAA5', glow: 'rgba(93,202,165,0.15)'  },
  fighting: { badge: 'bg-red-600/20     text-red-300',    accent: '#E24B4A', glow: 'rgba(226,75,74,0.15)'   },
  poison:   { badge: 'bg-purple-500/20  text-purple-300', accent: '#AFA9EC', glow: 'rgba(175,169,236,0.15)' },
  ground:   { badge: 'bg-amber-600/20   text-amber-300',  accent: '#BA7517', glow: 'rgba(186,117,23,0.15)'  },
  flying:   { badge: 'bg-indigo-400/20  text-indigo-300', accent: '#B5D4F4', glow: 'rgba(181,212,244,0.15)' },
  psychic:  { badge: 'bg-pink-500/20    text-pink-300',   accent: '#ED93B1', glow: 'rgba(237,147,177,0.15)' },
  bug:      { badge: 'bg-lime-500/20    text-lime-300',   accent: '#C0DD97', glow: 'rgba(192,221,151,0.15)' },
  rock:     { badge: 'bg-yellow-700/20  text-yellow-400', accent: '#D3D1C7', glow: 'rgba(211,209,199,0.15)' },
  ghost:    { badge: 'bg-violet-700/20  text-violet-300', accent: '#7F77DD', glow: 'rgba(127,119,221,0.15)' },
  dragon:   { badge: 'bg-violet-600/20  text-violet-300', accent: '#534AB7', glow: 'rgba(83,74,183,0.15)'   },
  dark:     { badge: 'bg-stone-600/20   text-stone-300',  accent: '#888780', glow: 'rgba(136,135,128,0.15)' },
  steel:    { badge: 'bg-slate-400/20   text-slate-300',  accent: '#B4B2A9', glow: 'rgba(180,178,169,0.15)' },
  fairy:    { badge: 'bg-rose-400/20    text-rose-300',   accent: '#F4C0D1', glow: 'rgba(244,192,209,0.15)' },
};

export const TYPE_COLORS: Record<string, string> = Object.fromEntries(
  Object.entries(TYPE_STYLES).map(([k, v]) => [k, v.badge])
);

export const getTypeAccent = (types: string[]): string =>
  TYPE_STYLES[types[0]]?.accent ?? '#888780';

export const getTypeGlow = (types: string[]): string =>
  TYPE_STYLES[types[0]]?.glow ?? 'rgba(136,135,128,0.15)';