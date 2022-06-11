import { ForwardedRef, forwardRef, memo } from 'react';

import BurgerIngredientsCard from '../burger-ingredients-card/burger-ingredients-card';

import { ingredients } from '../../../interfaces/ingredients';

type Props = {
  title: string;
  ingredientsByRow: ingredients.ingredient[][];
  ingredientsCounter: { [key: string]: number };
  id: string;
};

const BurgerIngredientsSection = memo(
  forwardRef(({ title, ingredientsByRow, ingredientsCounter, id }: Props, ref: ForwardedRef<HTMLElement>) => {
    return (
      <section className="mb-10" ref={ref} id={id}>
        <p className="text text_type_main-medium mb-6">{title}</p>
        {ingredientsByRow.map((row, key) => {
          return (
            <div className="row w-100" key={key}>
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
  })
);

export default BurgerIngredientsSection;
