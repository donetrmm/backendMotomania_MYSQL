const Sequelize = require('sequelize');
const sequelize = require('../configs/db.config');

const Usuario = sequelize.define('usuarios', {
    nombre: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    apellido: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    usuario: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    created_at: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.fn('now'),
    },
    created_by: {
        type: Sequelize.STRING,
        defaultValue: null,
    },
    updated_at: {
        type: Sequelize.DATE,
        defaultValue: null,
    },
    updated_by: {
        type: Sequelize.STRING,
        defaultValue: null,
    },
    deleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    },
    deleted_at: {
        type: Sequelize.DATE,
        defaultValue: null,
    },
    deleted_by: {
        type: Sequelize.STRING,
        defaultValue: null,
    },
});

module.exports = Usuario;