import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Single extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        const url = `//codepen.io/team/codepen/embed/${this.props.match.params.slug}/?&theme-id=dark&default-tab=cssresult&embed-version=2`;

        return (
            <div className="s-posts__container">
                <div className="row">
                    <div className="col-xs-12">

                    <iframe width="100%" height="500" scrolling="no" title={this.props.match.params.slug} src={url} frameBorder="no" />

                    <Link to="/" className="c-btn"><i className="fa fa-arrow-left" aria-hidden="true" /></Link>

                    </div>

                </div>
            </div>
        );
    }
}

Single.propTypes = {
    match: PropTypes.object
};

export default Single;
