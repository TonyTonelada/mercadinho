import { Router } from 'express';
import multer from 'multer';
const router = Router();
import produtoController from '../controllers/produtoController';
import { validateCreateProduto, validateUpdateProduto } from '../controllers/middleware/validationMiddleware';

const upload = multer({ storage: multer.memoryStorage() });

router.get('/produto/:id', produtoController.getProdutoById);
router.get('/produtos', produtoController.getProdutos);
router.post('/produto', upload.single('imagem'), validateCreateProduto, produtoController.createProduto);
router.put('/produto/:id', upload.single('imagem'), validateUpdateProduto, produtoController.updateProduto);
router.delete('/produto/:id', produtoController.deleteProduto);
router.get('/produto/:id/imagem', produtoController.getImagemProduto);

export default router;
export { router };