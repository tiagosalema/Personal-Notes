import React from 'react';
import { Route, Switch, NavLink, Redirect } from 'react-router-dom';
import Signup from './views/Signup.jsx'
import Signin from './views/Signin.jsx'
import CreatePost from './components/post/create.jsx'
import Home from './views/Home.jsx'
import NotFound from './views/NotFound.jsx';
import './App.scss'

function App() {
  return (
    <>
      <nav>
        <NavLink exact to='/'>Home</NavLink>
        <NavLink to='/signin'>Sign in</NavLink>
        <NavLink to='/signup'>Sign up</NavLink>
        <NavLink to='/post-create'>Create a post</NavLink>
      </nav>
      <Switch>
        <Route path="/signup" component={Signup}></Route>
        <Route path="/signin" component={Signin}></Route>
        <Route path="/post-create" component={CreatePost}></Route>
        <Route path="/not-found" component={NotFound} />
        <Route path="/" exact component={Home}></Route>
        <Redirect to="/not-found" />
      </Switch>
    </>
  );
}

export default App;
