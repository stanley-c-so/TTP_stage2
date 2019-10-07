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
        <h2>{user.name.toUpperCase()}'S TRANSACTION HISTORY</h2>
        {transactions.reverse().map((t, i) => (
          <div className={i % 2 ? "bg-light" : "bg-dark"}>BUY ({t.ticker}) - {t.quantity} Share(s) at ${t.priceAtPurchase / 100} per share - {Date(Date.parse(t.createdAt))}</div>
        ))}
      </div>
    );
  }
}

const mapState = state => ({
  user: state.user,
});

export default connect(mapState)(Transactions);