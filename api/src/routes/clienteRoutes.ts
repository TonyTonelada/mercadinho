import { Router } from 'express';
const router = Router();
import clienteController from '../controllers/clienteController';
import { validateCreateCliente, validateUpdateCliente } from '../middleware/validationMiddleware';

/**
 * @swagger
 * tags:
 *   name: Clientes
 *   description: Gerenciamento de clientes
 */

/**
 * @swagger
 * /clientes:
 *   get:
 *     summary: Retorna uma lista de clientes
 *     tags: [Clientes]
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
router.get('/clientes', clienteController.getClientes);

/**
 * @swagger
 * /clientes/{id}:
 *   get:
 *     summary: Retorna um cliente pelo ID
 *     tags: [Clientes]
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
router.get('/clientes/:id', clienteController.getClienteById);

/**
 * @swagger
 * /clientes:
 *   post:
 *     summary: Cria um novo cliente
 *     tags: [Clientes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateClienteDTO'
 *     responses:
 *       201:
 *         description: Cliente criado com sucesso
 *       400:
 *         description: Erro de validação
 *       500:
 *         description: Erro ao criar cliente
 */
router.post('/clientes', validateCreateCliente, clienteController.createCliente);

/**
 * @swagger
 * /clientes/{id}:
 *   put:
 *     summary: Atualiza um cliente existente
 *     tags: [Clientes]
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
 *       400:
 *         description: Erro de validação
 *       500:
 *         description: Erro ao atualizar cliente
 */
router.put('/clientes/:id', validateUpdateCliente, clienteController.updateCliente);

/**
 * @swagger
 * /clientes/{id}:
 *   delete:
 *     summary: Deleta um cliente pelo ID
 *     tags: [Clientes]
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
 *         description: ID do cliente não fornecido
 *       404:
 *         description: Cliente não encontrado
 *       500:
 *         description: Erro ao deletar cliente
 */
router.delete('/clientes/:id', clienteController.deleteCliente);

export default router;
export { router };
