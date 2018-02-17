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

        this.props.handler({
            key: 'typesSelected',
            value: e.target.dataset.value
        });
    }

    handleUserChange(e) {

        e.preventDefault();
        this.props.handler({
            key: 'usersSelected',
            value: e.target.dataset.value
        });
    }

    render() {
        return (
            <div data-pen={this.props.item.slug} className="c-card c-card--shadow">
                <Link to={"/single/" + this.props.item.slug} className="c-card__image" title={this.props.item.title}>
                    <div className="c-card__image__holder" style={{ backgroundImage: `url(${this.props.item.image})` }} />
                    <div className="c-card__overlay" />
                </Link>
                <div className="c-card__content">
                    <p className="c-card__meta">
                        <span onClick={this.handleUserChange} data-value={this.props.item.user}>{this.props.item.user}</span> / <span onClick={this.handleTypeChange} data-value={this.props.item.type}>{this.props.item.type}</span>
                    </p>
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
