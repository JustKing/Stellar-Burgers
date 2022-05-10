import React from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

import burgerIngredientsStyles from './burger-ingredients.module.scss';

export default class BurgerIngredients extends React.Component {
  state = {
    activeTab: "buns",
  };

  setCurrent = (tab: string) => {
    this.setState((prevState) => ({
      ...prevState,
      activeTab: tab,
    }));
  };

  render() {
    const tabs = [
      {
        value: "buns",
        title: "Булки",
      },
      {
        value: "sauces",
        title: "Соусы",
      },
      {
        value: "fillings",
        title: "Начинки",
      },
    ];

    return (
      <div className="mt-10">
        <p className="text text_type_main-medium mb-5">Соберите бургер</p>
        <div style={{ display: "flex" }}>
          {tabs.map((tab, index) => (
            <Tab
              value={tab.value}
              active={this.state.activeTab === tab.value}
              key={index}
              onClick={this.setCurrent}
            >
              {tab.title}
            </Tab>
          ))}
        </div>
        <div className={burgerIngredientsStyles.ingredients}>
          <section id="buns"></section>
          <section id="sauses"></section>
          <section id="fillings"></section>
        </div>
      </div>
    );
  }
}
