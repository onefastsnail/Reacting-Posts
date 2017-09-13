import React from 'react';
import Small from './Small';

class Results extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        const self = this;

        let showMoreOrClear;

        if(this.props.end < this.props.total){
            showMoreOrClear = <a href="javascript:;" className="c-btn" onClick={this.props.handleShowMore}>Show More</a>;
        }

        return (
            <div className="s-posts__results">
                <div className="s-posts__results__container">
                    <div className="l-card-listing">

                        {this.props.items.map(function (item, i) {
                            return <div key={i} className="l-card-listing__item animated zoomIn"><Small handler={self.props.handleFilterByType} item={item} /></div>
                        })}

                    </div>

                    <div className="s-posts__results__pagination">
                        {showMoreOrClear}
                    </div>

                </div>
            </div>
        );
    }
}

export default Results;
