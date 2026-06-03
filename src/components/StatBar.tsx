const STAT_LABELS: Record<string, string> = {
  hp:               'HP',
  attack:           'ATK',
  defense:          'DEF',
  'special-attack':  'Sp.Atk',
  'special-defense': 'Sp.Def',
  speed:            'Speed',
};

const STAT_COLORS: Record<string, string> = {
  hp:               '#97c459',
  attack:           '#E24B4A',
  defense:          '#85b7eb',
  'special-attack':  '#AFA9EC',
  'special-defense': '#5DCAA5',
  speed:            '#FAC775',
};

interface Props {
  name:  string;
  value: number;
  max?:  number;
}

export default function StatBar({ name, value, max = 255 }: Props) {
  const label = STAT_LABELS[name] ?? name;
  const color = STAT_COLORS[name] ?? '#888780';
  const pct   = Math.min(Math.round((value / max) * 100), 100);

  return (
    <div className="flex items-center gap-3">
      <span className="w-14 text-[10px] text-right uppercase tracking-widest font-semibold shrink-0"
            style={{ color: 'var(--text-faint)' }}>
        {label}
      </span>
      <span className="w-8 text-xs font-bold shrink-0"
            style={{ color: 'var(--text-primary)' }}>
        {value}
      </span>
      <div className="flex-1 h-1.5 rounded-full overflow-hidden"
           style={{ background: 'rgba(255,255,255,0.08)' }}>
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${pct}%`, background: color }}
        />
      </div>
    </div>
  );
}