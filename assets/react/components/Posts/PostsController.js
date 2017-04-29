var React = require('react');
var PostStore = require('../../stores/PostStore');
var PostActions = require('../../actions/PostActions');

var Post = require('./Post');
var Button = require('../Button');

class PostController extends React.Component {

  //our simple class constructor
  constructor(props) {

    //this calls the parent constructor
    super(props);

    //no more magic react methods, a simple class property called state is used
    this.state = {
      filter: PostStore.getFilter()
    };

    //as the old react way was "magic" with them autobinding this for us we need to now do this manually as this is simply a JS class
    //best to do this in the construct
    //when we call the functions below we are using the context of this class not the scope called from
    //so when giving them as props this context is correctly set
    this.onChange = this.onChange.bind(this);
    this.handleShowMore = this.handleShowMore.bind(this);
    this.handleQueryChange = this.handleQueryChange.bind(this);
    this.handleSortChange = this.handleSortChange.bind(this);
    this.handleClearFilter = this.handleClearFilter.bind(this);
    this.handleScrollChange = this.handleScrollChange.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }

  //when we mount lets add a listener to the store so when it emits a change event, we then use the callback to trigger a state change here which causes our app to REACT booom! :D enjoy.
  componentDidMount(){
    PostStore.addChangeListener(this.onChange);

    //a listener for on sroll to give us an infinite scroll
    if(this.state.filter.infiniteScroll == true){
      window.addEventListener('scroll', this.handleScroll);
    }
    else {
      window.removeEventListener('scroll', this.handleScroll);
    }

  }

  onChange(){
    //call the setState method from React.Component to change the state property of this class, to trigger a reaction
    this.setState({ filter: PostStore.getFilter() });
  }

  handleScroll(e){

      //get our dom node
      var el = jQuery('#reacting-posts');

      //do we have a node? if not christian bale out
      if(el.length == 0) return false;

      //as we scroll towards the bottom, do a sneaky pagination call
      if(jQuery(window).scrollTop() >= el.offset().top + el.outerHeight() - window.innerHeight - 400) {
        this.handleShowMore();
      }

  }

  //lets send an action to filter posts
  handleFilterChange(obj) {
      PostActions.filterPosts(obj);
  }

  handleQueryChange(e){
      this.handleFilterChange({'query': e.target.value, 'end': 6});
  }

  handleSortChange(e){
      this.handleFilterChange({'sortBy': e.target.value, 'end': 6});
  }

  handleClearFilter(e){
      this.handleFilterChange({'sortBy': 'newest', 'query': '', 'end': 6});
  }

  handleShowMore(){
      var end = this.state.filter.end + this.state.filter.perPage;
      this.handleFilterChange({'end': end});
  }

  handleScrollChange(e){

      if(this.state.filter.infiniteScroll == false){
        window.addEventListener('scroll', this.handleScroll);
        this.handleFilterChange({'infiniteScroll': true});
      }
      else {
        window.removeEventListener('scroll', this.handleScroll);
        this.handleFilterChange({'infiniteScroll': false});
      }


  }

  //Our method used by react, and is required for components
  render(){

      var posts = [];

      //lets create an array of post components to render
      for (var i in this.state.filter.paginated) {
        posts.push(React.createElement(Post, {key: this.state.filter.paginated[i].ID, data: this.state.filter.paginated[i]}));
      };

      //if we have no posts lets show a message
      if(posts.length == 0) {
        posts = <p className="text-center">No posts found</p>;
      }

      var showMore;

      //if we have more posts lets show a show more
      if(this.state.filter.filtered.length > this.state.filter.perPage && this.state.filter.end < this.state.filter.filtered.length){
        showMore = <p className="text-center"><br/><Button url="#" text="Show More" handleClick={this.handleShowMore}/></p>;
      }

      return (

        <section className="section">
          <div className="container">
            <div className="row">
                <div className="col-xs-12">

                    <h1>Posts that React</h1>
                    <p>Showing {this.state.filter.paginated.length} of {this.state.filter.filtered.length}</p>

                    <form action="" className="form-inline">

                        <div className="form-group">
                          <label htmlFor="exampleInputName2">Search</label>
                          <input name="query" type="text" className="form-control" id="search" onChange={this.handleQueryChange} value={this.state.filter.query} />
                        </div>

                        <div className="form-group">
                          <label htmlFor="sort">Sort</label>
                          <select className="form-control" id="sort" value={this.state.filter.sortBy} onChange={this.handleSortChange}>
                              <option value='newest'>Newest</option>
                              <option value='alphabetically'>Alphabetically</option>
                          </select>
                        </div>

                        <div className="checkbox">
                            <label>
                              <input type="checkbox" onChange={this.handleScrollChange} /> infinite scroll
                            </label>
                        </div>

                        <Button url="#" text="Clear" handleClick={this.handleClearFilter}/>
                    </form>

                </div>
            </div>
            <div className="row">
                {posts} {showMore}
            </div>
            </div>
        </section>

      )

  }

};

module.exports = PostController;