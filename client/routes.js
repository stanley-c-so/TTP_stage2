import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import {
  Login,
  Signup,
  UserHome,
  Portfolio,
  Transactions,
} from './components';
import { me } from './store';

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props;
    return (
      <div id="main-page">
        {isLoggedIn ? (
          <Switch>
            <Route path="/home" component={UserHome} />
            <Route path="/portfolio" component={Portfolio} />
            <Route path="/transactions" component={Transactions} />
            <Route component={UserHome} />
          </Switch>
        ) : (
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route component={Login} />
          </Switch>
        )}
      </div>
    )
  };
}

const mapState = state => ({
  isLoggedIn: !!state.user.id,
});

const mapDispatch = dispatch => ({
  loadInitialData() {
    dispatch(me());
  },
});

export default connect(mapState, mapDispatch)(Routes);