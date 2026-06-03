import { TYPE_STYLES } from '../utils/typeColors';

interface Props {
  type: string;
  size?: 'sm' | 'md';
}

const hexToRgb = (hex: string) => {
  const r = parseInt(hex.slice(1,3),16);
  const g = parseInt(hex.slice(3,5),16);
  const b = parseInt(hex.slice(5,7),16);
  return `${r},${g},${b}`;
};

export default function TypeBadge({ type, size = 'sm' }: Props) {
  const style  = TYPE_STYLES[type];
  const accent = style?.accent ?? '#888780';
  const rgb    = hexToRgb(accent.startsWith('#') ? accent : '#888780');

  return (
    <span style={{
      padding:         size === 'md' ? '4px 12px' : '2px 8px',
      borderRadius:    20,
      fontSize:        size === 'md' ? 12 : 10,
      fontWeight:      600,
      textTransform:   'capitalize',
      letterSpacing:   0.5,
      background:      `rgba(${rgb}, 0.18)`,
      color:           accent,
      border:          `1px solid rgba(${rgb}, 0.3)`,
    }}>
      {type}
    </span>
  );
}