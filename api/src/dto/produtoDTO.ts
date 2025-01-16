import { number } from "zod";
import { Produto } from "../models/produtoModel";

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
  totalPaginas: number;
  paginaAtual: number;
}