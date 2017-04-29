var React = require('react');

class Button extends React.Component {

  //our local constructor
  constructor(props) {
    //this calls the parent constructor
    super(props);

    this.state = {};
  }

  //a method to handle our clicks
  handleClick(e) {
      e.preventDefault();

      return this.props.handleClick();

      // if(typeof(this.props.handleClick) !== 'undefined'){
      //   return this.props.handleClick();
      // }
      // else if(typeof(this.props.url) !== 'undefined'){

      //     var a = new RegExp('/' + window.location.host + '/');

      //     if(!a.test(this.props.url)){
      //       var win = window.open(this.props.url, '_blank');
      //       win.focus();
      //     }
      //     else {
      //       window.location.href = this.props.url;
      //     }
      // }
      // else {
      //   return true;
      // }
  }

  //Our method used by react, and is required for components
  render() {
    return (
      <a href={this.props.url} className={this.props.className} onClick={this.handleClick.bind(this)}>{this.props.text}</a>
    );
  }
}

//https://github.com/airbnb/javascript/tree/master/react#ordering
//https://toddmotto.com/react-create-class-versus-component/
//a simple bject property on the class, but used by React
Button.defaultProps = {
  href: '#',
  className: 'btn btn-primary',
  text: 'Button'
};

module.exports = Button;