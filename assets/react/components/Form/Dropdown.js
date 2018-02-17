import React from 'react';
import PropTypes from 'prop-types';

class Dropdown extends React.Component {

    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {

        if (typeof (e.target.dataset.value) === 'undefined') return false;

        this.props.handler({
            key: this.props.filter,
            value: e.target.dataset.value
        });

    }

    render() {

        return (
            <div className="c-dropdown">
                <div className="c-dropdown__toggle"><span>{this.props.selected.length}</span>{this.props.title}</div>
                <ul className="c-dropdown__list">
                    {this.props.options.map((row, i) => {

                        const activeClass = (this.props.selected.indexOf(row) > -1) ? ' c-dropdown__list__item--active' : '';

                        return <li key={i} className={"c-dropdown__list__item" + activeClass}><a href="javascript:;" onClick={this.handleChange} data-value={row}>{row}</a></li>;

                    })}
                </ul>
            </div>
        );
    }
}

Dropdown.propTypes = {
    filter: PropTypes.string,
    options: PropTypes.array,
    handler: PropTypes.func,
    title: PropTypes.string,
    selected: PropTypes.array
};

export default Dropdown;
