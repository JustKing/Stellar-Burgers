import { useCallback, useEffect } from 'react';

import BurgerConstructorElement from './burger-constructor-element/burger-constructor-element';
import BurgerConstructorPlug from './burger-constructor-plug/burger-constructor-plug';
import BurgerConstructorOrder from './burger-constructor-order/burger-constructor-order';

import { useAppDispatch, useAppSelector } from '../../hooks/use-store';
import { setMain, removeBun, removeMain, setBun } from '../../store/reducers/burgerConstructorSlice';

import { ingredients } from '../../interfaces/ingredients';
import burgerConstructorStyles from './burger-constructor.module.scss';
import { useDrop } from 'react-dnd';

type Props = {
  offset: number;
};

const gap = '10px';

const BurgerConstructor = ({ offset }: Props) => {
  const burger = useAppSelector((state) => state.burger);
  const dispatch = useAppDispatch();

  const handleRemoveBun = useCallback(() => {
    dispatch(removeBun());
  }, [dispatch]);

  const handleRemoveMain = useCallback(
    (id: number) => {
      dispatch(removeMain(id));
    },
    [dispatch]
  );

  const [, drop] = useDrop(() => ({
    accept: 'addIngredient',
    drop(item) {
      const _item = item as { value: ingredients.ingredient };
      if (_item.value.type === 'bun') {
        dispatch(setBun(_item.value));
      } else {
        dispatch(setMain(_item.value));
      }
    }
  }));

  return (
    <div className={`${burgerConstructorStyles.constructor} flex flex-column ml-5 mt-15 pr-4 pl-4`}>
      {burger && (
        <>
          <div className="mb-10 flex flex-column" style={{ height: `calc(100% - ${offset}px - ${gap}` }}>
            {burger.bun ? (
              <BurgerConstructorElement isLocked ingredient={burger.bun} type="top" handleClose={handleRemoveBun} />
            ) : (
              <BurgerConstructorPlug type="top" isLocked />
            )}
            <div className={`${burgerConstructorStyles.structure} flex flex-column`} ref={drop}>
              {burger.main.length > 0 ? (
                burger.main.map(
                  (ingredient, key) =>
                    ingredient && (
                      <BurgerConstructorElement
                        uuid={ingredient?.uuid}
                        isLocked={false}
                        ingredient={ingredient}
                        key={`ingredients-${key}`}
                        handleClose={() => handleRemoveMain(key)}
                      />
                    )
                )
              ) : (
                <BurgerConstructorPlug type="main" isLocked={false} />
              )}
            </div>
            {burger.bun ? (
              <BurgerConstructorElement isLocked ingredient={burger.bun} type="bottom" handleClose={removeBun} />
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
