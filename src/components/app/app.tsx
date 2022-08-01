import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Layout } from '../layout';
import ModalIngredients from '../modal/ingredient';
import { ProtectedRoute } from '../protected-route/protected-route';
import { useAuth } from '../../hooks/use-auth';
import { useCookie } from '../../hooks/use-cookie';
import { useAppDispatch } from '../../hooks/use-store';
import { ForgotPassword, Login, Register, ResetPassword } from '../../pages/auth';
import { Constructor } from '../../pages/constructor/constructor';
import { Ingredient } from '../../pages/ingredient';
import { Profile } from '../../pages/profile';
import { Feed } from '../../pages/feed';
import { setUser } from '../../store/reducers/profileSlice';
import { useGetUserInfoQuery } from '../../store/services/auth';
import ModalOrder from '../modal/order/order';
import { OrdersDetail } from '../orders/detail';

const App = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshIsProccess, setRefreshIsProccess] = useState<boolean>(false);

  const { isAuth, refreshAccessToken } = useAuth();
  const accessToken = useCookie().getCookie('accessToken');
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { data, isLoading, isError, isSuccess, error } = useGetUserInfoQuery(accessToken || '');

  const background = location.state && (location.state as any).background;

  const checkData = () => {
    if (data?.success && data.user) {
      if (data.user.name && data.user.email) {
        dispatch(
          setUser({
            ...data.user,
            token: accessToken || ''
          })
        );
      }
    }
  };

  useEffect(() => {
    if (isAuth) {
      setLoading(false);
      checkData();
    } else {
      setLoading(true);
      if (isError && 'status' in error && error.status === 401) {
        if (!refreshIsProccess) {
          setRefreshIsProccess(true);
          refreshAccessToken();
        }
      }
      if (isSuccess && accessToken) {
        checkData();
      }
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken, isError, error, dispatch, isAuth, isSuccess]);

  if (loading || isLoading) {
    return <div className="loading" />;
  }

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Constructor />} />
        <Route path="/ingredients/:id" element={background ? <ModalIngredients /> : <Ingredient />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/profile/orders/:id" element={background ? <ModalOrder /> : <OrdersDetail />} />
          <Route path="/profile/*" element={<Profile />} />
        </Route>
        <Route path="/feed">
          <Route index element={<Feed />} />
          <Route path=":id" element={background ? <ModalOrder /> : <OrdersDetail />} />
        </Route>
        <Route element={<ProtectedRoute anonymous />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
