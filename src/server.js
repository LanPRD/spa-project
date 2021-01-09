const express = require('express');
const app = express();
const path = require('path');
const pages = require('./pages.js');

app
    .use(express.urlencoded({ extended: true }))
    .use(express.static('public'))

    .set('views', path.join(__dirname, "views"))
    .set('view engine', 'hbs')

    .get('/', pages.index)
    .get('/cadastro', pages.cadastro)
    .get('/despesas', pages.despesas)
    .get('/form', pages.formulario)
    .get('/relatorios', pages.relatorio)

    .post('/salvar-historico', pages.salvarHistorico)
    .post('/salvar-cadastro', pages.salvarCadastro)

    .delete('/apagar/:id', pages.apagarDados)
    .delete('/apagar-usuarios/:id', pages.apagarUsuarios)

app.listen(8080, console.log('Back-end running! (:'))