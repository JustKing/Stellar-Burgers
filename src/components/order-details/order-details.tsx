import { memo } from 'react';
import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import orderDetailsStyles from './order-details.module.scss';
import markOverlay1 from '../../assets/images/markOverlay1.svg';
import markOverlay2 from '../../assets/images/markOverlay2.svg';
import markOverlay3 from '../../assets/images/markOverlay3.svg';
import { order } from '../../interfaces/order';

type Props = {
  order?: order.order;
};

const OrderDetails = memo(({ order }: Props) => {
  return (
    <div className="flex flex-column ai-center mt-10 mb-15 mr-15 ml-15">
      {order?.error ? (
        <>
          <p className="text text_type_main-default mb-2">Возникла ошибка при создании заказа</p>
          <p className="text text_type_main-default text_color_inactive">{order.error}</p>
        </>
      ) : (
        <>
          <p className={`text text_type_digits-large mb-8 ${orderDetailsStyles.number}`}>{order?.number}</p>
          <p className="text text_type_main-medium mb-15">{'Идентификатор заказа'.toLocaleLowerCase()}</p>
          <div className={`${orderDetailsStyles['check-mark-overlay']} p-relative flex ai-center jc-center mb-15`}>
            <img src={markOverlay1} alt="mark-done" className={`${orderDetailsStyles.image} p-fixed o-7`} />
            <img src={markOverlay2} alt="mark-done" className={`${orderDetailsStyles.image} p-fixed o-3`} />
            <img src={markOverlay3} alt="mark-done" className={`${orderDetailsStyles.image} p-fixed o-3`} />
            <div className={orderDetailsStyles['check-mark-overlay__icon']}>
              <CheckMarkIcon type="primary" />
            </div>
          </div>
          <p className="text text_type_main-default mb-2">Ваш заказ начали готовить</p>
          <p className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</p>
        </>
      )}
    </div>
  );
});

export default OrderDetails;
