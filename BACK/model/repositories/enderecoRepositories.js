
const conexao = require("../../database/conexao");

/* ==========================================
   SALVAR ENDEREÇO
========================================== */

exports.salvar = (endereco, callback) => {

    const sql = `
        INSERT INTO tbl_enderecos (
            id_usuario,
            apelido,
            cep,
            cidade,
            bairro,
            rua,
            numero,
            complemento,
            principal
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const valores = [
        endereco.id_usuario,
        endereco.apelido,
        endereco.cep,
        endereco.cidade,
        endereco.bairro,
        endereco.rua,
        endereco.numero,
        endereco.complemento || null,
        endereco.principal ? 1 : 0
    ];

    conexao.query(sql, valores, (erro, resultado) => {

        if (erro) {
            console.error("ERRO AO SALVAR ENDEREÇO:", erro);
            return callback(erro);
        }

        callback(null, resultado);
    });
};


/* ==========================================
   LISTAR ENDEREÇOS DE UM USUÁRIO
========================================== */

exports.listarEnderecos = (idUsuario, callback) => {

    const sql = `
        SELECT
            id,
            id_usuario,
            apelido,
            cep,
            cidade,
            bairro,
            rua,
            numero,
            complemento,
            principal,
            criado_em
        FROM tbl_enderecos
        WHERE id_usuario = ?
        ORDER BY principal DESC, criado_em DESC
    `;

    conexao.query(sql, [idUsuario], (erro, resultado) => {

        if (erro) {
            console.error("ERRO AO LISTAR ENDEREÇOS:", erro);
            return callback(erro);
        }

        callback(null, resultado);
    });
};


/* ==========================================
   BUSCAR ENDEREÇO POR ID
========================================== */

exports.buscarPorId = (id, idUsuario, callback) => {

    const sql = `
        SELECT *
        FROM tbl_enderecos
        WHERE id = ? AND id_usuario = ?
    `;

    conexao.query(sql, [id, idUsuario], (erro, resultado) => {

        if (erro) {
            console.error("ERRO AO BUSCAR ENDEREÇO:", erro);
            return callback(erro);
        }

        callback(null, resultado[0]);
    });
};


/* ==========================================
   EXCLUIR ENDEREÇO
========================================== */

exports.excluir = (id, idUsuario, callback) => {

    const sql = `
        DELETE FROM tbl_enderecos
        WHERE id = ? AND id_usuario = ?
    `;

    conexao.query(sql, [id, idUsuario], (erro, resultado) => {

        if (erro) {
            console.error("ERRO AO EXCLUIR ENDEREÇO:", erro);
            return callback(erro);
        }

        callback(null, resultado);
    });
};
