import  express from "express";

const router = express.Router();

// Routing
router.get("/", (req, res) => {
  res.send("Hola amigos");
});

router.get("/nosotros", (req, res) => {
  res.send("Hola nosotros");
});

export default router;
