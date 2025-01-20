import  Estoque from '../models/estoqueModel';
import pool from './db';
import { CreateEstoqueDTO, UpdateEstoqueDTO } from '../dto/estoqueDTO';
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
        const { produto_id, quantidade, valor_total, data_validade } = estoque;
        try {
            const [result] = await pool.query('INSERT INTO estoque (produto_id, quantidade, quantidade_disponivel, valor_total, data_validade) VALUES (?, ?, ?, ?, ?)', [produto_id, quantidade, quantidade, valor_total, data_validade]);
            const insertId = (result as any).insertId;
            return insertId;
        } catch (error) {
            console.error('Error creating estoque:', error);
            throw new Error('Error creating estoque');
        };
        
    },
    async updateEstoque(id: number, estoque: UpdateEstoqueDTO): Promise<void> {
        try {
            await pool.query('UPDATE estoque SET ? WHERE id = ?', [estoque, id]);
        } catch (error) {
            console.error('Error updating estoque:', error);
            throw new Error('Error updating estoque');
        }
    },
    async deleteEstoque(id: number): Promise<boolean> {
        try {
            const [result] = await pool.query('DELETE FROM estoque WHERE id = ?', [id]);
            return (result as any).affectedRows > 0;
        } catch (error) {
            console.error('Error deleting estoque:', error);
            throw new Error('Error deleting estoque');
        }
    },
    async getEstoques(query: { produto_id?: number, mostrar_quantidade_vazio?: boolean, pagina?: number }): Promise<Estoque[]> {
        const { produto_id, mostrar_quantidade_vazio = false, pagina = 1 } = query;
        const offset = (pagina - 1) * 10;
        let sql = 'SELECT * FROM estoque WHERE 1=1';
        const params: any[] = [];

        if (produto_id) {
            sql += ' AND produto_id = ?';
            params.push(produto_id);
        }

        if (mostrar_quantidade_vazio) {
            sql += ' AND quantidade_disponivel = 0';
        }else{
            sql += ' AND quantidade_disponivel <> 0';
        }

        sql += ' ORDER BY data_cadastro DESC LIMIT 10 OFFSET ?';
        params.push(offset);

        try {
            const [rows] = await pool.query(sql, params);
            return rows as Estoque[];
        } catch (error) {
            console.error('Error fetching estoque:', error);
            throw new Error('Error fetching estoque');
        }
    },
    async getTotalEstoques(query: { produto_id?: number, mostrar_quantidade_vazio?: boolean }): Promise<number> {
        const { produto_id, mostrar_quantidade_vazio = false } = query;
        let sql = 'SELECT COUNT(*) as total FROM estoque WHERE 1=1';
        const params: any[] = [];

        if (produto_id) {
            sql += ' AND produto_id = ?';
            params.push(produto_id);
        }

        if (mostrar_quantidade_vazio) {
            sql += ' AND quantidade_disponivel = 0';
            console.log(mostrar_quantidade_vazio, "1");
        }else{
            sql += ' AND quantidade_disponivel <> 0';
            console.log(mostrar_quantidade_vazio, "0");

        }

        try {
            const [rows] = await pool.query(sql, params);
            const total = (rows as any)[0].total;
            return total;
        } catch (error) {
            console.error('Error fetching total estoques:', error);
            throw new Error('Error fetching total estoques');
        }
    }

}
export default estoqueRepository;
