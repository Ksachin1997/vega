import { Request, Response, NextFunction } from 'express';

/**
 * Validation middleware to validate the request body
 * @param schema Joi schema for validation
 */
const validate = (schema: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    const valid = error === undefined;
    if (valid) {
      next();
    } else {
      const { details } = error;
      const message: string = details
        .map((errorDetail: Error) => errorDetail.message)
        .join(',');
      res.json({ status: 400, data: {}, error: message });
    }
  };
};

export default validate;
