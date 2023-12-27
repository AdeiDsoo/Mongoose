import CustomError from './not-found.error.js';

export const errorMiddleware = (error, req, res, next) => {
    if (error instanceof CustomError) {
      res.status(400).json({
        status: 'error',
        message: error.message,
        error: error.name,
      });
    } else {
      res.status(500).json({
        status: 'error',
        message: error.message,
        error: error.name,
      });
    }
  };