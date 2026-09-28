import { DueDateBadge } from '@/components/DueDateBadge';
import type { Todo } from '@/types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <li className="group flex items-center gap-3 px-5 py-3 transition hover:bg-slate-50">
      <input
        id={`todo-${todo.id}`}
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        className="size-4 shrink-0 cursor-pointer accent-indigo-600"
      />
      <label
        htmlFor={`todo-${todo.id}`}
        className={`min-w-0 flex-1 cursor-pointer break-words text-sm ${
          todo.completed ? 'text-slate-400 line-through' : 'text-slate-800'
        }`}
      >
        {todo.title}
      </label>
      <DueDateBadge dueDate={todo.dueDate} completed={todo.completed} />
      <button
        type="button"
        onClick={() => onDelete(todo.id)}
        aria-label={`Delete "${todo.title}"`}
        className="shrink-0 rounded-lg px-2 py-1 text-xs font-medium text-slate-400 opacity-0 transition hover:bg-red-50 hover:text-red-600 focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500 group-hover:opacity-100"
      >
        Delete
      </button>
    </li>
  );
}
