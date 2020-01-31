import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { giveDate } from '../../utils/date';

import db from '../../../db.js';

import styles from './PostEdit.module.scss';

import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';


//import {connect} from 'react-redux';
//import {reduxSelector, reduxActionCreator} from '../../../redux/example.js';

class Component extends React.Component {
  constructor( props ){
    super( props );
    this.handleChange = this.handleChange.bind(this);
    const giveDate = this.giveDate;
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

  getId() {
    let postId = '';
    if(!this.props.match){
      return 2;
    } else
      postId = this.props.match.params.id;
    return postId;
  }

  render(){
    const id = this.getId();
    let editNote = '';
    for(const note of db.notes){
      if(note.id === Number(id))
        editNote = note;
    }

    return (
      <div>
        <h2>Edit your note here</h2>
        <form className={styles.form} noValidate autoComplete="off">
          <div>
            <TextField required
              className={styles.inputs}
              id="title-input"
              label="Title"
              type="text"
              variant="filled"
              defaultValue={editNote.title}
            />
            <TextField required
              className={styles.inputs}
              id="content-input"
              label="Content"
              multiline
              rows="4"
              type="text"
              variant="filled"
              defaultValue={editNote.content}
            />
            <TextField
              className={styles.inputs}
              id="photo-input"
              label="Photo address"
              type="text"
              variant="filled"
              defaultValue={editNote.photo}
            />
            <TextField
              className={styles.inputs}
              id="local-input"
              label="Localisation"
              type="text"
              variant="filled"
              defaultValue={editNote.local}
            />
            <TextField required
              className={styles.inputs}
              id="email-input"
              label="Email"
              type="text"
              variant="filled"
              defaultValue={editNote.email}
            />
            <TextField
              className={styles.inputs}
              id="phone-input"
              label="Phone number"
              defaultValue={editNote.phone}
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
              <option>{editNote.status}</option>
              <option>Draft</option>
              <option>Published</option>
              <option>Closed</option>
            </Select>
            <TextField disabled
              className={styles.inputs}
              id="actDate-input"
              label="Edition Date"
              type="text"
              variant="filled"
              defaultValue={giveDate()}
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
              ACCEPT CHANGES
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
  match: PropTypes.object,
};

// const mapStateToProps = state => ({
//   someProp: reduxSelector(state),
// });

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg),)
// });

// const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Component as PostEdit,
  //Container as PostEdit,
  Component as PostEditComponent,
};
