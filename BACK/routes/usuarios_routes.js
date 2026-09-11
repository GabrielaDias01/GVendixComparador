const express = require("express");
const router = express.Router();

const usuariosController = require("../controller/usuariosController");
const validarUsuario = require("../validation/validacoes");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/login", usuariosController.login);

router.post("/",validarUsuario, usuariosController.salvar);
router.get("/", usuariosController.listar);
router.get("/perfil", authMiddleware, usuariosController.perfil);
router.delete("/:id", usuariosController.excluir);
router.put("/:id", usuariosController.atualizar);

module.exports = router;