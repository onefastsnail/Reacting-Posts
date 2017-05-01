var React = require('react');

class Post extends React.Component {

  //our constructor
  constructor(props) {
    //this calls the parent constructor
    super(props);

    this.state = {
      showPostContent: false
    };

    this.handleShowContent = this.handleShowContent.bind(this);
  }

  //a method to handle our clicks
  handleShowContent() {
    this.setState({'showPostContent': !this.state.showPostContent});
  }

  //Our method used by react, and is required for components
  render(){

    var heroBackgroundStyles = {
      backgroundImage: 'url(http://fakeimg.pl/650x650/eeeeee/666/?text='+this.props.data.id+')'
    };

    var postContent;

    if(this.state.showPostContent){
      postContent = <div className="c-wysiwyg-html" dangerouslySetInnerHTML={{__html: this.props.data.post_content}}></div>;
    }

    return(

      <div className="c-small-post">

          <div className="c-small-post__image">
              <a href="javascript:;" title="{this.props.data.post_title}" className="h-full-cover" onClick={this.handleShowContent}><div className="c-background-image" style={heroBackgroundStyles}></div></a>
          </div>

          <div className="c-small-post__content">

              <h3 className="c-small-post__title"><a href="javascript:;" title="{this.props.data.post_title}" onClick={this.handleShowContent}>{this.props.data.post_title}</a></h3>
              <p><small>{this.props.data.post_date}</small></p>

              {postContent}

          </div>

      </div>

    );

  }

};

module.exports = Post;