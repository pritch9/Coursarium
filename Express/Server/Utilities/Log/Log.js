module.exports = {

  log: function (message = '') {
    setTimeout(() => console.log((message.length) ? '[Log] ' + message : ""));
  },

  warn: function (message = '') {
    setTimeout(() => console.warn('[Warn] ' + message));
  },

  error: function (message = '', error = '') {
    setTimeout(() => {
      console.error('[Error] ' + message + ' > ' + error);
      console.error(error.stack);
    });
  }

};
