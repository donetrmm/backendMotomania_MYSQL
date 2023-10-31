const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const Usuario = require('../models/usuarios.model'); 

const login = async (req, res) => {
  try {
    const { usuario, password } = req.body;

    const usuarioEncontrado = await Usuario.findOne({
      where: {
        usuario: usuario,
        deleted: false, 
      },
    });

    if (!usuarioEncontrado) {
      return res.status(400).json({
        message: "Usuario o contraseña incorrectos",
      });
    }

    const passwordCorrecto = bcrypt.compareSync(password, usuarioEncontrado.password);

    if (!passwordCorrecto) {
      return res.status(400).json({
        message: "Usuario o contraseña incorrectos",
      });
    }

    const payload = {
      usuario: {
        usuario: usuarioEncontrado.usuario,
      },
    };

    const token = jwt.sign(payload, 'motomania', { expiresIn: '2h' });

    return res.status(200).json({
      message: "Acceso correcto",
      token,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Ocurrió un error al validar credenciales",
      error: error.message,
    });
  }
};

module.exports = {
  login
};
