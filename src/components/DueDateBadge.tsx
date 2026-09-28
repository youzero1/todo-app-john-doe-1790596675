import { formatDueLabel, getDueStatus } from '@/lib/date';

interface DueDateBadgeProps {
  dueDate: string | null;
  completed?: boolean;
}

export function DueDateBadge({ dueDate, completed = false }: DueDateBadgeProps) {
  const status = getDueStatus(dueDate);
  if (status === 'none') return null;

  const label = formatDueLabel(dueDate);
  if (!label) return null;

  const tone = completed
    ? 'border-slate-200 bg-slate-100 text-slate-400'
    : status === 'overdue'
      ? 'border-red-200 bg-red-50 text-red-700'
      : status === 'today'
        ? 'border-amber-200 bg-amber-50 text-amber-700'
        : 'border-slate-200 bg-slate-50 text-slate-600';

  return (
    <span
      className={`shrink-0 rounded-full border px-2.5 py-0.5 text-xs font-medium ${tone}`}
    >
      {label}
    </span>
  );
}
