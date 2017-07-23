import React from 'react';
import ReactDOM from 'react-dom';
import PostsController from './components/Posts/PostsController';

var postsControllerEl = document.getElementById('reacting-posts');

if(postsControllerEl != null){
  ReactDOM.render(
    <PostsController/>,
    postsControllerEl
  );
}