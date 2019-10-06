import React from 'react';
import { connect } from 'react-redux';

export const PortfolioList = props => {
  const { user } = props;
  return (
    <div>
      <h2>PORTFOLIO LIST</h2>
    </div>
  );
};

const mapState = state => ({
  user: state.user,
});

export default connect(mapState)(PortfolioList);