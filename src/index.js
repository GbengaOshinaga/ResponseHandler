
/**
 * Middleware for handling responses to the client
 */
export class ResponseHandler {
  /**
     * Method for handling success responses
     * @param {object} data
     */
  static success(data) {
    if (!data) {
      throw new Error('"data" cannot be undefined or null (ResponseHandler)');
    }

    const response = { status: 'success' };

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
  static error(error) {
    let response = { status: 'error' };

    if (error && typeof error === 'object') {
      response = Object.assign(response, error);
    } else {
      response.message = error || 'An error occurred';
    }

    return response;
  }
}

export default (req, res, next) => {
  res.successResponse = (data, statusCode = 200) => res
    .status(statusCode)
    .json(ResponseHandler.success(data));

  res.errorResponse = (error, statusCode = 400) => res
    .status(statusCode)
    .json(ResponseHandler.error(error));

  return next();
};
