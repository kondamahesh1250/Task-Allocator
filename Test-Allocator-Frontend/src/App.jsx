import { Routes, Route, useNavigate } from 'react-router-dom';
import LoginForm from './Components/LoginForm';
import AddAgentForm from './Components/AddAgentForm';
import UploadListForm from './Components/UploadListForm';
import AgentListView from './Components/AgentListView';
import Navbar from './Components/Navbar';
import RegisterForm from './Components/RegisterForm';
import axios from 'axios';
import { useEffect, useState } from 'react';
import LandingPage from './Components/LandingPage';

function App() {
  const [user, setUser] = useState([]);
  const navigate = useNavigate();

  const fetchUser = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('No token found');
      navigate("/login");
      setUser([]);
      return;
    }

    try {
      const { data } = await axios.get('http://localhost:5000/api/verifyuser', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUser(data.user);
    } catch (err) {
      console.error('Unauthorized:', err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser([])
  };

  return (
    <>
      <Navbar user={user} onLogout={handleLogout} />
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path="/login" element={<LoginForm onLoginSuccess={fetchUser} />} />
        <Route path="/addagent" element={<AddAgentForm />} />
        <Route path="/uploadlist" element={<UploadListForm />} />
        <Route path="/mylists" element={<AgentListView />} />
        <Route path="/register" element={<RegisterForm />} />
      </Routes>
    </>

  );
}

export default App;
