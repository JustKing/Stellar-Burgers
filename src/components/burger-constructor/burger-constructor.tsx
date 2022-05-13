import { useMemo } from 'react';

import BurgerConstructorElement from './burger-constructor-element/burger-constructor-element';
import BurgerConstructorOrder from './burger-constructor-order/burger-constructor-order';

import burgerConstructorStyles from './burger-constructor.module.scss';

import { ingredients } from '../../interfaces/ingredients';

interface burgerStructure {
  topBun: ingredients.ingredient;
  main: ingredients.ingredient[];
  bottomBun: ingredients.ingredient;
}

type Props = {
  ingredients: ingredients.ingredient[];
  offset: number;
};

const gap = '10px';

const BurgerConstructor = ({ ingredients, offset }: Props) => {
  const burgerStructure = useMemo((): burgerStructure | null => {
    if (ingredients.length > 0) {
      const buns = ingredients.filter((ingredient) => ingredient.type === 'bun');
      const mainIngredients = ingredients.filter((ingredient) => ingredient.type !== 'bun');
      const mainStructure = [];
      for (let i = 0; i < 10; i++) {
        mainStructure.push(mainIngredients[Math.round(Math.random() * (mainIngredients.length - 1))]);
      }
      return {
        topBun: buns[Math.round(Math.random() * (buns.length - 1))],
        main: mainStructure,
        bottomBun: buns[Math.round(Math.random() * (buns.length - 1))]
      };
    }
    return null;
  }, [ingredients]);

  const totalPrice = useMemo(() => {
    if (burgerStructure) {
      const mainPrice = burgerStructure.main.reduce((acc, ingredient) => acc + ingredient.price, 0);
      return mainPrice + burgerStructure.topBun.price + burgerStructure.bottomBun.price;
    }
    return 0;
  }, [burgerStructure]);

  return (
    <div style={{ flexDirection: 'column', width: '600px' }} className="flex ml-5 mt-15 pr-4 pl-4">
      {burgerStructure && (
        <>
          <div className="mb-10 flex" style={{ flexDirection: 'column', height: `calc(100% - ${offset}px - ${gap}` }}>
            <BurgerConstructorElement isLocked ingredient={burgerStructure.topBun} type="top" />
            <div style={{ flexDirection: 'column', gap: gap }} className={burgerConstructorStyles.structure}>
              {burgerStructure.main.map((ingredient, key) => (
                <BurgerConstructorElement isLocked={false} ingredient={ingredient} key={`ingredients-${key}`} />
              ))}
            </div>
            <BurgerConstructorElement
              isLocked
              ingredient={burgerStructure.bottomBun}
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
