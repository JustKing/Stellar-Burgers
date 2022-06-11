import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect, useState } from 'react';

import OrderDetails from '../../order-details/order-details';

import withModal from '../../../hocs/with-modal';
import { useAppDispatch, useAppSelector } from '../../../hooks/use-store';

import { calculateTotalPrice, resetTotalPrice } from '../../../store/reducers/totalPriceSlice';
import { useCreateOrderMutation } from '../../../store/services/orderDetail';
import { resetOrderDetail, setOrderDetail, setOrderDetailError } from '../../../store/reducers/orderDetailSlice';
import { resetBurgerConstructor } from '../../../store/reducers/burgerConstructorSlice';

const BurgerConstructorOrder = () => {
  const [openModal, setOpenModal] = useState(false);
  const { burger, totalPrice } = useAppSelector((state) => ({
    burger: state.burger,
    totalPrice: state.totalPrice.totalPrice
  }));
  const [createOrder, { data, isLoading, isError, isSuccess, error }] = useCreateOrderMutation();
  const dispatch = useAppDispatch();

  const WithModal = withModal(OrderDetails);

  useEffect(() => {
    if (isError && error) {
      let errorMessage = '';
      if ('status' in error) {
        errorMessage = 'error' in error ? error.error : JSON.stringify(error.data);
      } else {
        errorMessage = `Ошибка ${error.message}`;
      }
      dispatch(setOrderDetailError(errorMessage));
    }
    if (isSuccess && data) {
      dispatch(setOrderDetail({ name: data.name, number: data.order.number }));
    }
  }, [isError, isLoading, isSuccess, error, data, dispatch]);

  const handleCreateOrder = async () => {
    const ingredientIds = [burger.bun._id, ...burger.main.map((ingredient) => ingredient._id)];
    await createOrder(ingredientIds).then((res) => {
      if ('data' in res) {
        if (res.data.success) {
          dispatch(resetBurgerConstructor());
        }
      }
    });
    onOpenModal();
  };

  const onOpenModal = () => {
    setOpenModal(true);
  };

  const onCloseModal = () => {
    dispatch(resetOrderDetail());
    setOpenModal(false);
  };

  const isDisabled = () => {
    return !(burger.bun._id && burger.main.length > 0);
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
        <Button type="primary" size="medium" onClick={handleCreateOrder} disabled={isDisabled()}>
          Оформить заказ
        </Button>
      </div>
      <WithModal openModal={openModal} onClose={onCloseModal} />
    </>
  );
};

export default BurgerConstructorOrder;
