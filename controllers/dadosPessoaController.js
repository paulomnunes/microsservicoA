const DadosPessoaModel = require("../models/DadosPessoa");

const dadosPessoaController = {
    create: async (req, res) => {
        try {
            const dadosPessoa = {
                cpf: req.body.cpf,
                nome: req.body.nome,
                endereco: req.body.endereco,
                listaDeDividas: req.body.listaDeDividas,
            };

            if (!dadosPessoa.cpf) {
                return res.status(400).json({ message: 'O CPF é obrigatório' });
            }
            if (!dadosPessoa.nome) {
                return res.status(400).json({ message: 'A idade é obrigatória' });
            }
            if (!dadosPessoa.endereco) {
                return res.status(400).json({ message: 'O endereço é obrigatório' });
            }
            if (!dadosPessoa.listaDeDividas) {
                return res.status(400).json({ message: 'A lista de dívidas é obrigatória' });
            }

            const response = await DadosPessoaModel.create(dadosPessoa);

            res.status(201).json({ response, msg: "Dados do cliente criado com sucesso!" });
        } catch (error) {
            if (error.code === 11000 && error.keyPattern.cpf) {
                res.status(409).json({ message: 'CPF já cadastrado.' })
            } else {
                res.status(500).json({ message: 'Erro ao criar os dados do cliente.', error })
            }

        }
    },
    getAll: async (req, res) => {
        try {
            const dadosPessoas = await DadosPessoaModel.find();

            res.json(dadosPessoas);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao consultar os dados do cliente.', error })
        }
    },
    get: async (req, res) => {
        try {
            const id = req.params.id;
            const dadosPessoa = await DadosPessoaModel.findById(id);

            if (!dadosPessoa) {
                res.status(404).json({ msg: "Dados do cliente não encontrado" });
                return;
            }

            res.json(dadosPessoa);

        } catch (error) {
            if (error.kind === 'ObjectId') {
                return res.status(400).json({ message: 'ID inválido.' });
            }
            return res.status(404).json({ message: 'Não foram encontrados dados correspondentes ao ID informado.' })
        }
    },
    delete: async (req, res) => {
        try {
            const id = req.params.id;

            const dadosPessoa = await DadosPessoaModel.findById(id);

            if (!dadosPessoa) {
                res.status(404).json({ msg: "Dados do cliente não encontrado" });
                return;
            }

            const deletedDadoscliente = await DadosPessoaModel.findByIdAndDelete(id);

            res.status(200).json({ deletedDadoscliente, msg: "Dados do cliente excluído com sucesso!" });
        } catch (error) {
            if (error.kind === 'ObjectId') {
                return res.status(400).json({ message: 'ID inválido.' });
            }
            res.status(500).json({ message: 'Erro ao excluir os dados do ID informado.', error })
        }
    },
    update: async (req, res) => {
        const id = req.params.id
        const { cpf, nome, endereco, listaDeDividas } = req.body
        const dadosPessoa = {};

        if (cpf) {
            dadosPessoa.cpf = cpf;
        }

        if (nome) {
            dadosPessoa.nome = nome;
        }

        if (endereco) {
            dadosPessoa.endereco = endereco;
        }

        if (listaDeDividas) {
            dadosPessoa.listaDeDividas = listaDeDividas;
        }

        try {

            if (!dadosPessoa.cpf && !dadosPessoa.nome && !dadosPessoa.endereco && !dadosPessoa.listaDeDividas) {
                return res.status(422).json({ msg: "Nenhum dado para alterar informado" });
            }

            const update = await DadosPessoaModel.updateOne({ _id: id }, dadosPessoa);


            if (update.nModified === 0) {
                return res.status(404).json({ message: 'Não foram encontrados dados correspondentes ao ID informado.' });
            }

            res.status(200).json({ dadosPessoa, message: 'Dados atualizados com sucesso.' });

        } catch (error) {
            if (error.kind === 'ObjectId') {
                return res.status(400).json({ message: 'ID inválido.' });
            }
            res.status(500).json({ message: 'Erro ao atualizar os dados do ID informado.', error });
        }
    }
}

module.exports = dadosPessoaController;