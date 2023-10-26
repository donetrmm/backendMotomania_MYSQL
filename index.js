require("dotenv").config();
require("./src/configs/db.config");

const express = require("express");
const app = express();

//   TODO Ejemplo de importación de archivo de rutas
// * const usuariosRouter = require('./src/routes/usuarios.route');

app.use(express.json());

//   TODO Ejemplo de uso y asignación de ruta al archivo
// * app.use('/usuarios', usuariosRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("API escuchando en el puerto 3000");
});
