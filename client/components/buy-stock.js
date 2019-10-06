import React from 'react';
import { connect } from 'react-redux';

export const BuyStock = props => {
  const { user } = props;
  return (
    <div>
      <h2>BUY STOCK</h2>
    </div>
  );
};

const mapState = state => ({
  user: state.user,
});

export default connect(mapState)(BuyStock);