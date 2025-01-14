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
exports.clienteRepository = void 0;
const db_1 = __importDefault(require("../repository/db"));
const clienteRepository = {
    getClientes(filters) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nome, apelido, id, status_pagamento, limit, offset } = filters;
            let query = 'SELECT id, nome, apelido, data_cadastro, data_atualizacao FROM cliente';
            const conditions = [];
            const params = [];
            if (nome) {
                conditions.push('nome LIKE ?');
                params.push(`%${nome}%`);
            }
            if (apelido) {
                conditions.push('apelido LIKE ?');
                params.push(`%${apelido}%`);
            }
            if (id) {
                conditions.push('id = ?');
                params.push(id);
            }
            if (status_pagamento) {
                conditions.push('EXISTS (SELECT 1 FROM vendas WHERE vendas.cliente_id = cliente.id AND vendas.status_pagamento = ?)');
                params.push(status_pagamento);
            }
            if (conditions.length > 0) {
                query += ' WHERE ' + conditions.join(' AND ');
            }
            query += ' LIMIT ? OFFSET ?';
            params.push(limit, offset);
            const [rows] = yield db_1.default.query(query, params);
            return rows;
        });
    },
    getClienteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const [rows] = yield db_1.default.query('SELECT * FROM cliente WHERE id = ?', [id]);
            const clientes = rows;
            return clientes.length > 0 ? clientes[0] : null;
        });
    },
    createCliente(cliente) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nome, apelido } = cliente;
            yield db_1.default.query('INSERT INTO cliente (nome, apelido) VALUES (?, ?)', [nome, apelido]);
        });
    },
    updateCliente(id, cliente) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nome, apelido } = cliente;
            if (!nome && !apelido) {
                throw new Error('Nome ou apelido deve ser fornecido');
            }
            if (nome && apelido) {
                yield db_1.default.query('UPDATE cliente SET nome = ?, apelido = ? WHERE id = ?', [nome, apelido, id]);
            }
            else if (nome) {
                yield db_1.default.query('UPDATE cliente SET nome = ? WHERE id = ?', [nome, id]);
            }
            else if (apelido) {
                yield db_1.default.query('UPDATE cliente SET apelido = ? WHERE id = ?', [apelido, id]);
            }
        });
    },
    deleteCliente(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield db_1.default.query('DELETE FROM cliente WHERE id = ?', [id]);
        });
    }
};
exports.clienteRepository = clienteRepository;
exports.default = clienteRepository;
