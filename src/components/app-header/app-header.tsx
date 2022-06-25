import { useEffect, useRef } from 'react';

import { Logo, BurgerIcon, ProfileIcon, ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { useAppDispatch } from '../../hooks/use-store';
import { setOffset } from '../../store/reducers/baseSlice';

import appHeaderStyles from './app-header.module.scss';
import { Link } from 'react-router-dom';

const AppHeader = () => {
  const headerRef = useRef<HTMLElement>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    let offset = 0;
    if (headerRef.current) {
      const styles = window.getComputedStyle(headerRef.current);
      const margin = parseFloat(styles['marginTop']) + parseFloat(styles['marginBottom']);
      offset = headerRef.current.clientHeight + margin;
    }
    dispatch(setOffset(offset));
  }, [dispatch]);

  return (
    <header className={`${appHeaderStyles.header} p-4 mb-10`} ref={headerRef}>
      <nav className={appHeaderStyles.nav}>
        <ul className={`${appHeaderStyles['no-type']} flex`}>
          <li className="flex pl-5 pr-5 pt-4 pb-4 selected">
            <Link to="/" className={`${appHeaderStyles.link} flex jc-center ai-center`}>
              <BurgerIcon type="primary" />
              <p className="text text_type_main-default pl-2">Конструктор</p>
            </Link>
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
