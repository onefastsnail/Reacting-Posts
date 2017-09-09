import React from 'react';
import { Link } from 'react-router-dom';

class Single extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-2">
                        <Link to="/" className="c-btn"><i className="fa fa-arrow-left" aria-hidden="true"></i></Link>
                    </div>
                    <div className="col-xs-12 col-sm-10">

                    lorem

                    </div>

                </div>
            </div>
        );
    }
}

export default Single;
