import React from 'react';
import Button from '../Button';
import LanguageSelector from './LanguageSelector';
import Dropdown from './Dropdown';
import PostActions from '../../actions/PostActions';

class Filter extends React.Component {

  //our constructor
  constructor(props) {
    //this calls the parent constructor
    super(props);

    this.handleMainEventChange = this.handleMainEventChange.bind(this);
  }

  handleMainEventChange(){
      PostActions.filterPosts({'showMainEvents': !this.props.filter.showMainEvents});
  }

  //Our method used by react, and is required for components
  render(){

    var activeMainEventsClass = (this.props.filter.showMainEvents)? 'c-filter__label c-filter__label--active' : 'c-filter__label';

    return(

      <div className="s-posts__navigation">
          <div className="s-posts__navigation__container">
              <h1>Posts</h1>
                  <div className="c-filter">
                  <form action="">

                    {/*
                    <input name="query" type="text" className="form-control" id="search" onChange={this.props.handleQueryChange} value={this.props.filter.query} placeholder="Search"/>

                    <select className="form-control" id="sort" value={this.props.filter.sortBy} onChange={this.props.handleSortChange}>
                        <option value='newest'>Newest</option>
                        <option value='alphabetically'>Alphabetically</option>
                    </select>

                    <Button url="#" text="Clear" handleClick={this.props.handleClearFilter}/>
                    */}

                      <div className="c-filter__buttons">
                          <ul>
                              <Dropdown
                                filter="daysSelected"
                                title="Schedule"
                                options={this.props.filter.days}
                                selected={this.props.filter.daysSelected}
                                />

                              <li className={activeMainEventsClass}>
                                <a href="javascript:;" onClick={this.handleMainEventChange}>Main Events</a>
                              </li>

                              <Dropdown
                                filter="themesSelected"
                                title="Theme"
                                options={this.props.filter.themes}
                                selected={this.props.filter.themesSelected}
                                />

                              <Dropdown
                                filter="typesSelected"
                                title="Type"
                                options={this.props.filter.types}
                                selected={this.props.filter.typesSelected}
                                />

                                <Dropdown
                                  filter="whoForSelected"
                                  title="Who For"
                                  options={this.props.filter.whoFor}
                                  selected={this.props.filter.whoForSelected}
                                  />

                                <Dropdown
                                  filter="languagesSelected"
                                  title="Language"
                                  options={this.props.filter.languages}
                                  selected={this.props.filter.languagesSelected}
                                  />

                          </ul>
                      </div>
                  </form>
              </div>
          </div>
      </div>

    );

  }

};

module.exports = Filter;