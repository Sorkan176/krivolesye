import './Body.css'
import {Outlet} from "react-router-dom";
import SearchForm from "../Search/SearchForm.jsx";

function Body() {
  return (<main className="body-container">
      <SearchForm />
      <Outlet />
  </main>)
}

export default Body;