var React = require('react');
var ReactDOM = require('react-dom');
var PostsController = require('./components/Posts/PostsController');

var postsControllerEl = document.getElementById('reacting-posts');

if(postsControllerEl != null){
  ReactDOM.render(
    <PostsController/>,
    postsControllerEl
  );
}