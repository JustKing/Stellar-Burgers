import React from 'react';

import { Logo, BurgerIcon, ProfileIcon, ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import appHeaderStyles from './app-header.module.scss';

export default class AppHeader extends React.Component {
  render() {
    return (
      <header style={{ backgroundColor: '#1C1C21' }} className="p-4 mb-10">
        <nav className={appHeaderStyles.nav}>
          <ul className={`${appHeaderStyles['no-type']} flex`}>
            <li className="flex pl-5 pr-5 pt-4 pb-4 selected">
              <BurgerIcon type="primary" />
              <p className="text text_type_main-default pl-2">Конструктор</p>
            </li>
            <li className="flex ml-2 pl-5 pr-5 pt-4 pb-4">
              <ListIcon type="secondary" />
              <p className="text text_type_main-default pl-2">Лента заказа</p>
            </li>
          </ul>
          <p className={appHeaderStyles.logo}>
            <Logo />
          </p>
          <ul className={`${appHeaderStyles['no-type']} flex`}>
            <li className="flex pl-5 pr-5 pt-4 pb-4">
              <ProfileIcon type="secondary" />
              <p className="text text_type_main-default pl-2">Личный кабинет</p>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}
