import { Router } from 'express';
const router = Router();
import clienteController from '../controllers/clienteController';
import { validateCreateCliente, validateUpdateCliente } from '../controllers/middleware/validationMiddleware';

/**
 * @swagger
 * tags:
 *   name: Cliente
 *   description: Gerenciamento de clientes
 */

/**
 * @swagger
 * /api/cliente:
 *   get:
 *     summary: Retorna uma lista de clientes
 *     tags: [Cliente]
 *     parameters:
 *       - in: query
 *         name: nome
 *         schema:
 *           type: string
 *         description: Nome do cliente
 *       - in: query
 *         name: apelido
 *         schema:
 *           type: string
 *         description: Apelido do cliente
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         description: ID do cliente
 *       - in: query
 *         name: status_pagamento
 *         schema:
 *           type: string
 *           enum: [pago, pago_parcial, nao_pago]
 *         description: Status de pagamento
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Número da página para paginação
 *     responses:
 *       200:
 *         description: Lista de clientes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Cliente'
 *       500:
 *         description: Erro ao buscar clientes
 */
router.get('/cliente', clienteController.getClientes);

/**
 * @swagger
 * /api/cliente/{id}:
 *   get:
 *     summary: Retorna um cliente pelo ID
 *     tags: [Cliente]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do cliente
 *     responses:
 *       200:
 *         description: Cliente encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cliente'
 *       404:
 *         description: Cliente não encontrado
 *       500:
 *         description: Erro ao buscar cliente
 */
router.get('/cliente/:id', clienteController.getClienteById);

/**
 * @swagger
 * /api/cliente:
 *   post:
 *     summary: Cria um novo cliente
 *     tags: [Cliente]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 description: Nome do cliente
 *               apelido:
 *                 type: string
 *                 description: Apelido do cliente
 *             required:
 *               - nome
 *     responses:
 *       201:
 *         description: Cliente criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cliente'
 *       400:
 *         description: Erro de validação
 *       500:
 *         description: Erro ao criar cliente
 */
router.post('/cliente', validateCreateCliente, clienteController.createCliente);

/**
 * @swagger
 * /api/cliente/{id}:
 *   patch:
 *     summary: Atualiza um cliente existente
 *     tags: [Cliente]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do cliente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateClienteDTO'
 *     responses:
 *       200:
 *         description: Cliente atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cliente'
 *       400:
 *         description: Erro de validação
 *       500:
 *         description: Erro ao atualizar cliente
 */
router.patch('/cliente/:id', validateUpdateCliente, clienteController.updateCliente);

/**
 * @swagger
 * /api/cliente/{id}:
 *   delete:
 *     summary: Deleta um cliente pelo ID
 *     tags: [Cliente]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do cliente
 *     responses:
 *       200:
 *         description: Cliente deletado com sucesso
 *       400:
 *         description: Cliente possui vendas associadas ou é o cliente padrão
 *       404:
 *         description: Cliente não encontrado
 *       500:
 *         description: Erro ao deletar cliente
 */
router.delete('/cliente/:id', clienteController.deleteCliente);

export default router;
export { router };
