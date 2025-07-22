import { Request, Response, NextFunction } from 'express';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

export const validateDto = (dtoClass: any) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const dto = plainToInstance(dtoClass, req.body);
      const errors = await validate(dto);

      if (errors.length > 0) {
        const errorMessages = errors.map(error => {
          return Object.values(error.constraints || {}).join(', ');
        });

        return res.status(400).json({
          error: 'Validation failed',
          details: errorMessages
        });
      }

      req.body = dto;
      next();
    } catch (error) {
      return res.status(400).json({ error: 'Invalid request data' });
    }
  };
};