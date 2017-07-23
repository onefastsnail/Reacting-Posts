import React from 'react';
import PostActions from '../../actions/PostActions';

class LanguageSelector extends React.Component {

  //our constructor
  constructor(props) {
    //this calls the parent constructor
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  //a method to handle our clicks
  handleChange(e){
      PostActions.filterPosts({'languageSelected': e.target.value});
  }

  //Our method used by react, and is required for components
  render() {

    //we need to capture the current scope of this before we venture in our map calls
    var self = this;

    //we also need to bind self within the map iteration so the current method is called

    return (
        <select name="languages" onChange={this.handleChange} value={self.props.active}>
        <option value="All">All</option>
        {this.props.options.map(function(row, i) {
          return <option value={row} key={i}>{row}</option>;
        })}
        </select>
    );
  }
}

export default LanguageSelector;