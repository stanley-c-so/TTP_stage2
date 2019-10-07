import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

export const UserHome = props => {
  const { user } = props;
  return (
    <div id="home">
      <h2>WELCOME, {user.name.toUpperCase()}!</h2>
        <Link to="/portfolio">Portfolio</Link>
        <Link to="/transactions">Transaction History</Link>
    </div>
  );
};

const mapState = state => ({
  user: state.user,
});

export default connect(mapState)(UserHome);