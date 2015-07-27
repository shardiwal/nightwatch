var util = require('util');
exports.assertion = function(selector, unexpectedText, msg) {

  var MSG_ELEMENT_NOT_FOUND = 'Testing element <%s> should not contains as text: "%s". ' +
    'Element could not be located.';

  this.message = msg || util.format('Testing if element <%s> not contains text: "%s".', selector, unexpectedText);

  this.expected = function(){ return ''; }

  this.pass = function(value) {
    return value.indexOf(unexpectedText) == -1;
  };

  this.failure = function(result) {
    var failed = result === false || result && result.status === -1;
    if (failed) {
      this.message = msg || util.format(MSG_ELEMENT_NOT_FOUND, selector, unexpectedText);
    }
    return failed;
  };

  this.value = function(result) {
    return result.value;
  };

  this.command = function(callback) {
    return this.api.getText(selector, callback);
  };

};
