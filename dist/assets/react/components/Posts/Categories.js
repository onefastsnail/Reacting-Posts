import React from 'react';

class Categories extends React.Component {

  //our constructor
  constructor(props) {
    //this calls the parent constructor
    super(props);

    this.state = {
      //showPostContent: false
    };

    //this.handleShowContent = this.handleShowContent.bind(this);
  }

  //a method to handle our clicks
  handleShowContent() {
    //this.setState({'showPostContent': !this.state.showPostContent});
  }

  //Our method used by react, and is required for components
  render(){

    return(

      <div className="">
        lorem
      </div>

    );

  }

};

module.exports = Categories;