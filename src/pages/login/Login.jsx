import './Login.css'
import {useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import EnterForm from "../../components/EnterForm/EnterForm.jsx";
import {signIn} from "../../api/auth.js"

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    setError('');
    setLoading(true);

    try {
      await signIn({ email, password });
      const from = location.state?.from || '/';
      navigate(from, { replace: true });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
      <EnterForm
        errorText={error}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        handleSubmit={handleSubmit}
        formAction={loading ? 'Вход...' : 'Войти'}
        loading={loading}
      />
  );
}

export default Login;