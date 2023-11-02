require('dotenv').config();
const { Sequelize } = require('sequelize');
const Promocion = require('../models/promociones.model');

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

const promocionesData = [
  {
    id_nombre_promocion: 'Promocion1',
    url_imagen_promocion: 'imagen1.jpg',
    created_by: "Seeder"
  },
  {
    id_nombre_promocion: 'Promocion2',
    url_imagen_promocion: 'imagen2.jpg',
    created_by: "Seeder"
  },
  {
    id_nombre_promocion: 'Promocion3',
    url_imagen_promocion: 'imagen3.jpg',
    created_by: "Seeder"
  },
  {
    id_nombre_promocion: 'Promocion4',
    url_imagen_promocion: 'imagen4.jpg',
    created_by: "Seeder"
  },
  {
    id_nombre_promocion: 'Promocion5',
    url_imagen_promocion: 'imagen5.jpg',
    created_by: "Seeder"
  },
];

async function seedPromociones() {
  try {
    await sequelize.authenticate();

    await Promocion.sync({ force: true }); 

    for (const promocion of promocionesData) {
      await Promocion.create(promocion);
    }

    console.log('Datos de promociones agregados exitosamente');
  } catch (error) {
    console.error('Error al agregar datos de promociones:', error);
  } finally {
    sequelize.close(); 
  }
}

seedPromociones();
