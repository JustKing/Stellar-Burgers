import { useCallback, useEffect, useState } from 'react';

import { BurgerContext, IngredientsContext } from '../../services/burgerContext';

import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';

import appStyles from './app.module.scss';
import useCreateOrder from '../../hooks/use-fetch';

const App = () => {
  const [offset, setOffset] = useState(0);
  const { ingredients, burger } = useCreateOrder();

  useEffect(() => {
    ingredients.getIngredients();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const changeOffset = useCallback((offset: number) => {
    setOffset(offset);
  }, []);

  return ingredients.state.loading || ingredients.state.error ? (
    ingredients.state.loading ? (
      <div className="loading" />
    ) : (
      <div className={`${appStyles.error} flex jc-center ai-center`}>
        <p className="text text_type_main-medium">{ingredients.state.error}</p>
      </div>
    )
  ) : (
    <>
      <AppHeader changeOffset={changeOffset} />
      <main className="flex container jc-center" style={{ height: `calc(100vh - ${offset}px)` }}>
        <IngredientsContext.Provider
          value={{
            ingredients: ingredients.state,
            ingredientsDispatcher: ingredients.ingredientsDispatcher
          }}
        >
          <BurgerContext.Provider value={{ burger: burger.state, burgerDispatcher: burger.burgerDispatcher }}>
            <BurgerIngredients offset={offset} />
            <BurgerConstructor offset={offset} />
          </BurgerContext.Provider>
        </IngredientsContext.Provider>
      </main>
    </>
  );
};

export default App;
