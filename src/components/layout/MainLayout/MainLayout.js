import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import styles from './MainLayout.module.scss';
import { Header } from '../Header/Header';

//import {connect} from 'react-redux';
//import {reduxSelector, reduxActionCreator} from '../../../redux/example.js';

const Component = ({children}) => {
  return (
    <div className={clsx(styles.main, styles.root)}>
      <h2 className={styles.albatroz}>ALBATROZ</h2>
      <Header />
      {children}
    </div>
  );
};

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
  Component as MainLayout,
  //Container as MainLayout,
  Component as MainLayoutComponent,
};
