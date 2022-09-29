import express from "express";
import {
  formularioLogin,
  formularioOlvidePassword,
  formularioRegistro,
  validarRegistro,
  confirmar
} from "../controllers/usuarioController.js";

const router = express.Router();

// Routing
router.get("/login", formularioLogin);

router.get("/registro", formularioRegistro);
router.post("/registro", validarRegistro);
router.get("/olvide-password", formularioOlvidePassword)
router.get('/confirmar/:token', confirmar)

export default router;
