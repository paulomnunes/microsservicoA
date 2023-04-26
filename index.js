require('dotenv').config()
const express = require('express')
const app = express()

app.use(express.json())

const conn = require('./db/conn')
conn()

const routes = require("./routes/public/router")

app.use("/", routes)

app.listen(3000, function () {
    console.log("Servidor rodando na porta 3000")
});