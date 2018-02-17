import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Dummy extends React.Component {

    constructor(props) {
        super(props);
    }

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
Dummy.propTypes = {
    state: PropTypes.object
};

/*
    connecting redux to react
    map the store state as props to this component
*/
function mapStateToProps(state, ownProps) {

    // so lets return a obj, and cherry pick what our feature needs from the entire store, lucky us :)
    return {
        state: state.posts
    };
}

export default connect(mapStateToProps)(Dummy);
