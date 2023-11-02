const Producto = require('../models/productos.model');
const fs = require('fs');

// Creación de un nuevo producto
const createProducto = async (req, res) => {
  try {
    const { codigo, modelo, marca, tipo_producto, created_by } = req.body;
    const url_imagen = req.file.filename;

    const existingProduct = await Producto.findOne({ where: { codigo } });

    if (existingProduct) {
      res.status(400).json({ message: 'Código de producto no disponible' });
      return;
    }

    const nuevoProducto = await Producto.create({
      codigo,
      modelo,
      marca,
      url_imagen,
      tipo_producto,
      created_by,
    });

    res.status(201).json({ message: 'Producto agregado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el producto' });
  }
};

// Actualización de un producto
const updateProducto = async (req, res) => {
  try {
    const { codigo } = req.params;
    const { modelo, marca, tipo_producto, updated_by } = req.body;

    const producto = await Producto.findOne({ where: { codigo, deleted: false } });

    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    fs.unlinkSync(`public/${producto.url_imagen}`);

    producto.modelo = modelo;
    producto.marca = marca;
    producto.tipo_producto = tipo_producto;
    producto.updated_at = new Date();
    producto.updated_by = updated_by;

    if (req.file) {
      producto.url_imagen = req.file.filename;
    }

    await producto.save();

    res.status(200).json({ message: 'Producto actualizado exitosamente' });
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: 'Error al actualizar el producto' });
  }
};

// Eliminación de un producto
const deleteProducto = async (req, res) => {
  try {
    const { codigo } = req.params;

    const producto = await Producto.findOne({ where: { codigo, deleted: false } });

    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    producto.deleted = true;
    producto.deleted_at = new Date();
    producto.deleted_by = req.body.deleted_by;

    await producto.save();

    res.status(200).json({ message: 'Producto eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el producto' });
  }
};

// Obtener un producto por código
const getProducto = async (req, res) => {
  try {
    const { codigo } = req.params;

    const producto = await Producto.findOne({ where: { codigo } });

    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.status(200).json(producto);
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar el producto' });
  }
};

// Obtener productos por categoría
const getCategoria = async (req, res) => {
    try {
      const { categoria } = req.params;
  
      const productos = await Producto.findAll({
        where: {
          deleted: false,
          tipo_producto: {
            categoria: categoria
          }
        }
      });
  
      if (!productos || productos.length === 0) {
        return res.status(404).json({ error: 'No hay productos en la categoría especificada.' });
      }
  
      res.status(200).json(productos);
    } catch (error) {
      res.status(500).json({ error: 'Error al buscar los productos por categoría.' });
    }
  };

// Obtener todos los productos paginados
const getProductos = async (req, res) => {
  try {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const offset = (page - 1) * limit;
    const { count, rows } = await Producto.findAndCountAll({
      where: { deleted: false },
      offset,
      limit,
    });

    const totalPages = Math.ceil(count / limit);

    if (page > totalPages) {
      return res.status(404).json({ error: 'Página no encontrada' });
    }

    res.status(200).json({
      productos: rows,
      currentPage: page,
      totalPages,
      totalProductos: count,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error al buscar los productos' });
  }
};

module.exports = {
  createProducto,
  updateProducto,
  deleteProducto,
  getProducto,
  getProductos,
  getCategoria,
};