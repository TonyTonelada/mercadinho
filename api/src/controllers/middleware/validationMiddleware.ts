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

const createProdutoSchema = z.object({
  nome: z.string().nonempty('Nome deve ser uma string não vazia').max(100, 'Nome deve ter no máximo 100 caracteres'),
  descricao: z.string().optional(),
  preco: z.number().positive('Preço deve ser um número positivo'),
  categoria: z.string().nonempty('Categoria deve ser uma string não vazia').max(45, 'Categoria deve ter no máximo 45 caracteres'),
});

const updateProdutoSchema = z.object({
  nome: z.string().nonempty('Nome deve ser uma string não vazia').max(100, 'Nome deve ter no máximo 100 caracteres').optional(),
  descricao: z.string().optional(),
  preco: z.number().positive('Preço deve ser um número positivo').optional(),
  categoria: z.string().nonempty('Categoria deve ser uma string não vazia').max(45, 'Categoria deve ter no máximo 45 caracteres').optional(),
});

const createEstoqueSchema = z.object({
  produto_id: z.number().int().positive('ID do produto deve ser um número inteiro positivo'),
  quantidade: z.number().int().positive('Quantidade deve ser um número inteiro positivo'),
  valor_total: z.number().positive('Valor total deve ser um número positivo'),
  data_validade: z.string().refine((data) => {
    const date = new Date(data);
    return !isNaN(date.getTime()) && date > new Date();
  }, {
    message: 'Data de validade deve ser uma data válida no formato YYYY-MM-DD e maior que a data atual',
  }),
});

const updateEstoqueSchema = z.object({
  quantidade: z.number().int().positive('Quantidade deve ser um número inteiro positivo').optional(),
  valor_total: z.number().positive('Valor total deve ser um número positivo').optional(),
  data_validade: z.string().refine((data) => {
    const date = new Date(data);
    return !isNaN(date.getTime()) && date > new Date();
  }, {
    message: 'Data de validade deve ser uma data válida no formato YYYY-MM-DD e maior que a data atual',
  }).optional(),
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

export const validateCreateProduto = (req: Request, res: Response, next: NextFunction) => {
  try {
    createProdutoSchema.parse(req.body);
    if (req.file && req.file.size > 4 * 1024 * 1024) { // Verifica se a imagem é maior que 4MB
      return res.status(400).json({ errors: [{ message: 'A imagem não pode ser maior que 4MB' }] });
    }
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
    next(error);
  }
};

export const validateUpdateProduto = (req: Request, res: Response, next: NextFunction) => {
  try {
    updateProdutoSchema.parse(req.body);
    if (req.file && req.file.size > 4 * 1024 * 1024) { // Verifica se a imagem é maior que 4MB
      return res.status(400).json({ errors: [{ message: 'A imagem não pode ser maior que 4MB' }] });
    }
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
    next(error);
  }
};

export const validateCreateEstoque = (req: Request, res: Response, next: NextFunction) => {
  try {
    createEstoqueSchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
    next(error);
  }
};

export const validateUpdateEstoque = (req: Request, res: Response, next: NextFunction) => {
  try {
    updateEstoqueSchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
    next(error);
  }
};
