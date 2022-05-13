import { MouseEventHandler, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';

import ModalOverlay from '../modal-overlay/modal-overlay';

import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import useModalStyles from './modal.module.scss';

type Props = {
  children: JSX.Element;
  header?: string;
  handleOpenModal: MouseEventHandler<HTMLElement>;
};

const modalRoot = document.getElementById('modal-root') as HTMLElement;

const Modal = ({ children, header, handleOpenModal }: Props) => {
  const handleClose = useCallback(
    (e: any) => {
      handleOpenModal(e);
    },
    [handleOpenModal]
  );

  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.code === 'Escape' || e.key === 'Escape') {
        e.preventDefault();
        handleClose(e);
      }
    },
    [handleClose]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [handleEscape]);

  return createPortal(
    <ModalOverlay handleClose={handleOpenModal}>
      <div className={`${useModalStyles.modal} pt-10 pb-15 pr-10 pl-10`}>
        <div className="flex jc-space-between ai-center">
          {header && <p className="text text_type_main-large">{header}</p>}
          <div style={{ cursor: 'pointer' }}>
            <CloseIcon type="primary" onClick={() => handleClose} />
          </div>
        </div>
        {children}
      </div>
    </ModalOverlay>,
    modalRoot
  );
};

export default Modal;
