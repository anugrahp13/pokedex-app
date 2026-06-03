const STAT_LABELS: Record<string, string> = {
  hp:              'HP',
  attack:          'ATK',
  defense:         'DEF',
  'special-attack':  'SP.ATK',
  'special-defense': 'SP.DEF',
  speed:           'SPD',
};

const STAT_COLORS: Record<string, string> = {
  hp:              'bg-green-400',
  attack:          'bg-red-400',
  defense:         'bg-blue-400',
  'special-attack':  'bg-purple-400',
  'special-defense': 'bg-indigo-400',
  speed:           'bg-yellow-400',
};

interface Props {
  name: string;
  value: number;
  max?: number;
}

export default function StatBar({ name, value, max = 255 }: Props) {
  const label = STAT_LABELS[name] ?? name;
  const color = STAT_COLORS[name] ?? 'bg-gray-400';
  const pct   = Math.round((value / max) * 100);

  return (
    <div className="flex items-center gap-3">
      <span className="w-16 text-xs text-white/40 text-right shrink-0">{label}</span>
      <span className="w-8 text-xs font-semibold text-white/80 shrink-0">{value}</span>
      <div className="flex-1 h-2 rounded-full bg-white/10 overflow-hidden">
        <div
          className={`h-full rounded-full ${color} transition-all duration-700`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}