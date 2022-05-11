import React from 'react';

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredients } from '../../../interfaces/ingredients';

type Props = {
  value: ingredients.ingredient;
  isEven: boolean;
};

export default class BurgerIngredientsCard extends React.Component<Props> {
  render() {
    return (
      <div className={`mb-8 ${this.props.isEven ? 'pr-2 pl-3' : 'pr-3 pl-4'}`} style={{ flex: '1 1' }}>
        <img className="ml-4 mr-4 mb-1" src={this.props.value.image} alt={this.props.value.name} />
        <div className="flex jc-center ai-center mb-1">
          <p className="text text_type_digits-default pr-2">{this.props.value.price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <p className="text text_type_main-default flex jc-center ta-center pb-6">{this.props.value.name}</p>
      </div>
    );
  }
}
