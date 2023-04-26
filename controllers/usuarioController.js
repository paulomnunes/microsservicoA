const UsuarioModel = require("../models/Usuario");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const usuarioController = {
    create: async (req, res) => {
        try {
            const usuario = {
                nome: req.body.nome,
                email: req.body.email,
                senha: req.body.senha
            };

            if (!usuario.nome) {
                return res.status(400).json({ message: 'O nome é obrigatório' });
            }
            if (!usuario.email) {
                return res.status(400).json({ message: 'O email é obrigatório' });
            }
            if (!usuario.senha) {
                return res.status(400).json({ message: 'A senha é obrigatória' });
            }
            if (usuario.senha !== req.body.confirmacaoDeSenha) {
                return res.status(400).json({ message: 'As senhas não conferem!' });
            }
            const salt = await bcrypt.genSalt(12)
            usuario.senha = await bcrypt.hash(usuario.senha, salt)
            const response = await UsuarioModel.create(usuario);
            res.status(201).json({ response, msg: "Usuário criado com sucesso!" });
        } catch (error) {
            if (error.code === 11000 && error.keyPattern.email) {
                res.status(409).json({ message: 'email já cadastrado.' })
            } else {
                res.status(500).json({ message: 'Erro ao criar o usuário.', error })
            }
        }
    },
    getAll: async (req, res) => {
        try {
            const usuarios = await UsuarioModel.find();

            res.json(usuarios);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao consultar os Usuário.', error })
        }
    },
    get: async (req, res) => {
        try {
            const id = req.params.id;
            const usuario = await UsuarioModel.findOne({ _id: id });
            if (!usuario) {
                res.status(404).json({ msg: "Usuário não encontrado" });
                return;
            }

            res.status(200).json(usuario);

        } catch (error) {
            if (error.kind === 'ObjectId') {
                return res.status(400).json({ message: 'ID inválido.' });
            }
            res.status(500).json({ message: 'Erro ao consultar o usuário do ID informado.', error })
        }
    },
    delete: async (req, res) => {
        try {
            const id = req.params.id;
            const usuario = await UsuarioModel.findOne({ _id: id });
            console.log(usuario)
            if (!usuario) {
                res.status(404).json({ msg: "Usuário não encontrado" });
                return;
            }

            const deletedDadoscliente = await UsuarioModel.findByIdAndDelete(id);
            res.status(200).json({ deletedDadoscliente, msg: "Usuário excluído com sucesso!" });
        } catch (error) {
            if (error.kind === 'ObjectId') {
                return res.status(400).json({ message: 'ID inválido.' });
            }
            res.status(500).json({ message: 'Erro ao excluir o usuário do ID informado.', error })
        }
    },
    login: async (req, res) => {
        try {
            const { email, senha } = req.body
            if (!email) {
                return res.status(404).json({ msg: "e-mail não informado!" });
            }
            if (!senha) {
                return res.status(404).json({ msg: "senha não informada!" });
            }
            const usuario = await UsuarioModel.findOne({ email: email })

            if (!usuario)
                return res.status(404).json({ message: 'Usuário não encontrado, verifique o e-mail informado.' })

            const usuarioLogado = await bcrypt.compare(senha, usuario.senha)

            if (!usuarioLogado) {
                return res.status(422).json({ message: 'Senha inválida.' })
            }

            const secret = process.env.secret
            const token = jwt.sign(
                {
                    id: usuario._id
                },
                secret,
                { expiresIn: '1h' }
            );

            res.status(200).json({ msg: 'Login realizado com sucesso!', token });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao realizar o login.', error })
        }
    }
}

module.exports = usuarioController;