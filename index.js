import express from "express";
import usuarioRoutes from "./routes/usuarioRoutes.js";
import db from "./config/db.js";

// Crear la app
const app = express();

// Conexión a la base de datos
try {
  await db.authenticate();
  console.log('Conexión correcta a la base de datos')
} catch (error) {
  console.log(error);
}

// Template engine, habilitar pug
app.set("view engine", "pug");
app.set("views", "./views");

// Carpeta Pública
app.use(express.static("public"));

// Routing
app.use("/auth", usuarioRoutes);

// Definir un puerto y arrancar el proyecto
const port = 9000;

app.listen(port, () => {
  console.log(`arrancado en el puerto ${port}`);
});
