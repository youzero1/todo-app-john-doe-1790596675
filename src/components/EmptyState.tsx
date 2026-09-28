import type { TodoFilter } from '@/types/todo';

interface EmptyStateProps {
  filter: TodoFilter;
}

const copy: Record<TodoFilter, { title: string; hint: string }> = {
  all: { title: 'Nothing here yet', hint: 'Add your first task above to get going.' },
  active: { title: 'All caught up', hint: 'Every task is done. Enjoy the quiet.' },
  completed: { title: 'Nothing completed yet', hint: 'Check something off and it will show up here.' },
};

export function EmptyState({ filter }: EmptyStateProps) {
  const { title, hint } = copy[filter];
  return (
    <div className="px-6 py-14 text-center">
      <p className="text-sm font-medium text-slate-700">{title}</p>
      <p className="mt-1 text-sm text-slate-400">{hint}</p>
    </div>
  );
}
