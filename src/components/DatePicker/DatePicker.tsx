import { DateTime } from 'luxon';
import { useRef, useState } from 'react';
import { useEffect } from 'react';
import Calendar from 'react-calendar';
import { useDetectClickOutside } from 'react-detect-click-outside';
import { usePopper } from 'react-popper';

import { inputClass } from 'components/form/Input';

import './DatePicker.css';

type DatePickerProps = {
  value: Date | null;
  onDateChange: (date: Date | null) => void;
};

export const DatePicker = ({ value, onDateChange }: DatePickerProps) => {
  const locale = navigator.language;

  const [date, setDate] = useState<Date | null>(value);
  const [isFocused, setIsFocused] = useState(false);

  const popperRef = useRef(null);
  const targetRef = useRef(null);
  const parentRef = useDetectClickOutside({
    onTriggered: () => {
      setIsFocused(false);
    },
  });
  const { styles, attributes } = usePopper(parentRef.current, popperRef.current, {
    placement: 'bottom-start',
  });

  useEffect(() => {
    setDate(value);
  }, [value]);

  const onChange = (date: Date | null | [Date | null, Date | null]) => {
    if (!date) {
      setDate(null);
      onDateChange(null);
    } else if (!Array.isArray(date)) {
      setDate(date);
      onDateChange(date);
    }
    setIsFocused(false);
  };

  return (
    <div className="relative" ref={parentRef}>
      <div role="search" className={inputClass} onClick={() => setIsFocused(true)} ref={targetRef}>
        {date ? DateTime.fromJSDate(date).toLocaleString(DateTime.DATE_SHORT) : 'Select date'}
      </div>
      <div ref={popperRef} style={{ ...styles.popper, zIndex: 1000 }} {...attributes.popper} className="">
        {isFocused && <Calendar onChange={onChange} value={date} locale={locale} />}
      </div>
    </div>
  );
};
