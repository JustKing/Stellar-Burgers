import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useContext, useEffect, useReducer, useState } from 'react';
import { BurgerContext } from '../../../services/burgerContext';

import withModal from '../../../hocs/with-modal';
import OrderDetails from '../../order-details/order-details';

import {
  initialState as totalPriceInitialState,
  reducer as totalPriceReducer
} from '../../../reducers/totalPriceReducer';

import useCreateOrder from '../../../hooks/use-fetch';

const BurgerConstructorOrder = () => {
  const [openModal, setOpenModal] = useState(false);
  const { burger } = useContext(BurgerContext);
  const { order } = useCreateOrder();
  const [totalPrice, totalPriceDispatcher] = useReducer(totalPriceReducer, totalPriceInitialState, undefined);

  const WithModal = withModal(OrderDetails);

  const handleCreateOrder = async () => {
    const ingredientIds = [burger.bun._id, ...burger.main.map((ingredient) => ingredient._id)];
    await order.createOrder(ingredientIds);
    onOpenModal();
  };

  const onOpenModal = () => {
    setOpenModal(true);
  };

  const onCloseModal = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    totalPriceDispatcher({ type: 'get', payload: burger });
  }, [burger]);

  return (
    <>
      <div className="mb-10 flex jc-end">
        <div className="mr-10 flex ai-center">
          <p className="text text_type_digits-medium mr-1">{totalPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button type="primary" size="medium" onClick={handleCreateOrder}>
          Оформить заказ
        </Button>
      </div>
      <WithModal openModal={openModal} order={order.state} onClose={onCloseModal} />
    </>
  );
};

export default BurgerConstructorOrder;
