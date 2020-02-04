import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { giveDate } from '../../utils/date';
import NewButton from '../../common/button/button';
import NewHeader from '../../common/header/header';

import styles from './PostAdd.module.scss';

import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';

import {connect} from 'react-redux';
import {addNewPost, getAll} from '../../../redux/postsRedux';
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

  updateTextField = ({target}) => {
    const { note } = this.state;
    const { value, name } = target;
    this.setState({note: {...note, [name]: value}});
  }

  updateData = () => {
    const { note } = this.state;
    const { posts } = this.props;
    const date = document.getElementById('pubDate-input');
    const author = document.getElementById('author-input');
    this.setState({note: {...note, pubDate: date.value, author: author.value, id: posts.length+1}});
  }

  statusChange = name => event => {
    const { note } = this.state;
    this.setState({
      ...this.state,
      note: {...note, [name]: event.target.value,
      },
    });
  };

  async submitClick (event) {
    event.preventDefault();

    const {updateData} = this;
    await updateData();

    const { note } = this.state;
    await this.props.addNewPost(note);
  }

  render(){
    const {user} = this.props;
    const {note} = this.state;
    const {updateTextField, submitClick} = this;
    return (
      <div>
        <NewHeader>ADD NEW NOTE HERE</NewHeader>
        <form className={styles.form} noValidate autoComplete="off" onSubmit={submitClick}>
          <div>
            <TextField required
              className={styles.inputs}
              id="title-input"
              label="Title"
              type="text"
              variant="filled"
              value={note.title}
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
              onChange={updateTextField}
              name='content'
            />
            <TextField
              className={styles.inputs}
              id="photo-input"
              label="Photo address"
              type="text"
              variant="filled"
              onChange={updateTextField}
              name='photo'
            />
            <TextField
              className={styles.inputs}
              id="local-input"
              label="Localisation"
              type="text"
              variant="filled"
              onChange={updateTextField}
              name='local'
            />
            <TextField
              className={styles.inputs}
              id="price-input"
              label="Price"
              type="text"
              variant="filled"
              onChange={updateTextField}
              name='price'
            />
            <TextField required
              className={styles.inputs}
              id="email-input"
              label="Email"
              type="text"
              variant="filled"
              onChange={updateTextField}
              name='email'
              defaultValue={user ? user.email : ''}
            />
            <TextField
              className={styles.inputs}
              id="phone-input"
              label="Phone number"
              defaultValue="+48 "
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
              <option value='draft'>Draft</option>
              <option value='published'>Published</option>
              <option value='closed'>Closed</option>
            </Select>
            <TextField disabled
              className={styles.inputs}
              id="pubDate-input"
              label="Publish Date"
              type="text"
              variant="filled"
              value={giveDate()}
              name='pubDate'
            />
            <TextField disabled
              className={styles.inputs}
              id="author-input"
              label="Author"
              type="text"
              variant="filled"
              value={user ? user.name : ''}
              name='author'
            />
            <NewButton type={'submit'}>
              SUBMIT
            </NewButton>
          </div>
        </form>
      </div>
    );
  }
}

Component.propTypes = {
  addNewPost: PropTypes.func,
  user: PropTypes.object,
  posts: PropTypes.array,
  login: PropTypes.bool,
  history: PropTypes.object,
};

const mapStateToProps = state => ({
  user: getUser(state),
  login: getLogStatus(state),
  posts: getAll(state),
});

const mapDispatchToProps = dispatch => ({
  addNewPost: payload => dispatch(addNewPost(payload)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Component as PostAdd,
  Container as PostAddContainer,
  Component as PostAddComponent,
};
