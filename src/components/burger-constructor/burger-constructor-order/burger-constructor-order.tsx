import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';

import withModal from '../../../hocs/with-modal';
import OrderDetails from '../../order-details/order-details';

const BurgerConstructorOrder = ({ total }: { total: number }) => {
  const [openModal, setOpenModal] = useState(false);
  const WithModal = withModal(OrderDetails);

  const onOpenModal = () => {
    setOpenModal(true);
  };

  const onCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <div className="mb-10 flex jc-end">
        <div className="mr-10 flex ai-center">
          <p className="text text_type_digits-medium mr-1">{total}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button type="primary" size="medium" onClick={onOpenModal}>
          Оформить заказ
        </Button>
      </div>
      <WithModal openModal={openModal} onClose={onCloseModal} />
    </>
  );
};

export default BurgerConstructorOrder;
