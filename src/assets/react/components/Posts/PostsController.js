import React from 'react';
import PostStore from '../../stores/PostStore';
import PostActions from '../../actions/PostActions';

import Filter from './Filter';
import Results from './Results';

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
  }

  //when we mount lets add a listener to the store so when it emits a change event, we then use the callback to trigger a state change here which causes our app to REACT booom! :D enjoy.
  componentDidMount(){
    PostStore.addChangeListener(this.onChange);
  }

  onChange(){
    //call the setState method from React.Component to change the state property of this class, to trigger a reaction
    this.setState({ filter: PostStore.getFilter() });
  }

  //lets send an action to filter posts
  handleFilterChange(obj) {
      PostActions.filterPosts(obj);
  }

  handleQueryChange(e){
      this.handleFilterChange({'query': e.target.value, 'end': 16});
  }

  handleSortChange(e){
      this.handleFilterChange({'sortBy': e.target.value, 'end': 16});
  }

  handleClearFilter(e){
      this.handleFilterChange({'sortBy': 'newest', 'query': '', 'end': 16});
  }

  handleShowMore(){
      var end = this.state.filter.end + this.state.filter.perPage;
      this.handleFilterChange({'end': end});
  }

  //Our method used by react, and is required for components
  render(){

      return (

        <section className="s-posts">

            <Filter
              filter={this.state.filter}
              handleClearFilter={this.handleClearFilter}
              handleQueryChange={this.handleQueryChange}
              handleSortChange={this.handleSortChange}
              handleScrollChange={this.handleScrollChange}
            />

            <Results
              filter={this.state.filter}
              handleShowMore={this.handleShowMore}
            />

        </section>

      )

  }

};

module.exports = PostController;