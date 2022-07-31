import { OrdersList } from '../../components/orders/list';
import { OrdersDashboard } from '../../components/orders/dashboard';
import { useGetOrdersQuery } from '../../store/services/orders';
import styles from './feed.module.scss';
import { useEffect } from 'react';
import { useAppDispatch } from '../../hooks/use-store';
import { setIsCenter } from '../../store/reducers/baseSlice';

export const Feed = () => {
  // socket connection
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data = [] } = useGetOrdersQuery({ anonymous: true, url: 'all' });
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setIsCenter(true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <p className="text text_type_main-large mb-5">Лента заказов</p>
      <div className={`${styles.feed} flex`}>
        <OrdersList anonymous needStatus={false} />
        <OrdersDashboard anonymous />
      </div>
    </div>
  );
};
