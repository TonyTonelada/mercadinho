import { CreateEstoqueDTO, UpdateEstoqueDTO, PaginatedResponseEstoqueDTO } from '../dto/estoqueDTO';
import Estoque from '../models/estoqueModel'
import estoqueRepository from '../repository/estoqueRepository'
import produtoService from './produtoService';

export const estoqueService = {
    async getEstoqueById(id: number): Promise<Estoque | null> {
        return await estoqueRepository.getEstoqueById(id);
    },
    async createEstoque(produto_id: number, estoque: CreateEstoqueDTO): Promise<Estoque | null> {
        const produto = await produtoService.getProdutoById(produto_id);
        if (!produto) {
            throw new Error('Produto não encontrado');
        }
        const id = await estoqueRepository.createEstoque(produto_id, estoque);
        const createdEstoque = await estoqueRepository.getEstoqueById(id);
        return createdEstoque;
    },
    async updateEstoque(id: number, estoque: UpdateEstoqueDTO): Promise<Estoque | null> {
        const existingEstoque = await estoqueRepository.getEstoqueById(id);
        if (!existingEstoque) {
            throw new Error('Estoque não encontrado');
        }
        await estoqueRepository.updateEstoque(id, estoque);
        return await estoqueRepository.getEstoqueById(id);
    },
    async deleteEstoque(id: number): Promise<boolean> {
        const existingEstoque = await estoqueRepository.getEstoqueById(id);
        if (!existingEstoque) {
            throw new Error('Estoque não encontrado');
        }
        return await estoqueRepository.deleteEstoque(id);
    },
    async getEstoques(query: { produto_id?: number, mostrar_quantidade_vazio?: boolean, pagina?: number }): Promise<PaginatedResponseEstoqueDTO> {
        const estoques = await estoqueRepository.getEstoques(query);
        const total_paginas = Math.ceil(await estoqueRepository.getTotalEstoques(query) / 10);
        const paginatedResponseEstoque: PaginatedResponseEstoqueDTO = {
            estoques,
            total_paginas,
            pagina_atual: query.pagina || 1
        };
        return paginatedResponseEstoque;
    }

}

export default estoqueService;