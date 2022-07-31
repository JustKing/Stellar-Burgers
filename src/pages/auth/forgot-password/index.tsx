import { SyntheticEvent, useEffect, useRef, useState } from 'react';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import authModules from '../auth.module.scss';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForgotPasswordMutation } from '../../../store/services/auth';
import { useAppDispatch } from '../../../hooks/use-store';
import { setIsCenter } from '../../../store/reducers/baseSlice';

export const ForgotPassword = () => {
  const dispatch = useAppDispatch();
  const [forgotPassword, { isError }] = useForgotPasswordMutation();
  const [email, setEmail] = useState<string>('');
  const emailRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    dispatch(setIsCenter(true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    await forgotPassword({ email }).then(() => {
      navigate('/reset-password', { state: { from: location } });
    });
  };

  return (
    <div className={`${authModules['auth-container']} flex flex-column ta-center mt-30`}>
      <p className="text text_type_main-medium mb-6">Восстановление пароля</p>
      <form className="mb-20" onSubmit={onSubmit}>
        <div className="mb-6">
          <Input
            type={'email'}
            placeholder={'Укажите e-mail'}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            name={'email'}
            error={false}
            ref={emailRef}
            errorText={'Ошибка'}
            size={'default'}
          />
        </div>
        <Button type="primary" size="large">
          Восстановить
        </Button>
      </form>
      {isError && (
        <div className="mb-4 jc-center">
          <p className={`${authModules['text_decoration_none']} text text_type_main-default text_color_error`}>
            Возникла ошибка при отправке кода восстановления :(
          </p>
        </div>
      )}
      <div className="mb-4 flex flex-row jc-center">
        <p className="text text_type_main-default text_color_inactive mr-2">Вспомнили пароль?</p>
        <p className="text text_type_main-default">
          <Link to={'/login'} className={`${authModules['text_decoration_none']} text_color_accent`}>
            Войти
          </Link>
        </p>
      </div>
    </div>
  );
};
