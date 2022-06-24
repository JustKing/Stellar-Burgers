import { useRef, useState } from 'react';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import authModules from '../auth.module.scss';
import { Link } from 'react-router-dom';

export const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [type, setType] = useState<'password' | 'text'>('password');
  const passwordRef = useRef(null);
  const codeRef = useRef(null);

  const onIconClick = () => {
    setType(type === 'password' ? 'text' : 'password');
  };

  return (
    <div className={`${authModules['auth-container']} flex flex-column ta-center mt-30`}>
      <p className="text text_type_main-medium mb-6">Восстановление пароля</p>
      <form className="mb-20">
        <div className="mb-6">
          <Input
            type={type}
            placeholder={'Введите новый пароль'}
            onChange={(e) => setPassword(e.target.value)}
            icon={type === 'password' ? 'ShowIcon' : 'HideIcon'}
            value={password}
            name={'password'}
            error={false}
            ref={passwordRef}
            onIconClick={onIconClick}
            errorText={'Ошибка'}
            size={'default'}
          />
        </div>
        <div className="mb-6">
          <Input
            type={'text'}
            placeholder={'Введите код из письма'}
            onChange={(e) => setCode(e.target.value)}
            value={code}
            name={'code'}
            error={false}
            ref={codeRef}
            errorText={'Ошибка'}
            size={'default'}
          />
        </div>
        <Button type="primary" size="large">
          Сохранить
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
