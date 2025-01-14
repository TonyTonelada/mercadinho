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
exports.clienteService = void 0;
const clienteRepository_1 = __importDefault(require("../repository/clienteRepository"));
const clienteService = {
    getClientes(filters) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nome, apelido, id, status_pagamento, page = 1 } = filters;
            const limit = 10;
            const offset = (page - 1) * limit;
            return yield clienteRepository_1.default.getClientes({ nome, apelido, id, status_pagamento, limit, offset });
        });
    },
    getClienteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield clienteRepository_1.default.getClienteById(id);
        });
    },
    createCliente(cliente) {
        return __awaiter(this, void 0, void 0, function* () {
            yield clienteRepository_1.default.createCliente(cliente);
        });
    },
    updateCliente(id, cliente) {
        return __awaiter(this, void 0, void 0, function* () {
            yield clienteRepository_1.default.updateCliente(id, cliente);
        });
    },
    deleteCliente(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const cliente = yield clienteService.getClienteById(id);
            if (!cliente) {
                throw new Error('Cliente não encontrado');
            }
            yield clienteRepository_1.default.deleteCliente(id);
        });
    }
};
exports.clienteService = clienteService;
exports.default = clienteService;
