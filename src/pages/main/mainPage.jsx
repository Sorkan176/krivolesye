import Greeting from "../../components/Greeting/Greeting.jsx";
import GreetingBody from "../../components/GreetingBody/GreetingBody.jsx";
import './mainPage.css'

function MainPage() {
  return(
    <div className='greeting-container'>
      <Greeting />
      <GreetingBody />
    </div>
  )
}


export default MainPage;