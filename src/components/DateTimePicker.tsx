import { useEffect, useState } from 'react';

import { DatePicker } from './DatePicker';
import { TimePicker } from './TimePicker';
import { Button } from './form/Button';

type DateTimePickerProps = {
  value: Date | null;
  onChange: (date: Date | null) => void;
};

export const DateTimePicker = ({ onChange, value }: DateTimePickerProps) => {
  const [dueAt, setDueAt] = useState<Date | null>(value);

  useEffect(() => {
    setDueAt(value);
  }, [value]);

  const handleTimeChange = (date: Date | null) => {
    console.log(`handleTimeChange`, date);
    if (!dueAt) {
      setDueAt(date);
      onChange(date);
    } else if (dueAt && date) {
      const newDate = new Date(dueAt);
      newDate.setHours(date.getHours());
      newDate.setMinutes(date.getMinutes());
      setDueAt(newDate);
      onChange(newDate);
    } else if (dueAt && !date) {
      setDueAt(null);
      onChange(null);
    }
  };

  const handleDayChange = (date: Date | null) => {
    if (dueAt && date) {
      const newDate = new Date(dueAt);
      newDate.setFullYear(date.getFullYear());
      newDate.setMonth(date.getMonth());
      newDate.setDate(date.getDate());
      setDueAt(newDate);
      onChange(newDate);
    } else if (dueAt && !date) {
      setDueAt(null);
      onChange(null);
    } else if (!dueAt && date) {
      setDueAt(date);
      onChange(date);
    }
  };

  const handleClean = () => {
    setDueAt(null);
    onChange(null);
  };

  return (
    <div className="flex space-x-2">
      <DatePicker value={dueAt} onDateChange={handleDayChange} />
      <TimePicker defaultValue={dueAt} onTimeChange={handleTimeChange} />
      {dueAt !== null && (
        <Button type="button" onClick={handleClean}>
          X
        </Button>
      )}
    </div>
  );
};
