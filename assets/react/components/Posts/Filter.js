import React from 'react';
import PropTypes from 'prop-types';
import Dropdown from '../Form/Dropdown';

class Filter extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // for nice UX lets focus on our input upon rendering
        document.querySelector('.s-posts__search').focus();
    }

    render() {

        return (

            <div className="s-posts__navigation">
                <div className="s-posts__navigation__container">

                    <div className="row">
                        <div className="col-sm-4">
                            <input name="query" type="text" className="s-posts__search" id="search" onChange={this.props.handleQueryChange} value={this.props.filter.query} placeholder={"Search " + this.props.total + " posts"} />
                        </div>
                        <div className="col-sm-4">
                            <Dropdown
                                filter="usersSelected"
                                title="User"
                                options={this.props.filter.users}
                                selected={this.props.filter.usersSelected}
                                handler={this.props.handleFilterByProperty}
                            />
                        </div>
                        <div className="col-sm-4">
                            <Dropdown
                                filter="typesSelected"
                                title="Type"
                                options={this.props.filter.types}
                                selected={this.props.filter.typesSelected}
                                handler={this.props.handleFilterByProperty}
                            />
                        </div>
                    </div>

                </div>
            </div>

        );

    }

}

Filter.propTypes = {
    usersSelected: PropTypes.string,
    users: PropTypes.array,
    handleQueryChange: PropTypes.func,
    handleFilterByProperty: PropTypes.func,
    filter: PropTypes.object,
    total: PropTypes.number
};

export default Filter;
