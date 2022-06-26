import { SyntheticEvent, useRef, useState } from 'react';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import authModules from '../auth.module.scss';
import { Link } from 'react-router-dom';
import { useLoginMutation } from '../../../store/services/auth';
import { useAuth } from '../../../hooks/use-auth';

export const Login = () => {
  const [form, setForm] = useState({
    email: {
      value: '',
      error: false
    },
    password: {
      value: '',
      error: false
    }
  });

  const [type, setType] = useState<'password' | 'text'>('password');
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [login, { isLoading, isError }] = useLoginMutation();
  const { setUserInfo } = useAuth();

  const onIconClick = () => {
    setType(type === 'password' ? 'text' : 'password');
  };

  const handleFormChange = (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    setForm({ ...form, [target.name]: { value: target.value, error: target.value === '' } });
  };

  const handleForm = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (!form.email.error && form.email.value && !form.password.error && form.password.value) {
      await login({ email: form.email.value, password: form.password.value }).then((response) => {
        if ('data' in response) {
          if (response.data.success) {
            setUserInfo(response.data);
          }
        }
      });
    }
  };

  if (isLoading) {
    return <div className="loading" />;
  }

  return (
    <div className={`${authModules['auth-container']} flex flex-column ta-center mt-30`}>
      <p className="text text_type_main-medium mb-6">Вход</p>
      <form className="mb-20" onChange={handleFormChange} onSubmit={handleForm}>
        <div className="mb-6">
          <Input
            type={'email'}
            placeholder={'E-mail'}
            onChange={() => {}}
            value={form.email.value}
            name={'email'}
            error={form.email.error}
            ref={emailRef}
            errorText={'Введите валидный email'}
            size={'default'}
          />
        </div>
        <div className="mb-6">
          <Input
            type={type}
            placeholder={'Пароль'}
            onChange={() => {}}
            icon={type === 'password' ? 'ShowIcon' : 'HideIcon'}
            value={form.password.value}
            name={'password'}
            error={form.password.error}
            ref={passwordRef}
            onIconClick={onIconClick}
            errorText={'Введите пароль'}
            size={'default'}
          />
        </div>
        <Button type="primary" size="large">
          Войти
        </Button>
      </form>
      {isError && (
        <div className="mb-4 jc-center">
          <p className={`${authModules['text_decoration_none']} text text_type_main-default text_color_error`}>
            Возникла ошибка при входе, проверьте правильность заполненных полей!
          </p>
        </div>
      )}
      <div className="mb-4 flex flex-row jc-center">
        <p className="text text_type_main-default text_color_inactive mr-2">Вы — новый пользователь?</p>
        <p className="text text_type_main-default">
          <Link to={'/register'} className={`${authModules['text_decoration_none']} text_color_accent`}>
            Зарегистрироваться
          </Link>
        </p>
      </div>
      <div className="flex flex-row jc-center mb-4">
        <p className="text text_type_main-default text_color_inactive mr-2">Забыли пароль?</p>
        <p className="text text_type_main-default">
          <Link to={'/forgot-password'} className={`${authModules['text_decoration_none']} text_color_accent`}>
            Восстановить пароль
          </Link>
        </p>
      </div>
    </div>
  );
};
