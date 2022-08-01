import { memo, useCallback, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useLazyFetchOrderQuery } from '../../../store/services/orderDetail';
import { order as IOrder } from '../../../interfaces/order';
import { ONE_DAY, STATUSES } from '../../../constants';
import { useFetchAllIngredientsQuery } from '../../../store/services/ingredients';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredients } from '../../../interfaces/ingredients';

import styles from './detail.module.scss';
import { useAppDispatch } from '../../../hooks/use-store';
import { setIsCenter } from '../../../store/reducers/baseSlice';

export const OrdersDetail = memo(() => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const [trigger, { data, isLoading }] = useLazyFetchOrderQuery();
  const { currentData = [] } = useFetchAllIngredientsQuery([]);
  const background = location.state && (location.state as any).background;
  const order = useCallback(() => data?.orders[0], [data]);

  useEffect(() => {
    dispatch(setIsCenter(true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const orderIngredients = useCallback(() => {
    return order()?.ingredients?.map(
      (ingredientId: string) => currentData.find((ingredient) => ingredient._id === ingredientId) || null
    );
  }, [order, currentData]);

  const totalCount = useCallback(
    () => orderIngredients()?.reduce((acc, ingredient) => acc + (ingredient?.price || 0), 0),
    [orderIngredients]
  );

  const createdAt = useCallback(() => {
    const currentOrder = order();
    if (currentOrder?.createdAt) {
      const createdDate = new Date(currentOrder.createdAt);
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
    }
  }, [order]);

  const structure = useMemo(() => {
    const structure: { [key: string]: { ingredient: ingredients.ingredient; count: number } } = {};
    orderIngredients()?.forEach((ingredient) => {
      if (ingredient) {
        if (structure[ingredient._id]) {
          structure[ingredient._id].count++;
        } else {
          structure[ingredient._id] = {
            ingredient: ingredient,
            count: 1
          };
        }
      }
    });
    return structure;
  }, [orderIngredients]);

  useEffect(() => {
    const partsOfPathName = location.pathname.split('/');
    const id = partsOfPathName[partsOfPathName.length - 1];
    if (id) {
      trigger(id);
    }
  }, [location, trigger]);

  if (isLoading) {
    return <div className="loading" />;
  }

  return (
    <div className={`${!background ? 'mt-20' : 'mt-0'}`}>
      {!background && (
        <div className="ai-center flex flex-column">
          <p className="text text_type_digits-default">#{order()?.number}</p>
        </div>
      )}
      <p className="text text_type_main-medium mt-10 mb-3">{order()?.name}</p>
      <p className="text text_type_main-default text_color_success mb-15">
        {STATUSES[order()?.status as IOrder.statusTypes]}
      </p>
      <p className="text text_type_main-medium mb-6">Состав:</p>
      <div className={`${styles['structure-wrapper']} scroll mb-10 pr-6`}>
        {Object.values(structure).map((ingredient, key) => {
          return (
            <div className="flex flex-row ai-center" key={key}>
              <div className={`${styles['image-wrapper']} mr-4`}>
                <img
                  className={`${styles['image']}`}
                  src={ingredient.ingredient.image_mobile}
                  alt={ingredient.ingredient.name}
                />
              </div>
              <div className={`${styles['w-100']} flex jc-space-between`}>
                <p className="text text_type_main-default mr-4">{ingredient.ingredient.name}</p>
                <div className="flex ai-center">
                  <p className="text text_type_digits-default pr-2">
                    {ingredient.count} x {ingredient.ingredient.price}
                  </p>
                  <CurrencyIcon type="primary" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex flex-row jc-space-between">
        <p className="text text_type_main-default text_color_inactive">{createdAt()}</p>
        <div className="flex ai-center">
          <p className="text text_type_digits-default pr-2">{totalCount()}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
});
