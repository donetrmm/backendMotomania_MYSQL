const { DataTypes } = require('sequelize');
const sequelize = require('../configs/db.config'); 

const Promocion = sequelize.define('Promociones', {
  id_nombre_promocion: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  url_imagen_promocion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: DataTypes.NOW,
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

module.exports = Promocion;
