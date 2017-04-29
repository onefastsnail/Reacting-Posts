var React = require('react');

class Post extends React.Component {

  //our constructor
  constructor(props) {
    //this calls the parent constructor
    super(props);
  }

  //a method to handle our clicks
  handleClick(item) {
    console.log(item); // null
  }

  //Our method used by react, and is required for components
  render(){

    var heroBackgroundStyles = {
      backgroundImage: 'url(http://fakeimg.pl/650x650/eeeeee/666/?text='+this.props.data.id+')'
    };

    return(

        <div className="col-xs-12">

          <div className="c-small-post">

              <div className="c-small-post__image">
                  <a href={this.props.data.link} title="{this.props.data.post_title}" className="h-full-cover"><div className="c-background-image" style={heroBackgroundStyles}></div></a>
              </div>

              <div className="c-small-post__content">

                <p className="c-small-post__date">{this.props.data.date}</p>

                  <h3 className="c-small-post__title"><a href={this.props.data.link} title="{this.props.data.post_title}">{this.props.data.post_title}</a></h3>
                  <p><small>{this.props.data.post_date}</small></p>

                  {<div className="c-wysiwyg-html" dangerouslySetInnerHTML={{__html: this.props.data.excerpt}}></div>}

              </div>

          </div>

        </div>

    );

  }

};

module.exports = Post;