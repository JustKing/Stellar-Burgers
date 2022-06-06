import { useReducer } from 'react';

import { initialState as orderInitialState, reducer as orderReducer } from '../reducers/orderReducer';
import { initialState as ingredientsInitialState, reducer as ingredientsReducer } from '../reducers/ingredietsReducer';
import { initialState as burgerInitialState, reducer as burgerReducer } from '../reducers/burgerReducer';

import { BASE_URL } from '../constants';

import { response } from '../interfaces/response';
import { ingredients } from '../interfaces/ingredients';

const useCreateOrder = () => {
  const [order, orderDispatcher] = useReducer(orderReducer, orderInitialState, undefined);
  const [ingredients, ingredientsDispatcher] = useReducer(ingredientsReducer, ingredientsInitialState, undefined);
  const [burger, burgerDispatcher] = useReducer(burgerReducer, burgerInitialState, undefined);

  const handleResult = (result: Response) => {
    if (result.ok) {
      return result.json();
    }
    return Promise.reject(`Ошибка ${result.status}`);
  };

  const getIngredients = () => {
    ingredientsDispatcher({ type: 'loading', payload: true });
    fetch(`${BASE_URL}/ingredients`, { method: 'GET' })
      .then((result) => handleResult(result))
      .then((result: { success: boolean; data: ingredients.ingredient[] }) => {
        if (result.success) {
          ingredientsDispatcher({ type: 'set-ingredients', payload: result.data });
          if (result.data.length > 0) {
            const buns = result.data.filter((ingredient) => ingredient.type === 'bun');
            const mainIngredients = result.data.filter((ingredient) => ingredient.type !== 'bun');
            for (let i = 0; i < 10; i++) {
              const ingredient = mainIngredients[Math.round(Math.random() * (mainIngredients.length - 1))];
              burgerDispatcher({ type: 'set-main', payload: ingredient });
            }
            const bun = result.data[Math.round(Math.random() * (buns.length - 1))];
            burgerDispatcher({ type: 'set-bun', payload: bun });
          } else {
            return Promise.reject('Неизвестная ошибка');
          }
        }
      })
      .catch((e: string) => {
        ingredientsDispatcher({ type: 'set-error', payload: e });
      })
      .finally(() => ingredientsDispatcher({ type: 'loading', payload: false }));
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
    ingredients: { state: ingredients, getIngredients, ingredientsDispatcher },
    burger: { state: burger, burgerDispatcher }
  };
};

export default useCreateOrder;
