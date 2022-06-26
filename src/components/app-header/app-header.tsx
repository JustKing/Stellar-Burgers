import { useEffect, useRef, useState } from 'react';

import { Logo, BurgerIcon, ProfileIcon, ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { useAppDispatch } from '../../hooks/use-store';
import { setOffset } from '../../store/reducers/baseSlice';

import appHeaderStyles from './app-header.module.scss';
import { Link, useLocation } from 'react-router-dom';

const AppHeader = () => {
  const headerRef = useRef<HTMLElement>(null);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const [currentLocation, setCurrentLocation] = useState('');

  useEffect(() => {
    let offset = 0;
    if (headerRef.current) {
      const styles = window.getComputedStyle(headerRef.current);
      const margin = parseFloat(styles['marginTop']) + parseFloat(styles['marginBottom']);
      offset = headerRef.current.clientHeight + margin;
    }
    dispatch(setOffset(offset));
  }, [dispatch]);

  useEffect(() => {
    setCurrentLocation(location.pathname.split('/')[1]);
  }, [location]);

  return (
    <header className={`${appHeaderStyles.header} p-4 mb-10`} ref={headerRef}>
      <nav className={appHeaderStyles.nav}>
        <ul className={`${appHeaderStyles['no-type']} flex`}>
          <li className="flex pl-5 pr-5 pt-4 pb-4">
            <Link to="/" className={`${appHeaderStyles.link} flex jc-center ai-center`}>
              <BurgerIcon type={currentLocation === '' ? 'primary' : 'secondary'} />
              <p
                className={`text_color_${
                  currentLocation === '' ? 'primary' : 'inactive'
                } text text_type_main-default pl-2`}
              >
                Конструктор
              </p>
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
            <Link to="/profile" className={`${appHeaderStyles.link} flex jc-center ai-center`}>
              <ProfileIcon type={currentLocation === 'profile' ? 'primary' : 'secondary'} />
              <p
                className={`text_color_${
                  currentLocation === 'profile' ? 'primary' : 'inactive'
                } text text_type_main-default pl-2`}
              >
                Личный кабинет
              </p>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default AppHeader;
