import React from 'react';
import { Route, Switch, Redirect, BrowserRouter } from "react-router-dom";

import { Posts } from './app/features/posts/Posts';
import { Login } from './app/features/auth/Login';
import { Landing } from './app/features/landing/Landing';
import { Signup } from './app/features/auth/Signup';
import { Users } from './app/features/users/Users';
import { UserView } from './app/features/users/UserView';
import { SinglePost } from './app/features/posts/SinglePost';
import PrivateRouter from './app/constants/privaterouter';

import './app/assets/margins.css';
import './app/assets/main.css';

export const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <PrivateRouter path="/" exact component={Landing} />
        <Route path="/login" exact component={Login} />
        <Route path="/signup" exact component={Signup} />
        <PrivateRouter path="/posts" exact component={Posts} />
        <PrivateRouter path="/posts/:postId" exact component={SinglePost} />
        <PrivateRouter path="/users" exact component={Users} />
        <PrivateRouter path="/users/:userId" exact component={UserView} />

        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
}