import { memo } from 'react';
import { ingredients } from '../../interfaces/ingredients';
import ingredientDetailStyles from './ingredient-details.module.scss';

type Props = {
  ingredient: ingredients.ingredient;
};

const IngredientDetails = memo(({ ingredient }: Props) => {
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
      <img
        className={`${ingredientDetailStyles.image} mb-4`}
        src={ingredient.image_large}
        alt={ingredient.name}
      />
      <p className="text text_type_main-medium mb-8">{ingredient.name}</p>
      <div className="flex">
        {composition('Калории, ккал', ingredient.calories)}
        {composition('Белки, г', ingredient.proteins)}
        {composition('Жиры, г', ingredient.fat)}
        {composition('Углеводы, г', ingredient.carbohydrates)}
      </div>
    </div>
  );
});

export default IngredientDetails;
