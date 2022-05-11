import React from 'react';
import {
  Button,
  DeleteIcon,
  LockIcon,
  CurrencyIcon,
  DragIcon,
  ConstructorElement
} from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredients } from '../../interfaces/ingredients';

interface burgerStructure {
  topBun: ingredients.ingredient;
  main: ingredients.ingredient[];
  bottomBun: ingredients.ingredient;
}

type Props = {
  ingredients: ingredients.ingredient[];
  offset: number;
};

export default class BurgerConstructor extends React.Component<Props> {
  get burgerStructure(): burgerStructure {
    const buns = this.props.ingredients.filter((ingredient) => ingredient.type === 'bun');
    const mainIngredients = this.props.ingredients.filter((ingredient) => ingredient.type !== 'bun');
    const mainStructure = [];
    for (let i = 0; i < 10; i++) {
      mainStructure.push(mainIngredients[Math.round(Math.random() * (mainIngredients.length - 1))]);
    }
    return {
      topBun: buns[Math.round(Math.random() * (buns.length - 1))],
      main: mainStructure,
      bottomBun: buns[Math.round(Math.random() * (buns.length - 1))]
    };
  }
  render() {
    return (
      <div style={{ flexDirection: 'column', gap: '10px' }} className="flex mt-15 pr-4 pl-4">
        <ConstructorElement
          type="top"
          isLocked={true}
          text={this.burgerStructure.topBun.name}
          price={this.burgerStructure.topBun.price}
          thumbnail={this.burgerStructure.topBun.image}
        />
        <div style={{ flexDirection: 'column', gap: '10px' }} className="flex">
          {this.burgerStructure.main.map((ingredient) => (
            <ConstructorElement text={ingredient.name} price={ingredient.price} thumbnail={ingredient.image} />
          ))}
        </div>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={this.burgerStructure.bottomBun.name}
          price={this.burgerStructure.bottomBun.price}
          thumbnail={this.burgerStructure.bottomBun.image}
        />
      </div>
    );
  }
}
