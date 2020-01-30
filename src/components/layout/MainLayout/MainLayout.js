import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import styles from './MainLayout.module.scss';
import { Header } from '../Header/Header';

import Container from '@material-ui/core/Container';

//import {connect} from 'react-redux';
//import {reduxSelector, reduxActionCreator} from '../../../redux/example.js';

const Component = ({children}) => {
  return (
    <div className={clsx(styles.main, styles.root)}>
      <h2 className={styles.albatroz}><a href="/">ALBATROZ</a></h2>
      <Container maxWidth="lg">
        <Header />
        {children}
      </Container>
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
