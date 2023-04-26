const router = require("express").Router();

const usuarioController = require("../../controllers/usuarioController");

router
    .route("/")
    .post((req, res) => usuarioController.create(req, res));

router
    .route("/")
    .get((req, res) => usuarioController.getAll(req, res));

router
    .route("/:id")
    .get((req, res) => usuarioController.get(req, res));

router
    .route("/:id")
    .delete((req, res) => usuarioController.delete(req, res));

router
    .route("/login")
    .post((req, res) => usuarioController.login(req, res));
module.exports = router;
