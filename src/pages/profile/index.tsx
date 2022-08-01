import { useAuth } from '../../hooks/use-auth';
import profileStyles from './profile.module.scss';
import { ProfileSettings } from './profile-settings';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { ProfileOrder } from './order';
import { useEffect, useMemo } from 'react';
import { useAppDispatch } from '../../hooks/use-store';
import { setIsCenter } from '../../store/reducers/baseSlice';

export const Profile = () => {
  const dispatch = useAppDispatch();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    dispatch(setIsCenter(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const locationName = useMemo(() => {
    const partsOfPathName = location.pathname.split('/');
    return partsOfPathName[partsOfPathName.length - 1];
  }, [location]);

  return (
    <div className="flex flex-row mt-30">
      <div className={`${profileStyles['vertical-menu']} mr-15`}>
        <ul className="mb-20">
          <li className="flex ai-center">
            <p
              className={`text text_type_main-medium ${locationName === 'profile' ? '' : 'text_color_inactive'}`}
              onClick={() => navigate('/profile')}
            >
              Профиль
            </p>
          </li>
          <li className="flex ai-center">
            <p
              className={`text text_type_main-medium ${locationName === 'orders' ? '' : 'text_color_inactive'}`}
              onClick={() => navigate('/profile/orders')}
            >
              История заказов
            </p>
          </li>
          <li className="flex ai-center">
            <p className="text text_type_main-medium text_color_inactive" onClick={logout}>
              Выйти
            </p>
          </li>
        </ul>
        <p className="text text_type_main-default text_color_inactive">
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>
      <div
        className={`${
          locationName === 'profile' ? `${profileStyles['auth-container']} ta-center` : ''
        } flex flex-column`}
      >
        <Routes>
          <Route index element={<ProfileSettings />} />
          <Route path="/orders">
            <Route index element={<ProfileOrder needStatus />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
};
