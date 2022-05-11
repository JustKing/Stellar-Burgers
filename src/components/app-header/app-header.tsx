import React from 'react';

import { Logo, BurgerIcon, ProfileIcon, ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import appHeaderStyles from './app-header.module.scss';

type Props = {
  changeOffset: Function;
};

export default class AppHeader extends React.Component<Props> {
  componentDidMount() {
    let offset = 0;
    const header = document.querySelector<HTMLElement>('header');
    if (header) {
      const styles = window.getComputedStyle(header);
      const margin = parseFloat(styles['marginTop']) + parseFloat(styles['marginBottom']);
      offset = header.clientHeight + margin;
    }
    this.props.changeOffset(offset);
  }

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
