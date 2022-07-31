import { useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';

import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import ModalOverlay from '../overlay';

import withModalStyles from '../modal.module.scss';
import { OrdersDetail } from '../../orders/detail';

const modalRoot = document.getElementById('modal-root') as HTMLElement;

const ModalOrder = () => {
  const navigate = useNavigate();

  const onClose = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.code === 'Escape' || e.key === 'Escape') {
        e.preventDefault();
        onClose();
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
      <div className={`${withModalStyles.modal} pt-10 pb-15 pr-10 pl-10`}>
        <div className="flex jc-space-between ai-center">
          <p className="text text_type_main-large">Детали ингредиента</p>
          <div className="pointer">
            <CloseIcon type="primary" onClick={onClose} />
          </div>
        </div>
        <OrdersDetail />
      </div>
      <ModalOverlay onClose={onClose} />
    </>,
    modalRoot
  );
};

export default ModalOrder;
