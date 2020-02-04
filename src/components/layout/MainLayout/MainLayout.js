import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Link } from 'react-router-dom';

import styles from './MainLayout.module.scss';
import { HeaderContainer } from '../Header/Header';

import Container from '@material-ui/core/Container';

const Component = ({children}) => {
  return (
    <div className={clsx(styles.main, styles.root)}>
      <h2 className={styles.albatroz}><Link exact to={`${process.env.PUBLIC_URL}/`}>ALBATROZ</Link></h2>
      <Container maxWidth="lg">
        <HeaderContainer />
        {children}
      </Container>
    </div>
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export {
  Component as MainLayout,
  Component as MainLayoutComponent,
};
