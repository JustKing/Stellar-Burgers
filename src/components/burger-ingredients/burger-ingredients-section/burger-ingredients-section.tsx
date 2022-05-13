import { memo } from 'react';

import BurgerIngredientsCard from '../burger-ingredients-card/burger-ingredients-card';

import { ingredients } from '../../../interfaces/ingredients';

type Props = {
  id: string;
  title: string;
  ingredientsByRow: ingredients.ingredient[][];
  ingredientsCounter: { [key: string]: number };
};

const BurgerIngredientsSection = memo(({ id, title, ingredientsByRow, ingredientsCounter }: Props) => {
  return (
    <section id={id} className="mb-10">
      <p className="text text_type_main-medium mb-6">{title}</p>
      {ingredientsByRow.map((row, key) => {
        return (
          <div className="row" key={key}>
            {row.map((ingredient, bunIndex) => (
              <BurgerIngredientsCard
                value={ingredient}
                isEven={bunIndex % 2 ? true : false}
                key={`${ingredient.type}-${ingredient._id}`}
                count={ingredientsCounter[ingredient._id]}
              />
            ))}
          </div>
        );
      })}
    </section>
  );
});

export default BurgerIngredientsSection;
