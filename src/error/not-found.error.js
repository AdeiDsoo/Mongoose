export default class CustomError extends Error {
    constructor(message) {
      super(message);
      this.name = this.constructor.name;
      Error.captureStackTrace(this, this.constructor);
    }
  
    static createError(message) {
      return new CustomError(message);
    }
  }