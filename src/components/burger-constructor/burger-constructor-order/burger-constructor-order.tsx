import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect, useState } from 'react';

import OrderDetails from '../../order-details/order-details';

import withModal from '../../../hocs/with-modal';
import { useAppDispatch, useAppSelector } from '../../../hooks/use-store';

import { calculateTotalPrice, resetTotalPrice } from '../../../store/reducers/totalPriceSlice';
import { useCreateOrderMutation } from '../../../store/services/orderDetail';

const BurgerConstructorOrder = () => {
  const [openModal, setOpenModal] = useState(false);
  const { burger, totalPrice } = useAppSelector((state) => ({
    burger: state.burger,
    totalPrice: state.totalPrice.totalPrice
  }));
  const [createOrder, { isLoading, isError, data }] = useCreateOrderMutation();
  const dispatch = useAppDispatch();

  const WithModal = withModal(OrderDetails);

  const handleCreateOrder = async () => {
    const ingredientIds = [burger.bun._id, ...burger.main.map((ingredient) => ingredient._id)];
    await createOrder(ingredientIds);
    console.log(isError, data);
    onOpenModal();
  };

  const onOpenModal = () => {
    setOpenModal(true);
  };

  const onCloseModal = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    dispatch(calculateTotalPrice(burger));
    return () => {
      dispatch(resetTotalPrice());
    };
  }, [burger, dispatch]);

  if (isLoading) {
    return <div className="loading" />;
  }

  return (
    <>
      <div className="mb-10 flex jc-end">
        <div className="mr-10 flex ai-center">
          <p className="text text_type_digits-medium mr-1">{totalPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button type="primary" size="medium" onClick={handleCreateOrder}>
          Оформить заказ
        </Button>
      </div>
      <WithModal openModal={openModal} onClose={onCloseModal} />
    </>
  );
};

export default BurgerConstructorOrder;
