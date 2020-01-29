import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import db from '../../../db.js';

import styles from './PostAdd.module.scss';

import TextField from '@material-ui/core/TextField';

//import {connect} from 'react-redux';
//import {reduxSelector, reduxActionCreator} from '../../../redux/example.js';

class Component extends React.Component {

  giveDate() {
    const newDate = new Date();
    const date = newDate.toLocaleDateString('PL', { // you can skip the first argument
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
    const time = newDate.toLocaleTimeString('PL', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short',
    });
    return `${date} ${time}`;
  }

  render(){
    return (
      <div>
        <h2>Add your Bulletin here!</h2>
        <form className={styles.form} noValidate autoComplete="off">
          <div>
            <TextField required
              className={styles.inputs}
              id="title-input"
              label="Title"
              type="text"
              variant="filled"
            />
            <TextField required
              className={styles.inputs}
              id="title-input"
              label="Content"
              type="text"
              variant="filled"
            />
            <TextField required
              className={styles.inputs}
              id="title-input"
              label="email"
              type="text"
              variant="filled"
            />
            <TextField disabled
              className={styles.inputs}
              id="title-input"
              label="Publish Date"
              type="text"
              variant="filled"
              defaultValue={this.giveDate()}
            />
          </div>
        </form>
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
  Component as PostAdd,
  //Container as PostAdd,
  Component as PostAddComponent,
};
