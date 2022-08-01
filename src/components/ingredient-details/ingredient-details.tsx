import { memo, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ingredients } from '../../interfaces/ingredients';
import { useFetchAllIngredientsQuery } from '../../store/services/ingredients';
import ingredientDetailStyles from './ingredient-details.module.scss';

const IngredientDetails = memo(() => {
  const location = useLocation();
  const [ingredientDetail, setIngredientDetail] = useState<ingredients.ingredient | null>(null);
  const { data = [] } = useFetchAllIngredientsQuery([]);
  const background = location.state && (location.state as any).background;

  useEffect(() => {
    const partsOfPathName = location.pathname.split('/');
    const id = partsOfPathName[partsOfPathName.length - 1];
    if (id) {
      const currentIngredient = data.find((ingredient) => ingredient._id === id);
      if (currentIngredient) {
        setIngredientDetail(currentIngredient);
      }
    }
  }, [data, location]);

  const composition = (title: string, value = 0) => {
    return (
      <div className={ingredientDetailStyles.composition}>
        <p className="text text_type_main-default text_color_inactive">{title}</p>
        <p className="text text_type_digits-default text_color_inactive">{value}</p>
      </div>
    );
  };

  return (
    <div className={`${!background ? 'mt-20' : 'mt-0'} flex flex-column ai-center`}>
      {!background && <p className="text text_type_main-large">Детали ингредиента</p>}
      <img
        className={`${ingredientDetailStyles.image} mb-4`}
        src={ingredientDetail?.image_large}
        alt={ingredientDetail?.name}
      />
      <p className="text text_type_main-medium mb-8">{ingredientDetail?.name}</p>
      <div className="flex">
        {composition('Калории, ккал', ingredientDetail?.calories)}
        {composition('Белки, г', ingredientDetail?.proteins)}
        {composition('Жиры, г', ingredientDetail?.fat)}
        {composition('Углеводы, г', ingredientDetail?.carbohydrates)}
      </div>
    </div>
  );
});

export default IngredientDetails;
