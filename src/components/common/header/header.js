import React from 'react';
import styles from './header.module.scss';
import PropTypes from 'prop-types';

const NewHeader = (props) => {
  return (
    <h2 className={styles.header}>{props.children}</h2>
  );
};

NewHeader.propTypes = {
  children: PropTypes.node,
};

export default NewHeader;
