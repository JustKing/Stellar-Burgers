import { OrdersList } from './orders-list';
import { CompletedAllTime } from './completed-all-time';
import { CompletedToday } from './completed-today';

export const OrdersDashboard = ({ anonymous = false }) => {
  return (
    <div className="scroll pr-5">
      <div className="flex mb-15">
        <OrdersList status="done" anonymous />
        <OrdersList status="pending" anonymous />
      </div>
      <CompletedAllTime anonymous />
      <CompletedToday anonymous />
    </div>
  );
};
