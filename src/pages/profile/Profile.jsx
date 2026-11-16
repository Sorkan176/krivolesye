import './Profile.css'
import {useLocation} from "react-router-dom";
import ProfileMenu from "../../components/ProfileMenu/ProfileMenu.jsx";
import useAuth from "../../context/useAuth.js";
import Loading from "../../components/Loading/Loading.jsx";
import ProfileForm from "../../components/ProfileForm/ProfileForm.jsx";

function Profile() {
  const { pathname } = useLocation();
  const { loadingAuth, loadingProfile } = useAuth();

  if(loadingAuth || loadingProfile) {
    return <Loading size={320} text={'Загрузка профиля...'}/>
  }

  return (
    <div className="profile">
      <ProfileMenu pathname={pathname}/>
      <ProfileForm/>
    </div>
  );
}

export default Profile;