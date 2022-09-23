const formularioLogin = (req, res) => {
  res.render("auth/login", {
    pagina: 'Iniciar sesión'
  });
};

const formularioRegistro = (req, res) => {
    res.render("auth/registro", {
      
      pagina: 'crear cuenta'
    });
  };

export { formularioLogin, formularioRegistro };
