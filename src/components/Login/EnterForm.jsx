import './EnterForm.css'
import {Link, NavLink} from "react-router-dom";

function EnterForm(
  {
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
  }
) {
  return (
    <div className='enter-form-wrapper'>
      <form
        className='enter-form'
        onSubmit={handleSubmit}
      >
        <h3 className='enter-form__title text text_type_main-medium'>
          <NavLink to={'/login'} className='enter-form__link'>Вход</NavLink> /
          <NavLink to={'/register'} className='enter-form__link'>Регистрирация</NavLink>
        </h3>
        {formAction === 'Зарегистрироваться' && (
          <div className='enter-form__field'>
            <input
              type='name'
              placeholder='Name'
              autoComplete='name'
              onChange={(e) => setName(e.target.value)}
              value={name}
              name='name'
              className='enter-form__input text text_type_main-default'
            />
          </div>
        )}
        <div className='enter-form__field'>
          <input
            type='email'
            placeholder='E-mail'
            autoComplete='email'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            name='email'
            className='enter-form__input text text_type_main-default'
          />
        </div>
        <div className='enter-form__field'>
          <input
            type='password'
            placeholder='Password'
            autoComplete='current-password'
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            name='password'
            className='enter-form__input text text_type_main-default'
          />
        </div>
          <button className='button enter-form__button text text_type_main-default_bold' type='primary' disabled={loading} >
            {formAction}
          </button>
        {errorText && (
          <p className='enter-form__error' role="alert">
            {errorText}
          </p>
        )}

        <div className='enter-form__footer text text_type_main-default'>
          Забыли пароль?
          <Link to={'/forgot-password'} className='enter-form__link'>
            Восстановить пароль
          </Link>
        </div>
      </form>

    </div>
  )
}

export default EnterForm;