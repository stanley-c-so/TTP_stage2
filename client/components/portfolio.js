import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTransactionsThunk } from '../store';
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
        this.props.getTransactions();
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

  componentDidMount() {
    this.props.getTransactions();
  }

  render () {
    const { status } = this.state;
    const { user, portfolio } = this.props;
    return (
      <div id="portfolio-page">
        <div>
          <h2>PORTFOLIO LIST (${parseFloat(Object.keys(portfolio).reduce((total, ticker) => total + portfolio[ticker].currentPrice, 0) / 100).toFixed(2))}</h2>
          {Object.keys(portfolio).length ? Object.keys(portfolio).map(ticker => (
            <div>{ticker}: {portfolio[ticker].quantity} share(s) - <span className={portfolio[ticker].currentPrice > portfolio[ticker].dayOpen ? "green" : portfolio[ticker].currentPrice < portfolio[ticker].dayOpen ? "red" : "gray"}>${parseFloat(portfolio[ticker].currentPrice / 100).toFixed(2)}</span></div>
          )) : (<div>Empty portfolio or API rate limit exceeded</div>)}
        </div>
        <div>
          <h2>CASH - ${parseFloat(user.balance / 100).toFixed(2)}</h2>
          <form onSubmit={this.handleSubmit}>
            <label htmlFor='ticker'>Ticker Symbol:</label>
            <input required type='text' name='ticker' value={this.state.ticker} onChange={this.handleChange} />
            <label htmlFor='quantity'>Quantity:</label>
            <input required type='number' min="1" name='quantity' value={this.state.quantity} onChange={this.handleChange} />
            <button type='submit'>Submit</button>
            {status && <div>{status}</div>}
          </form>
        </div>
      </div>
    );
  }
}

const mapState = state => ({
  user: state.user,
  portfolio: state.portfolio,
});

const mapDispatch = dispatch => ({
  updateBalance(quantity, priceAtPurchase) {
    dispatch(updateBalanceThunk(quantity, priceAtPurchase));
  },
  getTransactions() {
    dispatch(getTransactionsThunk());
  },
});

export default connect(mapState, mapDispatch)(BuyStock);