import { Request, Response, NextFunction } from 'express';

class CustomerError extends Error {
    statusCode: number;
    message: string;
  
    constructor({ statusCode, message }: { statusCode: number, message: string }) {
      super();
      this.statusCode = statusCode;
      this.message = message;
    }
  }
  
  const handleError = (err: CustomerError | Error, _req: Request, res: Response, _next: NextFunction) => {
    let statusCode: number;
    let message: string;
  
    if (err instanceof CustomerError) {
      statusCode = err.statusCode;
      message = err.message;
    } else {
      statusCode = 500;
      message = err.message;
    }
  
    console.error(message);
  
    res.status(statusCode).json({
      status: "error",
      statusCode,
      message,
    });
  };
  
  export {
    CustomerError,
    handleError,
  };
  