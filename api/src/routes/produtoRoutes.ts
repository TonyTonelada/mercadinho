import { Router } from 'express';
import multer from 'multer';
const router = Router();
import produtoController from '../controllers/produtoController';
import { validateCreateProduto, validateUpdateProduto } from '../controllers/middleware/validationMiddleware';

const upload = multer({ storage: multer.memoryStorage() });

/**
 * @swagger
 * /api/produto/{id}:
 *   get:
 *     summary: Obter produto por ID
 *     tags: [Produto]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do produto
 *     responses:
 *       200:
 *         description: Produto encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Produto'
 *       404:
 *         description: Produto não encontrado
 *       500:
 *         description: Erro no servidor
 */
router.get('/produto/:id', produtoController.getProdutoById);

/**
 * @swagger
 * /api/produto:
 *   post:
 *     summary: Criar um novo produto
 *     tags: [Produto]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateProdutoDTO'
 *     responses:
 *       201:
 *         description: Produto criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Produto'
 *       400:
 *         description: Requisição inválida
 *       500:
 *         description: Erro no servidor
 */
router.post('/produto', upload.single('imagem'), validateCreateProduto, produtoController.createProduto);

/**
 * @swagger
 * /api/produto/{id}:
 *   patch:
 *     summary: Atualizar um produto
 *     tags: [Produto]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do produto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateProdutoDTO'
 *             properties:
 *               nome:
 *                 type: string
 *                 description: Nome do produto
 *               descricao:
 *                 type: string
 *                 description: Descrição do produto
 *               preco:
 *                 type: number
 *                 description: Preço do produto
 *               categoria:
 *                 type: string
 *                 description: Categoria do produto
 *               imagem:
 *                 type: string
 *                 format: binary
 *                 description: Imagem do produto
 *     responses:
 *       200:
 *         description: Produto atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Produto'
 *       400:
 *         description: Requisição inválida
 *       404:
 *         description: Produto não encontrado
 *       500:
 *         description: Erro no servidor
 */
router.patch('/produto/:id', upload.single('imagem'), validateUpdateProduto, produtoController.updateProduto);

/**
 * @swagger
 * /api/produto/{id}:
 *   delete:
 *     summary: Deletar um produto
 *     tags: [Produto]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do produto
 *     responses:
 *       200:
 *         description: Produto deletado com sucesso
 *       404:
 *         description: Produto não encontrado
 *       500:
 *         description: Erro no servidor
 */
router.delete('/produto/:id', produtoController.deleteProduto);

/**
 * @swagger
 * /api/produto/{id}/imagem:
 *   get:
 *     summary: Obter imagem do produto
 *     tags: [Produto]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do produto
 *     responses:
 *       200:
 *         description: Imagem do produto encontrada
 *         content:
 *           image/jpeg:
 *             schema:
 *               type: string
 *               format: binary
 *       404:
 *         description: Imagem não encontrada
 *       500:
 *         description: Erro no servidor
 */
router.get('/produto/:id/imagem', produtoController.getImagemProduto);

/**
 * @swagger
 * /api/produtos:
 *   get:
 *     summary: Obter lista de produtos
 *     tags: [Produto]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: number
 *         description: ID do produto
 *       - in: query
 *         name: produto_codigo
 *         schema:
 *           type: string
 *         description: Código do produto
 *       - in: query
 *         name: nome
 *         schema:
 *           type: string
 *         description: Nome do produto
 *       - in: query
 *         name: preco
 *         schema:
 *           type: number
 *         description: Preço do produto
 *       - in: query
 *         name: categoria
 *         schema:
 *           type: string
 *         description: Categoria do produto
 *       - in: query
 *         name: pagina
 *         schema:
 *           type: number
 *         description: Número da página
 *       - in: query
 *         name: preco_ordenado
 *         schema:
 *           type: number
 *         description: Ordenação do preço (1 para ascendente, -1 para descendente)
 *       - in: query
 *         name: esgotado
 *         schema:
 *           type: boolean
 *         description: Indica se o produto está esgotado
 *     responses:
 *       200:
 *         description: Lista de produtos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PaginatedResponseProdutoDTO'
 *       500:
 *         description: Erro no servidor
 */
router.get('/produtos', produtoController.getProdutos);

export default router;
export { router };