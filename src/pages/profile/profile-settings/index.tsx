import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import { useAuth } from '../../../hooks/use-auth';
import { useCookie } from '../../../hooks/use-cookie';
import { profile } from '../../../interfaces/profile';
import { useUpdateUserInfoMutation } from '../../../store/services/auth';
import profileStyles from '../profile.module.scss';

export const ProfileSettings = () => {
  const { user, setUserInfo, refreshAccessToken } = useAuth();
  const [updateUserInfo, { isLoading, isError }] = useUpdateUserInfoMutation();
  const cookie = useCookie();

  const [form, setForm] = useState<profile.authForm<'name' | 'email' | 'password', { disabled: boolean }>>({
    name: {
      value: '',
      error: false,
      disabled: true
    },
    email: {
      value: '',
      error: false,
      disabled: true
    },
    password: {
      value: '',
      error: false,
      disabled: true
    }
  });

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  useEffect(() => {
    resetForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const onIconClick = async (fieldType: keyof typeof form) => {
    if (!form[fieldType].disabled) {
      if (fieldType === 'password') {
        setForm({
          ...form,
          [fieldType]: { ...form[fieldType], disabled: !form[fieldType].disabled, value: '' }
        });
      } else {
        setForm({
          ...form,
          [fieldType]: { ...form[fieldType], disabled: !form[fieldType].disabled, value: user[fieldType] }
        });
      }
    } else {
      setForm({ ...form, [fieldType]: { ...form[fieldType], disabled: !form[fieldType].disabled } });
    }
  };

  const onChange = (fieldType: keyof typeof form, val: ChangeEvent<HTMLInputElement>) => {
    if (!val.target.value) {
      setForm({ ...form, [fieldType]: { ...form[fieldType], error: true, value: val.target.value } });
    } else {
      setForm({ ...form, [fieldType]: { ...form[fieldType], error: false, value: val.target.value } });
    }
  };

  const changedFields = useCallback(() => {
    const changed: { [key: string]: string | number } = {};
    if (form.name.value !== user.name) {
      changed['name'] = form.name.value;
    }
    if (form.email.value !== user.email) {
      changed['email'] = form.email.value;
    }
    if (form.password.value !== '') {
      changed['password'] = form.password.value;
    }

    return changed;
  }, [form, user]);

  const resetForm = () => {
    setForm({
      name: { ...form.name, value: user.name, disabled: true },
      email: { ...form.email, value: user.email, disabled: true },
      password: { ...form.password, value: '', disabled: true }
    });
  };

  const saveUserInfo = async () => {
    if (!cookie.getCookie('accessToken')) {
      await refreshAccessToken();
    }
    await updateUserInfo({ ...changedFields() }).then((response) => {
      if ('data' in response) {
        if (response.data.success) {
          setUserInfo(response.data);
        }
      }
    });
  };

  if (isLoading) {
    return <div className="loading" />;
  }

  return (
    <>
      <div className="mb-6">
        <Input
          type={'text'}
          disabled={form.name.disabled}
          placeholder={'Имя'}
          onChange={(val) => onChange('name', val)}
          icon={form.name.disabled ? 'EditIcon' : 'CloseIcon'}
          value={form.name.value}
          name={'name'}
          error={form.name.error}
          ref={nameRef}
          errorText={'Введите имя'}
          onIconClick={() => onIconClick('name')}
          size={'default'}
        />
      </div>
      <div className="mb-6">
        <Input
          type={'email'}
          disabled={form.email.disabled}
          placeholder={'Логин'}
          onChange={(val) => onChange('email', val)}
          icon={form.email.disabled ? 'EditIcon' : 'CloseIcon'}
          value={form.email.value}
          name={'email'}
          error={form.email.error}
          ref={emailRef}
          errorText={'Введите валидный email'}
          onIconClick={() => onIconClick('email')}
          size={'default'}
        />
      </div>
      <div className="mb-6">
        <Input
          type={'password'}
          disabled={form.password.disabled}
          placeholder={'Пароль'}
          onChange={(val) => onChange('password', val)}
          icon={form.password.disabled ? 'EditIcon' : 'CloseIcon'}
          value={form.password.value}
          name={'password'}
          error={form.password.error}
          ref={passwordRef}
          onIconClick={() => onIconClick('password')}
          errorText={'Введите пароль'}
          size={'default'}
        />
      </div>
      {Object.keys(changedFields()).length > 0 && (
        <div className="flex ai-center">
          <Button type="secondary" size="large" onClick={resetForm}>
            Отменить
          </Button>
          <Button type="primary" size="large" onClick={saveUserInfo}>
            Сохранить
          </Button>
        </div>
      )}
      {isError && (
        <div className="mb-4 jc-center">
          <p className={`${profileStyles['text_decoration_none']} text text_type_main-default text_color_error`}>
            Возникла ошибка при обновлении, проверьте правильность заполненных полей!
          </p>
        </div>
      )}
    </>
  );
};
