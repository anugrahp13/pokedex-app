import { TYPE_COLORS } from '../utils/typeColors';

interface Props {
  type: string;
}

export default function TypeBadge({ type }: Props) {
  const color = TYPE_COLORS[type] ?? 'bg-gray-300 text-gray-800';
  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold capitalize ${color}`}>
      {type}
    </span>
  );
}