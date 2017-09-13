import React from 'react';
import { Link, IndexLink } from 'react-router';

class Hello extends React.Component {

    //our constructor
    constructor(props) {
        //this calls the parent constructor
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    //a method to handle our clicks
    handleClick(item) {}

    //Our method used by react, and is required for components
    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-xs-12 col-sm-8">
                        <p>This is a paragraph of text. Some of the text may be <em>emphasised</em> and some it might even be <strong>strongly emphasised</strong>. Occasionally <q>quoted text</q> may be found within a paragraph &hellip;and of course <a href="#">a link</a> may appear at any point in the text. The average paragraph contains five or six sentences although some may contain as little or one or two while others carry on for anything up to ten sentences and beyond.</p>
                    </div>
                    <div className="col-xs-12 col-sm-4">
                        Sidebar
                    </div>
                </div>
            </div>
        );
    }
}

export default Hello;
