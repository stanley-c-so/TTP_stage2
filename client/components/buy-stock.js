import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateBalanceThunk } from '../store';
import axios from 'axios';

class BuyStock extends Component {
  constructor () {
    super ();
    this.state = {
      ticker: '',
      quantity: '',
      status: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  }

  async handleSubmit(evt) {
    evt.preventDefault();
    try {
      const res = await axios.post('/api/transactions', {
        ticker: this.state.ticker,
        quantity: this.state.quantity,
        balance: this.props.user.balance,
      });
      if (typeof res.data === 'string' && res.data.includes('Error:')) {
        this.setState({ status: res.data });
      } else {
        const { ticker, quantity, priceAtPurchase } = res.data;
        this.props.updateBalance(quantity, priceAtPurchase);
        this.setState({
          ticker: '',
          quantity: '',
          status: `Purchased ${quantity} share(s) of ${ticker} at $${parseFloat(priceAtPurchase / 100).toFixed(2)} per share.`,
        });
      }
    } catch (err) {
      console.error(err);
    }
  }

  render () {
    const { status } = this.state;
    const { user } = this.props;
    return (
      <div>
        <h2>CASH - ${parseFloat(user.balance / 100).toFixed(2)}</h2>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor='ticker'>Ticker Symbol:</label>
          <input required type='text' name='ticker' value={this.state.ticker} onChange={this.handleChange} />
          <label htmlFor='quantity'>Quantity:</label>
          <input required type='text' name='quantity' value={this.state.quantity} onChange={this.handleChange} />
          <button type='submit'>Submit</button>
          {status && <div>{status}</div>}
        </form>
      </div>
    );
  }
}

const mapState = state => ({
  user: state.user,
});

const mapDispatch = dispatch => ({
  updateBalance(quantity, priceAtPurchase) {
    dispatch(updateBalanceThunk(quantity, priceAtPurchase));
  },
});

export default connect(mapState, mapDispatch)(BuyStock);