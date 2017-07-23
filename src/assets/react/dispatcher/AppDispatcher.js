var Dispatcher = require('flux').Dispatcher;
var AppDispatcher = new Dispatcher();

//lets make a handle action method we can trigger from our actions,
AppDispatcher.handleAction = function(action){
  this.dispatch({
    source: 'VIEW_ACTION',
    action: action
  });
};

module.exports = AppDispatcher;