var React = require('react');
var Button = require('../Button');

class Filter extends React.Component {

  //our constructor
  constructor(props) {
    //this calls the parent constructor
    super(props);
  }

  //Our method used by react, and is required for components
  render(){

    return(

      <div>
        <h1>Posts that React</h1>
        <p>Showing {this.props.filter.paginated.length} of {this.props.filter.filtered.length}</p>

        <form action="" className="form-inline">

            <div className="form-group">
              <label htmlFor="exampleInputName2">Search</label>
              <input name="query" type="text" className="form-control" id="search" onChange={this.props.handleQueryChange} value={this.props.filter.query} />
            </div>

            <div className="form-group">
              <label htmlFor="sort">Sort</label>
              <select className="form-control" id="sort" value={this.props.filter.sortBy} onChange={this.props.handleSortChange}>
                  <option value='newest'>Newest</option>
                  <option value='alphabetically'>Alphabetically</option>
              </select>
            </div>

            <div className="checkbox">
                <label>
                  <input type="checkbox" onChange={this.props.handleScrollChange} /> infinite scroll
                </label>
            </div>

            <Button url="#" text="Clear" handleClick={this.props.handleClearFilter}/>
        </form>
      </div>

    );

  }

};

module.exports = Filter;