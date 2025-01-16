import Estoque from '../models/estoqueModel'
import estoqueRepository from '../repository/estoqueRepository'

export const estoqueService = {
    async getEstoqueById(id: number): Promise<Estoque | null> {
        return await estoqueRepository.getEstoqueById(id);
    }

}