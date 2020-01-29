import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import styles from './Header.module.scss';

import Button from '@material-ui/core/Button';

//import {connect} from 'react-redux';
//import {reduxSelector, reduxActionCreator} from '../../../redux/example.js';
let logged = true;

class Component extends React.Component {

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
    return (
      <div className={clsx(styles.login, styles.root)}>
        {this.checkStatus()}
      </div>
    );
  }
}

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

// const mapStateToProps = state => ({
//   someProp: reduxSelector(state),
// });

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg),)
// });

// const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Component as Header,
  //Container as Header,
  Component as HeaderComponent,
};
