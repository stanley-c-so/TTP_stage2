import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

export const Portfolio = props => {
  const { user } = props;
  if (!user) return <Redirect to='/' />;
  return (
    <div>
      <h3>{user.name}'s Portfolio page currently under construction</h3>
    </div>
  );
};

const mapState = state => ({
  user: state.user,
});

export default connect(mapState)(Portfolio);