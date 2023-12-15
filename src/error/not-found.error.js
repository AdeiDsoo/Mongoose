// export default class NotFoundError{
//     static createError(entity){
//         const error=new Error (`${entity} not found`)
//         error.name="notFoundError"
//         throw error
//     }

// }

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