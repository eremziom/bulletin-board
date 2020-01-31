import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import styles from './Header.module.scss';

import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';

import {connect} from 'react-redux';
import {loginSwitch} from '../../../redux/loginRedux.js';
let logged = true;

class Component extends React.Component {
  constructor( props ){
    super( props );
  }

  loggout() {
    console.log('clicked, and logged out');
  }

  checkStatus() {
    if(!logged){
      return (
        <a className={clsx(styles.Btn, styles.Btngoogle)} href="https://google.com">
        Login with Google
        </a>
      );
    }
    else {
      return (
        <div className={styles.logged}>
          <Button variant="contained" className={clsx(styles.Btn, styles.BtnBulletin)} href="/myPosts">
            My Bulletins
          </Button>
          <p className={styles.welcome}>Welcome USER</p>
          <Button variant="contained" className={clsx(styles.Btn, styles.BtnLogout)} onClick={this.loggout}>
            LogOut
          </Button>
        </div>
      );
    }
  }

  render(){
    const {loginSwitch} = this.props;
    return (
      <div className={clsx(styles.login, styles.root)}>
        <Switch
          onChange={loginSwitch}
          inputProps={{ 'aria-label': 'primary checkbox' }}
        />
        {this.checkStatus()}
      </div>
    );
  }
}

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  loginSwitch: PropTypes.func,
};

// const mapStateToProps = state => ({
//   someProp: reduxSelector(state),
// });

const mapDispatchToProps = dispatch => ({
  loginSwitch: () => dispatch(loginSwitch()),
});

const Container = connect(null, mapDispatchToProps)(Component);

export {
  Component as Header,
  Container as HeaderContainer,
  Component as HeaderComponent,
};
