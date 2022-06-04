import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useContext, useEffect, useReducer, useState } from 'react';
import { BurgerContext } from '../../../services/burgerContext';

import withModal from '../../../hocs/with-modal';
import OrderDetails from '../../order-details/order-details';

import {
  initialState as totalPriceInitialState,
  reducer as totalPriceReducer
} from '../../../reducers/totalPriceReducer';
import { initialState as orderInitialState, reducer as orderReducer } from '../../../reducers/orderReducer';

import { response } from '../../../interfaces/response';

const BurgerConstructorOrder = () => {
  const [openModal, setOpenModal] = useState(false);
  const { burger } = useContext(BurgerContext);
  const [totalPrice, totalPriceDispatcher] = useReducer(totalPriceReducer, totalPriceInitialState, undefined);
  const [order, orderDispatcher] = useReducer(orderReducer, orderInitialState, undefined);

  const WithModal = withModal(OrderDetails);

  const createOrder = () => {
    const ingredientIds = [burger.bun._id, ...burger.main.map((ingredient) => ingredient._id)];
    orderDispatcher({ type: 'reset' });
    fetch('https://norma.nomoreparties.space/api/orders', {
      method: 'POST',
      body: JSON.stringify({ ingredients: ingredientIds }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((result) => {
        if (result.ok) {
          return result.json();
        }
        return Promise.reject(`Ошибка ${result.status}`);
      })
      .then((result: response.order) => {
        if (result.success) {
          orderDispatcher({ type: 'set', payload: { name: result.name, number: result.order.number } });
        } else {
          return Promise.reject('Неизвестная ошибка');
        }
      })
      .catch((e) => {
        orderDispatcher({ type: 'set-error', payload: e });
      })
      .finally(() => {
        onOpenModal();
      });
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
        <Button type="primary" size="medium" onClick={createOrder}>
          Оформить заказ
        </Button>
      </div>
      <WithModal openModal={openModal} order={order} onClose={onCloseModal} />
    </>
  );
};

export default BurgerConstructorOrder;
