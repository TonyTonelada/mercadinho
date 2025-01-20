import Estoque from "../models/estoqueModel";

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateEstoqueDTO:
 *       type: object
 *       properties:
 *         produto_id:
 *           type: integer
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
  produto_id: number;
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