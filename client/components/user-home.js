import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

export const UserHome = props => {
  const { email } = props;

  if (!email) return <Redirect to='/' />;

  return (
    <div>
      <h3>Welcome, {email}</h3>
    </div>
  );
};

const mapState = state => ({email: state.user.email});

export default connect(mapState)(UserHome);