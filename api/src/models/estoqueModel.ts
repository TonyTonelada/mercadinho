/**
 * @swagger
 * components:
 *   schemas:
 *     Estoque:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         produto_id:
 *           type: integer
 *         quantidade:
 *           type: integer
 *         quantidade_disponivel:
 *           type: integer
 *         custo_unitario:
 *           type: number
 *           format: float
 *         data_validade:
 *           type: string
 *           format: date
 *         data_cadastro:
 *           type: string
 *           format: date
 *         data_ultima_movimentacao:
 *           type: string
 *           format: date
 */
export default interface Estoque {
  id: number;
  produto_id: number;
  quantidade: number;
  quantidade_disponivel: number;
  custo_unitario: number;
  data_validade: Date;
  data_cadastro: Date;
  data_ultima_movimentacao: Date;
}