/**
 * @swagger
 * components:
 *   schemas:
 *     CreateClienteDTO:
 *       type: object
 *       required:
 *         - nome
 *       properties:
 *         nome:
 *           type: string
 *           description: Nome do cliente
 *         apelido:
 *           type: string
 *           description: Apelido do cliente
 *     UpdateClienteDTO:
 *       type: object
 *       properties:
 *         nome:
 *           type: string
 *           description: Nome do cliente
 *         apelido:
 *           type: string
 *           description: Apelido do cliente
 */
export interface CreateClienteDTO {
  nome: string;
  apelido?: string;
}

export interface UpdateClienteDTO {
  nome?: string;
  apelido?: string;
}

