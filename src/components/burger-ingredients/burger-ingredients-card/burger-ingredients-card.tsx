import { memo } from 'react';

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredients } from '../../../interfaces/ingredients';

type Props = {
  value: ingredients.ingredient;
  isEven: boolean;
};

const BurgerIngredientsCard = memo(({ value, isEven }: Props) => {
  return (
    <div className={`mb-8 ${isEven ? 'pr-2 pl-3' : 'pr-3 pl-4'}`} style={{ flex: '1 1', textAlign: 'center' }}>
      <img className="ml-4 mr-4 mb-1" src={value.image} alt={value.name} />
      <div className="flex jc-center ai-center mb-1">
        <p className="text text_type_digits-default pr-2">{value.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className="text text_type_main-default flex jc-center ta-center pb-6">{value.name}</p>
    </div>
  );
});

export default BurgerIngredientsCard;
