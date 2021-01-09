const database = require('./database/database.js');
const salvarDados = require('./database/salvarDados.js');

module.exports = {
    
    index(req, res) {
        return res.render('index');
    },

    despesas(req, res) {
        return res.render('despesas');            
    },

    async cadastro(req, res) {
        try{
            const db = await database.databaseUsuarios;
            const dadosSelecionados = await db.all('SELECT * FROM dados');
            return res.render('cadastro', { dadosSelecionados });
        } catch(err) {
            return res.send('Erro no banco de dados! ' + err)
        }
     },

    async formulario(req, res) {
        try {
            const db = await database.databaseUsuarios;
            const dadosRelatorio = await db.all('SELECT * FROM dados');
            return res.render('form', { dadosRelatorio })
        } catch(err) {
            return res.send('Erro no banco de dado! ' + err)
        }
    },

    async relatorio(req, res) {
        try{
            const db = await database.databaseDados;
            const dadosRelatorio = await db.all('SELECT * FROM dadosrel');
            return res.render('relatorios', { dadosRelatorio });
        } catch(err) {
            return res.send('Erro no banco de dados! ' + err);
        }
    },

    async salvarHistorico(req, res) {
        try {
            const fields = req.body;
            const db = await database.databaseDados;
            await salvarDados.salvarDados(db, fields);
        } catch(err) {
            return res.send('Erro ao salvar! ' + err);
        }
    },

    async salvarCadastro(req, res) {
        try{
            const fields = req.body;
            const db = await database.databaseUsuarios;
            await salvarDados.salvarUsuarios(db, fields);
        } catch(err) {
            return res.send('Erro ao salvar! ' + err);
        }
    },

    async apagarDados(req, res) {
        try {
            const id = req.params.id;
            const db = await database.databaseDados;
            await salvarDados.excluirDados(db, id);
        } catch(req) {
            return res.send('Erro ao salvar! ' + err);
        }
    },

    async apagarUsuarios(req, res) {
        try {
            const id = req.params.id;
            const db = await database.databaseUsuarios;
            await salvarDados.excluirUsuarios(db, id);
        } catch(req) {
            return res.send('Erro ao salvar! ' + err);
        }
    }
}