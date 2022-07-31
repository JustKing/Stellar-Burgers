import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ONE_DAY, STATUSES } from '../../../../constants';
import { order } from '../../../../interfaces/order';
import { useFetchAllIngredientsQuery } from '../../../../store/services/ingredients';
import styles from './order.module.scss';

export const Order = ({ order, needStatus }: { order: order.orderInList; needStatus: boolean }) => {
  const { data = [] } = useFetchAllIngredientsQuery([]);
  const navigate = useNavigate();
  const location = useLocation();

  const createdAt = useCallback(() => {
    const createdDate = new Date(order.createdAt);
    const createdMilliseconds = createdDate.getTime();
    const currentMilliseconds = new Date().setHours(23, 59, 59);
    const diffDays = (currentMilliseconds - createdMilliseconds) / ONE_DAY;
    if (diffDays <= 1) {
      return `Сегодня, ${createdDate.toLocaleTimeString()}, i-GMT${createdDate.getTimezoneOffset() / 60}`;
    } else if (diffDays <= 2) {
      return `Вчера, ${createdDate.toLocaleTimeString()}, i-GMT${createdDate.getTimezoneOffset() / 60}`;
    } else {
      const count = Math.ceil(diffDays);
      const endingNumber = count.toString().split('').reverse()[0];
      const ending = endingNumber === '1' ? 'день' : endingNumber > '1' && endingNumber < '5' ? 'дня' : 'дней';
      return `${count} ${ending} назад, ${createdDate.toLocaleTimeString()}, i-GMT${
        createdDate.getTimezoneOffset() / 60
      }`;
    }
  }, [order.createdAt]);

  const orderIngredients = useCallback(() => {
    return order.ingredients?.map(
      (ingredientId: string) => data.find((ingredient) => ingredient._id === ingredientId) || null
    );
  }, [data, order.ingredients]);

  const totalCount = useCallback(
    () => orderIngredients().reduce((acc, ingredient) => acc + (ingredient?.price || 0), 0),
    [orderIngredients]
  );

  return (
    <div
      className={`${styles.container} p-6 ai-left`}
      onClick={() => navigate(`${order.number}`, { state: { background: location } })}
    >
      <div className="flex jc-space-between pb-6">
        <p className="text text_type_digits-default">#{order.number}</p>
        <p className="text text_type_main-default text_color_inactive">{createdAt()}</p>
      </div>
      <div className={`${needStatus ? 'pb-2' : 'pb-6'}`}>
        <p className="text text_type_main-medium">{order.name}</p>
      </div>
      {needStatus && (
        <div className="pb-6">
          <p className="text text_type_main-small">{STATUSES[order.status]}</p>
        </div>
      )}
      <div className={styles['order-info-wrapper']}>
        <div className={styles.total}>
          <p className="text text_type_digits-default pr-2">{totalCount()}</p>
          <CurrencyIcon type="primary" />
        </div>
        <div className={styles['images-wrapper']}>
          {orderIngredients().map(
            (ingredient, key) =>
              ingredient && (
                <img className={styles.ingredient} src={ingredient.image_mobile} alt={ingredient.name} key={key} />
              )
          )}
        </div>
      </div>
    </div>
  );
};
