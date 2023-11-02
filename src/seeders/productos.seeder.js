require('dotenv').config();
const { Sequelize } = require('sequelize');
const Producto = require('../models/productos.model');

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});
const productosData = [
  {
    codigo: 'P1001',
    modelo: 'Modelo 1',
    marca: 'Marca 1',
    url_imagen: 'imagen1.jpg',
    tipo_producto: { categoria: 'EquipoPersonal', atributo2: 'Valor2' },
    created_by: "Seeder"
  },
  {
    codigo: 'P1002',
    modelo: 'Modelo 2',
    marca: 'Marca 2',
    url_imagen: 'imagen2.jpg',
    tipo_producto: { categoria: 'Maletas', atributo2: 'Valor4' },
    created_by: "Seeder"
  },
  {
    codigo: 'P1003',
    modelo: 'Modelo 3',
    marca: 'Marca 3',
    url_imagen: 'imagen3.jpg',
    tipo_producto: { categoria: 'Maletas', atributo2: 'Valor6' },
    created_by: "Seeder"
  },
  {
    codigo: 'P1004',
    modelo: 'Modelo 4',
    marca: 'Marca 4',
    url_imagen: 'imagen4.jpg',
    tipo_producto: { categoria: 'Cascos', atributo2: 'Valor8' },
    created_by: "Seeder"
  },
  {
    codigo: 'P1005',
    modelo: 'Modelo 5',
    marca: 'Marca 5',
    url_imagen: 'imagen5.jpg',
    tipo_producto: { categoria: 'Cascos', atributo2: 'Valor10' },
    created_by: "Seeder",
  },
];

const seedProductos = async () => {
  try {
    await sequelize.authenticate();
    await Producto.sync({ force: true });

    for (const producto of productosData) {
      const nuevoProducto = await Producto.create(producto);
    }

    console.log('Datos de productos agregados exitosamente');
  } catch (error) {
    console.error('Error al agregar datos de productos:', error);
  } finally {
    sequelize.close();
  }
};

seedProductos();
