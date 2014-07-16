
module.exports = function(app) {
  return {
    marked:        require('./marked')(app),
    db:            require('./db'),
    auth:          require('./auth'),
    view_helpers:  require('./view_helpers')(app)
  };
};
