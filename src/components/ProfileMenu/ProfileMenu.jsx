import './ProfileMenu.css'
import {NavLink, useNavigate} from "react-router-dom";
import {signOut} from "../../api/auth.js";

function ProfileMenu( { pathname }) {
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await signOut();
      navigate('/', { replace: true });
    } catch (error) {
      console.error('Logout error:', error);
    }
  }

  return (
    <div className='profile-menu'>
      <NavLink
        to={'/profile'}
        className='text text_type_main-medium profile-menu__link'
        end
      >
        Профиль
      </NavLink>
      <NavLink
        to={'/profile/orders'}
        className='text text_type_main-medium profile-menu__link'
      >
        История заказов
      </NavLink>
      <button
        type="button"
        onClick={handleLogout}
        className='button profile-menu__button text text_type_main-medium'
      >
        Выход
      </button>
      <p className='text'>
        {pathname === '/profile'
          ? 'В этом разделе вы можете изменить свои персональные данные'
          : 'В этом разделе вы можете просмотреть свою историю заказов'}
      </p>
    </div>
  )
}

export default ProfileMenu;