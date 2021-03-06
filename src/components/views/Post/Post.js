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
import {getAll, fetchSinglePost, delSinglePost} from '../../../redux/postsRedux';

class Component extends React.Component {

  state = {
    deleted: false,
  }

  async componentDidMount() {
    const {fetchPost} = this.props;
    if(this.props.match){
      const id = this.props.match.params.id;
      await fetchPost( id );
    } else {
      this.props.history.push('/NotFound');
    }
  }

  showContact() {
    const contact = document.getElementById('contact');
    contact.classList.toggle(styles.hide);
  }

  showDelete() {
    const del = document.getElementById('delete');
    del.classList.toggle(styles.hide);
  }

  reloadPage = () => {
    this.props.history.push('/');
  }

  async delPost() {
    const {deletePost} = this.props;
    if(this.props.match){
      const id = this.props.match.params.id;
      await deletePost( id );
      const card = document.getElementById('card');
      await card.classList.add(styles.hide);
      this.setState ({ deleted: true });
      setTimeout(this.reloadPage, 1000);

    } else {
      this.props.history.push('/NotFound');
    }
  }

  render(){
    const {login, user, posts} = this.props;
    const postData = posts;
    return (
      <div className={styles.root}>
        {!this.state.deleted ? <h2>Post author: {postData.author}</h2> : <h2>Post Deleted!</h2>}
        <Card id='card'>
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
              <Button  component={Link} exact to={`${process.env.PUBLIC_URL}/post/${postData._id}/edit`} size="small" color="secondary" >
                edit post
              </Button> : null}
            {login && postData.author === user.name ?
              <Button size="small" color="secondary" onClick={this.showDelete}>
                delete post
              </Button> : null}
            <Typography variant="inherit" component="h4" className={clsx(styles.hide, styles.delete)} id='delete'>
              <div>Are you sure you want to erease this post? Earease is inreversable!</div>
              {login && postData.author === user.name ?
                <Button size="small" color="secondary" onClick={() => this.delPost()}>
                  YES, delete post
                </Button> : null}
            </Typography>
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
  history: PropTypes.object,
  fetchPost: PropTypes.func,
  deletePost: PropTypes.func,
};

const mapStateToProps = state => ({
  login: getLogStatus(state),
  user: getUser(state),
  posts: getAll(state),
});

const mapDispatchToProps = dispatch => ({
  fetchPost: ( id ) => dispatch(fetchSinglePost( id )),
  deletePost: ( id ) => dispatch(delSinglePost( id )),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Component as Post,
  Container as PostContainer,
  Component as PostComponent,
};
