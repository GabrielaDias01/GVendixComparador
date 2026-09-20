const conexao = require("../../database/conexao");

exports.salvar = (usuario, callback) => {

    console.log(usuario);
    const sql = `
        INSERT INTO tbl_usuarios (nome, telefone, email, senha)
        VALUES(?, ?, ?, ?)
        `;

    const valores = [usuario.nome, usuario.telefone, usuario.email, usuario.senha];

    conexao.query(sql, valores, (erro, resultado) => {
        if (erro) {
            throw erro;
        }
        callback(resultado);
    });
};

exports.listar = (callback) => {
    const sql = "SELECT * FROM tbl_usuarios";

    conexao.query(sql, (erro, resultado) => {
        if (erro) {
            throw erro;
        }

        callback(resultado);
    });
};

exports.atualizar = (id, usuario, callback) => {

    const sql = `
        UPDATE tbl_usuarios
        SET nome = ?, telefone = ?, email = ?
        WHERE id = ?
    `;

    const valores = [
        usuario.nome,
        usuario.telefone,
        usuario.email,
        id
    ];

    conexao.query(sql, valores, (erro, resultado) => {

        if (erro) {

            console.error("ERRO SQL:", erro);

            return callback({
                erro: "Erro ao atualizar usuário"
            });

        }

        callback(resultado);

    });

};



exports.excluir = (id, callback) => {

    const sql = `
        DELETE FROM tbl_usuarios
        WHERE id = ?
        `;

    conexao.query(sql, [id], (erro, resultado) => {
        if (erro) {
            throw erro;
        }
        callback(resultado);
    });
};

exports.buscarPorEmail = (email, callback) => {

    const sql = `
    SELECT * FROM tbl_usuarios
    WHERE email = ?`;

    conexao.query(sql, [email], (erro, resultado) => {

        if (erro) {
            throw erro;
        }

        callback(resultado[0]);
    });
};

exports.buscarPorId = (id, callback) => {

    const sql = `
        SELECT id, nome, telefone, email
        FROM tbl_usuarios
        WHERE id = ?
    `;

    conexao.query(sql, [id], (erro, resultado) => {

        if (erro) {
            console.error("ERRO AO BUSCAR USUÁRIO POR ID:", erro);
            return;
        }

        callback(resultado[0]);
    });
};

exports.alterarSenha = (email, senha, callback) => {

    const sql = `
        UPDATE tbl_usuarios
        SET senha = ?
        WHERE email = ?
    `;

    conexao.query(sql, [senha, email], (erro, resultado) => {

        if (erro) {
            console.error("ERRO AO ALTERAR SENHA:", erro);

            return callback({
                erro: "Erro ao alterar senha"
            });
        }

        console.log("E-MAIL:", email);
        console.log("RESULTADO UPDATE:", resultado);

        callback(resultado);
    });
};