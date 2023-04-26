const router = require("express").Router();
const jwt = require("jsonwebtoken")

const dadosPessoaRouter = require("../private/dadosPessoaRouter");
const usuarioRouter = require("../public/usuarioRouter");

function verificaToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) {
        return res.status(401).json({ msg: 'Token não informado!' })
    }
    try {
        const secret = process.env.secret
        jwt.verify(token, secret)
        next()
    } catch (error) {
        res.status(400).json({ msg: "Token inválido" })
    }
}

router.use("/dadosPessoa", verificaToken, dadosPessoaRouter);
router.use("/usuario", usuarioRouter);

router.get('/', (req, res) => {
    res.json({
        message: 'Bem-vindo ao microsserviço dos dados do cliente. Para acessar as rotas privadas, é necessário utilizar um token gerado no login do usuário.',
        endpoints: {
            dadosPessoa: {
                description: 'Operações relacionadas aos dados do cliente (rota privada).',
                routes: {
                    getAll: { method: 'GET', url: '/dadosPessoa' },
                    getById: { method: 'GET', url: '/dadosPessoa/:id' },
                    create: { method: 'POST', url: '/dadosPessoa' },
                    update: { method: 'PATCH', url: '/dadosPessoa/:id' },
                    delete: { method: 'DELETE', url: '/dadosPessoa/:id' }
                }
            },
            usuario: {
                description: 'Operações relacionadas aos usuários (rota pública).',
                routes: {
                    getAll: { method: 'GET', url: '/usuario' },
                    getById: { method: 'GET', url: '/usuario/:id' },
                    create: { method: 'POST', url: '/usuario' },
                    delete: { method: 'DELETE', url: '/usuario/:id' },
                    login: { method: 'POST', url: '/usuario/login' }
                }
            }
        }
    });
});

router.use((req, res, next) => {
    res.status(404).json({
        message: "A rota solicitada não foi encontrada. Confira a lista de rotas disponíveis na página padrão.",
    });
});


module.exports = router;