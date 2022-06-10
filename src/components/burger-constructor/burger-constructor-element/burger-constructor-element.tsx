import { memo, CSSProperties, useMemo } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import { DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';

import { ingredients } from '../../../interfaces/ingredients';
import { useAppDispatch } from '../../../hooks/use-store';
import { moveMainIngredient } from '../../../store/reducers/burgerConstructorSlice';

type Props = {
  ingredient: ingredients.ingredient;
  isLocked: boolean;
  handleClose: () => void;
  type?: 'top' | 'bottom';
  uuid?: string;
  style?: CSSProperties;
};

interface IIngredient {
  ingredient: ingredients.ingredient;
}

const BurgerConstructorElement = memo(({ ingredient, uuid, isLocked, type, style, handleClose }: Props) => {
  const dispatch = useAppDispatch();
  const [, drag] = useDrag(
    {
      type: 'moveIngredient',
      item: { ingredient }
    },
    [ingredient]
  );
  const [handlerUuid, drop] = useDrop({
    accept: 'moveIngredient',
    collect: (monitor) => ((monitor.getItem() as IIngredient)?.ingredient?.uuid),
    hover() {
      if (uuid && handlerUuid && uuid !== handlerUuid) {
        dispatch(moveMainIngredient({ draggedUuid: handlerUuid, hoveredUuid: uuid }));
      }
    }
  });

  const getTitle = useMemo(() => {
    if (type === 'top') {
      return `${ingredient.name} (верх)`;
    }
    if (type === 'bottom') {
      return `${ingredient.name} (низ)`;
    }

    return ingredient.name;
  }, [ingredient, type]);

  const getBunMargin = () => {
    if (isLocked) {
      return type === 'bottom' ? 'mt-2' : 'mb-2';
    }
    return '';
  };

  return (
    <div
      className={`${getBunMargin()} flex ai-center`}
      ref={(node) => (ingredient.type !== 'bun' ? drag(drop(node)) : {})}
      style={{ ...style }}
    >
      <span className={`${isLocked ? 'mr-8' : 'mr-2'}`}>{!isLocked && <DragIcon type="primary" />}</span>
      <ConstructorElement
        type={type}
        text={getTitle}
        price={ingredient.price}
        thumbnail={ingredient.image}
        isLocked={isLocked}
        handleClose={handleClose}
      />
      <span className={`${isLocked ? 'mr-4' : 'mr-2'}`}></span>
    </div>
  );
});

export default BurgerConstructorElement;
