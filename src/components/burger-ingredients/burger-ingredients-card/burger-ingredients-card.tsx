import { memo, useState } from 'react';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientDetails from '../../ingredient-details/ingredient-details';
import burgerIngredientsCardStyles from './burger-ingredients-card.module.scss';
import { ingredients } from '../../../interfaces/ingredients';
import withModal from '../../../hocs/with-modal';

type Props = {
  value: ingredients.ingredient;
  isEven: boolean;
  count?: number;
};

const BurgerIngredientsCard = memo(({ value, isEven, count }: Props) => {
  const [openModal, setOpenModal] = useState(false);
  const WithModal = withModal(IngredientDetails as any);

  const onOpenModal = () => {
    setOpenModal(true);
  };

  const onCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <div
        className={`${burgerIngredientsCardStyles.card} mb-8 ${isEven ? 'pr-2 pl-3' : 'pr-3 pl-4'}`}
        onClick={onOpenModal}
      >
        <div style={{ position: 'relative' }}>
          {count && <Counter count={count} size="default" />}
          <img className="ml-4 mr-4 mb-1" src={value.image} alt={value.name} />
        </div>
        <div className="flex jc-center ai-center mb-1">
          <p className="text text_type_digits-default pr-2">{value.price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <p className="text text_type_main-default flex jc-center ta-center pb-6">{value.name}</p>
      </div>
      <WithModal openModal={openModal} onClose={onCloseModal} header="Детали ингредиента" ingredient={value} />
    </>
  );
});

export default BurgerIngredientsCard;
