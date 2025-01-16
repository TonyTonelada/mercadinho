export interface CreateEstoqueDTO{
    produto_id: number;
    quantidade: number;
    custo_unitario: number;
    data_validade: Date;
}