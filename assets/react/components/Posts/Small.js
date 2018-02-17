import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Post extends React.Component {

    constructor(props) {

        super(props);

        this.handleTypeChange = this.handleTypeChange.bind(this);
        this.handleUserChange = this.handleUserChange.bind(this);
    }

    handleTypeChange(e) {

        e.preventDefault();

        const x = {
            key: 'typesSelected',
            value: e.target.dataset.value
        };

        this.props.handler(x);
    }

    handleUserChange(e) {

        e.preventDefault();

        const x = {
            key: 'usersSelected',
            value: e.target.dataset.value
        };

        this.props.handler(x);
    }

    render() {
        return (
            <div data-pen={this.props.item.slug} className="c-card c-card--shadow">
                <Link to={"/single/" + this.props.item.slug} className="c-card__image" title={this.props.item.title}>
                    <div className="c-card__image__holder" style={{ backgroundImage: `url(${this.props.item.image})` }}/>
                    <div className="c-card__overlay" />
                </Link>
                <div className="c-card__content">
                    <p className="c-card__meta">{this.props.item.user}</p>
                    <h3 className="c-card__title"><Link to={"/single/" + this.props.item.slug} title={this.props.item.title}>{this.props.item.title}</Link></h3>
                </div>
            </div>
        );
    }
}

Post.propTypes = {
    item: PropTypes.object,
    handler: PropTypes.func
};

export default Post;
