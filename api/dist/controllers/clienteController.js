"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const clienteService_1 = __importDefault(require("../services/clienteService"));
const clienteController = {
    getClientes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { nome, apelido, id, status_pagamento, page = 1 } = req.query;
                const clientes = yield clienteService_1.default.getClientes({
                    nome: nome,
                    apelido: apelido,
                    id: id ? Number(id) : undefined,
                    status_pagamento: status_pagamento,
                    page: Number(page)
                });
                res.json(clientes);
            }
            catch (error) {
                res.status(500).json({ message: 'Erro ao buscar clientes' });
            }
        });
    },
    getClienteById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const cliente = yield clienteService_1.default.getClienteById(Number(id));
                if (cliente) {
                    res.json(cliente);
                }
                else {
                    res.status(404).json({ message: 'Cliente não encontrado' });
                }
            }
            catch (error) {
                res.status(500).json({ message: 'Erro ao buscar cliente' });
            }
        });
    },
    createCliente(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { nome, apelido } = req.body;
                yield clienteService_1.default.createCliente({ nome, apelido });
                res.status(201).json({ message: 'Cliente criado com sucesso' });
            }
            catch (error) {
                res.status(500).json({ message: `Erro ao criar cliente ${error}` });
            }
        });
    },
    updateCliente(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { nome, apelido } = req.body;
                yield clienteService_1.default.updateCliente(Number(id), { nome, apelido });
                res.json({ message: 'Cliente atualizado com sucesso' });
            }
            catch (error) {
                res.status(500).json({ message: 'Erro ao atualizar cliente' });
            }
        });
    },
    deleteCliente(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                if (!id) {
                    return res.status(400).json({ message: 'ID do cliente não fornecido' });
                }
                yield clienteService_1.default.deleteCliente(Number(id));
                res.json({ message: 'Cliente deletado com sucesso' });
            }
            catch (error) {
                if (error.message === 'Cliente não encontrado') {
                    res.status(404).json({ message: error.message });
                }
                else {
                    res.status(500).json({ message: 'Erro ao deletar cliente' });
                }
            }
        });
    }
};
exports.default = clienteController;
