/**
 * @swagger
 * components:
 *   schemas:
 *     Produto:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: ID do produto
 *         nome:
 *           type: string
 *           description: Nome do produto
 *         descricao:
 *           type: string
 *           description: Descrição do produto
 *         preco:
 *           type: number
 *           description: Preço do produto
 *         categoria:
 *           type: string
 *           description: Categoria do produto
 *         imagem:
 *           type: string
 *           format: binary
 *           description: Imagem do produto
 *         data_cadastro:
 *           type: string
 *           format: date-time
 *           description: Data de cadastro do produto
 *         total_disponivel:
 *           type: number
 *           description: Quantidade total disponível de produtos no estoque
 */

export interface Produto {
  id: string;
  nome: string;
  descricao?: string;
  preco: number;
  categoria: string;
  imagem?: Blob; // Dependendo do caso de uso
  data_cadastro: Date;
  total_disponivel: number; // Quantidade total disponível de produtos no estoque
}
