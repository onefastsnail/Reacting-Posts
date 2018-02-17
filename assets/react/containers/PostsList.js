import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Route, Link, Switch, withRouter, } from 'react-router-dom';

import {
    searchPosts,
    showMorePosts,
    clearFilter,
    filterByType,
    fetchPosts,
    filterPosts
} from '../ducks/postsList';

import Filter from '../components/Posts/Filter';
import Results from '../components/Posts/Results';
import Single from '../components/Posts/Single';

class PostsList extends React.Component {

    constructor(props) {

        super(props);

        // lets correct the this context of some of these class methods
        this.handleShowMore = this.handleShowMore.bind(this);
        this.handleQueryChange = this.handleQueryChange.bind(this);
        this.handleShowMoreOrClear = this.handleShowMoreOrClear.bind(this);
        this.handleTypeChange = this.handleTypeChange.bind(this);
    }

    componentDidMount() {
        /*
            on intial page load, lets dispatch an action. this is the only way to trigger a state change.
            our store's reducing functions will be called to return a new copy of changed state
        */
        this.props.dispatch(fetchPosts());
    }

    handleQueryChange(event) {
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
                    <Route path="/" exact render={(props) => (
                        <Results
                            items={this.props.posts}
                            total={this.props.total}
                            end={this.props.end}
                            handleShowMore={this.handleShowMore}
                            handleFilterByType={this.props.actions.filterByType}
                            {...props}
                        />
                    )} />
                    <Route path="/single/:slug" component={Single} />
                </Switch>

            </section>

        );
    }
}

// we can catch a lot of bugs with typechecking so lets do it
PostsList.propTypes = {
    actions: PropTypes.object,
    filter: PropTypes.object,
    posts: PropTypes.array,
    end: PropTypes.number,
    total: PropTypes.number,
    dispatch: PropTypes.func,
    history: PropTypes.object
};

/*
    connecting redux to react
    map the store state as props to this component
*/
function mapStateToProps(state, ownProps) {

    // so lets create an obj to map to our container as props, and cherry pick what we need from the entire store, lucky us :)
    let y = {
        filter: {
            query: state.postsList.query,
            users: state.postsList.users,
            usersSelected: state.postsList.usersSelected
        },
        total: 0,
        posts: state.postsList.posts,
        end: state.postsList.end,
        query: state.postsList.query
    };

    // whilst our store won't contain the filtered list, it tells us everything we need to know to construct the filtered list, so lets do this here for now
    y.posts = filterPosts(state.postsList);

    y.total = y.posts.length;

    // lastly paginate the array
    y.posts = y.posts.slice(state.postsList.start, state.postsList.end);

    return y;
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
        actions: bindActionCreators({
            searchPosts,
            showMorePosts,
            clearFilter,
            filterByType,
        }, dispatch)
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostsList));
