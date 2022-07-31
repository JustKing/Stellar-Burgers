import { useEffect } from 'react';
import IngredientDetails from '../../components/ingredient-details/ingredient-details';
import { useAppDispatch } from '../../hooks/use-store';
import { setIsCenter } from '../../store/reducers/baseSlice';

export const Ingredient = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setIsCenter(true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <IngredientDetails />;
};
