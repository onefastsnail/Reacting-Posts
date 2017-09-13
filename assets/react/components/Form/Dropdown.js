import React from 'react';
import PropTypes from 'prop-types';

class Dropdown extends React.Component {

    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {

        if (typeof (e.target.dataset.value) === 'undefined') return false;

        const x = {
            key: this.props.filter,
            value: e.target.dataset.value
        };

        this.props.handler(x);

    }

    render() {

        // we need to capture the current scope of this before we venture in our map calls
        let self = this;
        let count = self.props.selected.length;

        return (
            <div className="c-dropdown">
                <div className="c-dropdown__toggle"><span>{count}</span>{this.props.title}</div>
                <ul className="c-dropdown__list">
                    {this.props.options.map(function (row, i) {

                        let activeClass = (self.props.selected.indexOf(row) > -1) ? ' c-dropdown__list__item--active' : '';

                        return <li key={i} className={"c-dropdown__list__item" + activeClass}><a href="javascript:;" onClick={self.handleChange} data-value={row}>{row}</a></li>;

                    })}
                </ul>
            </div>
        );
    }
}

// Dropdown.propTypes = {
//   filter: PropTypes.object,
//   options: PropTypes.array,
//   handler: PropTypes.function,
//   title: PropTypes.string
// };

export default Dropdown;
