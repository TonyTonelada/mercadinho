import { Router } from 'express';
const router = Router();
import estoqueController from '../controllers/estoqueController';
import { validateCreateEstoque, validateUpdateEstoque } from '../controllers/middleware/validationMiddleware';

/**
 * @swagger
 * tags:
 *   name: Estoque
 *   description: Gerenciamento de estoque
 */

/**
 * @swagger
 * /api/produto/estoque/{id}:
 *   get:
 *     tags: [Estoque]
 *     summary: Obter estoque por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do estoque
 *     responses:
 *       200:
 *         description: Estoque encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Estoque'
 *       404:
 *         description: Estoque não encontrado
 */
router.get('/produto/estoque/:id', estoqueController.getEstoqueById);

/**
 * @swagger
 * /api/produto/{id}/estoque:
 *   post:
 *     tags: [Estoque]
 *     summary: Criar um novo estoque
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do produto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateEstoqueDTO'
 *     responses:
 *       201:
 *         description: Estoque criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Estoque'
 *       404:
 *         description: Produto não encontrado
 */
router.post('/produto/:id/estoque', validateCreateEstoque, estoqueController.createEstoque);

/**
 * @swagger
 * /api/produto/estoque/{id}:
 *   patch:
 *     tags: [Estoque]
 *     summary: Atualizar um estoque existente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do estoque
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateEstoqueDTO'
 *     responses:
 *       200:
 *         description: Estoque atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Estoque'
 *       404:
 *         description: Estoque não encontrado
 */
router.patch('/produto/estoque/:id', validateUpdateEstoque, estoqueController.updateEstoque);

/**
 * @swagger
 * /api/produto/estoque/{id}:
 *   delete:
 *     tags: [Estoque]
 *     summary: Deletar um estoque
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do estoque
 *     responses:
 *       200:
 *         description: Estoque deletado com sucesso
 *       404:
 *         description: Estoque não encontrado
 *       400:
 *         description: Não é possível excluir o estoque, ele está referenciado por outro registro
 */
router.delete('/produto/estoque/:id', estoqueController.deleteEstoque);

/**
 * @swagger
 * /api/produto/estoque:
 *   get:
 *     tags: [Estoque]
 *     summary: Obter lista de estoques
 *     parameters:
 *       - in: query
 *         name: produto_id
 *         schema:
 *           type: integer
 *         description: ID do produto
 *       - in: query
 *         name: mostrar_quantidade_vazio
 *         schema:
 *           type: boolean
 *         description: Mostrar apenas estoques com quantidade disponível igual a zero
 *       - in: query
 *         name: pagina
 *         schema:
 *           type: integer
 *         description: Número da página
 *     responses:
 *       200:
 *         description: Lista de estoques
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaginatedResponseEstoqueDTO'
 */
router.get('/produto/estoque', estoqueController.getEstoques);

export default router;