export const getIs12Hour = (locale: string): boolean => {
  const midnight = new Date();
  midnight.setHours(0, 0, 0, 0);
  const formatted = new Intl.DateTimeFormat(locale, { hour: '2-digit', minute: '2-digit' }).format(midnight);
  return formatted.includes('AM') || formatted.includes('PM');
};

export const generateTimeOptions = (is12Hour: boolean): { hours: string[]; minutes: string[]; periods: string[] } => {
  const hours: string[] = [];
  const minutes: string[] = [];

  const startHour = is12Hour ? 1 : 0;
  const endHour = is12Hour ? 12 : 23;

  for (let i = startHour; i <= endHour; i++) {
    hours.push(i.toString().padStart(2, '0'));
  }

  for (let j = 0; j < 60; j += 5) {
    minutes.push(j.toString().padStart(2, '0'));
  }

  return {
    hours,
    minutes,
    periods: is12Hour ? ['AM', 'PM'] : [],
  };
};
