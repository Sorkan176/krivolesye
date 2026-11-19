import './EnterForm.css'
import {Link, NavLink} from "react-router-dom";
import { useState } from 'react';
import validateField from "../../features/validateField.js";


function EnterForm({
                     email,
                     setEmail,
                     errorText,
                     handleSubmit,
                     password,
                     setPassword,
                     name,
                     setName,
                     formAction,
                     loading
                   }) {
  const isRegister = formAction === 'Зарегистрироваться';

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  function handleFieldChange(field, value, setter) {
    setter(value);

    setTouched((prev) => ({
      ...prev,
      [field]: true,
    }));

    setErrors((prev) => ({
      ...prev,
      [field]: validateField(field, value),
    }));
  }

  function handleFormSubmit(event) {
    event.preventDefault();

    const newErrors = {
      ...(isRegister && {
        name: validateField('name', name),
      }),
      email: validateField('email', email),
      password: validateField('password', password),
    };

    setErrors(newErrors);

    setTouched({
      name: true,
      email: true,
      password: true,
    });

    if (Object.values(newErrors).some(Boolean)) return;

    handleSubmit(event);
  }

  return (
    <div className='enter-form-wrapper'>
      <form
        className='enter-form'
        onSubmit={handleFormSubmit}
        noValidate
      >
        <h3 className='enter-form__title text text_type_main-medium'>
          <NavLink to='/login' className='enter-form__link'>
            Вход
          </NavLink>
          {' / '}
          <NavLink to='/register' className='enter-form__link'>
            Регистрация
          </NavLink>
        </h3>

        {isRegister && (
          <div className='enter-form__field'>
            <input
              type='text'
              placeholder='Name'
              autoComplete='name'
              value={name}
              name='name'
              onChange={(e) =>
                handleFieldChange('name', e.target.value, setName)
              }
              className={`enter-form__input text text_type_main-default ${
                errors.name && touched.name ? 'enter-form__input_error' : ''
              }`}
              aria-invalid={Boolean(errors.name && touched.name)}
            />

            {touched.name && errors.name && (
              <p className='text text_type_main-small enter-form__error text_error'>{errors.name}</p>
            )}
          </div>
        )}

        <div className='enter-form__field'>
          <input
            type='email'
            placeholder='E-mail'
            autoComplete='email'
            value={email}
            name='email'
            onChange={(e) =>
              handleFieldChange('email', e.target.value, setEmail)
            }
            className={`enter-form__input text text_type_main-default ${
              errors.email && touched.email ? 'enter-form__input_error' : ''
            }`}
            aria-invalid={Boolean(errors.email && touched.email)}
          />

          {touched.email && errors.email && (
            <p className='text text_type_main-small enter-form__error text_error'>{errors.email}</p>
          )}
        </div>

        <div className='enter-form__field'>
          <input
            type='password'
            placeholder='Password'
            autoComplete={isRegister ? 'new-password' : 'current-password'}
            value={password}
            name='password'
            onChange={(e) =>
              handleFieldChange('password', e.target.value, setPassword)
            }
            className={`enter-form__input text text_type_main-default ${
              errors.password && touched.password
                ? 'enter-form__input_error'
                : ''
            }`}
            aria-invalid={Boolean(errors.password && touched.password)}
          />

          {touched.password && errors.password && (
            <p className='text text_type_main-small enter-form__error text_error'>{errors.password}</p>
          )}
        </div>

        <button
          className='button enter-form__button text text_type_main-default_bold'
          type='submit'
          disabled={loading}
        >
          {formAction}
        </button>

        {errorText && (
          <p className='text text_type_main-default enter-form__error text_error' role='alert'>
            {errorText}, try with vpn
          </p>
        )}

        <div className='enter-form__footer text text_type_main-default'>
          Забыли пароль?
          <Link to='/forgot-password' className='enter-form__link'>
            Восстановить пароль
          </Link>
        </div>
      </form>
    </div>
  );
}

export default EnterForm;