/**
 * @swagger
 * components:
 *   schemas:
 *     Cliente:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID do cliente
 *         nome:
 *           type: string
 *           description: Nome do cliente
 *         apelido:
 *           type: string
 *           description: Apelido do cliente
 *         data_cadastro:
 *           type: string
 *           format: date-time
 *           description: Data de cadastro do cliente
 *         data_atualizacao:
 *           type: string
 *           format: date-time
 *           description: Data de atualização do cliente
 */
interface Cliente {
  id: number;
  nome: string;
  apelido?: string;
  data_cadastro: Date;
  data_atualizacao: Date;
}

export default Cliente;