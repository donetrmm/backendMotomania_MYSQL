const express = require('express');
const router = express.Router();
const upload = require('../middlewares/imagenes.middleware');
const authMiddleware = require('../middlewares/auth.middleware');
const {
  createPromocion,
  updatePromocion,
  deletePromocion,
  getPromocion,
  getPromociones
} = require('../controllers/promociones.controller');

router.post('/', authMiddleware.verificarJWT, upload.single('imagen'), createPromocion);

router.put('/:id_nombre_promocion', authMiddleware.verificarJWT, upload.single('imagen'), updatePromocion);

router.delete('/:id_nombre_promocion/:deleted_by', authMiddleware.verificarJWT, deletePromocion);

router.get('/:id_nombre_promocion', authMiddleware.verificarJWT, getPromocion);

router.get('/', getPromociones);

module.exports = router;
