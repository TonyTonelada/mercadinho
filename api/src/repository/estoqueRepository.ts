import  Estoque from '../models/estoqueModel';
import pool from './db';
import { CreateEstoqueDTO } from '../dto/estoqueDTO';
// import Estoque from '../models/estoqueModel';

const estoqueRepository = {
    async getEstoqueById(id: number): Promise<Estoque | null> { 
        try {
            const [rows] = await pool.query('SELECT * FROM estoque WHERE id = ?', [id]);
            const estoque = rows as Estoque[];
            return estoque.length > 0 ? estoque[0] : null;
        } catch (error) {
            console.error('Error fetching estoque by id:', error);
            throw new Error('Error fetching estoque by id');
        }     
    },
    async createEstoque(estoque: CreateEstoqueDTO): Promise<number> {
        const { produto_id, quantidade, custo_unitario, data_validade } = estoque;
        try {
            const [result] = await pool.query('INSERT INTO estoque (produto_id, quantidade, quantidade_disponivel, custo_unitario, data_validade) VALUES (?, ?, ?, ?, ?)', [produto_id, quantidade, quantidade, custo_unitario, data_validade]);
            const insertId = (result as any).insertId;
            return insertId;
        } catch (error) {
            console.error('Error creating estoque:', error);
            throw new Error('Error creating estoque');
        };
        
    }

}
export default estoqueRepository;
