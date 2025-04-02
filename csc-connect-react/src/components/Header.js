import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Header(props) {
  const { user, logout } = useContext(AuthContext);

  return (
    <header>
      <h1>{props.title}</h1>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/posters">Posters</Link>
        {user ? (
          <button onClick={logout}>Logout</button>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;