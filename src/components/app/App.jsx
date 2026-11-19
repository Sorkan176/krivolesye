import {Route, Routes} from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.jsx";

import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";
import NotFound404 from "../../pages/not-found-404/notFound404.jsx";
import MainPage from "../../pages/main/mainPage.jsx";
import Body from "../Body/Body.jsx";
import Goods from "../../pages/goods/Goods.jsx";
import Favorites from "../../pages/favorites/Favorites.jsx";
import Login from "../../pages/login/Login.jsx";
import Cart from "../../pages/cart/Cart.jsx";
import Good from "../../pages/good/Good.jsx";
import Profile from "../../pages/profile/Profile.jsx";
import Register from "../../pages/register/Register.jsx";
import ProfileOrders from "../../pages/profileOrders/ProfileOrders.jsx";
import Search from "../../pages/search/Search.jsx";
import About from "../../pages/about/About.jsx";
import Privacy from "../../pages/privacy/Privacy.jsx";
import Contact from "../../pages/contact/Contact.jsx";


function App() {
  function Layout() {
    return (
      <>
        <Header />
        <Body />
        <Footer />
      </>
    );
  }

  return (<>
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<MainPage />} />
        <Route path='goods' element={<Goods />} />
        <Route path='favorites' element={<Favorites />} />
        <Route path='good/:id' element={<Good />} />
        <Route path='cart' element={<Cart />} />
        <Route
          path='login'
          element={<ProtectedRoute onlyUnAuth element={<Login />} />}
        />
        <Route path='search' element={<Search />} />
        <Route
          path='register'
          element={<ProtectedRoute onlyUnAuth element={<Register />} />}
        />
        <Route
          path='profile'
          element={<ProtectedRoute element={<Profile />} />}
        />
        <Route
          path='profile/orders'
          element={<ProtectedRoute element={<ProfileOrders />} />}
        />
        <Route path='/about' element={<About/>} />
        <Route path='/privacy' element={<Privacy/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='*' element={<NotFound404 />} />
      </Route>
    </Routes>
  </> )
}

export default App
