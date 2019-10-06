import axios from 'axios';
import history from '../history';

// initial state
const defaultUser = {};

// action types
const GET_USER = 'GET_USER';
const REMOVE_USER = 'REMOVE_USER';
const UPDATE_BALANCE = 'UPDATE_BALANCE';

// action creators
const getUser = user => ({ type: GET_USER, user });
const removeUser = () => ({ type: REMOVE_USER });

const updateBalance = balance => ({type: UPDATE_BALANCE, balance });

// thunk creators
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me');
    dispatch(getUser(res.data || defaultUser));
  } catch (err) {
    console.error(err);
  }
};

export const auth = (formName, email, password, username) => async dispatch => {
  let res;
  try {
    res = await axios.post(`/auth/${formName}`, { email, password, username });
  } catch (authError) {
    return dispatch(getUser({ error: authError }));
  }
  try {
    dispatch(getUser(res.data));
    history.push('/home');
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr);
  }
};

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout');
    dispatch(removeUser());
    history.push('/login');
  } catch (err) {
    console.error(err);
  }
};

export const updateBalanceThunk = (quantity, priceAtPurchase) => async dispatch => {
  try {
    const { data } = await axios.put('/api/users', {
      quantity,
      priceAtPurchase,
    });
    dispatch(updateBalance(data.balance));
  } catch (err) {
    console.error(err);
  }
}

// reducer
export default function (state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user;
    case REMOVE_USER:
      return defaultUser;
    case UPDATE_BALANCE:
      return {...state, balance: action.balance};
    default:
      return state;
  }
};