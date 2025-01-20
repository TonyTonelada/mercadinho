import { Request, Response } from 'express';
import clienteService from '../services/clienteService';
import { CreateClienteDTO, UpdateClienteDTO } from '../dto/clienteDTO';
import Cliente from '../models/clienteModel';

const clienteController = {
  async getClientes(req: Request, res: Response<{ message: string } | Cliente[]>) {
    try {
      const { nome, apelido, id, status_pagamento, page = 1 } = req.query;
      const clientes: Cliente[] = await clienteService.getClientes({
        nome: nome as string,
        apelido: apelido as string,
        id: id ? Number(id) : undefined,
        status_pagamento: status_pagamento as string,
        page: Number(page)
      });
      res.json(clientes);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar clientes' });
    }
  },

  async getClienteById(req: Request<{id: string},{},{}>, res: Response<Cliente | { message: string }>) {
    try {
      const { id } = req.params;
      const cliente: Cliente | null = await clienteService.getClienteById(Number(id));
      if (cliente) {
        res.json(cliente);
      } else {
        res.status(404).json({ message: 'Cliente não encontrado' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar cliente' });
    }
  },

  async createCliente(req: Request<{}, {}, CreateClienteDTO>, res: Response<Cliente | { message: string }>) {
    try {
      const { nome, apelido } = req.body;
      const cliente: Cliente | null = await clienteService.createCliente({ nome, apelido });
      if (cliente) {
        res.status(201).json(cliente);
      } else {
        res.status(500).json({ message: 'Erro ao criar cliente' });
      }
    } catch (error) {
      res.status(500).json({ message: `Erro ao criar cliente ${error}` });
    }
  },

  async updateCliente(req: Request<{ id: string }, {}, UpdateClienteDTO>, res: Response<Cliente | { message: string }>) {
    try {
      const { id } = req.params;
      const { nome, apelido } = req.body;
      const cliente = await clienteService.updateCliente(Number(id), { nome, apelido });
      if (cliente) {
        res.status(200).json(cliente);
      } else {
        res.status(404).json({ message: 'Cliente não encontrado' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Erro ao atualizar cliente' });
    }
  },

  async deleteCliente(req: Request<{ id: string }>, res: Response<{ message: string }>) {
    try {
      const { id } = req.params;
      const ok = await clienteService.deleteCliente(Number(id));
      if (ok) {
        res.json({ message: 'Cliente deletado com sucesso' });
      } else {
        res.status(404).json({ message: 'Cliente não encontrado' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Erro ao deletar cliente' });
    }
  }
};

export default clienteController;
