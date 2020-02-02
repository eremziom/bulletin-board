import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Link } from 'react-router-dom';

import styles from './Post.module.scss';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import {connect} from 'react-redux';
import {getLogStatus, getUser} from '../../../redux/loginRedux';
import {getAll} from '../../../redux/postsRedux';

class Component extends React.Component {

  getId() {
    let postId = '';
    if(!this.props.match){
      return 2;
    } else
      postId = this.props.match.params.id;
    return postId;
  }
  getPost(postId, posts) {
    let showPost = '';
    if(posts){
      posts.map( post => {
        if(post.id === Number(postId)){
          showPost = post;
        }
      });
      if(!showPost) {
        window.location.replace('/NotFound');
      }
    } else {
      window.location.replace('/NotFound');
    }
    return showPost;
  }

  showContact() {
    const contact = document.getElementById('contact');
    contact.classList.toggle(styles.hide);
  }

  render(){
    const {login, user, posts} = this.props;
    const postID = this.getId();
    const postData = this.getPost(postID, posts);
    return (
      <div className={styles.root}>
        <h2>Bulletin ID: {postID}</h2>
        <Card>
          <CardMedia
            className={styles.photo}
            image={postData.photo}
            title={postData.title}
          />
          <CardContent className={styles.background}>
            <Typography gutterBottom variant="inherit" component="h2">
              {postData.title}
            </Typography>
            <Typography variant="inherit" component="h4" className={styles.details}>
              <div>LOCALISATION: {postData.local}</div>
              <div>RELEASE DATE: {postData.pubDate} </div>
            </Typography>
            <Typography variant="inherit" component="div" className={styles.content}>
              <div>DESCRIPTION: {postData.content}</div>
              <div>PRICE: {postData.price}</div>
            </Typography>
            <Typography variant="inherit" component="h4" className={styles.details}>
              <div>STATUS: {postData.status}</div>
              <div>EDIT DATE: {postData.actDate}</div>
            </Typography><Typography variant="inherit" component="h4" className={clsx(styles.hide, styles.contact)} id='contact'>
              <div>EMAIL ADDRESS: {postData.email}</div>
              <div>PHONE NUMBER: {postData.phone}</div>
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" color="primary">
              Share
            </Button>
            <Button size="small" color="primary" onClick={this.showContact}>
              contact info
            </Button>
            <Button component={Link} exact to={`${process.env.PUBLIC_URL}/`} size="small" color="secondary" href='/'>
              go back
            </Button>
            {login && postData.author === user.name ?
              <Button  component={Link} exact to={`${process.env.PUBLIC_URL}/post/${postData.id}/edit`} size="small" color="secondary" >
                edit post
              </Button> : null}
          </CardActions>
        </Card>
      </div>
    );
  }
}

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  match: PropTypes.object,
  login: PropTypes.bool,
  user: PropTypes.object,
  posts: PropTypes.array,
};

const mapStateToProps = state => ({
  login: getLogStatus(state),
  user: getUser(state),
  posts: getAll(state),
});

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg),)
// });

const Container = connect(mapStateToProps, /*mapDispatchToProps*/)(Component);

export {
  Component as Post,
  Container as PostContainer,
  Component as PostComponent,
};
