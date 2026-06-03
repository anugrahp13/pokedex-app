import { TYPE_STYLES } from '../utils/typeColors';

interface Props {
  type: string;
  size?: 'sm' | 'md';
}

export default function TypeBadge({ type, size = 'sm' }: Props) {
  const style = TYPE_STYLES[type];
  const base  = style?.badge ?? 'bg-gray-700/40 text-gray-300';

  const sizeClass = size === 'md'
    ? 'px-3 py-1 text-xs'
    : 'px-2 py-0.5 text-[10px]';

  return (
    <span className={`${sizeClass} ${base} rounded-full font-semibold capitalize tracking-wide`}>
      {type}
    </span>
  );
}