import { DateTime, Interval } from 'luxon';

export function durationToNow(isoDateTime: string) {
  const pastDateTime = DateTime.fromISO(isoDateTime);
  const currentDateTime = DateTime.now();
  const interval = Interval.fromDateTimes(pastDateTime, currentDateTime);
  const duration = interval.toDuration(['months', 'weeks', 'days', 'hours', 'minutes']);

  const result: string[] = [];

  if (duration.months > 0) {
    result.push(`${duration.months.toFixed(0)} month${parseInt(`${duration.months}`, 10) !== 1 ? 's' : ''}`);
  }

  if (duration.weeks > 0) {
    result.push(`${duration.weeks.toFixed(0)} week${parseInt(`${duration.weeks}`, 10) !== 1 ? 's' : ''}`);
  }

  if (duration.days > 0) {
    result.push(`${duration.days.toFixed(0)} day${parseInt(`${duration.days}`, 10) !== 1 ? 's' : ''}`);
  }

  if (duration.hours > 0) {
    result.push(`${duration.hours.toFixed(0)} hour${parseInt(`${duration.hours}`, 10) !== 1 ? 's' : ''}`);
  }

  if (duration.minutes > 0) {
    result.push(`${duration.minutes.toFixed(0)} minute${parseInt(`${duration.minutes}`, 10) !== 1 ? 's' : ''}`);
  }

  return result.slice(0, 2).join(' and ');
}
