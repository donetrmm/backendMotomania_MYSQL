const Promocion = require('../models/promociones.model');
const fs = require('fs');
const { Op } = require('sequelize');
const createPromocion = async (req, res) => {
  try {
    const { id_nombre_promocion, created_by } = req.body;
    const url_imagen_promocion = req.file.filename;
    const existingPromocion = await Promocion.findOne({
      where: {
        id_nombre_promocion,
        deleted: false,
      },
    });

    if (existingPromocion) {
      res.status(400).json({ message: 'ID de la promoción no disponible' });
      return;
    }

    const promocion = await Promocion.create({
      id_nombre_promocion,
      url_imagen_promocion,
      created_by,
    });

    res.status(201).json({ message: "Promoción agregada exitosamente" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error al crear la promoción.' });
  }
};

const updatePromocion = async (req, res) => {
  try {
    const { id_nombre_promocion } = req.params;
    const { updated_by } = req.body;

    const promocion = await Promocion.findOne({
      where: {
        id_nombre_promocion,
        deleted: false,
      },
    });

    if (!promocion) {
      return res.status(404).json({ error: 'Promoción no encontrada.' });
    }

    fs.unlinkSync(`public/${promocion.url_imagen_promocion}`);

    const updatedPromocion = await promocion.update({
      url_imagen_promocion: req.file.filename,
      updated_at: new Date(),
      updated_by,
    });

    res.status(200).json({ message: "Promoción actualizada correctamente" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error al actualizar la promoción.' });
  }
};

const deletePromocion = async (req, res) => {
  try {
    const { id_nombre_promocion, deleted_by } = req.params;

    const promocion = await Promocion.findOne({
      where: {
        id_nombre_promocion,
        deleted: false,
      },
    });

    if (!promocion) {
      return res.status(404).json({ error: 'Promoción no encontrada.' });
    }

    const deletedPromocion = await promocion.update({
      deleted: true,
      deleted_at: new Date(),
      deleted_by,
    });

    res.status(200).json({ message: "Promoción eliminada exitosamente." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error al eliminar la promoción.' });
  }
};

const getPromocion = async (req, res) => {
  try {
    const { id_nombre_promocion } = req.params;
    const promocion = await Promocion.findOne({
      where: { id_nombre_promocion },
    });

    if (!promocion) {
      return res.status(404).json({ error: 'Promoción no encontrada.' });
    }

    res.status(200).json(promocion);
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar la promoción.' });
  }
};

const getPromociones = async (req, res) => {
  try {
    const promociones = await Promocion.findAll({
      where: { deleted: false },
    });

    if (!promociones || promociones.length === 0) {
      return res.status(404).json({ error: 'No hay promociones guardadas.' });
    }

    res.status(200).json(promociones);
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar las promociones.' });
  }
};

module.exports = {
  createPromocion,
  updatePromocion,
  deletePromocion,
  getPromocion,
  getPromociones
};
