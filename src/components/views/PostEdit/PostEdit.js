import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { giveDate } from '../../utils/date';

import styles from './PostEdit.module.scss';

import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

import {connect} from 'react-redux';
import {getAll, editPost} from '../../../redux/postsRedux';
import {getUser, getLogStatus} from '../../../redux/loginRedux';

class Component extends React.Component {
  constructor( props ){
    super( props );
    this.statusChange = this.statusChange.bind(this);
    this.submitClick = this.submitClick.bind(this);
  }

  state = {
    note: {
      id: '',
      title: '',
      content: '',
      pubDate: '',
      actDate: '',
      email: '',
      status: 'draft',
      photo: '',
      price: '',
      phone: '',
      local: '',
      author: '',
    },
  }

  componentDidMount = () => {
    const {login} = this.props;
    if(!login && this.props.history){
      this.props.history.push('/NotFound');
    }
  }

  updateData = () => {
    const { note } = this.state;
    //const { posts } = this.props;
    const date = document.getElementById('actDate-input');
    const author = document.getElementById('author-input');
    this.setState({note: {...note, pubDate: date.value, author: author.value, id: Number(this.props.match.params.id)}});
  }

  updateTextField = ({target}) => {
    const { note } = this.state;
    const { value, name } = target;
    this.setState({note: {...note, [name]: value}});
  }

  statusChange = name => event => {
    const { note } = this.state;
    this.setState({
      ...this.state,
      note: {...note, [name]: event.target.value,
      },
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

  async submitClick (event) {
    event.preventDefault();

    const {updateData} = this;
    await updateData();

    const { note } = this.state;
    await this.props.editPost(note);
  }

  render(){
    const id = this.getId();
    const {posts} = this.props;
    const {updateTextField} = this;
    let editNote = '';

    if(posts){
      posts.map(note => {
        if(note.id === Number(id))
          editNote = note;
      });
    }

    return (
      <div>
        <h2>Edit your note here</h2>
        <form className={styles.form} noValidate autoComplete="off" onSubmit={this.submitClick}>
          <div>
            <TextField required
              className={styles.inputs}
              id="title-input"
              label="Title"
              type="text"
              variant="filled"
              defaultValue={editNote.title}
              onChange={updateTextField}
              name='title'
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
              onChange={updateTextField}
              name='content'
            />
            <TextField
              className={styles.inputs}
              id="photo-input"
              label="Photo address"
              type="text"
              variant="filled"
              defaultValue={editNote.photo}
              onChange={updateTextField}
              name='photo'
            />
            <TextField
              className={styles.inputs}
              id="local-input"
              label="Localisation"
              type="text"
              variant="filled"
              defaultValue={editNote.local}
              onChange={updateTextField}
              name='local'
            />
            <TextField required
              className={styles.inputs}
              id="email-input"
              label="Email"
              type="text"
              variant="filled"
              defaultValue={editNote.email}
              onChange={updateTextField}
              name='email'
            />
            <TextField
              className={styles.inputs}
              id="phone-input"
              label="Phone number"
              defaultValue={editNote.phone}
              type="text"
              variant="filled"
              onChange={updateTextField}
              name='phone'
            />
            <InputLabel className={clsx(styles.inputs, styles.short)} htmlFor="status-switch">Status</InputLabel>
            <Select
              className={clsx(styles.inputs, styles.short)}
              native
              value={this.state.status}
              onChange={this.statusChange('status')}
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
              name='actDate'
            />
            <TextField disabled
              className={styles.inputs}
              id="author-input"
              label="Author"
              type="text"
              variant="filled"
              defaultValue="Currently logged"
              name='author'
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
  posts: PropTypes.array,
  user: PropTypes.object,
  login: PropTypes.bool,
  editPost: PropTypes.func,
  history: PropTypes.object,
};

const mapStateToProps = state => ({
  posts: getAll(state),
  user: getUser(state),
  login: getLogStatus(state),

});

const mapDispatchToProps = dispatch => ({
  editPost: payload => dispatch(editPost(payload)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Component as PostEdit,
  Container as PostEditContainer,
  Component as PostEditComponent,
};
