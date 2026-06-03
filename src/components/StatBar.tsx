const STAT_LABELS: Record<string, string> = {
  hp:                'HP',
  attack:            'ATK',
  defense:           'DEF',
  'special-attack':  'Sp.Atk',
  'special-defense': 'Sp.Def',
  speed:             'Speed',
};

const STAT_COLORS: Record<string, string> = {
  hp:                '#97c459',
  attack:            '#E24B4A',
  defense:           '#85b7eb',
  'special-attack':  '#AFA9EC',
  'special-defense': '#5DCAA5',
  speed:             '#FAC775',
};

interface Props {
  name:    string;
  value:   number;
  max?:    number;
  accent?: string;
}

export default function StatBar({ name, value, max = 255, accent }: Props) {
  const label = STAT_LABELS[name] ?? name;
  const color = accent ?? STAT_COLORS[name] ?? '#888780';
  const pct   = Math.min(Math.round((value / max) * 100), 100);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <span style={{
        width: 56, textAlign: 'right', fontSize: 10,
        textTransform: 'uppercase', letterSpacing: 1.5,
        fontWeight: 600, color: 'rgba(255,255,255,0.25)',
        flexShrink: 0,
      }}>
        {label}
      </span>
      <span style={{
        width: 32, fontSize: 13, fontWeight: 700,
        color: '#fff', flexShrink: 0,
      }}>
        {value}
      </span>
      <div style={{
        flex: 1, height: 6, borderRadius: 4,
        background: 'rgba(255,255,255,0.08)', overflow: 'hidden',
      }}>
        <div style={{
          height: '100%', borderRadius: 4,
          width: `${pct}%`,
          background: color,
          transition: 'width 0.7s ease',
        }} />
      </div>
    </div>
  );
}