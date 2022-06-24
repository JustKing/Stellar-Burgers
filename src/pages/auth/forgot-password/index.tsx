import { useRef, useState } from 'react';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import authModules from '../auth.module.scss';
import { Link } from 'react-router-dom';

export const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const emailRef = useRef(null);

  return (
    <div className={`${authModules['auth-container']} flex flex-column ta-center mt-30`}>
      <p className="text text_type_main-medium mb-6">Восстановление пароля</p>
      <form className="mb-20">
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
      <div className="mb-4 flex flex-row jc-center">
        <p className="text text_type_main-default text_color_inactive mr-2">Вспомнили пароль?</p>
        <p className="text text_type_main-default">
          <Link to={'/login'} className={authModules['text_link']}>
            Войти
          </Link>
        </p>
      </div>
    </div>
  );
};
