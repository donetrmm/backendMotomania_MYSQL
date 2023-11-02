const { DataTypes } = require('sequelize');
const sequelize = require('../configs/db.config');

const Producto = sequelize.define('productos', {
  codigo: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  modelo: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: null,
  },
  marca: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: null,
  },
  url_imagen: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: '',
  },
  tipo_producto: {
    type: DataTypes.JSON,
    allowNull: false,
    defaultValue: null,
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
  },
  created_by: {
    type: DataTypes.STRING,
    defaultValue: null,
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: null,
  },
  updated_by: {
    type: DataTypes.STRING,
    defaultValue: null,
  },
  deleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  deleted_at: {
    type: DataTypes.DATE,
    defaultValue: null,
  },
  deleted_by: {
    type: DataTypes.STRING,
    defaultValue: null,
  },
});

module.exports = Producto;