import { memo, useEffect } from 'react';
import { CheckMarkIcon, CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import orderDetailsStyles from './order-details.module.scss';
import markOverlay1 from '../../assets/images/markOverlay1.svg';
import markOverlay2 from '../../assets/images/markOverlay2.svg';
import markOverlay3 from '../../assets/images/markOverlay3.svg';
import { order } from '../../interfaces/order';
import { useCreateOrderMutation } from '../../store/services/orderDetail';

const OrderDetails = memo(() => {
  const [createOrder, { data, error, isError, isSuccess }] = useCreateOrderMutation();


  const errorText = () => {
    if (error) {
      if ('status' in error) {
        const errMsg = 'error' in error ? error.error : JSON.stringify(error.data);
        return errMsg;
      } else {
        return `Ошибка ${error.message}`;
      }
    }
  };

  const icon = () => {
    return (
      <div className={`${orderDetailsStyles['check-mark-overlay']} p-relative flex ai-center jc-center mb-15`}>
        <img src={markOverlay1} alt="mark-done" className={`${orderDetailsStyles.image} p-fixed o-7`} />
        <img src={markOverlay2} alt="mark-done" className={`${orderDetailsStyles.image} p-fixed o-3`} />
        <img src={markOverlay3} alt="mark-done" className={`${orderDetailsStyles.image} p-fixed o-3`} />
        <div className={`${orderDetailsStyles['check-mark-overlay__icon']} mt-2`}>
          {isError ? <CloseIcon type="primary" /> : <CheckMarkIcon type="primary" />}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-column ai-center mt-10 mb-15 mr-15 ml-15">
      {isError ? (
        <>
          {icon()}
          <p className="text text_type_main-default mb-2">Возникла ошибка при создании заказа</p>
          <p className="text text_type_main-default text_color_inactive">{errorText()}</p>
        </>
      ) : (
        <>
          <p className={`text text_type_digits-large mb-8 ${orderDetailsStyles.number}`}>{data?.number}</p>
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
