import React from 'react';
import Button from '@material-ui/core/Button';
import styles from './button.module.scss';
import PropTypes from 'prop-types';

const NewButton = (props) => {
  return (
    <Button variant="contained" className={styles.Btn} type={props.type}>
      {props.children}
    </Button>
  );
};

NewButton.propTypes = {
  type: PropTypes.string,
  children: PropTypes.node,
};

export default NewButton;
