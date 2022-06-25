import { response } from '../interfaces/response';
import { resetUser, setUser } from '../store/reducers/profileSlice';
import { useRefreshTokenMutation } from '../store/services/auth';
import { useCookie } from './use-cookie';
import { useAppDispatch, useAppSelector } from './use-store';

export const useAuth = () => {
  const isAuth = useAppSelector((state) => !!state.profile.token);
  const user = useAppSelector((state) => state.profile);
  const cookie = useCookie();
  const [refreshToken] = useRefreshTokenMutation();
  const dispatch = useAppDispatch();

  const removeUserInfo = () => {
    cookie.removeCookie('accessToken');
    cookie.removeCookie('refreshToken');
    dispatch(resetUser());
  };

  const setUserInfo = (data: Partial<response.auth.request>) => {
    if (data?.success && data?.accessToken && data?.refreshToken) {
      const token = data.accessToken.split('Bearer ')[1];
      const decodedToken = JSON.parse(atob(token.split('.')[1])) as { id: string; exp: number; iat: number };
      if (data?.user) {
        dispatch(setUser({ ...data.user, token }));
      } else {
        dispatch(setUser({ ...user, token }));
      }
      cookie.setCookie('accessToken', token, decodedToken.exp - decodedToken.iat);
      cookie.setCookie('refreshToken', data.refreshToken);
    }
  };

  const refreshAccessToken = async () => {
    const refreshTokenCookie = cookie.getCookie('refreshToken');
    if (!isAuth && refreshTokenCookie) {
      await refreshToken({ token: refreshTokenCookie })
        .then((response) => {
          if ('data' in response) {
            if (response.data?.success && response.data?.accessToken && response.data?.refreshToken) {
              setUserInfo(response.data);
              return;
            }
          }
          throw new Error();
        })
        .catch(() => {
          removeUserInfo();
        });
    }
  };

  return {
    isAuth,
    refreshAccessToken,
    user,
    setUserInfo,
    removeUserInfo
  };
};
