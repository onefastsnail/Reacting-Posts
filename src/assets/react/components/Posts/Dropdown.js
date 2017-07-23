import React from 'react';
import PostActions from '../../actions/PostActions';
import moment from 'moment';

class Dropdown extends React.Component {

  //our constructor
  constructor(props) {
    //this calls the parent constructor
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  //a method to handle our clicks
  handleChange(e){

    if(typeof(e.target.dataset.value) === 'undefined') return false;

    var x = {};
    x[this.props.filter] = e.target.dataset.value;

    PostActions.filterPosts(x);
  }

  //Our method used by react, and is required for components
  render() {

    //we need to capture the current scope of this before we venture in our map calls
    var self = this;

    //console.log(this.props.selected);

    //we also need to bind self within the map iteration so the current method is called

    var count;

    if(self.props.selected.length > 0){
      count = <span>{self.props.selected.length}</span>;
    }

    return (

      <li className="c-filter__label">
          <h6>{this.props.title}{count}</h6>
          <ul className="c-filter__dropdown">
            {this.props.options.map(function(row, i) {

              var active = (self.props.selected.indexOf(row) > -1)? 'c-filter__dropdown__item c-filter__dropdown__item--active' : 'c-filter__dropdown__item';

              var rowValue = row;

              switch(self.props.filter) {
                  case 'daysSelected':
                      rowValue = moment(row).format('Do MMM');
                      break;
                  default:
                      //nada
              }

              return <li className={active} key={i}><a href="javascript:;" onClick={self.handleChange} data-value={row}>{rowValue}</a></li>;
            })}

          </ul>
      </li>
    );
  }
}

export default Dropdown;