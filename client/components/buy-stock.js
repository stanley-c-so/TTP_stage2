import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

class BuyStock extends Component {
  constructor () {
    super ();
    this.state = {
      ticker: '',
      quantity: '',
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
    const result = await axios.post('/api/transactions', {
      ticker: this.state.ticker,
      quantity: this.state.quantity,
      balance: this.props.user.balance,
    });
    console.log('RESULT:', result);
    this.setState({
      ticker: '',
      quantity: ''
    });
  }

  render () {
    console.log('THIS.PROPS.USER:', this.props.user)
    return (
      <div>
        <h2>BUY STOCK</h2>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor='ticker'>Ticker Symbol:</label>
          <input required type='text' name='ticker' value={this.state.ticker} onChange={this.handleChange} />
          <label htmlFor='quantity'>Quantity:</label>
          <input required type='text' name='quantity' value={this.state.quantity} onChange={this.handleChange} />
          <button type='submit'>Submit</button>
        </form>
      </div>
    );
  }
}

const mapState = state => ({
  user: state.user,
});

// const mapDispatch = dispatch => ({
//   handleSubmit(evt) {
//     evt.preventDefault();
//     const ticker = evt.target.ticker.value;
//     const quantity = evt.target.quantity.value;

//   }
// });

export default connect(mapState)(BuyStock);