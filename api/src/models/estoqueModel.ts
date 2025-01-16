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