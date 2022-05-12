import { useCallback, useEffect, useState } from 'react';

import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';

import { INGREDIENTS } from '../../constants';
import { ingredients } from '../../interfaces/ingredients';

const App = () => {
  const [ingredients, setIngredients] = useState<ingredients.ingredient[]>([]);

  useEffect(() => {
    setIngredients(INGREDIENTS);
  }, []);

  const [offset, setOffset] = useState(0);

  const changeOffset = useCallback((offset: number) => {
    setOffset(offset);
  }, []);

  return (
    <>
      <AppHeader changeOffset={changeOffset} />
      <main className="flex container jc-center" style={{ height: `calc(100vh - ${offset}px)`, margin: '0 auto' }}>
        <BurgerIngredients offset={offset} ingredients={ingredients} />
        <BurgerConstructor offset={offset} ingredients={ingredients} />
      </main>
    </>
  );
};

export default App;
