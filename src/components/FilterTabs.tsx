import type { TodoFilter } from '@/types/todo';

interface FilterTabsProps {
  value: TodoFilter;
  onChange: (filter: TodoFilter) => void;
  counts: { total: number; active: number; completed: number };
}

const tabs: { key: TodoFilter; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'active', label: 'Active' },
  { key: 'completed', label: 'Completed' },
];

export function FilterTabs({ value, onChange, counts }: FilterTabsProps) {
  return (
    <div className="inline-flex rounded-xl bg-slate-100 p-1">
      {tabs.map((tab) => {
        const selected = tab.key === value;
        const count =
          tab.key === 'all' ? counts.total : tab.key === 'active' ? counts.active : counts.completed;
        return (
          <button
            key={tab.key}
            type="button"
            aria-pressed={selected}
            onClick={() => onChange(tab.key)}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${
              selected
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            {tab.label}
            <span className="ml-1.5 text-slate-400">{count}</span>
          </button>
        );
      })}
    </div>
  );
}
