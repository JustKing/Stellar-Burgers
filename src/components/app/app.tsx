import { useCallback, useEffect, useState, useReducer } from 'react';

import { BurgerContext, IngredientsContext } from '../../services/burgerContext';
import {
  initialState as ingredientsInitialState,
  reducer as ingredientsReducer
} from '../../reducers/ingredietsReducer';
import { initialState as burgerInitialState, reducer as burgerReducer } from '../../reducers/burgerReducer';

import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';

import { ingredients } from '../../interfaces/ingredients';

import appStyles from './app.module.scss';

const App = () => {
  const [ingredients, ingredientsDispatcher] = useReducer(ingredientsReducer, ingredientsInitialState, undefined);
  const [burger, burgerDispatcher] = useReducer(burgerReducer, burgerInitialState, undefined);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    fetch('https://norma.nomoreparties.space/api/ingredients', { method: 'GET' })
      .then((result) => {
        if (result.ok) {
          return result.json();
        }
        return Promise.reject(`Ошибка ${result.status}`);
      })
      .then((result: { success: boolean; data: ingredients.ingredient[] }) => {
        if (result.success) {
          ingredientsDispatcher({ type: 'set', payload: result.data });
          if (result.data.length > 0) {
            const buns = result.data.filter((ingredient) => ingredient.type === 'bun');
            const mainIngredients = result.data.filter((ingredient) => ingredient.type !== 'bun');
            for (let i = 0; i < 10; i++) {
              const ingredient = mainIngredients[Math.round(Math.random() * (mainIngredients.length - 1))];
              burgerDispatcher({ type: 'set-main', payload: ingredient });
            }
            const bun = result.data[Math.round(Math.random() * (buns.length - 1))];
            burgerDispatcher({ type: 'set-bun', payload: bun });
          }
          setError('');
        } else {
          return Promise.reject('Неизвестная ошибка');
        }
      })
      .catch((e) => {
        setError(e);
      })
      .finally(() => setLoading(false));
  }, []);

  const changeOffset = useCallback((offset: number) => {
    setOffset(offset);
  }, []);

  return loading || error ? (
    loading ? (
      <div className="loading" />
    ) : (
      <div className={`${appStyles.error} flex jc-center ai-center`}>
        <p className="text text_type_main-medium">{error}</p>
      </div>
    )
  ) : (
    <>
      <AppHeader changeOffset={changeOffset} />
      <main className="flex container jc-center" style={{ height: `calc(100vh - ${offset}px)` }}>
        <IngredientsContext.Provider value={{ ingredients, ingredientsDispatcher }}>
          <BurgerContext.Provider value={{ burger, burgerDispatcher }}>
            <BurgerIngredients offset={offset} />
            <BurgerConstructor offset={offset} />
          </BurgerContext.Provider>
        </IngredientsContext.Provider>
      </main>
    </>
  );
};

export default App;
