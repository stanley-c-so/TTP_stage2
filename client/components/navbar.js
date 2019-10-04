import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';

const Navbar = ({ handleClick, isLoggedIn }) => (
  <div>
    <h1>TTP STAGE 2</h1>
    <nav>
      {isLoggedIn ? (
        <div>
          <div>
            <Link to="/home">Home</Link>
          </div>
          <div>
            <a href="#" onClick={handleClick}>
              Logout
            </a>
          </div>
        </div>
      ) : (
          <div>
            <div>
              <Link to="/login">Login</Link>
            </div>
            <div>
              <Link to="/signup">Sign Up</Link>
            </div>
          </div>
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