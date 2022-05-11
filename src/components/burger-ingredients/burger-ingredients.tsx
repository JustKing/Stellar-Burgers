import React from 'react';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerIngredientsSection from './burger-ingredients-section/burger-ingredients-section';

import burgerIngredientsStyles from './burger-ingredients.module.scss';
import { ingredients } from '../../interfaces/ingredients';

type Props = {
  ingredients: ingredients.ingredient[];
};
export default class BurgerIngredients extends React.Component<Props> {
  state = {
    activeTab: 'bun',
    tabs: [
      {
        type: 'bun',
        title: 'Булки'
      },
      {
        type: 'sauce',
        title: 'Соусы'
      },
      {
        type: 'main',
        title: 'Начинки'
      }
    ]
  };

  setCurrent = (tab: string) => {
    if (tab !== this.state.activeTab) {
      const ingredientsSection = document.querySelector<HTMLElement>(`section#${tab}`);

      setTimeout(() => {
        window.scrollTo({
          behavior: ingredientsSection ? 'smooth' : 'auto',
          top: ingredientsSection ? ingredientsSection.offsetTop : 0
        });
      }, 100);

      this.setState((prevState) => ({
        ...prevState,
        activeTab: tab
      }));
    }
  };

  public get buns(): ingredients.ingredient[][] {
    const buns = this.props.ingredients.filter((ingredient) => ingredient.type === 'bun');
    return this.getIngredientsRows(buns);
  }

  public get sauces(): ingredients.ingredient[][] {
    const sauces = this.props.ingredients.filter((ingredient) => ingredient.type === 'sauce');
    return this.getIngredientsRows(sauces);
  }

  public get mains(): ingredients.ingredient[][] {
    const mains = this.props.ingredients.filter((ingredient) => ingredient.type === 'main');
    return this.getIngredientsRows(mains);
  }

  private getIngredientsRows(ingredients: ingredients.ingredient[]): ingredients.ingredient[][] {
    let ingredientsByRow: ingredients.ingredient[][] = [];
    for (let i = 0; i < ingredients.length / 2; i++) {
      const row = [];
      const ingredient = ingredients[i * 2];
      const nextIngredient = ingredients[i * 2 + 1];
      if (ingredient) {
        row.push(ingredient);
      }
      if (nextIngredient) {
        row.push(nextIngredient);
      }
      ingredientsByRow.push(row);
    }
    return ingredientsByRow;
  }

  render() {
    return (
      <div style={{ width: '600px' }}>
        <p className="text text_type_main-large mb-5">Соберите бургер</p>
        <div style={{ display: 'flex' }}>
          {this.state.tabs.map((tab, index) => (
            <Tab value={tab.type} active={this.state.activeTab === tab.type} key={index} onClick={this.setCurrent}>
              {tab.title}
            </Tab>
          ))}
        </div>
        <div className={burgerIngredientsStyles.ingredients}>
          <BurgerIngredientsSection id="bun" title="Булочки" ingredientsByRow={this.buns} />
          <BurgerIngredientsSection id="sauce" title="Соусы" ingredientsByRow={this.sauces} />
          <BurgerIngredientsSection id="main" title="Начинки" ingredientsByRow={this.mains} />
        </div>
      </div>
    );
  }
}
