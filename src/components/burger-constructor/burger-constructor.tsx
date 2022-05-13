import { useCallback, useMemo } from 'react';

import BurgerConstructorElement from './burger-constructor-element/burger-constructor-element';
import BurgerConstructorOrder from './burger-constructor-order/burger-constructor-order';

import burgerConstructorStyles from './burger-constructor.module.scss';

import { ingredients } from '../../interfaces/ingredients';

type Props = {
  ingredients: ingredients.ingredient[];
  burger: ingredients.burger | null;
  offset: number;
};

const gap = '10px';

const BurgerConstructor = ({ ingredients, burger, offset }: Props) => {
  const findIngredient = useCallback(
    (id: string) => {
      return ingredients.find((ingredient) => ingredient._id === id) as ingredients.ingredient;
    },
    [ingredients]
  );

  const totalPrice = useMemo(() => {
    if (burger) {
      const mainPrice = burger.main.reduce((acc, ingredientId) => acc + findIngredient(ingredientId).price, 0);
      return mainPrice + findIngredient(burger.topBun).price + findIngredient(burger.bottomBun).price;
    }
    return 0;
  }, [burger, findIngredient]);

  return (
    <div style={{ flexDirection: 'column', width: '600px' }} className="flex ml-5 mt-15 pr-4 pl-4">
      {burger && (
        <>
          <div className="mb-10 flex" style={{ flexDirection: 'column', height: `calc(100% - ${offset}px - ${gap}` }}>
            <BurgerConstructorElement isLocked ingredient={findIngredient(burger.topBun)} type="top" />
            <div style={{ flexDirection: 'column', gap: gap }} className={burgerConstructorStyles.structure}>
              {burger.main.map((ingredientId, key) => (
                <BurgerConstructorElement
                  isLocked={false}
                  ingredient={findIngredient(ingredientId)}
                  key={`ingredients-${key}`}
                />
              ))}
            </div>
            <BurgerConstructorElement
              isLocked
              ingredient={findIngredient(burger.bottomBun)}
              type="bottom"
              style={{ marginTop: '10px' }}
            />
          </div>
          <BurgerConstructorOrder total={totalPrice} />
        </>
      )}
    </div>
  );
};

export default BurgerConstructor;
