import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Layout } from './components/layout';
import Modal from './components/modalOutlet/modal';
import { ProtectedAuthRoute } from './components/protected-route/protected-auth-route';
import { ProtectedRoute } from './components/protected-route/protected-route';
import { useAuth } from './hooks/use-auth';
import { useCookie } from './hooks/use-cookie';
import { useAppDispatch } from './hooks/use-store';
import { response } from './interfaces/response';
import { ForgotPassword, Login, Register, ResetPassword } from './pages/auth';
import { Constructor } from './pages/constructor/constructor';
import { Ingredient } from './pages/ingredient';
import { Profile } from './pages/profile';
import { setUser } from './store/reducers/profileSlice';
import { getUserInfo } from './store/services/getUserInfo';

const App = () => {
  const [loading, setLoading] = useState(true);
  const { isAuth, refreshAccessToken } = useAuth();
  const accessToken = useCookie().getCookie('accessToken');
  const dispatch = useAppDispatch();
  const location = useLocation();
  const background = location.state && (location.state as any).background;

  useEffect(() => {
    if (isAuth) {
      setLoading(false);
    } else {
      setLoading(true);
      getUserInfo(accessToken || '')
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          if (response.status === 401) {
            refreshAccessToken();
          }
        })
        .then((response: Partial<response.auth.request>) => {
          if (response?.success) {
            if (response?.user) {
              dispatch(
                setUser({
                  ...response.user,
                  token: accessToken || ''
                })
              );
            }
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken, dispatch, isAuth]);

  if (loading) {
    return <div className="loading" />;
  }

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route element={<ProtectedRoute />}>
          <Route index element={<Constructor />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/ingredients/:id" element={background ? <Modal /> : <Ingredient />} />
        </Route>
        <Route element={<ProtectedAuthRoute />}>
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
