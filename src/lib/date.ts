export type DueStatus = 'overdue' | 'today' | 'upcoming' | 'none';

/** Parse a YYYY-MM-DD string into a local Date at midnight. */
export function parseDueDate(value: string): Date | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return null;
  const [, y, m, d] = match;
  const date = new Date(Number(y), Number(m) - 1, Number(d));
  return Number.isNaN(date.getTime()) ? null : date;
}

function startOfToday(): Date {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

const MS_PER_DAY = 24 * 60 * 60 * 1000;

/** Whole days from today to the given due date (negative = past). */
export function daysUntil(value: string): number | null {
  const due = parseDueDate(value);
  if (!due) return null;
  return Math.round((due.getTime() - startOfToday().getTime()) / MS_PER_DAY);
}

export function getDueStatus(value: string | null): DueStatus {
  if (!value) return 'none';
  const diff = daysUntil(value);
  if (diff === null) return 'none';
  if (diff < 0) return 'overdue';
  if (diff === 0) return 'today';
  return 'upcoming';
}

export function formatDueLabel(value: string | null): string {
  if (!value) return '';
  const diff = daysUntil(value);
  const due = parseDueDate(value);
  if (diff === null || !due) return '';

  if (diff === 0) return 'Today';
  if (diff === 1) return 'Tomorrow';
  if (diff === -1) return '1 day overdue';
  if (diff < -1) return `${Math.abs(diff)} days overdue`;

  const sameYear = due.getFullYear() === new Date().getFullYear();
  return due.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    ...(sameYear ? {} : { year: 'numeric' }),
  });
}

/** Today as YYYY-MM-DD in local time — useful as a date input min/default. */
export function todayISO(): string {
  const t = startOfToday();
  const mm = String(t.getMonth() + 1).padStart(2, '0');
  const dd = String(t.getDate()).padStart(2, '0');
  return `${t.getFullYear()}-${mm}-${dd}`;
}
