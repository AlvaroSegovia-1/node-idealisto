import express from "express";
import usuarioRoutes from "./routes/usuarioRoutes.js";

// Crear la app
const app = express();

app.use("/", usuarioRoutes);

// Definir un puerto y arrancar el proyecto

const port = 9000;

app.listen(port, () => {
  console.log("arrancado");
});
