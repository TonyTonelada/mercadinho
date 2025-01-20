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
 * /estoque/{id}:
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
router.get('/estoque/:id', estoqueController.getEstoqueById);

/**
 * @swagger
 * /estoque:
 *   post:
 *     tags: [Estoque]
 *     summary: Criar um novo estoque
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
router.post('/estoque', validateCreateEstoque, estoqueController.createEstoque);

/**
 * @swagger
 * /estoque/{id}:
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
router.patch('/estoque/:id', validateUpdateEstoque, estoqueController.updateEstoque);

/**
 * @swagger
 * /estoque/{id}:
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
 */
router.delete('/estoque/:id', estoqueController.deleteEstoque);

/**
 * @swagger
 * /estoque:
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
router.get('/estoque', estoqueController.getEstoques);

export default router;