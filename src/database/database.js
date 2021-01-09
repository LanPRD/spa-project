const database = require('sqlite-async');
const path = require('path');

function executeDatas(database) {
    return database.exec(`
        CREATE TABLE IF NOT EXISTS dadosrel (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            date TEXT,
            name TEXT,
            price TEXT,
            obs TEXT,
            type TEXT
        );
    `)
}

function executeUser(database) {
    return database.exec(`
        CREATE TABLE IF NOT EXISTS dados (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            obs TEXT
        );
    `)
}

const databaseDados = database.open(__dirname + '/databaseDados.sqlite').then(executeDatas)
const databaseUsuarios = database.open(__dirname + '/databaseUsuarios.sqlite').then(executeUser)

module.exports = { databaseDados, databaseUsuarios }