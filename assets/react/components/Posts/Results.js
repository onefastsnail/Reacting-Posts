var React = require('react');
var Post = require('./Post');
var Button = require('../Button');

class Results extends React.Component {

  //our constructor
  constructor(props) {
    //this calls the parent constructor
    super(props);
  }

  //Our method used by react, and is required for components
  render(){

    var posts = [];

    //lets create an array of post components to render
    for (var i in this.props.filter.paginated) {
      posts.push(React.createElement(Post, {key: this.props.filter.paginated[i].ID, data: this.props.filter.paginated[i]}));
    };

    //if we have no posts lets show a message
    if(posts.length == 0) {
      posts = <p className="text-center">No posts found</p>;
    }

    var showMore;

    //if we have more posts lets show a show more
    if(this.props.filter.filtered.length > this.props.filter.perPage && this.props.filter.end < this.props.filter.filtered.length){
      showMore = <p className="text-center"><br/><Button url="#" text="Show More" handleClick={this.props.handleShowMore}/></p>;
    }

    return(
      <div>
        {posts}
        {showMore}
      </div>
    );

  }

};

module.exports = Results;