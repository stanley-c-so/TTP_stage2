import React from 'react';
import { connect } from 'react-redux';

export const UserHome = props => {
  const { user } = props;
  return (
    <div>
      <h2>Welcome, {user.name}!</h2>
    </div>
  );
};

const mapState = state => ({
  user: state.user,
});

export default connect(mapState)(UserHome);