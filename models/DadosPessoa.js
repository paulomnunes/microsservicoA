const mongoose = require('mongoose');

const { encrypt, decrypt } = require('../utils/crypto')

const schemaOptions = {
    toJSON: { getters: true },
    toObject: { getters: true },
};

const Schema = new mongoose.Schema({
    cpf: {
        type: String,
        required: true,
        unique: true,
        set: encrypt,
        get: decrypt,
    },
    nome: {
        type: String,
        required: true,
        set: encrypt,
        get: decrypt,
    },
    endereco: {
        type: String,
        required: true,
        set: encrypt,
        get: decrypt,
    },
    listaDeDividas: {
        type: [String],
        required: true,
        default: [],
        set: encrypt,
        get: decrypt,
    },
}, schemaOptions);

const DadosPessoa = mongoose.model('DadosPessoa', Schema);
module.exports = DadosPessoa;
