import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';

import { useFetchAllIngredientsQuery } from '../../store/services/ingredients';

import constructorStyles from './constructor.module.scss';

export const Constructor = ({ offset }: { offset: number }) => {
  const { data = [], error, isLoading, isSuccess, isError } = useFetchAllIngredientsQuery([]);

  const errorMessage = (message: string) => {
    return (
      <div className={`${constructorStyles.error} flex jc-center ai-center`}>
        <p className="text text_type_main-medium">{message}</p>
      </div>
    );
  };

  if (isLoading) {
    return <div className="loading" />;
  }

  if (isError) {
    if (error) {
      if ('status' in error) {
        const errMsg = 'error' in error ? error.error : JSON.stringify(error.data);
        return errorMessage(errMsg);
      } else {
        return errorMessage(`Ошибка ${error.message}`);
      }
    }
  }

  if (isSuccess && data.length > 0) {
    return (
      <>
        <BurgerIngredients offset={offset} />
        <BurgerConstructor offset={offset} />
      </>
    );
  }

  return errorMessage('Неопределенная ошибка');
};
