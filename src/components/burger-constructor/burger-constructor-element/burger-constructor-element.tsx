import { memo } from 'react';

import { DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';

type Props = {
  name: string;
  price: number;
  image: string;
  isLocked: boolean;
  type: 'top' | 'bottom' | undefined;
};

const BurgerConstructorElement = memo(({ name, price, image, isLocked, type }: Props) => {
  return (
    <div className={`${isLocked ? (type === 'bottom' ? 'mt-2' : 'mb-2') : ''} flex ai-center`}>
      <span className={`${isLocked ? 'mr-8' : 'mr-2'}`}>{!isLocked && <DragIcon type="primary" />}</span>
      <ConstructorElement type={type} text={name} price={price} thumbnail={image} isLocked={isLocked} />
      <span className={`${isLocked ? 'mr-1' : ''}`}></span>
    </div>
  );
});

export default BurgerConstructorElement;
