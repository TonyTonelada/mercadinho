export interface Produto {
  id: string;
  nome: string;
  descricao?: string;
  preco: number;
  categoria: string;
  imagem?: Blob; // Dependendo do caso de uso
  dataCadastro: Date;
}
