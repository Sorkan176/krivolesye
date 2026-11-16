import ProfileMenu from "../../components/ProfileMenu/ProfileMenu.jsx";
import {useLocation} from "react-router-dom";
import OrderHistory from "../../components/OrderHistory/OrderHistory.jsx";

function ProfileOrders() {
  const { pathname } = useLocation();

  return (
    <div className="profile">
      <ProfileMenu pathname={pathname}/>
      <OrderHistory/>
    </div>
  )
}

export default ProfileOrders;