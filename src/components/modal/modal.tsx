import { useCallback, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import ModalOverlay from '../modal-overlay/modal-overlay';

import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import useModalStyles from './modal.module.scss';

type Props = {
  children: JSX.Element;
  header?: string;
  onClose: any;
};

const modalRoot = document.getElementById('modal-root') as HTMLElement;

const Modal = ({ children, header, onClose }: Props) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (modalRef.current) {
      const height = (modalRef.current.clientHeight || 0);
      const width = (modalRef.current.clientWidth || 0);
      modalRef.current.style.top = `calc((100% - ${height}px) / 2)`;
      modalRef.current.style.left = `calc((100% - ${width}px) / 2)`;
    }
  }, [children]);

  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.code === 'Escape' || e.key === 'Escape') {
        e.preventDefault();
        onClose(e);
      }
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [handleEscape]);

  return createPortal(
    <>
      <div className={`${useModalStyles.modal} pt-10 pb-15 pr-10 pl-10`} ref={modalRef}>
        <div className="flex jc-space-between ai-center">
          <p className="text text_type_main-large">{header || ''}</p>
          <div style={{ cursor: 'pointer' }}>
            <CloseIcon type="primary" onClick={onClose} />
          </div>
        </div>
        {children}
      </div>
      <ModalOverlay onClose={onClose} />
    </>,
    modalRoot
  );
};

export default Modal;
