import  {Request, Response}  from 'express';
import estoqueService from '../services/estoqueService';
import  Estoque  from '../models/estoqueModel';
import { CreateEstoqueDTO, PaginatedResponseEstoqueDTO, UpdateEstoqueDTO } from '../dto/estoqueDTO';
import { create } from 'domain';

const estoqueController = {
    async getEstoqueById(req: Request<{ id: string }>, res: Response<Estoque | { message: string }>) {
        const id = parseInt(req.params.id, 10);
        try {
            const estoque = await estoqueService.getEstoqueById(id);
            if (!estoque) {
                return res.status(404).json({ message: 'Estoque não encontrado' });
            }
            return res.json(estoque);
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    },
    async createEstoque(req: Request<{}, {}, CreateEstoqueDTO>, res: Response<Estoque | { message: string }>) {
        try {
            const estoqueDTO: CreateEstoqueDTO = req.body;
            const estoque: Estoque | null = await estoqueService.createEstoque(estoqueDTO);
            if (!estoque) {
                return res.status(500).json({ message: 'Erro ao criar estoque' });
            }
            return res.status(201).json(estoque);
        } catch (error: any) {
            if (error.message === 'Produto não encontrado') {
                return res.status(404).json({ message: 'Produto inserido não encontrado' });
            }
            return res.status(500).json({ message: error.message });
        }
    },
    async updateEstoque(req: Request<{ id: string }, {}, UpdateEstoqueDTO>, res: Response<Estoque | { message: string }>) {
        const id = parseInt(req.params.id, 10);
        try {
            const estoqueDTO: UpdateEstoqueDTO = req.body;
            const estoque = await estoqueService.updateEstoque(id, estoqueDTO);
            if(!estoque) {
                return res.status(404).json({ message: 'Estoque alterado não encontrado' });
            }
            return res.json(estoque);
        } catch (error: any) {
            if (error.message === 'Estoque não encontrado') {
                return res.status(404).json({ message: 'Estoque não encontrado' });
            }
            return res.status(500).json({ message: error.message });
        }
    },
    async deleteEstoque(req: Request<{ id: string }>, res: Response<{ message: string }>) {
        const id = parseInt(req.params.id, 10);
        try {
            const ok = await estoqueService.deleteEstoque(id);
            if(ok){
                return res.json({ message: 'Estoque deletado com sucesso' });
            }
            return res.status(404).json({ message: 'Estoque não encontrado' });
        } catch (error: any) {
            if (error.message === 'Estoque não encontrado') {
                return res.status(404).json({ message: error.message });
            }
            return res.status(500).json({ message: error.message });
        }
    },
    async getEstoques(req: Request, res: Response<PaginatedResponseEstoqueDTO | {message: string}>){
        try {
            const query = req.query;
            const estoques = await estoqueService.getEstoques(query);
            return res.json(estoques);
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }
}

export default estoqueController;