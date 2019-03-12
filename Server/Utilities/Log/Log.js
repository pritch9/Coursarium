module.exports = {

  log: function (message = '') {
    console.log('[Server] ' + message);
  },

  logRoute: function (route) {
    this.log('Registering route: \'' + route + '\'');
  }

};
