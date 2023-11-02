const express = require('express');
const router = express.Router();
const upload = require('../middlewares/imagenes.middleware');
const authMiddleware = require('../middlewares/auth.middleware');
const {
  createProducto,
  updateProducto,
  deleteProducto,
  getProducto,
  getProductos,
  getCategoria
} = require('../controllers/productos.controller');

router.post('/', authMiddleware.verificarJWT, upload.single('imagen'), createProducto);

router.put('/:codigo', authMiddleware.verificarJWT, upload.single('imagen'), updateProducto);

router.delete('/:codigo', authMiddleware.verificarJWT, deleteProducto);

router.get('/:codigo', authMiddleware.verificarJWT, getProducto);
router.get('/categorias/:categoria', authMiddleware.verificarJWT, getCategoria);
router.get('/', getProductos);

module.exports = router;
