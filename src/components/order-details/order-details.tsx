import { memo, useEffect } from 'react';
import { CheckMarkIcon, CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { useCreateOrderMutation } from '../../store/services/orderDetail';
import markOverlay1 from '../../assets/images/markOverlay1.svg';
import markOverlay2 from '../../assets/images/markOverlay2.svg';
import markOverlay3 from '../../assets/images/markOverlay3.svg';
import orderDetailsStyles from './order-details.module.scss';
import { useAppSelector } from '../../hooks/use-store';

const OrderDetails = memo(() => {
  const orderDetail = useAppSelector(state => state.orderDetail.detail);

  const icon = () => {
    return (
      <div className={`${orderDetailsStyles['check-mark-overlay']} p-relative flex ai-center jc-center mb-15`}>
        <img src={markOverlay1} alt="mark-done" className={`${orderDetailsStyles.image} p-fixed o-7`} />
        <img src={markOverlay2} alt="mark-done" className={`${orderDetailsStyles.image} p-fixed o-3`} />
        <img src={markOverlay3} alt="mark-done" className={`${orderDetailsStyles.image} p-fixed o-3`} />
        <div className={`${orderDetailsStyles['check-mark-overlay__icon']} mt-2`}>
          {orderDetail?.error ? <CloseIcon type="primary" /> : <CheckMarkIcon type="primary" />}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-column ai-center mt-10 mb-15 mr-15 ml-15">
      {orderDetail?.error ? (
        <>
          {icon()}
          <p className="text text_type_main-default mb-2">Возникла ошибка при создании заказа</p>
          <p className="text text_type_main-default text_color_inactive">{orderDetail?.error}</p>
        </>
      ) : (
        <>
          <p className={`text text_type_digits-large mb-8 ${orderDetailsStyles.number}`}>{orderDetail.number}</p>
          <p className="text text_type_main-medium mb-15">{'Идентификатор заказа'.toLocaleLowerCase()}</p>
          {icon()}
          <p className="text text_type_main-default mb-2">Ваш заказ начали готовить</p>
          <p className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</p>
        </>
      )}
    </div>
  );
});

export default OrderDetails;
