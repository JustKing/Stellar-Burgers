import React from 'react';

import BurgerIngredientsCard from '../burger-ingredients-card/burger-ingredients-card';

import { ingredients } from '../../../interfaces/ingredients';

type Props = {
  id: string;
  title: string;
  ingredientsByRow: ingredients.ingredient[][];
};

export default class BurgerIngredientsSection extends React.Component<Props> {
  render() {
    return (
      <section id={this.props.id} className="mb-10">
        <p className="text text_type_main-medium mb-6">{this.props.title}</p>
        {this.props.ingredientsByRow.map((row, key) => {
          return (
            <div className="row" key={key}>
              {row.map((ingredient, bunIndex) => (
                <BurgerIngredientsCard
                  value={ingredient}
                  isEven={bunIndex % 2 ? true : false}
                  key={`${ingredient.type}-${ingredient._id}`}
                />
              ))}
            </div>
          );
        })}
      </section>
    );
  }
}
