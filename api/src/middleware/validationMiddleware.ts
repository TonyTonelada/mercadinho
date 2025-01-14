import { Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod';

const createClienteSchema = z.object({
  nome: z.string().nonempty('Nome deve ser uma string não vazia').max(45, 'Nome deve ter no máximo 45 caracteres'),
  apelido: z.string().max(45, 'Apelido deve ter no máximo 45 caracteres').optional(),
});

const updateClienteSchema = z.object({
  nome: z.string().max(45, 'Nome deve ter no máximo 45 caracteres').optional(),
  apelido: z.string().max(45, 'Apelido deve ter no máximo 45 caracteres').optional()
});

export const validateCreateCliente = (req: Request, res: Response, next: NextFunction) => {
  try {
    createClienteSchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
    next(error);
  }
};

export const validateUpdateCliente = (req: Request, res: Response, next: NextFunction) => {
  try {
    updateClienteSchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
    next(error);
  }
};
