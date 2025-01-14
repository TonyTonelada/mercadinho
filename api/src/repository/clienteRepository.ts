import pool from './db';
import { CreateClienteDTO, UpdateClienteDTO } from '../dto/clienteDTO';
import Cliente from '../models/clienteModel';

const clienteRepository = {
  async getClientes(filters: { nome?: string, apelido?: string, id?: number, status_pagamento?: string, limit: number, offset: number }): Promise<Cliente[]> {
    const { nome, apelido, id, status_pagamento, limit, offset } = filters;
    let query = 'SELECT id, nome, apelido, data_cadastro, data_atualizacao FROM cliente';
    const conditions: string[] = [];
    const params: any[] = [];

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

    const [rows] = await pool.query(query, params);
    return rows as Cliente[];
  },

  async getClienteById(id: number): Promise<Cliente | null> {
    const [rows] = await pool.query('SELECT * FROM cliente WHERE id = ?', [id]);
    const clientes = rows as Cliente[];
    return clientes.length > 0 ? clientes[0] : null;
  },

  async createCliente(cliente: CreateClienteDTO): Promise<void> {
    const { nome, apelido } = cliente;
    await pool.query('INSERT INTO cliente (nome, apelido) VALUES (?, ?)', [nome, apelido]);
  },

  async updateCliente(id: number, cliente: UpdateClienteDTO): Promise<void> {
    const { nome, apelido } = cliente;
    if (!nome && !apelido) {
      throw new Error('Nome ou apelido deve ser fornecido');
    }
    if (nome && apelido) {
      await pool.query('UPDATE cliente SET nome = ?, apelido = ? WHERE id = ?', [nome, apelido, id]);
    } else if (nome) {
      await pool.query('UPDATE cliente SET nome = ? WHERE id = ?', [nome, id]);
    } else if (apelido) {
      await pool.query('UPDATE cliente SET apelido = ? WHERE id = ?', [apelido, id]);
    }
  },

  async deleteCliente(id: number): Promise<void> {
    await pool.query('DELETE FROM cliente WHERE id = ?', [id]);
  }
};

export default clienteRepository;
export { clienteRepository };
