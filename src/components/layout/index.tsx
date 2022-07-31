import { Outlet } from 'react-router-dom';

import { useAppSelector } from '../../hooks/use-store';

import AppHeader from '../app-header/app-header';

export const Layout = () => {
  const baseStore = useAppSelector((state) => state.base);

  return (
    <>
      <AppHeader />
      <main
        className={`flex container ${baseStore.isCenter ? 'jc-center' : 'jc-flex-start'}`}
        style={{ height: `calc(100vh - ${baseStore.offset}px)` }}
      >
        <Outlet />
      </main>
    </>
  );
};
