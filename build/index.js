'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Middleware for handling responses to the client
 */
var ResponseHandler = function () {
  function ResponseHandler() {
    _classCallCheck(this, ResponseHandler);
  }

  _createClass(ResponseHandler, null, [{
    key: 'success',

    /**
       * Method for handling success responses
       * @param {object} data
       */
    value: function success(data) {
      if (!data) {
        throw new Error('"data" cannot be undefined or null (ResponseHandler)');
      }

      var response = { status: 'success' };

      if (data.message) {
        response.message = data.message;
        // eslint-disable-next-line
        delete data.message;
      } else if (typeof data === 'string') {
        response.message = data;
        // eslint-disable-next-line
        data = {};
      }

      response.data = data.data || data;

      if (Object.keys(response.data).length === 0) {
        delete response.data;
      }

      return response;
    }

    /**
       * Method for handling error responses
       * @param {any} error
       */

  }, {
    key: 'error',
    value: function error() {
      var _error = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'An error occurred';

      var response = { status: 'error' };

      if (_error && (typeof _error === 'undefined' ? 'undefined' : _typeof(_error)) === 'object') {
        response = Object.assign(response, _error);
      } else {
        response.message = _error || 'An error occurred';
      }

      return response;
    }
  }]);

  return ResponseHandler;
}();

exports.default = function (req, res, next) {
  res.successResponse = function (data) {
    var statusCode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 200;
    return res.status(statusCode).json(ResponseHandler.success(data));
  };

  res.errorResponse = function (error) {
    var statusCode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 400;
    return res.status(statusCode).json(ResponseHandler.error(error));
  };

  return next();
};