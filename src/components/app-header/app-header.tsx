import { useEffect, useRef } from 'react';

import { Logo, BurgerIcon, ProfileIcon, ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import appHeaderStyles from './app-header.module.scss';

type Props = {
  changeOffset: Function;
};

const AppHeader = ({ changeOffset }: Props) => {
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let offset = 0;
    if (headerRef.current) {
      const styles = window.getComputedStyle(headerRef.current);
      const margin = parseFloat(styles['marginTop']) + parseFloat(styles['marginBottom']);
      offset = headerRef.current.clientHeight + margin;
    }
    changeOffset(offset);
  }, [changeOffset]);

  return (
    <header className={`${appHeaderStyles.header} p-4 mb-10`} ref={headerRef}>
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
};

export default AppHeader;
