import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
    searchPosts,
    showMorePosts,
    clearFilter,
    filterByType,
    fetchPosts
} from '../ducks/posts';

import { Route, Link, Switch, withRouter, } from 'react-router-dom';
import PropTypes from 'prop-types';

//our components
import Filter from '../components/Posts/Filter';
import Results from '../components/Posts/Results';
import Single from '../components/Posts/Single';

class Home extends React.Component {

    constructor(props) {

        super(props);

        // lets correct the this context of some of these class methods
        this.handleShowMore = this.handleShowMore.bind(this);
        this.handleQueryChange = this.handleQueryChange.bind(this);
        this.handleShowMoreOrClear = this.handleShowMoreOrClear.bind(this);
        this.handleTypeChange = this.handleTypeChange.bind(this);
    }

    componentDidMount(){
        /*
            on intial page load, lets dispatch an action. this is the only way to trigger a state change.
            our store's reducing functions will be called to return a new copy of changed state
        */
        this.props.dispatch(fetchPosts());
    }

    handleQueryChange(event) {
        //this.props.dispatch(postActions.searchPosts(event.target.value)); // or
        this.props.history.push('/');
        this.props.dispatch(this.props.actions.searchPosts(event.target.value));
    }

    handleShowMore() {
        this.props.actions.showMorePosts();
    }

    handleShowMoreOrClear() {
        this.props.actions.clearFilter();
    }

    handleTypeChange(data) {
        this.props.history.push('/');
        this.props.dispatch(this.props.actions.searchPosts(''));
        this.props.actions.filterByType(data);
    }

    render() {

        return (
            <section className="s-posts">

                <Filter
                    filter={this.props.filter}
                    handleTypeChange={this.handleTypeChange}
                    handleClearFilter={this.handleShowMore}
                    handleQueryChange={this.handleQueryChange}
                    handleSortChange={this.handleShowMore}
                    handleScrollChange={this.handleShowMore}
                    total={this.props.total}
                />

                <Switch>
                    <Route path="/" exact render={(props) => (<Results items={this.props.posts} total={this.props.total} end={this.props.end} handleShowMore={this.handleShowMore} handleFilterByType={this.props.actions.filterByType} {...props} />)} />
                    <Route path="/single/:slug" component={Single} />
                </Switch>

            </section>

        );
    }
}

// we can catch a lot of bugs with typechecking so lets do it
Home.propTypes = {
    actions: PropTypes.object,
    filter: PropTypes.object,
    posts: PropTypes.array,
    end: PropTypes.number,
    total: PropTypes.number
};

/*
    connecting redux to react
    map the store state as props to this component
*/
function mapStateToProps(state, ownProps) {

    // so lets create a obj, and cherry pick what our feature needs from the entire store, lucky us :)
    const y = {
        filter: {
            query: state.posts.query,
            users: state.posts.users,
            usersSelected: state.posts.usersSelected
        },
        total: 0,
        posts: state.posts.posts,
        end: state.posts.end,
        query: state.posts.query
    };

    // whilst our store won't contain the filtered list, it tells us everything we need to know to construct the filtered list, so lets do this here for now

    // if we have a search string
    if (y.query != '') {
        y.posts = y.posts.filter(function (el) {
            if (el.title.toLowerCase().indexOf(y.query.toLowerCase()) > -1) {
                return el;
            }
        });
    }

    // if we have users selected, perform a filter
    if (y.filter.usersSelected.length > 0) {
        y.posts = y.posts.filter(function (item) {

            if (y.filter.usersSelected.indexOf(item.user) > -1) {
                return item;
            }
        });
    }

    y.total = y.posts.length;

    // now lets paginate
    y.posts = y.posts.slice(y.start, y.end);

    return y;
}

/*
    what actions we want to expose to our component
    without this being provided in the connect method, it will automagically add the dispatch method in the component props
    any component wrapped with connect() call will receive a dispatch function as a prop, and any state it needs from the global state
    bindActionCreators binds all actions supplied to this.props.actions.XXX within the component
    doing this allows our components to not have to know we are using redux, but simply call the prop, also this behind the scenes prepares our calls into the redux dispatch method
*/
function mapDispatchToProps(dispatch) {
    return {
        dispatch,
        actions: bindActionCreators({
            searchPosts,
            showMorePosts,
            clearFilter,
            filterByType
        }, dispatch)
    };
}

/*
    connect returns a function which is then executed with the Home component
    compare to flux we do not have to manually subsbrive to events emitted from the store upon change as redux does this for us
    easier use of stateless components, as no lifecycle methods required as above
    map only state we need, better performance
    we need to wrap our connected redux component with our router using withRouter
*/
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));
