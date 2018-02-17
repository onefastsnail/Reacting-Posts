import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Post extends React.Component {

    constructor(props) {

        super(props);

        this.handleTypeChange = this.handleTypeChange.bind(this);
        this.handleUserChange = this.handleUserChange.bind(this);
    }

    componentDidMount() {

        // find the element
        const penEl = document.querySelector('div[data-pen="' + this.props.item.slug + '"] .c-card__image__holder');

        // lets create a cheeky quick lazy load
        if(penEl){
            // create the image
            let img = new Image();
            let self = this;

            // set the src for it to load
            img.src = this.props.item.image;

            // lets wait for the image to load
            img.onload = function () {
                // add the style attr
                penEl.style.backgroundImage = 'url(' + self.props.item.image + ')';

                // toggle the class to animate in
                penEl.className += ' js-loaded';
            };
        }
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
                    <div className="c-card__image__holder" />
                    <div className="c-card__overlay" />
                </Link>
                <div className="c-card__content">
                    <p className="c-card__meta">{this.props.item.user}</p>
                    <h3 className="c-card__title"><Link to={"/single/" + this.props.item.slug} title={this.props.item.title}>{this.props.item.title}</Link></h3>
                    <Link to={"/single/" + this.props.item.slug} className="c-card__read-more" title={this.props.item.title}>Read</Link>
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
