import { MouseEvent as ReactMouseEvent, MouseEventHandler, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';

import ModalOverlay from '../modal-overlay/modal-overlay';

import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import withModalStyles from './modal.module.scss';

type TIconEvent = () => void;
type TKeyboardEvent = (e: KeyboardEvent) => void;
type TOverlayEvent = MouseEventHandler<HTMLDivElement>;

type Props = {
  children: JSX.Element;
  header?: string;
  onClose: TIconEvent | TKeyboardEvent | TOverlayEvent;
};

const modalRoot = document.getElementById('modal-root') as HTMLElement;

const Modal = ({ children, header, onClose }: Props) => {
  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.code === 'Escape' || e.key === 'Escape') {
        e.preventDefault();
        (onClose as TKeyboardEvent)(e);
      }
    },
    [onClose]
  );

  const handleOverlay = (e: ReactMouseEvent<HTMLDivElement, MouseEvent>) => {
    (onClose as TOverlayEvent)(e);
  };

  const handleIcon = () => {
    (onClose as TIconEvent)();
  };

  useEffect(() => {
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [handleEscape]);

  return createPortal(
    <>
      <div className={`${withModalStyles.modal} pt-10 pb-15 pr-10 pl-10`}>
        <div className="flex jc-space-between ai-center">
          <p className="text text_type_main-large">{header || ''}</p>
          <div className="pointer">
            <CloseIcon type="primary" onClick={handleIcon} />
          </div>
        </div>
        {children}
      </div>
      <ModalOverlay onClose={handleOverlay} />
    </>,
    modalRoot
  );
};

export default Modal;
