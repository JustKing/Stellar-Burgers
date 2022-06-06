import { memo, CSSProperties, useMemo } from 'react';

import { DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';

import { ingredients } from '../../../interfaces/ingredients';

type Props = {
  ingredient: ingredients.ingredient;
  isLocked: boolean;
  handleClose: () => void;
  type?: 'top' | 'bottom';
  style?: CSSProperties;
};

const BurgerConstructorElement = memo(({ ingredient, isLocked, type, style, handleClose }: Props) => {
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
    <div className={`${getBunMargin()} flex ai-center`} style={style}>
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
