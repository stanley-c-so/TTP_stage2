import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

const defaultState = {
  transactions: [],
};

class Transactions extends Component {
  constructor () {
    super();
    this.state = defaultState;
  }

  async componentDidMount () {
    const { data } = await axios.get('/api/transactions');
    this.setState({transactions: data});
  }

  render () {
    const { user } = this.props;
    const { transactions } = this.state;
    return (
      <div>
        <h2>{user.name}'s Transaction History</h2>
        {transactions.map(t => (
          <div>BUY ({t.ticker}) - {t.quantity} Shares @ ${t.priceAtPurchase / 100}</div>
        ))}
      </div>
    );
  }
}

const mapState = state => ({
  user: state.user,
});

export default connect(mapState)(Transactions);