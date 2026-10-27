const express = require("express");
const router = express.Router();

const enderecosController = require("../controller/enderecoController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/teste", (req, res) => {
    res.json({ mensagem: "Rota de endereços funcionando!" });
});

router.get("/", authMiddleware, enderecosController.listar);
router.post("/", authMiddleware, enderecosController.salvar);
router.delete("/:id", authMiddleware, enderecosController.excluir);

module.exports = router;