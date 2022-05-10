import React from "react";

import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";

export default class App extends React.Component {
  render() {
    return (
      <>
        <AppHeader />
        <main>
          <BurgerIngredients />
        </main>
      </>
    );
  }
}
