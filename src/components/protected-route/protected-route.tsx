import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/use-auth';

type Props = {
  anonymous?: boolean;
};

export const ProtectedRoute = ({ anonymous }: Props) => {
  const { isAuth } = useAuth();
  const location = useLocation();
  const from: 'string' | Location = (location.state as any)?.from || '/';

  if (typeof from === 'object') {
    if (location.pathname === '/reset-password') {
      if (from.pathname === '/forgot-password') {
        return <Outlet />;
      } else {
        return <Navigate to="/login" />;
      }
    }
  }

  if (anonymous && isAuth) {
    return <Navigate to={from} />;
  }

  if (!anonymous && !isAuth) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return <Outlet />;
};
