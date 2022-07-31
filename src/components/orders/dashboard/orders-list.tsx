import { useCallback } from 'react';
import { order } from '../../../interfaces/order';
import { useGetOrdersQuery } from '../../../store/services/orders';
import styles from './dashboard-styles.module.scss';

export const OrdersList = ({ status, anonymous }: { status: order.statusTypes; anonymous: boolean }) => {
  const { currentData = [] } = useGetOrdersQuery({ anonymous, url: 'all' });

  const ordersByStatus = useCallback(
    () => currentData[currentData.length - 1]?.orders.filter((order) => order.status === status),
    [currentData, status]
  );

  const columnsCount = useCallback(() => Math.floor(ordersByStatus()?.length / 5) || 0, [ordersByStatus]);
  const rowsCount = useCallback(() => Array(Math.floor(columnsCount() / 2)).fill(0), [columnsCount]);

  return (
    <div>
      <div className="pb-6">
        <p className="text text_type_main-medium">{status === 'done' ? 'Готово:' : 'В работе:'}</p>
      </div>
      <div className={`content flex flex-column scroll ${styles['column-group']}`}>
        {rowsCount().map((_, index) => {
          return (
            <div className="flex flex-row mb-5" key={`orders-row-${index}`}>
              <div className="column mr-9">
                {ordersByStatus()
                  .slice(index * 5, index * 5 + 5)
                  .map((order, orderIndex) => {
                    return (
                      <p
                        className={`text text_type_digits-default pb-2 ${
                          status === 'done' ? 'text_color_success ' : ''
                        }`}
                        key={`order-${index}-${orderIndex}`}
                      >
                        {order.number}
                      </p>
                    );
                  })}
              </div>
              <div className="column mr-9">
                {ordersByStatus()
                  .slice((index + 1) * 5, (index + 1) * 5 + 5)
                  .map((order, orderIndex) => {
                    return (
                      <p
                        className={`text text_type_digits-default pb-2 ${
                          status === 'done' ? 'text_color_success ' : ''
                        }`}
                        key={`order-${index + 1}-${orderIndex}`}
                      >
                        {order.number}
                      </p>
                    );
                  })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
