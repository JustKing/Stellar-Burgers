import { memo } from 'react';

import orderDetailsStyles from './order-details.module.scss';
import markOverlay1 from '../../images/markOverlay1.svg';
import markOverlay2 from '../../images/markOverlay2.svg';
import markOverlay3 from '../../images/markOverlay3.svg';
import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const OrderDetails = memo(() => {
  return (
    <div className="flex ai-center mt-10 mb-15" style={{ flexDirection: 'column' }}>
      <p className={`text text_type_digits-large mb-8 ${orderDetailsStyles['number']}`}>
        {Math.round(Math.random() * 100000 + 10000)}
      </p>
      <p className="text text_type_main-medium mb-15">{'Идентификатор заказа'.toLocaleLowerCase()}</p>
      <div className={`${orderDetailsStyles['check-mark-overlay']} mb-15 flex ai-center jc-center`}>
        <img src={markOverlay1} alt="mark-done" style={{ position: 'absolute', opacity: 0.7 }} />
        <img src={markOverlay2} alt="mark-done" style={{ position: 'absolute', opacity: 0.3 }} />
        <img src={markOverlay3} alt="mark-done" style={{ position: 'absolute', opacity: 0.3 }} />
        <div className={orderDetailsStyles['check-mark-icon']}>
          <CheckMarkIcon type="primary" />
        </div>
      </div>
      <p className="text text_type_main-default mb-2">Ваш заказ начали готовить</p>
      <p className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</p>
    </div>
  );
});

export default OrderDetails;
