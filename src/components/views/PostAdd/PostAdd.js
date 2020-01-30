import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import db from '../../../db.js';

import styles from './PostAdd.module.scss';

import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

//import {connect} from 'react-redux';
//import {reduxSelector, reduxActionCreator} from '../../../redux/example.js';

class Component extends React.Component {
  constructor( props ){
    super( props );
    this.handleChange = this.handleChange.bind(this);
  }

  state = {
    status: '',
  }

  handleChange = name => event => {
    this.setState({
      ...this.state,
      [name]: event.target.value,
    });
  };

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
              id="content-input"
              label="Content"
              multiline
              rows="4"
              type="text"
              variant="filled"
            />
            <TextField
              className={styles.inputs}
              id="photo-input"
              label="Photo address"
              type="text"
              variant="filled"
            />
            <TextField
              className={styles.inputs}
              id="local-input"
              label="Localisation"
              type="text"
              variant="filled"
            />
            <TextField required
              className={styles.inputs}
              id="email-input"
              label="Email"
              type="text"
              variant="filled"
            />
            <TextField
              className={styles.inputs}
              id="phone-input"
              label="Phone number"
              defaultValue="+48 "
              type="text"
              variant="filled"
            />
            <InputLabel className={clsx(styles.inputs, styles.short)} htmlFor="status-switch">Status</InputLabel>
            <Select
              className={clsx(styles.inputs, styles.short)}
              native
              value={this.state.status}
              onChange={this.handleChange('status')}
              inputProps={{
                name: 'status',
                id: 'status-switch',
              }}
            >
              <option value={10}>Draft</option>
              <option value={20}>Published</option>
              <option value={30}>Closed</option>
            </Select>
            <TextField disabled
              className={styles.inputs}
              id="pubDate-input"
              label="Publish Date"
              type="text"
              variant="filled"
              defaultValue={this.giveDate()}
            />
            <TextField disabled
              className={styles.inputs}
              id="author-input"
              label="Author"
              type="text"
              variant="filled"
              defaultValue="Currently logged"
            />
            <Button variant="contained" className={styles.Btn} type="submit">
              SUBMIT
            </Button>
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
