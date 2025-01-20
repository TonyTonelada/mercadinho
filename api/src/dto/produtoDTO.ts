import { Produto } from "../models/produtoModel";

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateProdutoDTO:
 *       type: object
 *       required:
 *         - nome
 *         - preco
 *         - categoria
 *       properties:
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
 *     UpdateProdutoDTO:
 *       type: object
 *       properties:
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
 *     PaginatedResponseProdutoDTO:
 *       type: object
 *       properties:
 *         produtos:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Produto'
 *         total_paginas:
 *           type: number
 *           description: Total de páginas
 *         pagina_atual:
 *           type: number
 *           description: Página atual
 *     
 */
export interface CreateProdutoDTO {
  produto_codigo?: string;
  nome: string;
  descricao?: string;
  preco: number;
  categoria: string;
  imagem?: Buffer; // Imagem em formato binário
}

export interface UpdateProdutoDTO {
  nome?: string;
  descricao?: string;
  preco?: number;
  categoria?: string;
  imagem?: Buffer; // Imagem em formato binário
}

export interface PaginatedResponseProdutoDTO {
  produtos: Produto[];
  total_paginas: number;
  pagina_atual: number;
}