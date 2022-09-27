import Usuario from "../models/Usuario.js";

const formularioLogin = (req, res) => {
  res.render("auth/login", {
    pagina: "Iniciar sesión",
  });
};

const formularioRegistro = (req, res) => {
  res.render("auth/registro", {
    pagina: "crear cuenta",
  });
};

const registrar = async (req, res) => {
  console.log(req.body);
  // importar modelo usuario
  const usuario = await Usuario.create(req.body);
  res.json(usuario)
};

const formularioOlvidePassword = (req, res) => {
  res.render("auth/olvide-password", {
    pagina: "Recupera tu acceso a Idealisto",
  });
};

export {
  formularioLogin,
  formularioRegistro,
  registrar,
  formularioOlvidePassword,
};
