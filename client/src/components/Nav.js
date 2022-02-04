import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context';

const Nav = () => {
  const navigate = useNavigate();
  const [state, setState] = useContext(UserContext);

  const handleLogout = () => {
    localStorage.removeItem('auth');
    setState({ user: {}, token: '' });
    navigate('/login', { replace: true });
  };

  return (
    <ul className='nav border'>
      <li className='nav-item'>
        <Link className='nav-link active' aria-current='page' to='/'>
          Home
        </Link>
      </li>
      {state && state.token ? (
        <div className='nav-item ms-auto dropdown'>
          <li
            className='nav-link dropdown-toggle'
            style={{ cursor: 'pointer' }}
            data-bs-toggle='dropdown'
          >
            {state.user.email}
          </li>
          <ul className='dropdown-menu '>
            <li className='nav-item dropdown-item'>
              <Link className='nav-link' to='/account'>
                Account
              </Link>
            </li>
            <li className='nav-item dropdown-item cursor' onClick={handleLogout}>
              <span className='nav-link' style={{ cursor: 'pointer' }}>
                Logout
              </span>
            </li>
          </ul>
        </div>
      ) : (
        <>
          <li className='nav-item'>
            <Link className='nav-link' to='/register'>
              Sign Up
            </Link>
          </li>
          <li className='nav-item'>
            <Link className='nav-link' to='/login'>
              Login
            </Link>
          </li>
        </>
      )}
    </ul>
  );
};

export default Nav;
