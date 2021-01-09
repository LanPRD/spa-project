function salvarDados(database, dados) {
  return database.run(`
        INSERT INTO dadosrel (
            date,
            name,
            price,
            obs,
            type
        ) VALUES (
            "${dados.date}",
            "${dados.name}",
            "${dados.price}",
            "${dados.obs}",
            "${dados.type}"
        );
    `)
}

function salvarUsuarios(database, dados) {
    return database.run(`
          INSERT INTO dados (
              name,
              obs
          ) VALUES (
              "${dados.name}",
              "${dados.obs}"
          );
      `)
}

function excluirDados(database, id) {
    return database.run(`DELETE FROM dadosrel WHERE rowid=?`, id);
}

function excluirUsuarios(database, id) {
    return database.run(`DELETE FROM dados WHERE rowid=?`, id);
}

module.exports = { salvarDados, salvarUsuarios, excluirDados, excluirUsuarios }
