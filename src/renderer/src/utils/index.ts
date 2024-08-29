import clsx, { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const formatRelativeDateTimeFromMs = function(ms: number): string {
  const locale = window.context.locale
  const date = new Date(ms);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();

  const diffWeeks = Math.floor(diffMs / (1000 * 60 * 60 * 24 * 7));
  const diffDays = Math.floor((diffMs % (1000 * 60 * 60 * 24 * 7)) / (1000 * 60 * 60 * 24));

  const relativeTimeParts: string[] = [];

  if (diffWeeks > 0) {
      relativeTimeParts.push(new Intl.RelativeTimeFormat(locale, { numeric: 'auto' }).format(-diffWeeks, 'week'));
  }
  if (diffDays > 0) {
      relativeTimeParts.push(new Intl.RelativeTimeFormat(locale, { numeric: 'auto' }).format(-diffDays, 'day'));
  }
  if (relativeTimeParts.length === 0) {
      relativeTimeParts.push('now');
  }

  let timeString = new Intl.DateTimeFormat(locale, {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
  }).format(date);

  timeString = timeString.replace(/AM|PM/i, (match) => match.toLowerCase());

  return `${relativeTimeParts.join(', ')}, at ${timeString}`;
}


export const cn = (...args: ClassValue[]) => {
  return twMerge(clsx(...args))
}
