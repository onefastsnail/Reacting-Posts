import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Home extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount(){}

    render() {

        return (
            <section className="s-dummy">

                <div className="container">
                    <pre>{JSON.stringify(this.props.state, null, 2)}</pre>
                </div>

            </section>

        );
    }
}

// we can catch a lot of bugs with typechecking so lets do it
Home.propTypes = {
    state: PropTypes.object
};

/*
    connecting redux to react
    map the store state as props to this component
*/
function mapStateToProps(state, ownProps) {

    // so lets create a obj, and cherry pick what our feature needs from the entire store, lucky us :)
    const y = {
        state: state.posts
    };

    return y;
}

export default connect(mapStateToProps)(Home);
