import { useCallback } from 'react';
import { useGetOrdersQuery } from '../../../store/services/orders';
import { Order } from './order';

export const OrdersList = ({ anonymous, needStatus }: { anonymous: boolean; needStatus: boolean }) => {
  const { currentData = [] } = useGetOrdersQuery({ anonymous, url: 'all' });

  const orders = useCallback(() => currentData[currentData.length - 1]?.orders, [currentData]);

  return (
    <div className="scroll mr-10 pr-5">
      {orders()?.map((order, key) => (
        <Order order={order} key={key} needStatus={needStatus} />
      ))}
    </div>
  );
};
