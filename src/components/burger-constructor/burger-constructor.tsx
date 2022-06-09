import { useCallback } from 'react';

import BurgerConstructorElement from './burger-constructor-element/burger-constructor-element';
import BurgerConstructorPlug from './burger-constructor-plug/burger-constructor-plug';
import BurgerConstructorOrder from './burger-constructor-order/burger-constructor-order';

import { useAppDispatch, useAppSelector } from '../../hooks/use-store';
import { ingredientsApi } from '../../store/services/ingredients';
import { removeBun, removeMain } from '../../store/reducers/burgerConstructor';

import { ingredients } from '../../interfaces/ingredients';
import burgerConstructorStyles from './burger-constructor.module.scss';

type Props = {
  offset: number;
};

const gap = '10px';

const BurgerConstructor = ({ offset }: Props) => {
  const { currentData = [] } = ingredientsApi.useFetchAllIngredientsQuery([]);
  const burger = useAppSelector((state) => state.burger);
  const dispatch = useAppDispatch();

  const findIngredient = useCallback(
    (id: string) => {
      return currentData?.find((ingredient) => ingredient._id === id) as ingredients.ingredient;
    },
    [currentData]
  );

  const handleRemoveBun = useCallback(() => {
    dispatch(removeBun());
  }, [dispatch]);

  const handleRemoveMain = useCallback(
    (id: number) => {
      dispatch(removeMain(id));
    },
    [dispatch]
  );

  return (
    <div className={`${burgerConstructorStyles.constructor} flex flex-column ml-5 mt-15 pr-4 pl-4`}>
      {burger && (
        <>
          <div className="mb-10 flex flex-column" style={{ height: `calc(100% - ${offset}px - ${gap}` }}>
            {findIngredient(burger.bun._id) ? (
              <BurgerConstructorElement
                isLocked
                ingredient={findIngredient(burger.bun._id)}
                type="top"
                handleClose={handleRemoveBun}
              />
            ) : (
              <BurgerConstructorPlug type="top" isLocked />
            )}
            <div className={`${burgerConstructorStyles.structure} flex flex-column`}>
              {burger.main.length > 0 ? (
                burger.main.map(
                  (ingredient, key) =>
                    findIngredient(ingredient._id) && (
                      <BurgerConstructorElement
                        isLocked={false}
                        ingredient={findIngredient(ingredient._id)}
                        key={`ingredients-${key}`}
                        handleClose={() => handleRemoveMain(key)}
                      />
                    )
                )
              ) : (
                <BurgerConstructorPlug type="main" isLocked={false} />
              )}
            </div>
            {findIngredient(burger.bun._id) ? (
              <BurgerConstructorElement
                isLocked
                ingredient={findIngredient(burger.bun._id)}
                type="bottom"
                handleClose={removeBun}
              />
            ) : (
              <BurgerConstructorPlug type="bottom" isLocked />
            )}
          </div>
          <BurgerConstructorOrder />
        </>
      )}
    </div>
  );
};

export default BurgerConstructor;
