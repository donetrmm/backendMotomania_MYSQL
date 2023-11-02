const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuarios.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/', authMiddleware.verificarJWT, usuariosController.createUser);
router.get('/', authMiddleware.verificarJWT, usuariosController.getAllUsers);
router.get('/:username', authMiddleware.verificarJWT, usuariosController.getUserByUsername);
router.put('/:username', authMiddleware.verificarJWT, usuariosController.updateUser);
router.delete('/:username/:deletedBy', authMiddleware.verificarJWT, usuariosController.deleteUser);

module.exports = router;
