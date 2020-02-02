import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Link } from 'react-router-dom';

import styles from './Header.module.scss';

import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';

import {connect} from 'react-redux';
import {loginSwitch, getLogStatus, getUser} from '../../../redux/loginRedux.js';

class Component extends React.Component {

  checkStatus(login, loginSwitch, user) {
    if(!login){
      return (
        <a className={clsx(styles.Btn, styles.Btngoogle)} href="https://google.com">
        Login with Google
        </a>
      );
    }
    else {
      return (
        <div className={styles.logged}>
          <Button component={Link} variant="contained" className={clsx(styles.Btn, styles.BtnBulletin)} exact to={`${process.env.PUBLIC_URL}/myPosts`}>
            My Bulletins
          </Button>
          <p className={styles.welcome}>Welcome {user.name}</p>
          <Button variant="contained" className={clsx(styles.Btn, styles.BtnLogout)} onClick={loginSwitch}>
            LogOut
          </Button>
        </div>
      );
    }
  }

  render(){
    const {loginSwitch, login, user} = this.props;
    return (
      <div className={clsx(styles.login, styles.root)}>
        <Switch
          onChange={loginSwitch}
          inputProps={{ 'aria-label': 'primary checkbox' }}
        />
        {this.checkStatus(login, loginSwitch, user)}
      </div>
    );
  }
}

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  loginSwitch: PropTypes.func,
  login: PropTypes.bool,
  user: PropTypes.object,
};

const mapStateToProps = state => ({
  login: getLogStatus(state),
  user: getUser(state),
});

const mapDispatchToProps = dispatch => ({
  loginSwitch: () => dispatch(loginSwitch()),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Component as Header,
  Container as HeaderContainer,
  Component as HeaderComponent,
};
