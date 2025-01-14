"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUpdateCliente = exports.validateCreateCliente = void 0;
const zod_1 = require("zod");
const createClienteSchema = zod_1.z.object({
    nome: zod_1.z.string().nonempty('Nome deve ser uma string não vazia').max(45, 'Nome deve ter no máximo 45 caracteres'),
    apelido: zod_1.z.string().max(45, 'Apelido deve ter no máximo 45 caracteres').optional(),
});
const updateClienteSchema = zod_1.z.object({
    nome: zod_1.z.string().max(45, 'Nome deve ter no máximo 45 caracteres').optional(),
    apelido: zod_1.z.string().max(45, 'Apelido deve ter no máximo 45 caracteres').optional()
});
const validateCreateCliente = (req, res, next) => {
    try {
        createClienteSchema.parse(req.body);
        next();
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            return res.status(400).json({ errors: error.errors });
        }
        next(error);
    }
};
exports.validateCreateCliente = validateCreateCliente;
const validateUpdateCliente = (req, res, next) => {
    try {
        updateClienteSchema.parse(req.body);
        next();
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            return res.status(400).json({ errors: error.errors });
        }
        next(error);
    }
};
exports.validateUpdateCliente = validateUpdateCliente;
