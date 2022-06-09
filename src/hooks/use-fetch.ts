import { useReducer } from 'react';

import { initialState as orderInitialState, reducer as orderReducer } from '../reducers/orderReducer';
import { BASE_URL } from '../constants';
import { response } from '../interfaces/response';

const useCreateOrder = () => {
  const [order, orderDispatcher] = useReducer(orderReducer, orderInitialState, undefined);

  const handleResult = (result: Response) => {
    if (result.ok) {
      return result.json();
    }
    return Promise.reject(`Ошибка ${result.status}`);
  };

  const createOrder = async (ingredientIds: string[]) => {
    orderDispatcher({ type: 'reset' });
    await fetch(`${BASE_URL}/orders`, {
      method: 'POST',
      body: JSON.stringify({ ingredients: ingredientIds }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((result) => handleResult(result))
      .then((result: response.order) => {
        if (result.success) {
          orderDispatcher({ type: 'set', payload: { name: result.name, number: result.order.number } });
        } else {
          return Promise.reject('Неизвестная ошибка');
        }
      })
      .catch((e) => {
        orderDispatcher({ type: 'set-error', payload: e });
      });
  };

  return {
    order: { state: order, createOrder },
  };
};

export default useCreateOrder;
