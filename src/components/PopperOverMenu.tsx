import React, { cloneElement, useRef } from 'react';
import { useDetectClickOutside } from 'react-detect-click-outside';
import { usePopper } from 'react-popper';

interface PopperMenuProps {
  children: React.ReactElement;
  dropdown: React.ReactNode;
  onClickOutside: () => void;
}

export const PopperOverMenu: React.FC<PopperMenuProps> = ({ children, dropdown, onClickOutside }) => {
  const popperRef = useRef(null);
  const targetRef = useRef(null);
  const parentRef = useDetectClickOutside({
    onTriggered: () => {
      onClickOutside();
    },
  });

  const { styles, attributes } = usePopper(parentRef.current, popperRef.current, {
    placement: 'bottom-start',
  });

  const triggerProps = {
    ref: targetRef,
  };

  return (
    <div className="relative" ref={parentRef}>
      {cloneElement(children, triggerProps)}
      <div ref={popperRef} style={{ ...styles.popper, zIndex: 1000 }} {...attributes.popper} className="">
        {dropdown}
      </div>
    </div>
  );
};
