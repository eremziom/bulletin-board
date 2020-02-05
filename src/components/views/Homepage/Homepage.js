import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Link } from 'react-router-dom';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import styles from './Homepage.module.scss';

import {connect} from 'react-redux';
import {getAll, fetchAllPosts} from '../../../redux/postsRedux.js';
import {getLogStatus} from '../../../redux/loginRedux.js';

class Component extends React.Component {

  async componentDidMount() {
    const {fetchPosts} = this.props;
    await fetchPosts();
  }

  render() {
    const {posts, login} = this.props;
    return (
      <div className={clsx(styles.welcome, styles.root)}>
        <h3 className={styles.welcome}>Welcome to ALBATROZ </h3>
        <p>Check out latest notes, or log in to add your own note!</p>
        <div className={styles.cards}>
          {login ?
            <Card className={styles.card}>
              <CardActionArea component={Link} exact to={`${process.env.PUBLIC_URL}/post/add`} className={styles.cardAction}>
                <CardMedia
                  className={styles.photo}
                  image='https://images.pexels.com/photos/158771/notebook-pen-table-blank-158771.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260'
                  title='Add your note!'
                />
                <CardContent>
                  <Typography gutterBottom variant="inherit" component="h2">
                    Add your note!
                  </Typography>
                  <Typography variant="inherit" component="p">
                    <span className={styles.plus}>+</span>
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card> : null}
          {posts ? posts.map((note) =>
            <Card key={note.id} className={styles.card}>
              <CardActionArea component={Link} exact to={`${process.env.PUBLIC_URL}/post/${note._id}`} className={styles.cardAction}>
                <CardMedia
                  className={styles.photo}
                  image={note.photo}
                  title={note.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="inherit" component="h2">
                    {note.title}
                  </Typography>
                  <Typography variant="inherit" component="h3">
                    {note.local}
                  </Typography>
                  <Typography variant="inherit" component="h4">
                    {note.pubDate}
                  </Typography>
                  <Typography variant="inherit" component="p">
                    {note.status}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ) : ''}
        </div>
      </div>
    );
  }
}

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  posts: PropTypes.array,
  login: PropTypes.bool,
  fetchPosts: PropTypes.func,
};

const mapStateToProps = state => ({
  posts: getAll(state),
  login: getLogStatus(state),
});

const mapDispatchToProps = dispatch => ({
  fetchPosts: () => dispatch(fetchAllPosts()),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Component as Homepage,
  Container as HomepageContainer,
  Component as HomepageComponent,
};
