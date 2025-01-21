import { CreateProdutoDTO, UpdateProdutoDTO } from '../dto/produtoDTO';
import { Produto } from '../models/produtoModel';
import pool from './db';

const produtoRepository = {
  async getProdutoById(id: number): Promise<Omit<Produto, 'imagem'> | null> {
    try {
      const [result] = await pool.query('SELECT p.id, p.produto_codigo, p.nome, p.descricao, p.preco, p.categoria, p.data_cadastro, COALESCE(SUM(e.quantidade_disponivel), 0) AS total_disponivel FROM produto p LEFT JOIN estoque e ON p.id = e.produto_id WHERE p.id = ?', [id]);

      const produto = result as Omit<Produto, 'imagem'>[];
      return produto[0].id ? produto[0] : null;
    } catch (error) {
      console.error(`Error fetching produto with id ${id}:`, error);
      throw new Error('Error fetching produto');
    }
  },
  async createProduto(produto: CreateProdutoDTO): Promise<number> {
    try {
      const [result] = await pool.query('INSERT INTO produto SET ?', produto);
      return (result as any).insertId;
    } catch (error) {
      console.error('Error creating produto:', error);
      throw new Error('Error creating produto');
    }
  },
  async updateProduto(id: number, produto: UpdateProdutoDTO): Promise<void> {
    try {
      await pool.query('UPDATE produto SET ? WHERE id = ?', [produto, id]);
    } catch (error) {
      console.error(`Error updating produto with id ${id}:`, error);
      throw new Error('Error updating produto');
    }
  },
  async deleteProduto(id: number): Promise<boolean> {
    try {
      const [result] = await pool.query('DELETE FROM produto WHERE id = ?', [id]);
      return (result as any).affectedRows > 0;
    } catch (error) {
      if ((error as any).code === 'ER_ROW_IS_REFERENCED_2') {
        // console.error(`Produto com id ${id} possui estoques associados:`, error);
        throw new Error('Produto possui estoques associados');
      } else {
        console.error(`Error deleting produto with id ${id}:`, error);
        throw new Error('Error deleting produto');
      }
    }
  },
  async getImagemProduto(id: number): Promise<Buffer | null> {
    try {
      const [result] = await pool.query('SELECT imagem FROM produto WHERE id = ?', [id]);
      const produtos = result as { imagem: Buffer }[];
      return produtos.length > 0 ? produtos[0].imagem : null;
    } catch (error) {
      console.error(`Error fetching imagem for produto with id ${id}:`, error);
      throw new Error('Error fetching imagem');
    }
  },
  async getTotalProdutos(query: { id?: number, produto_codigo?: string, nome?: string, preco?: number, categoria?: string, }): Promise<number> {
    try {
      let sql = 'SELECT COUNT(id) as total FROM produto WHERE 1=1';
      const params: any[] = [];

      if (query.id) {
        sql += ' AND id = ?';
        params.push(query.id);
      }
      if (query.produto_codigo) {
        sql += ' AND produto_codigo = ?';
        params.push(query.produto_codigo);
      }
      if (query.nome) {
        sql += ' AND nome LIKE ?';
        params.push(`%${query.nome}%`);
      }
      if (query.preco) {
        sql += ' AND preco = ?';
        params.push(query.preco);
      }
      if (query.categoria) {
        sql += ' AND categoria = ?';
        params.push(query.categoria);
      }

      const [result] = await pool.query(sql, params);
      const total = (result as any)[0].total;
      return total;
    } catch (error) {
      console.error('Error fetching total produtos:', error);
      throw new Error('Error fetching total produtos');
    }
  },
  async getProdutos(query: { id?: number, produto_codigo?: string, nome?: string, preco?: number, categoria?: string, pagina?: number, preco_ordenado?: number, esgotado?: boolean  }): Promise<Omit<Produto, 'imagem'>[]> {
    try {
      const { id, produto_codigo, nome, preco, categoria, pagina = 1, preco_ordenado, esgotado = false} = query;
      const offset = (pagina - 1) * 10;
      
      let sql = `
        SELECT p.id, p.produto_codigo, p.nome, p.descricao, p.preco, p.categoria, p.data_cadastro, 
           COALESCE(SUM(e.quantidade_disponivel), 0) AS total_disponivel
        FROM produto p
        LEFT JOIN estoque e ON p.id = e.produto_id
        WHERE 1=1
      `;
      const params: any[] = [];

      if (id) {
        sql += ' AND p.id = ?';
        params.push(id);
      }
      if (produto_codigo) {
        sql += ' AND p.produto_codigo = ?';
        params.push(produto_codigo);
      }
      if (nome) {
        sql += ' AND p.nome LIKE ?';
        params.push(`%${nome}%`);
      }
      if (preco) {
        sql += ' AND p.preco = ?';
        params.push(preco);
      }
      if (categoria) {
        sql += ' AND p.categoria = ?';
        params.push(categoria);
      }
      sql += ' GROUP BY p.id';
      if (esgotado) {
        sql += ' HAVING total_disponivel = 0';
      }
      if (preco_ordenado == 1) {
        sql += ' ORDER BY p.preco ASC';
      } else if (preco_ordenado == -1) {
        sql += ' ORDER BY p.preco DESC';
      } else {
        sql += ' ORDER BY p.nome ASC';
      }

      sql += ' LIMIT 10 OFFSET ?';
      params.push(offset);

      const [result] = await pool.query(sql, params);
      return result as Omit<Produto, 'imagem'>[];
    } catch (error) {
      console.error('Error fetching produtos:', error);
      throw new Error('Error fetching produtos');
    }
  }
};

export default produtoRepository;