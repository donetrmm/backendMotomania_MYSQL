const bcrypt = require('bcrypt');
const { Op } = require('sequelize');
const Usuario = require('../models/usuarios.model');

const saltosBcrypt = parseInt(process.env.SALTOS_BCRYPT);

// Creación de nuevos administradores
exports.createUser = async (req, res) => {
  try {
    const { nombre, apellido, usuario, password, createdBy } = req.body;

    const existingUser = await Usuario.findOne({ where: { usuario } });

    if (existingUser) {
      res.status(400).json({ message: 'Nombre de usuario no disponible' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, saltosBcrypt);

    const nuevoUsuario = await Usuario.create({
      nombre: nombre,
      apellido: apellido,
      usuario: usuario,
      password: hashedPassword,
      created_by: createdBy,
    });

    res.status(201).json({ message: 'Usuario creado exitosamente' });
  } catch (error) {
    console.error('Error al crear el usuario', error);
    res.status(500).json({ message: 'Error al crear el usuario', error: error });
  }
};

// Obtener el usuario por usuario.
exports.getUserByUsername = async (req, res) => {
  try {
    // Recibe el usuario en la URL
    const { username } = req.params;

    const usuario = await Usuario.findOne({ where: { usuario: username } });

    if (!usuario) {
      res.status(404).json({ error: 'Usuario no encontrado' });
      return;
    }

    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar el usuario' });
  }
};

// Obtener todos los usuarios
exports.getAllUsers = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll({ where: { deleted: false } });

    if (!usuarios || usuarios.length === 0) {
      res.status(404).json({ error: 'Sin usuarios en existencia' });
      return;
    }

    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar los usuarios' });
  }
};

// Edición de usuario por medio de usuario.
exports.updateUser = async (req, res) => {
  try {
    // Por parámetro en la URL se manda el usuario y lo que se va a actualizar se recibe del body.
    const { username } = req.params;
    const { nombre, apellido, password, updatedBy } = req.body;

    const usuario = await Usuario.findOne({ where: { usuario: username, deleted: false } });

    if (!usuario) {
      res.status(404).json({ error: 'Usuario no encontrado' });
      return;
    }

    if (nombre) usuario.nombre = nombre;
    if (apellido) usuario.apellido = apellido;
    if (password) {
      const hashedPassword = await bcrypt.hash(password, saltosBcrypt);
      usuario.password = hashedPassword;
    }

    usuario.updated_at = new Date();
    usuario.updated_by = updatedBy;

    await usuario.save();

    res.status(200).json({ message: 'Usuario actualizado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el usuario' });
  }
};

// Actualización del usuario solo de forma lógica
exports.deleteUser = async (req, res) => {
  try {
    // Se recibe el usuario y quien eliminó por parámetros
    const { username, deletedBy } = req.params;

    const usuario = await Usuario.findOne({ where: { usuario: username, deleted: false } });

    if (!usuario) {
      res.status(404).json({ error: 'Usuario no encontrado' });
      return;
    }

    usuario.deleted = true;
    usuario.deleted_at = new Date();
    usuario.deleted_by = deletedBy;

    await usuario.save();

    res.status(200).json({ message: 'Usuario eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el usuario' });
  }
};
