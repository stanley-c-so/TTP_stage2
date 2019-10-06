import React from 'react';
import { connect } from 'react-redux';
import { PortfolioList, BuyStock } from '../components';

export const Portfolio = props => {
  const { user } = props;
  return (
    <div>
      <div>
        <h2>{user.name}'s Portfolio</h2>
      </div>
      <div id="portfolio-page">
        <PortfolioList />
        <BuyStock />
      </div>
    </div>
  );
};

const mapState = state => ({
  user: state.user,
});

export default connect(mapState)(Portfolio);