import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import db from '../../../db.js';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';

import styles from './MyPosts.module.scss';

//import {connect} from 'react-redux';
//import {reduxSelector, reduxActionCreator} from '../../../redux/example.js';

const Component = ({className, children}) => {
  return (
    <div className={clsx(className, styles.root)}>
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            <h2>Your Notes</h2>
          </ListSubheader>
        }
      >
        {db.notes.map((note) =>
          (note.author === 'Jan' ?
            <ListItem button >
              <div className={styles.list}>
                <div>Publish date: {note.pubDate}</div>
                <div>Actual eddition date: {note.actDate}</div>
                <div><ListItemText primary={note.title} /></div>
                <div>Status: {note.status}</div>
              </div>
            </ListItem> : '')
        )}
      </List>
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
