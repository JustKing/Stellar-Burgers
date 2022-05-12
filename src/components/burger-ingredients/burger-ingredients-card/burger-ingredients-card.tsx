import { memo, SyntheticEvent, useCallback, useState } from 'react';

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import Modal from '../../modal/modal';
import IngredientDetails from '../../ingredient-details/ingredient-details';

import burgerIngredientsCardStyles from './burger-ingredients-card.module.scss';
import { ingredients } from '../../../interfaces/ingredients';

type Props = {
  value: ingredients.ingredient;
  isEven: boolean;
};

const BurgerIngredientsCard = memo(({ value, isEven }: Props) => {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = useCallback(
    (e: SyntheticEvent<HTMLElement, MouseEvent>) => {
      e.preventDefault();
      setOpenModal(!openModal);
    },
    [openModal]
  );

  return (
    <>
      <div
        className={`${burgerIngredientsCardStyles.card} mb-8 ${isEven ? 'pr-2 pl-3' : 'pr-3 pl-4'}`}
        onClick={handleOpenModal}
      >
        <img className="ml-4 mr-4 mb-1" src={value.image} alt={value.name} />
        <div className="flex jc-center ai-center mb-1">
          <p className="text text_type_digits-default pr-2">{value.price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <p className="text text_type_main-default flex jc-center ta-center pb-6">{value.name}</p>
      </div>
      <div style={{ overflow: 'hidden' }}>
        {openModal && (
          <Modal header="Детали ингредиента" handleOpenModal={handleOpenModal}>
            <IngredientDetails ingredient={value} />
          </Modal>
        )}
      </div>
    </>
  );
});

export default BurgerIngredientsCard;
