import { useCallback } from 'react';
import { useGetOrdersQuery } from '../../../store/services/orders';
import styles from './dashboard-styles.module.scss';

export const CompletedToday = ({ anonymous }: { anonymous: boolean }) => {
  const { currentData = [] } = useGetOrdersQuery({ anonymous, url: 'all' });

  const totalToday = useCallback(() => {
    return currentData[currentData.length - 1]?.totalToday;
  }, [currentData]);

  return (
    <div>
      <p className="text text_type_main-medium">Выполнено за сегодня:</p>
      <p className={`${styles['number-shadow']} text text_type_digits-large`}>{totalToday()}</p>
    </div>
  );
};
