import { useCallback, useState } from 'react';

import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';

import { useFetchAllIngredientsQuery } from '../../store/services/ingredients';

import appStyles from './app.module.scss';

const App = () => {
  const [offset, setOffset] = useState(0);
  const { data = [], error, isLoading, isSuccess, isError } = useFetchAllIngredientsQuery([]);

  const changeOffset = useCallback((offset: number) => {
    setOffset(offset);
  }, []);

  const errorMessage = (message: string) => {
    return (
      <div className={`${appStyles.error} flex jc-center ai-center`}>
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
        <AppHeader changeOffset={changeOffset} />
        <main className="flex container jc-center" style={{ height: `calc(100vh - ${offset}px)` }}>
          <BurgerIngredients offset={offset} />
          <BurgerConstructor offset={offset} />
        </main>
      </>
    );
  }

  return errorMessage('Неопределенная ошибка');
};

export default App;
