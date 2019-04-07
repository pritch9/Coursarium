module.exports = {

  log: function (message = '') {
    console.log('[Log] ' + message + '\n');
  },

  warn: function (message = '') {
    console.warn('[Warn] ' + message + '\n');
  },

  error: function (message = '', error = '') {
    console.error('[Error] ' + message + ' > ' + error + '\n');
  },

  logRoute: function (route) {
    this.log('Registering route: \'' + route + '\'');
  }

};
