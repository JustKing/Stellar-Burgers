import { memo } from 'react';
import { useDrag } from 'react-dnd';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';

import { useAppDispatch } from '../../../hooks/use-store';
import { removeMain } from '../../../store/reducers/burgerConstructorSlice';

import { ingredients } from '../../../interfaces/ingredients';

import burgerIngredientsCardStyles from './burger-ingredients-card.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';

type Props = {
  value: ingredients.ingredient;
  isEven: boolean;
  count?: number;
};

const BurgerIngredientsCard = memo(({ value, isEven, count }: Props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [, drag] = useDrag(
    {
      type: 'addIngredient',
      item: { value },
      end: (item, monitor) => {
        const didDrop = monitor.didDrop();
        if (!didDrop) {
          dispatch(removeMain(-1));
        }
      }
    },
    [value]
  );

  return (
    <>
      <div
        className={`${burgerIngredientsCardStyles.card} mb-8 ${isEven ? 'pr-2 pl-3' : 'pr-3 pl-4'}`}
        onClick={() => navigate(`ingredients/${value._id}`, { state: { background: location } })}
        ref={drag}
      >
        <div className="p-relative">
          {count && <Counter count={count} size="default" />}
          <img className="ml-4 mr-4 mb-1" src={value.image} alt={value.name} />
        </div>
        <div className="flex jc-center ai-center mb-1">
          <p className="text text_type_digits-default pr-2">{value.price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <p className="text text_type_main-default flex jc-center ta-center pb-6">{value.name}</p>
      </div>
    </>
  );
});

export default BurgerIngredientsCard;
