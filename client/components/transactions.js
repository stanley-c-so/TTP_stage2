import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

export const Transactions = props => {
  const { user } = props;
  if (!user) return <Redirect to='/' />;
  return (
    <div>
      <h3>{user.name}'s Transaction History page currently under construction</h3>
    </div>
  );
};

const mapState = state => ({
  user: state.user,
});

export default connect(mapState)(Transactions);