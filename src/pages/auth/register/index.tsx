import { SyntheticEvent, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import authModules from '../auth.module.scss';
import { useRegisterMutation } from '../../../store/services/auth';
import { useAuth } from '../../../hooks/use-auth';

export const Register = () => {
  const [form, setForm] = useState({
    name: {
      value: '',
      error: false
    },
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
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const [register, { isLoading, isError }] = useRegisterMutation();
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
    if (
      !form.name.error &&
      form.name.value &&
      !form.email.error &&
      form.email.value &&
      !form.password.error &&
      form.password.value
    ) {
      await register({ name: form.name.value, email: form.email.value, password: form.password.value }).then(
        (response) => {
          if ('data' in response) {
            if (response.data.success) {
              setUserInfo(response.data);
            }
          }
        }
      );
    }
  };

  if (isLoading) {
    return <div className="loading" />;
  }

  return (
    <div className={`${authModules['auth-container']} flex flex-column ta-center mt-30`}>
      <p className="text text_type_main-medium mb-6">Регистрация</p>
      <form className="mb-20" onChange={handleFormChange} onSubmit={handleForm}>
        <div className="mb-6">
          <Input
            type={'text'}
            placeholder={'Имя'}
            onChange={() => {}}
            value={form.name.value}
            name={'name'}
            error={form.name.error}
            ref={nameRef}
            errorText={'Введите имя'}
            size={'default'}
          />
        </div>
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
          Зарегистрироваться
        </Button>
      </form>
      {isError && (
        <div className="mb-4 jc-center">
          <p className={`${authModules['text_error']} text text_type_main-default`}>
            Возникла ошибка при регистрации, проверьте правильность заполненных полей!
          </p>
        </div>
      )}
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
