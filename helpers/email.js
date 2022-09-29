import nodemailer from "nodemailer";

const emailRegistro = async datos => {
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  const { email, nombre, token } = datos;

  // Enviar el email
  await transport.sendMail({
    from: "Idealisto",
    to: email,
    subject: "Confirma tu cuenta",
    text: "Confirma tu cuenta",
    html: `<p>Hola ${nombre}, comprueba tu cuenta en Idealisto</p>
    <p>Tu cuenta ya está lista, solo debes confirmarla en el siguiente enlace:
    <a href="${process.env.BACKEND_URL}:${
      process.env.PORT ?? 9000
    }/auth/confirmar/${token}">Confirmar Cuenta</a>    
    </p>
    <p>Si tu no creaste esta cuenta puedes ignorar este mensaje</p>
    `,
  });
};

export { emailRegistro };
