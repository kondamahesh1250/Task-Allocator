import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginForm({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const token = localStorage.getItem("token")
  useEffect(() => {
    if (token) {
      return navigate('/addagent');
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setError('Email is required');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Invalid email format');
      return false;
    }

    if (!password) {
      setError('Password is required');
      return false;
    }

    try {
      const { data } = await axios.post('http://localhost:5000/api/login', { email, password });
      localStorage.setItem('token', data.token);
      setTimeout(() => {
        navigate("/addagent");
        onLoginSuccess();
        setEmail("");
        setPassword("");
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label htmlFor="email">Email</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="Email" />

        <label htmlFor="password">Password</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="Password" />

        <button type="submit">Login</button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
}

export default LoginForm;
