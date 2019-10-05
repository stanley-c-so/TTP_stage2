import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';

const Navbar = ({ handleClick, isLoggedIn }) => (
  <div>
    <nav>
      <h1>oscar stock portfolio app</h1>
      {isLoggedIn ? (
        <ul>
          <li>
            {/* TEST */}
            <Link to="/home">Home</Link>
          </li>
          <li>
            <a href="#" onClick={handleClick}>
              Logout
            </a>
          </li>
        </ul>
      ) : (
          <ul>
            <li>
              {/* TEST */}
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
          </ul>
        )}
    </nav>
    <hr />
  </div>
)

const mapState = state => ({
  isLoggedIn: !!state.user.id,
});

const mapDispatch = dispatch => ({
  handleClick() {
    dispatch(logout());
  },
});

export default connect(mapState, mapDispatch)(Navbar);