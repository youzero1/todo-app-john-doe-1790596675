import { useCallback, useEffect, useMemo, useState } from 'react';
import type { Todo } from '@/types/todo';

const STORAGE_KEY = 'personal-todos.v1';

function isTodo(value: unknown): value is Todo {
  if (typeof value !== 'object' || value === null) return false;
  const t = value as Record<string, unknown>;
  return (
    typeof t.id === 'string' &&
    typeof t.title === 'string' &&
    typeof t.completed === 'boolean' &&
    (typeof t.dueDate === 'string' || t.dueDate === null) &&
    typeof t.createdAt === 'string'
  );
}

function loadTodos(): Todo[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isTodo);
  } catch {
    return [];
  }
}

function createId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(() => loadTodos());

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    } catch {
      /* storage unavailable — ignore */
    }
  }, [todos]);

  const addTodo = useCallback((title: string, dueDate: string | null) => {
    const trimmed = title.trim();
    if (!trimmed) return;
    setTodos((prev) => [
      {
        id: createId(),
        title: trimmed,
        completed: false,
        dueDate: dueDate && dueDate.length > 0 ? dueDate : null,
        createdAt: new Date().toISOString(),
      },
      ...prev,
    ]);
  }, []);

  const toggleTodo = useCallback((id: string) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  }, []);

  const deleteTodo = useCallback((id: string) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const clearCompleted = useCallback(() => {
    setTodos((prev) => prev.filter((t) => !t.completed));
  }, []);

  const counts = useMemo(() => {
    const completed = todos.filter((t) => t.completed).length;
    return { total: todos.length, completed, active: todos.length - completed };
  }, [todos]);

  return { todos, addTodo, toggleTodo, deleteTodo, clearCompleted, counts };
}
