import React from 'react';
import { connect } from 'react-redux';
import { auth } from '../store';

const AuthForm = props => {
  const { name, displayName, handleSubmit, error } = props;
  return (
    <div id="auth-form">
      <form onSubmit={handleSubmit} name={name}>
        {name === 'signup' ? (
          <div>
            <label htmlFor="username">
              <small>Name</small>
            </label>
            <input required name="username" type="text" />
          </div>
        ): <div />}
        <div>
          <label htmlFor="email">
            <small>Email</small>
          </label>
          <input required name="email" type="email" />
        </div>
        <div>
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input name="password" type="password" />
        </div>
        <div>
          <button type="submit">{displayName}</button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
    </div>
  );
};

const mapLogin = state => ({
  name: 'login',
  displayName: 'Login',
  error: state.user.error,
});

const mapSignup = state => ({
  name: 'signup',
  displayName: 'Sign Up',
  error: state.user.error,
});

const mapDispatch = dispatch => ({
  handleSubmit(evt) {
    evt.preventDefault();
    const formName = evt.target.name;
    const email = evt.target.email.value;
    const password = evt.target.password ? evt.target.password.value : '';
    const username = evt.target.username ? evt.target.username.value : undefined;
    dispatch(auth(formName, email, password, username));
  },
});

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);