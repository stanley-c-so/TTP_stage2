// initial state
const defaultUser = {};

// action types
const GET_USER = 'GET_USER';
const REMOVE_USER = 'REMOVE_USER';

// action creators
const getUser = user => ({type: GET_USER, user});
const removeUser = () => ({type: REMOVE_USER});

// thunk creators

// reducer
export default function (state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return {...state, user: action.user};
    default:
      return state;
  }
}