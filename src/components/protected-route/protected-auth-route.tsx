import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/use-auth';

export const ProtectedAuthRoute = () => {
  const { isAuth } = useAuth();

  return isAuth ? <Navigate to="/" /> : <Outlet />;
};
