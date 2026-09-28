import { useMemo, useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { TodoForm } from '@/components/TodoForm';
import { FilterTabs } from '@/components/FilterTabs';
import { TodoList } from '@/components/TodoList';
import { EmptyState } from '@/components/EmptyState';
import { useTodos } from '@/hooks/useTodos';
import type { TodoFilter } from '@/types/todo';

export const Route = createFileRoute('/')({
  component: HomePage,
});

function HomePage() {
  const { todos, addTodo, toggleTodo, deleteTodo, clearCompleted, counts } = useTodos();
  const [filter, setFilter] = useState<TodoFilter>('all');

  const visible = useMemo(() => {
    if (filter === 'active') return todos.filter((t) => !t.completed);
    if (filter === 'completed') return todos.filter((t) => t.completed);
    return todos;
  }, [todos, filter]);

  return (
    <main>
      <header className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">Todos</h1>
        <p className="mt-1 text-sm text-slate-500">
          A quiet place for the things you need to get done.
        </p>
      </header>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 p-5">
          <TodoForm onAdd={addTodo} />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-5 py-3">
          <FilterTabs value={filter} onChange={setFilter} counts={counts} />
          {counts.completed > 0 && (
            <button
              type="button"
              onClick={clearCompleted}
              className="rounded-lg px-2 py-1 text-xs font-medium text-slate-500 transition hover:text-red-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Clear completed
            </button>
          )}
        </div>

        {visible.length > 0 ? (
          <TodoList todos={visible} onToggle={toggleTodo} onDelete={deleteTodo} />
        ) : (
          <EmptyState filter={filter} />
        )}

        <div className="border-t border-slate-100 px-5 py-3 text-xs text-slate-500">
          {counts.total === 0
            ? 'No tasks yet'
            : `${counts.active} of ${counts.total} remaining`}
        </div>
      </div>
    </main>
  );
}
