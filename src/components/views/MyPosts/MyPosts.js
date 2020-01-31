import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import db from '../../../db.js';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import styles from './MyPosts.module.scss';

//import {connect} from 'react-redux';
//import {reduxSelector, reduxActionCreator} from '../../../redux/example.js';

const Component = ({className, children}) => {
  return (
    <div className={clsx(className, styles.root)}>
      <TableContainer component={Paper} className={styles.container}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>TITLE</TableCell>
              <TableCell align="right">Publish Date</TableCell>
              <TableCell align="right">Eddition Date</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {db.notes.map((note) =>
              (note.author === 'Jan' ?
                <TableRow key={note.id} hover>
                  <TableCell component="th" scope="row">
                    {note.title}
                  </TableCell>
                  <TableCell align="right">{note.pubDate}</TableCell>
                  <TableCell align="right">{note.actDate}</TableCell>
                  <TableCell align="right">{note.status}</TableCell>
                  <TableCell align="right"><Button href={`/post/${note.id}`}>View</Button></TableCell>
                  <TableCell align="right"><Button href ={`/post/${note.id}/edit`}>Edit</Button></TableCell>
                </TableRow> : null)
            )}
          </TableBody>
        </Table>
      </TableContainer>
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
  Component as MyPosts,
  //Container as MyPosts,
  Component as MyPostsComponent,
};
