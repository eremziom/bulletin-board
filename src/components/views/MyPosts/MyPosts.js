import React from 'react';
import PropTypes from 'prop-types';
//import clsx from 'clsx';
import { Link } from 'react-router-dom';
import NewHeader from '../../common/header/header';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import styles from './MyPosts.module.scss';

import {connect} from 'react-redux';
import {getLogStatus, getUser} from '../../../redux/loginRedux';
import {getAll, fetchMyPosts} from '../../../redux/postsRedux';

class Component extends React.Component {

  async componentDidMount() {
    const {getMyPosts, user} = this.props;
    const userName = user.name;
    console.log(userName);
    await getMyPosts(userName);
  }

  render(){
    const {user, login, posts} = this.props;
    return (
      <div>
        <NewHeader>YOUR BULLETIN</NewHeader>
        <TableContainer component={Paper} className={styles.container}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>TITLE</TableCell>
                <TableCell align="right">Publish Date</TableCell>
                <TableCell align="right">Eddition Date</TableCell>
                <TableCell align="right">Status</TableCell>
                <TableCell align="right"></TableCell>
                {/* <TableCell align="right"></TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {posts && posts.length ? posts.map((note) =>
                (note.author === user.name && login ?
                  <TableRow key={note.id} hover>
                    <TableCell component="th" scope="row">
                      {note.title}
                    </TableCell>
                    <TableCell align="right">{note.pubDate}</TableCell>
                    <TableCell align="right">{note.actDate}</TableCell>
                    <TableCell align="right">{note.status}</TableCell>
                    <TableCell align="right"><Button component={Link} exact to={`${process.env.PUBLIC_URL}/post/${note._id}`}>View</Button></TableCell>
                    {/* <TableCell align="right"><Button component={Link} exact to={`${process.env.PUBLIC_URL}/post/${note._id}/edit`}>Edit</Button></TableCell> */}
                  </TableRow> : null /*window.location.replace('/NotFound')*/)
              ) : null}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
}

Component.propTypes = {
  user: PropTypes.object,
  login: PropTypes.bool,
  posts: PropTypes.array,
  getMyPosts: PropTypes.func,
};

const mapStateToProps = state => ({
  user: getUser(state),
  login: getLogStatus(state),
  posts: getAll(state,),
});

const mapDispatchToProps = dispatch => ({
  getMyPosts: (userName) => dispatch(fetchMyPosts(userName)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Component as MyPosts,
  Container as MyPostsContainer,
  Component as MyPostsComponent,
};
