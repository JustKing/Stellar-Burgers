import { memo } from 'react';
import { useAppSelector } from '../../hooks/use-store';
import ingredientDetailStyles from './ingredient-details.module.scss';

const IngredientDetails = memo(() => {
  const ingredientDetail = useAppSelector((state) => state.ingredientDetail.detail);

  const composition = (title: string, value: number) => {
    return (
      <div className={ingredientDetailStyles.composition}>
        <p className="text text_type_main-default text_color_inactive">{title}</p>
        <p className="text text_type_digits-default text_color_inactive">{value}</p>
      </div>
    );
  };

  return (
    <div className="flex flex-column ai-center">
      <img className={`${ingredientDetailStyles.image} mb-4`} src={ingredientDetail.image_large} alt={ingredientDetail.name} />
      <p className="text text_type_main-medium mb-8">{ingredientDetail.name}</p>
      <div className="flex">
        {composition('Калории, ккал', ingredientDetail.calories)}
        {composition('Белки, г', ingredientDetail.proteins)}
        {composition('Жиры, г', ingredientDetail.fat)}
        {composition('Углеводы, г', ingredientDetail.carbohydrates)}
      </div>
    </div>
  );
});

export default IngredientDetails;
