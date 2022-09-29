import { check, body, validationResult } from "express-validator";
import Usuario from "../models/Usuario.js";
import { generarId } from "../helpers/tokens.js";
import { emailRegistro } from "../helpers/email.js";

const formularioLogin = (req, res) => {
  res.render("auth/login", {
    pagina: "Iniciar sesión",
  });
};

const formularioRegistro = (req, res) => {
  //console.log(req.csrfToken());

  res.render("auth/registro", {
    pagina: "crear cuenta",
    csrfToken: req.csrfToken(),
  });
};
// Version 6.14 de express-validator
/* const validarRegistro = async (req, res) => {
  //sanitizar los campos
  const rules = [
    body("nombre")
      .not()
      .isEmpty()
      .withMessage("El nombre es obligatorio")
      .escape(),
    body("email")
      .isEmail()
      .withMessage("El email es obligatorio")
      .normalizeEmail(),
    body("password")
      .not()
      .isEmpty()
      .withMessage("El password es obligatorio")
      .escape(),
    body("repetir_password")
      .not()
      .isEmpty()
      .withMessage("Confirmar password es obligatorio")
      .escape(),
    body("repetir_password")
      .equals(req.body.password)
      .withMessage("Los passwords no son iguales"),
  ];



  await Promise.all(rules.map(validation => validation.run(req)));
  const resultado = validationResult(req);
  //si hay errores
  if (!resultado.isEmpty()) {
     req.flash(
      "error",
      errores.array().map(error => error.msg),
    );
    res.render("auth/registro", {
      pagina: "Crear Cuenta",
      errores: resultado.array(),
      usuario: {
        nombre: req.body.nombre,
        email: req.body.email,
      },
    });
    return;
  }
  const usuario = await Usuario.create(req.body);
  res.json(usuario);
  //si toda la validacion es correcta
  //next();
}; */

const validarRegistro = async (req, res) => {
  //console.log(req.body);
  // Validación
  await check("nombre")
    .notEmpty()
    .withMessage("El nombre no puede ir vacio")
    .run(req);
  await check("email")
    .isEmail()
    .withMessage("El email no es correcto")
    .run(req);
  await check("password")
    .isLength({ min: 6 })
    .withMessage("El password debe tener al menos 6 caracteres")
    .run(req);
  await check("repetir_password")
    .equals(req.body.password)
    .withMessage("Los passwords no son iguales")
    .run(req);
  let resultado = validationResult(req);
  // Verificar que el resultado este vacio
  if (!resultado.isEmpty()) {
    // Errores
    return res.render("auth/registro", {
      pagina: "Crear Cuenta",
      csrfToken: req.csrfToken(),
      errores: resultado.array(),
      usuario: {
        nombre: req.body.nombre,
        email: req.body.email,
      },
    });
  }
  // res.json(resultado.array()); Se colocan arriba

  // Extraer los datos
  const { nombre, email, password } = req.body;

  // Verificar que el usuario no esté duplicado
  const existeUsuario = await Usuario.findOne({
    where: { email: email },
  });
  if (existeUsuario) {
    return res.render("auth/registro", {
      pagina: "Crear Cuenta",
      csrfToken: req.csrfToken(),
      errores: [{ msg: "Este Usuario ya está Registrado" }],
      usuario: {
        nombre: req.body.nombre,
        email: req.body.email,
      },
    });
  }

  // Almacenar usuario
  const usuario = await Usuario.create({
    nombre,
    email,
    password,
    token: generarId(),
  });

  // Envia email de confirmación
  emailRegistro({
    nombre: usuario.nombre,
    email: usuario.email,
    token: usuario.token,
  });

  // Mostrar mensaje de confirmación
  res.render("templates/mensaje", {
    pagina: "Cuenta Creada correctamente",
    mensaje: "Hemos enviado un Email de confirmación, presiona en el enlace",
  });
};

const formularioOlvidePassword = (req, res) => {
  res.render("auth/olvide-password", {
    pagina: "Recupera tu acceso a Idealisto",
  });
};

// Función que comprueba una cuenta
const confirmar = async (req, res) => {
  const { token } = req.params;
  //console.log(req.params.token);

  // Verificar si el token es válido
  const usuario = await Usuario.findOne({ where: { token } });
  //console.log(usuario);
  if (!usuario) {
    return res.render("auth/confirmar-cuenta", {
      pagina: "Error al confirmar tu cuenta",
      mensaje: "Hubo un error al confirmar tu cuenta, intenta de nuevo",
      error: true,
    });
  }

  // Confirmar la cuenta
  usuario.token = null;
  usuario.confirmado = true;
  await usuario.save();

  res.render("auth/confirmar-cuenta", {
    pagina: "Cuenta confirmada",
    mensaje: "La cuenta se confirmó correctamente",
  });
};

export {
  formularioLogin,
  formularioRegistro,
  validarRegistro,
  formularioOlvidePassword,
  confirmar,
};
