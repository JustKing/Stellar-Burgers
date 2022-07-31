import { useCallback } from 'react';
import { useGetOrdersQuery } from '../../../store/services/orders';
import styles from './dashboard-styles.module.scss';

export const CompletedAllTime = ({ anonymous }: { anonymous: boolean }) => {
  const { currentData = [] } = useGetOrdersQuery(anonymous);

  const total = useCallback(() => {
    return currentData[currentData.length - 1]?.total;
  }, [currentData]);

  return (
    <div className="mb-15">
      <p className="text text_type_main-medium">Выполнено за все время:</p>
      <p className={`${styles['number-shadow']} text text_type_digits-large`}>{total()}</p>
    </div>
  );
};
