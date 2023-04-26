const mongoose = require("mongoose");

async function main() {
    mongoose.set("strictQuery", true);
    const DB_USER = process.env.DB_USER
    const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)

    if (!DB_USER) {
        console.log('usuário do MongoDB não informado, é necessário informa-lo nas variáveis do ambiente.')
    }

    if (!DB_PASSWORD) {
        console.log('senha do MongoDB não informada, é necessário informa-la nas variáveis do ambiente.')
    }

    mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@mycluster.wizesps.mongodb.net/databaseA?retryWrites=true&w=majority`)
        .then(() => {
            console.log('Conexão com o MongoDB efetuada com sucesso!')
            console.log(`Você está conectado com o usuário: ${DB_USER}`)
        })
        .catch(() => {
            console.log('Não foi possível efetuar a conexão com o MongoDB!')
        })
}

module.exports = main;
