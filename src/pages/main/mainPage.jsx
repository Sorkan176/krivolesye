import Greeting from "../../components/Greeting/Greeting.jsx";
import GreetingBody from "../../components/GreetingBody/GreetingBody.jsx";
import './mainPage.css'
import {useEffect, useState} from "react";
import Loading from "../../components/Loading/Loading.jsx";

function MainPage() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    document.fonts.ready.then(() => {
      setFontsLoaded(true);
    });
  }, []);

  if (!fontsLoaded) {
    return <Loading/>;
  }

  return(
    <div className='greeting-container'>
      <Greeting />
      <GreetingBody />
    </div>
  )
}


export default MainPage;