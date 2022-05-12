import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const BurgerConstructorOrder = ({ total }: { total: number }) => {
  return (
    <div className="mb-10 flex jc-end">
      <div className="mr-10 flex ai-center">
        <p className="text text_type_digits-medium mr-1">{total}</p>
        <CurrencyIcon type="primary" />
      </div>
      <Button type="primary" size="medium">
        Оформить заказ
      </Button>
    </div>
  );
};

export default BurgerConstructorOrder;
