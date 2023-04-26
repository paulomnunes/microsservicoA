const router = require("express").Router();

const dadosPessoaController = require("../../controllers/dadosPessoaController");

router
    .route("/")
    .post((req, res) => dadosPessoaController.create(req, res));

router
    .route("/")
    .get((req, res) => dadosPessoaController.getAll(req, res));

router
    .route("/:id")
    .get((req, res) => dadosPessoaController.get(req, res));

router
    .route("/:id")
    .delete((req, res) => dadosPessoaController.delete(req, res));

router
    .route("/:id")
    .patch((req, res) => dadosPessoaController.update(req, res));

module.exports = router;
