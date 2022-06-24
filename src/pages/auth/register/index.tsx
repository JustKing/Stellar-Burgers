import { useRef, useState } from 'react';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import authModules from '../auth.module.scss';
import { Link } from 'react-router-dom';

export const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [type, setType] = useState<'password' | 'text'>('password');
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const onIconClick = () => {
    setType(type === 'password' ? 'text' : 'password');
  };

  return (
    <div className={`${authModules['auth-container']} flex flex-column ta-center mt-30`}>
      <p className="text text_type_main-medium mb-6">Регистрация</p>
      <form className="mb-20">
      <div className="mb-6">
          <Input
            type={'text'}
            placeholder={'Имя'}
            onChange={(e) => setName(e.target.value)}
            value={name}
            name={'name'}
            error={false}
            ref={nameRef}
            errorText={'Ошибка'}
            size={'default'}
          />
        </div>
        <div className="mb-6">
          <Input
            type={'email'}
            placeholder={'E-mail'}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            name={'email'}
            error={false}
            ref={emailRef}
            errorText={'Ошибка'}
            size={'default'}
          />
        </div>
        <div className="mb-6">
          <Input
            type={type}
            placeholder={'Пароль'}
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
        <Button type="primary" size="large">
          Зарегистрироваться
        </Button>
      </form>
      <div className="mb-4 flex flex-row jc-center">
        <p className="text text_type_main-default text_color_inactive mr-2">Уже зарегистрированы?</p>
        <p className="text text_type_main-default">
          <Link to={'/login'} className={authModules['text_link']}>
            Войти
          </Link>
        </p>
      </div>
    </div>
  );
};
