export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  /** YYYY-MM-DD, or null when no due date is set. */
  dueDate: string | null;
  /** ISO timestamp. */
  createdAt: string;
}

export type TodoFilter = 'all' | 'active' | 'completed';
