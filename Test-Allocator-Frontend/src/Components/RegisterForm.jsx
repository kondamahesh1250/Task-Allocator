import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function RegisterForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password } = formData;

    if (!username.trim()) {
      setMessage('Username is required');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage('Invalid email format');
      return false;
    }

    if (!password) {
      setMessage('Password is required');
      return false;
    }

    if (password.length < 6) {
      setMessage('Password must be at least 6 characters');
      return false;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/register', formData);
      setMessage(response.data.message);
      navigate('/login');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Registration failed!');
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username </label>
        <input
          type="text"
          name="username"
          placeholder="Full Name"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <br />
        <label htmlFor="email">Email </label>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <br />
        <label htmlFor="password">Password </label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <br />
        <button type="submit">Register</button>
      </form><br />
      <div style={{textAlign:"center"}}>
      <span>Already Exists! <Link to="/login">click here</Link></span>
      {message && <p>{message}</p>}
      </div>
    </div>
  );
}

export default RegisterForm;
