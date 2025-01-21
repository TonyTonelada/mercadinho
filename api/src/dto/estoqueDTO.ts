import Estoque from "../models/estoqueModel";

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateEstoqueDTO:
 *       type: object
 *       properties:
 *         quantidade:
 *           type: integer
 *         valor_total:
 *           type: number
 *           format: float
 *         data_validade:
 *           type: string
 *           format: date
 *     UpdateEstoqueDTO:
 *       type: object
 *       properties:
 *         quantidade:
 *           type: integer
 *         valor_total:
 *           type: number
 *           format: float
 *         data_validade:
 *           type: string
 *           format: date
 *     PaginatedResponseEstoqueDTO:
 *       type: object
 *       properties:
 *         estoques:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Estoque'
 *         pagina_atual:
 *           type: integer
 *         total_paginas:
 *           type: integer
 */

export interface CreateEstoqueDTO {
  quantidade: number;
  valor_total: number;
  data_validade: Date;
}

export interface UpdateEstoqueDTO {
  quantidade?: number;
  valor_total?: number;
  data_validade?: Date;
}

export interface PaginatedResponseEstoqueDTO {
  estoques: Estoque[];
  pagina_atual: number;
  total_paginas: number;
}