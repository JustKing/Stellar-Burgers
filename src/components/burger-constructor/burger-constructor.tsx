import { useCallback, useEffect } from 'react';

import BurgerConstructorElement from './burger-constructor-element/burger-constructor-element';
import BurgerConstructorPlug from './burger-constructor-plug/burger-constructor-plug';
import BurgerConstructorOrder from './burger-constructor-order/burger-constructor-order';

import { useAppDispatch, useAppSelector } from '../../hooks/use-store';
import { ingredientsApi } from '../../store/services/ingredients';
import { moveMainIngredient, removeBun, removeMain } from '../../store/reducers/burgerConstructorSlice';

import { ingredients } from '../../interfaces/ingredients';
import burgerConstructorStyles from './burger-constructor.module.scss';
import { useDrop } from 'react-dnd';

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

  const [, drop] = useDrop(() => ({
    accept: 'addIngredient',
    hover(item: any, monitor) {
      console.log(item);
      // const draggedUuid = item.ingredient.uuid;
      // const hoverUuid = item.originalIngredient.uuid;
      // if (item.originalIngredient.type !== 'bun' && draggedUuid && hoverUuid && draggedUuid !== hoverUuid) {
      //   dispatch(moveMainIngredient({ draggedUuid, hoverUuid }));
      // }
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
                    findIngredient(ingredient._id) && (
                      <BurgerConstructorElement
                        uuid={ingredient.uuid}
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
