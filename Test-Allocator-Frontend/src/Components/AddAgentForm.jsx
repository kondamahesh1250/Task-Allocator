import { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';
import { useNavigate } from 'react-router-dom';

function AddAgentForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    mobile: '',
    password: ''
  });
  const [msg, setMsg] = useState('');
  const [user, setUser] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, mobile, password } = form;

    if (!name.trim()) {
      setMsg('Name is required');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMsg('Invalid email format');
      return false;
    }

    const mobileRegex = /^[6-9]\d{9}$/;
    if (!mobileRegex.test(mobile)) {
      setMsg('Invalid mobile number');
      return false;
    }

    if (!password || password.length < 6) {
      setMsg('Password must be at least 6 characters');
      return false;
    }

    try {
      await axios.post('http://localhost:5000/api/add-agent', form);
      setMsg('Agent added successfully');
      setTimeout(() => {
        setMsg('');
      }, 3000);
      fetchUser();
      setForm({ name: '', email: '', mobile: '', password: '' });
    } catch (err) {
      setMsg(err.response?.data?.message || 'Error adding agent');
    }
  }

  const fetchUser = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/agent');
      setUser(data);
    } catch (error) {
      setMsg(error.response?.data?.message || "Failed to fetch users");
    }
  };

  useEffect(() => {
    if (!token) {
      return navigate("/login");
    }
    fetchUser();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/delete-agent/${id}`);
      fetchUser();
    } catch (err) {
      console.error('Error deleting agent:', err);
    }
  };

  return (
    <div className="add-agent-container">
      <div className="form-container">
        <h2 className="form-heading">Add New Agent</h2>
        <form onSubmit={handleSubmit} className="agent-form">
          <label htmlFor="name">Name</label>
          <input type="text" name="name" value={form.name} onChange={handleChange} required placeholder="Full Name" />

          <label htmlFor="email">Email</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="Email" />

          <label htmlFor="mobile">Mobile</label>
          <input type="text" name="mobile" value={form.mobile} onChange={handleChange} required placeholder="+1XXXXXXXXXX" />

          <label htmlFor="password">Password</label>
          <input type="password" name="password" value={form.password} onChange={handleChange} required placeholder="Password" />

          <button type="submit" className="submit-btn">Add Agent</button>

          {msg && <p className="msg">{msg}</p>}
        </form>
      </div>
      <div className="table-container">
        <h2>Existing Agents</h2>

        {user.length > 0 ? (
          <table className="agent-table">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {user.map((item, index) => (
                <tr key={item._id || index}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.mobile}</td>
                  <td><button className='btn-del-form' onClick={() => (handleDelete(item._id))}>Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div style={{ textAlign: "center", marginTop: "100px" }}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/17134/17134606.png"
              alt=""
              width="200"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default AddAgentForm;
