import  produtoRepository  from '../repository/produtoRepository';
import { CreateProdutoDTO, UpdateProdutoDTO, PaginatedResponseProdutoDTO } from '../dto/produtoDTO';
import { Produto } from '../models/produtoModel';

const produtoService = {
  async getProdutoById(id: number): Promise<Omit<Produto, 'imagem'> | null> {
    return await produtoRepository.getProdutoById(id);
  },
  async createProduto(produto: CreateProdutoDTO): Promise<Omit<Produto, 'imagem'> | null> {
    const id = await produtoRepository.createProduto(produto);
    return await produtoRepository.getProdutoById(id);
  },
  async updateProduto(id: number, produto: UpdateProdutoDTO): Promise<Omit<Produto, 'imagem'> | null> {
    const existingProduto = await produtoRepository.getProdutoById(id);
    if (!existingProduto) {
      throw new Error('Produto não encontrado');
    }

    const updatedProdutoDTO: UpdateProdutoDTO = {
      ...existingProduto,
      ...produto,
    };

    await produtoRepository.updateProduto(id, updatedProdutoDTO);
    return await produtoRepository.getProdutoById(id);
  },
  async deleteProduto(id: number): Promise<boolean> {
    const produto = await produtoService.getProdutoById(id);
    if (!produto) {
      throw new Error('Produto não encontrado');
    }
    return await produtoRepository.deleteProduto(id);
    ;
  },
  async getImagemProduto(id: number): Promise<Buffer | null> {
    return await produtoRepository.getImagemProduto(id);
  },
  async getProdutos(query: { id?: number, produto_codigo?: string, nome?: string, preco?: number, categoria?: string, pagina?: number, preco_ordenado?: number, esgotado?: boolean }): Promise<PaginatedResponseProdutoDTO> {
    const produtos = await produtoRepository.getProdutos(query);
    const totalProdutos = await produtoRepository.getTotalProdutos(query);
    const total_paginas = Math.ceil(totalProdutos / 10);
    const paginatedResponse: PaginatedResponseProdutoDTO = {
      produtos,
      total_paginas,
      pagina_atual: query.pagina || 1,
    };
    return paginatedResponse;
  }
};

export default produtoService;
export { produtoService };
