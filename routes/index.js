
module.exports = function(app) {
  return {
    main: require('./main')(app),
    cms: require('./cms')(app)
  };
};
