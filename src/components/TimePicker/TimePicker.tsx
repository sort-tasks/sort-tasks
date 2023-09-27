import clsx from 'clsx';
import { DateTime } from 'luxon';
import { useEffect } from 'react';
import React, { useMemo, useRef, useState } from 'react';
import { useDetectClickOutside } from 'react-detect-click-outside';
import { usePopper } from 'react-popper';

import { inputClass } from 'components/form/Input';

import { generateTimeOptions, getIs12Hour } from './utils';

interface TimePickerProps {
  onTimeChange: (time: Date | null) => void;
  defaultValue?: Date | null | undefined;
}

export const TimePicker: React.FC<TimePickerProps> = ({ onTimeChange, defaultValue }) => {
  const locale = navigator.language;
  const is12Hour = getIs12Hour(locale);
  const timeOptions = useMemo(() => generateTimeOptions(is12Hour), [is12Hour]);
  const [selectedTime, setSelectedTime] = useState<Date | null>(defaultValue || null);

  useEffect(() => {
    setSelectedTime(defaultValue || null);
  }, [defaultValue]);

  const popperRef = useRef(null);
  const targetRef = useRef(null);
  const parentRef = useDetectClickOutside({
    onTriggered: () => {
      setIsDropdownVisible(false);
    },
  });

  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);
  const { styles, attributes } = usePopper(parentRef.current, popperRef.current, {
    placement: 'bottom-start',
  });

  const handleHourChange = (hour: string) => {
    const time = new Date();
    time.setMinutes(0);

    const newDate = selectedTime ? new Date(selectedTime) : time;
    newDate.setHours(parseInt(hour));
    setSelectedTime(newDate);
    onTimeChange(newDate);
  };

  const handleMinuteChange = (minute: string) => {
    const time = new Date();
    time.setHours(0);
    const newDate = selectedTime ? new Date(selectedTime) : time;
    newDate.setMinutes(parseInt(minute));
    setSelectedTime(newDate);
    onTimeChange(newDate);
  };

  const handlePeriodChange = (period: string) => {
    const newDate = selectedTime ? new Date(selectedTime) : new Date();
    const hour = newDate.getHours();

    if (period === 'AM' && hour >= 12) {
      newDate.setHours(hour - 12);
    } else if (period === 'PM' && hour < 12) {
      newDate.setHours(hour + 12);
    }

    setSelectedTime(newDate);
    onTimeChange(newDate);
  };

  const displayTime = () => {
    if (!selectedTime) return 'Select hour';
    return DateTime.fromJSDate(selectedTime).toLocaleString(DateTime.TIME_SIMPLE);
  };

  return (
    <div className="relative" ref={parentRef}>
      <div className={clsx(inputClass)} onClick={() => setIsDropdownVisible(true)} ref={targetRef}>
        {displayTime()}
      </div>
      <div ref={popperRef} style={{ ...styles.popper, zIndex: 1000 }} {...attributes.popper} className="">
        {isDropdownVisible && (
          <div className="mt-1 inline-flex rounded-md bg-white py-2 shadow">
            <div
              className={clsx('w-20  border-r', {
                'max-h-[420px] overflow-y-scroll': !is12Hour,
              })}
            >
              {timeOptions.hours.map((hour, i) => (
                <div
                  key={i}
                  className="cursor-pointer px-3 py-1 text-center hover:bg-gray-200"
                  onClick={() => handleHourChange(hour)}
                >
                  {hour}
                </div>
              ))}
            </div>
            <div className="w-20 border-r text-center">
              {timeOptions.minutes.map((minute, i) => (
                <div
                  key={i}
                  className="cursor-pointer px-3 py-1 hover:bg-gray-200"
                  onClick={() => handleMinuteChange(minute)}
                >
                  {minute}
                </div>
              ))}
            </div>
            {is12Hour && (
              <div className="w-20 text-center">
                {timeOptions.periods.map((period, i) => (
                  <div
                    key={i}
                    className="cursor-pointer px-3 py-1 hover:bg-gray-200"
                    onClick={() => handlePeriodChange(period)}
                  >
                    {period}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
