import { Request, Response } from 'express';
import produtoService from '../services/produtoService';
import { CreateProdutoDTO, UpdateProdutoDTO, PaginatedResponseProdutoDTO } from '../dto/produtoDTO';
import { Produto } from '../models/produtoModel';

const produtoController = {
  async getProdutoById(req: Request<{ id: string }>, res: Response<Omit<Produto, 'imagem'> | { message: string }>) {
    const id = parseInt(req.params.id, 10);
    try {
      const produto = await produtoService.getProdutoById(id);
      if (!produto) {
        return res.status(404).json({ message: 'Produto não encontrado' });
      }
      return res.json(produto);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  },
  async createProduto(req: Request<{}, {}, CreateProdutoDTO>, res: Response<Omit<Produto, 'imagem'> | { message: string }>) {
    try {
      const produtoDTO: CreateProdutoDTO = req.body;
      if (req.file) {
        produtoDTO.imagem = req.file.buffer;
      }
      const produto: Produto | null = await produtoService.createProduto(produtoDTO);
      if (!produto) {
        return res.status(500).json({ message: 'Erro ao criar produto' });
      }
      return res.status(201).json(produto);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  },
  async updateProduto(req: Request<{ id: string }, {}, UpdateProdutoDTO>, res:  Response<Omit<Produto, 'imagem'> | { message: string }>) {
    const id = parseInt(req.params.id, 10);
    try {
      const produtoDTO: UpdateProdutoDTO = req.body;
      if (req.file) {
        produtoDTO.imagem = req.file.buffer;
      }
      const produto = await produtoService.updateProduto(id, produtoDTO);
      if (!produto) {
        return res.status(404).json({ message: 'Produto não encontrado' });
      }
      return res.json(produto);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  },
  async deleteProduto(req: Request<{ id: string }>, res: Response<{ message: string }>) {
    const id = parseInt(req.params.id, 10);
    try {
      const ok = await produtoService.deleteProduto(id);
      if (ok) {
        return res.json({ message: 'Produto deletado com sucesso' });
      }
      return res.status(404).json({ message: 'Produto não encontrado' });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  },
  async getImagemProduto(req: Request<{ id: string }>, res: Response) {
    const id = parseInt(req.params.id, 10);
    try {
      const imagem = await produtoService.getImagemProduto(id);
      if (!imagem) {
        return res.status(404).json({ message: 'Imagem não encontrada' });
      }
      res.setHeader('Content-Type', 'image/jpeg');
      return res.send(imagem);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  },
  async getProdutos(req: Request, res: Response<PaginatedResponseProdutoDTO | { message: string }>) {
    try {
      const query = req.query;
      const produtos: PaginatedResponseProdutoDTO = await produtoService.getProdutos(query);
      res.json(produtos);
    } catch (error: any) {
      console.error('Error fetching produtos:', error);
      res.status(500).json({ message: 'Error fetching produtos' });
    }
  }
};

export default produtoController;