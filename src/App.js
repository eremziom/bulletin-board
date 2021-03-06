import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import { StylesProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';

import store from './redux/store';

import { MainLayout } from './components/layout/MainLayout/MainLayout';
import { HomepageContainer } from './components/views/Homepage/Homepage';
import { PostContainer } from './components/views/Post/Post';
import { PostEditContainer } from './components/views/PostEdit/PostEdit';
import { PostAddContainer } from './components/views/PostAdd/PostAdd';
import { MyPostsContainer } from './components/views/MyPosts/MyPosts';
import { NotFound } from './components/views/NotFound/NotFound';

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <StylesProvider injectFirst>
          <CssBaseline />
          <MainLayout>
            <Switch>
              <Route exact path='/' component={HomepageContainer} />
              <Route exact path='/post/add' component={PostAddContainer} />
              <Route exact path='/post/:id' component={PostContainer} />
              <Route exact path='/post/:id/edit' component={PostEditContainer} />
              <Route exact path='/myPosts' component={MyPostsContainer} />
              <Route path='*' component={NotFound} />
            </Switch>
          </MainLayout>
        </StylesProvider>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
