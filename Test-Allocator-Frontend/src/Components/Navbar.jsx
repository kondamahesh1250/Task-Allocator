import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

function Navbar({ user, onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    onLogout();
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="navbar-brand" onClick={() => setMenuOpen(false)}>Task Allocator</Link>
      </div>
      <div className={`navbar-toggle ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div className={`navbar-links ${menuOpen ? 'show' : ''}`}>
        {Object.keys(user).length > 1 && user ? (
          <>
            <Link to="/addagent" onClick={() => setMenuOpen(false)}>Add Agent</Link>
            <Link to="/uploadlist" onClick={() => setMenuOpen(false)}>Upload List</Link>
            <Link to="/mylists" onClick={() => setMenuOpen(false)}>My Lists</Link>
            <span className="navbar-user">{user.username}</span>
            <Link to="/login" onClick={handleLogout}>Logout</Link>
          </>
        ) : (
          <>
            <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
            <Link to="/register" onClick={() => setMenuOpen(false)}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
