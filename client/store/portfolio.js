import axios from 'axios';

// initial state
const defaultPortfolio = {};

// action types
const UPDATE_PORTFOLIO = 'UPDATE_PORTFOLIO';

// action creators
const updatePortfolio = portfolio => ({ type: UPDATE_PORTFOLIO, portfolio });

// thunk creators
export const getTransactionsThunk = () => async dispatch => {
  try {
    const transactions = await axios.get('/api/transactions');
    const portfolio = {};
    transactions.data.forEach(({ticker, quantity}) => {
      portfolio[ticker] = portfolio[ticker] || {};
      portfolio[ticker].quantity = portfolio[ticker].quantity + quantity || quantity;
    });

    const portfolioStringify = JSON.stringify(portfolio);
    const currentData = await axios.get(`/api/transactions/${portfolioStringify}`);
    Object.values(currentData.data).forEach(ticker => {
      portfolio[ticker.data.symbol].currentPrice = +ticker.data.price * 100;
      portfolio[ticker.data.symbol].dayOpen = +ticker.data.open * 100;
    });
    console.log('PORTFOLIO:', portfolio)
    dispatch(updatePortfolio(portfolio));
  } catch (err) {
    console.error(err);
  }
}

// reducer
export default function (state = defaultPortfolio, action) {
  switch (action.type) {
    case UPDATE_PORTFOLIO:
      return action.portfolio;
    default:
      return state;
  }
};