import { useCallback, useEffect, useState } from 'react';

import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';

import { ingredients } from '../../interfaces/ingredients';
import { useMemo } from 'react';

const App = () => {
  const [ingredients, setIngredients] = useState<ingredients.ingredient[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch('https://norma.nomoreparties.space/api/ingredients', { method: 'GET' })
      .then((result) => result.json())
      .then((result: { success: boolean; data: ingredients.ingredient[] }) => {
        if (result.success) {
          setIngredients(result.data);
        } else {
          setHasError(true);
        }
      })
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const [offset, setOffset] = useState(0);

  const changeOffset = useCallback((offset: number) => {
    setOffset(offset);
  }, []);

  const burgerStructure = useMemo((): ingredients.burger | null => {
    if (ingredients.length > 0) {
      const buns = ingredients.filter((ingredient) => ingredient.type === 'bun');
      const mainIngredients = ingredients.filter((ingredient) => ingredient.type !== 'bun');
      const mainStructure = [];
      for (let i = 0; i < 10; i++) {
        mainStructure.push(mainIngredients[Math.round(Math.random() * (mainIngredients.length - 1))]._id);
      }
      return {
        topBun: buns[Math.round(Math.random() * (buns.length - 1))]._id,
        main: mainStructure,
        bottomBun: buns[Math.round(Math.random() * (buns.length - 1))]._id
      };
    }
    return null;
  }, [ingredients]);

  return isLoading || hasError ? (
    isLoading ? (
      <div className="loading" />
    ) : (
      <div className="error flex jc-center ai-center" style={{ height: '100vh' }}>
        <p className="text text_type_main-medium">Ошибка :(</p>
      </div>
    )
  ) : (
    <>
      <AppHeader changeOffset={changeOffset} />
      <main className="flex container jc-center" style={{ height: `calc(100vh - ${offset}px)`, margin: '0 auto' }}>
        <BurgerIngredients offset={offset} ingredients={ingredients} burger={burgerStructure} />
        <BurgerConstructor offset={offset} ingredients={ingredients} burger={burgerStructure} />
      </main>
    </>
  );
};

export default App;
