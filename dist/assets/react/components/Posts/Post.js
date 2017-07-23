import React from 'react';
import moment from 'moment';

class Post extends React.Component {

  //our constructor
  constructor(props) {
    //this calls the parent constructor
    super(props);

    this.state = {
      showPostContent: false,
      animateClass: ' animated zoomIn'
    };

    this.handleShowContent = this.handleShowContent.bind(this);
  }

  //a method to handle our clicks
  handleShowContent() {
    this.setState({'showPostContent': !this.state.showPostContent});
  }

  //Our method used by react, and is required for components
  render(){

    var startdate = moment.unix(this.props.data.hdw_event_dates[0].starts);

    var backgroundStyle = {
      backgroundImage: 'url(' + this.props.data.image.sizes.medium + ')'
    }

    return(

      <div className={"l-programme-list__item"+this.state.animateClass}>
          <div className="c-item">
              <div className="c-item__container">
                  <div className="c-item__image-area">
                      <div className="c-background-image" style={backgroundStyle} />
                      <div className="c-item__label-container-top">
                          <ul className="c-labels">
                              <li className="c-labels__label--date">{startdate.format('Do MMM HH:mm')}</li>
                          </ul>
                      </div>
                      <div className="c-item__label-container-bottom">
                          <ul className="c-labels">
                              <li className="c-labels__label--category">{this.props.data.hdw_event_primary_type}</li>
                          </ul>
                      </div>
                  </div>
                  <div className="c-item__title">
                    <h3>
                      <a href={this.props.data.permalink}>
                        {this.props.data.title}
                        <span className="c-item__link"></span>
                      </a>
                    </h3>
                  </div>
              </div>
          </div>
      </div>



    );

  }

};

module.exports = Post;
