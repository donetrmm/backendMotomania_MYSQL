const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  define: {
    timestamps: false, 
  },
});

sequelize.authenticate()
  .then(() => {
    console.log('Conectado a MySQL');
  })
  .catch((error) => {
    console.error('Error al conectar a MySQL:', error);
  });

module.exports = sequelize;
