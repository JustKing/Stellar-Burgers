import { Outlet } from 'react-router-dom';

import { useAppSelector } from '../../hooks/use-store';

import AppHeader from '../app-header/app-header';

export const Layout = () => {
  const offset = useAppSelector((state) => state.base.offset);

  return (
    <>
      <AppHeader />
      <main className="flex container jc-center" style={{ height: `calc(100vh - ${offset}px)` }}>
        <Outlet />
      </main>
    </>
  );
};
