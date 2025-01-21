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

  async createCliente(cliente: CreateClienteDTO): Promise<Cliente | null> {
    const id = await clienteRepository.createCliente(cliente);
    return await clienteRepository.getClienteById(id);
  },

  async updateCliente(id: number, cliente: UpdateClienteDTO): Promise<Cliente | null> {
    const existingCliente = await clienteRepository.getClienteById(id);

    if (!existingCliente) {
      throw new Error('Cliente não encontrado');
    }

    if(existingCliente.id == 1) {
      throw new Error('Não é possível alterar o cliente padrão');
    }

    const updatedCliente: UpdateClienteDTO = {
      ...existingCliente,
      ...cliente,
    };

    await clienteRepository.updateCliente(id, updatedCliente);
    return await clienteRepository.getClienteById(id);
  },

  async deleteCliente(id: number): Promise<boolean> {
    const cliente = await clienteService.getClienteById(id);
    if (!cliente) {
      return false;
    }

    if (cliente.id === 1) {
      throw new Error('Não é possível deletar o cliente padrão');
    }

    return await clienteRepository.deleteCliente(id);
  }
};

export default clienteService;
export { clienteService };
