import { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';
import { useNavigate } from 'react-router-dom';

function UploadListForm() {
  const [file, setFile] = useState(null);
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      return navigate("/login");
    }
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    try {
     const {data} = await axios.post('http://localhost:5000/api/upload-list', formData);
     console.log(data)
      setMsg('List uploaded and distributed!');
      setTimeout(() => {
        setMsg('');
      }, 3000);
    } catch (err) {
      setMsg(err.response?.data?.message || 'Upload failed');
    }
  };

  return (
    <div className="upload-list-container">
      <form onSubmit={handleUpload} className="upload-form">
        <label htmlFor="file" className="file-label">Upload File</label>
        <input
          type="file"
          id="file"
          accept=".csv,.xlsx,.xls"
          onChange={e => setFile(e.target.files[0])}
          required
          className="file-input"
        />
        <button type="submit" className="submit-btn">Upload List</button>
        {msg && <p className="message">{msg}</p>}
      </form>
    </div>
  );
}

export default UploadListForm;
