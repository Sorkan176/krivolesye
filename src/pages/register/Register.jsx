import './Register.css'
import {useState} from "react";
import { useNavigate} from "react-router-dom";
import {signUp} from "../../api/auth.js";
import EnterForm from "../../components/EnterForm/EnterForm.jsx";


function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();

    if (loading) return;

    setError('');
    setMessage('');
    setLoading(true);

    try {
      const data = await signUp({name, email, password});

      if (data.session) {
        const from = location.state?.from || '/';
        navigate(from, { replace: true });
      } else {
        setMessage(
          'Проверьте почту и подтвердите регистрацию.'
        );
      }
    } catch (error) {
      if (error.status === 429) {
        setError(
          'Слишком много попыток регистрации. Попробуйте немного позже.'
        );
      } else {
        setError(error.message);
      }
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
      name={name}
      setName={setName}
      handleSubmit={handleSubmit}
      formAction={loading ? 'Регистрация...' : 'Зарегистрироваться'}
      loading={loading}
    />
  );
}

export default Register