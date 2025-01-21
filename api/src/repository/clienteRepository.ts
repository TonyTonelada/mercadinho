import pool from './db';
import { CreateClienteDTO, UpdateClienteDTO } from '../dto/clienteDTO';
import Cliente from '../models/clienteModel';

const clienteRepository = {
  async getClientes(filters: { nome?: string, apelido?: string, id?: number, status_pagamento?: string, limit: number, offset: number }): Promise<Cliente[]> {
    try {
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
    } catch (error) {
      console.error('Error fetching clients:', error);
      throw new Error('Error fetching clients');
    }
  },

  async getClienteById(id: number): Promise<Cliente | null> {
    try {
      const [rows] = await pool.query('SELECT * FROM cliente WHERE id = ?', [id]);
      const clientes = rows as Cliente[];
      return clientes.length > 0 ? clientes[0] : null;
    } catch (error) {
      console.error(`Error fetching client with id ${id}:`, error);
      throw new Error('Error fetching client');
    }
  },

  async createCliente(cliente: CreateClienteDTO): Promise<number> {
    try {
      const { nome, apelido } = cliente;
      const [result] = await pool.query('INSERT INTO cliente (nome, apelido) VALUES (?, ?)', [nome, apelido]);
      const insertId = (result as any).insertId;
      return insertId;
    } catch (error) {
      console.error('Error creating client:', error);
      throw new Error('Error creating client');
    }
  },

  async updateCliente(id: number, cliente: UpdateClienteDTO): Promise<void> {
    try {
      const { nome, apelido } = cliente;
      await pool.query('UPDATE cliente SET nome = ?, apelido = ? WHERE id = ?', [nome, apelido, id]);
    } catch (error) {
      console.error(`Error updating client with id ${id}:`, error);
      throw new Error('Error updating client');
    }
  },

  async deleteCliente(id: number): Promise<boolean> {
    try {
      const [result] = await pool.query('DELETE FROM cliente WHERE id = ?', [id]);
      return (result as any).affectedRows > 0;
    } catch (error) {
      if ((error as any).code === 'ER_ROW_IS_REFERENCED_2') {
        // console.error(`Cliente com id ${id} possui vendas associadas:`, error);
        throw new Error('Cliente possui vendas associadas');
      } else {
        console.error(`Error deleting client with id ${id}:`, error);
        throw new Error('Error deleting client');
      }
    }
  }
};

export default clienteRepository;
export { clienteRepository };
