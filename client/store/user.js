import axios from 'axios';

// initial state
const defaultUser = {};

// action types
const GET_USER = 'GET_USER';
const REMOVE_USER = 'REMOVE_USER';

// action creators
const getUser = user => ({type: GET_USER, user});
const removeUser = () => ({type: REMOVE_USER});

// thunk creators
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me');
    dispatch(getUser(res.data || defaultUser));
  } catch (err) {
    console.error(err);
  }
};

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout');
    dispatch(removeUser());
  } catch (err) {
    console.error(err);
  }
};

// reducer
export default function (state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return {...state, user: action.user};
    default:
      return state;
  }
};