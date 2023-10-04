import clsx from 'clsx';
import { useEffect } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

type ModalWrapperProps = {
  isOpen: boolean;
  children: React.ReactNode;
  onRequestClose?: () => void;
};

export const ModalWrapper = ({ children, isOpen, onRequestClose }: ModalWrapperProps) => {
  const overlayClassName = clsx(
    'fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/20 backdrop-blur-sm',
  );
  const contentClassName = clsx(
    'bg-background mb-10 mt-20 w-full max-w-screen-lg border-y border-on-background/10 outline-none md:mx-4 md:rounded-2xl md:border-x',
  );

  useEffect(() => {
    console.log(isOpen);
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      className={contentClassName}
      overlayClassName={overlayClassName}
      shouldCloseOnOverlayClick
      onRequestClose={onRequestClose}
    >
      {children}
    </Modal>
  );
};
