import clienteRepository from '../repository/clienteRepository';
import { CreateClienteDTO, UpdateClienteDTO } from '../dto/clienteDTO';
import Cliente from '../models/clienteModel';

const clienteService = {
  async getClientes(filters: { nome?: string, apelido?: string, id?: number, status_pagamento?: string, page?: number }): Promise<Cliente[]> {
    const { nome, apelido, id, status_pagamento, page = 1 } = filters;
    const limit = 10;
    const offset = (page - 1) * limit;
    return await clienteRepository.getClientes({ nome, apelido, id, status_pagamento, limit, offset });
  },

  async getClienteById(id: number): Promise<Cliente | null> {
    return await clienteRepository.getClienteById(id);
  },

  async createCliente(cliente: CreateClienteDTO): Promise<void> {
    await clienteRepository.createCliente(cliente);
  },

  async updateCliente(id: number, cliente: UpdateClienteDTO): Promise<void> {
    await clienteRepository.updateCliente(id, cliente);
  },

  async deleteCliente(id: number): Promise<void> {
    const cliente = await clienteService.getClienteById(id);
    if (!cliente) {
      throw new Error('Cliente não encontrado');
    }
    await clienteRepository.deleteCliente(id);
  }
};

export default clienteService;
export { clienteService };
