const mongoose = require('mongoose');

const { encrypt, decrypt } = require('../utils/crypto')

const schemaOptions = {
    toJSON: { getters: true },
    toObject: { getters: true },
};

const Schema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
        set: encrypt,
        get: decrypt,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        set: encrypt,
        get: decrypt,
    },
    senha: {
        type: String,
        required: true,
    }

}, schemaOptions);

const Usuario = mongoose.model('Usuario', Schema);
module.exports = Usuario;
