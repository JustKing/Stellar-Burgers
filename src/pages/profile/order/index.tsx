import { OrdersList } from '../../../components/orders/list';
import { useGetOrdersQuery } from '../../../store/services/orders';

export const ProfileOrder = ({ needStatus = false }) => {
  // socket connection
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data = [] } = useGetOrdersQuery(false);

  return <OrdersList needStatus={needStatus} anonymous={false} />;
};
