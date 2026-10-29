
const enderecoRepositorio = require("../repositories/enderecoRepositories");

/* ==========================================
   CADASTRAR ENDEREÇO
========================================== */

exports.cadastroEndereco = (endereco, callback) => {
    enderecoRepositorio.buscarEnderecoDuplicado(endereco, (erro, enderecoExistente) => {
        if (erro) {
            return callback(erro, null);
        }

        if (enderecoExistente) {
            const erroDuplicado = new Error(
                "Este endereço já está cadastrado na sua conta."
            );

            erroDuplicado.codigo = "ENDERECO_DUPLICADO";

            return callback(erroDuplicado, null);
        }

        enderecoRepositorio.salvar(endereco, (erro, resultado) => {
            if (erro) {
                return callback(erro, null);
            }

            return callback(null, resultado);
        });
    });
};

/* ==========================================
   LISTAR ENDEREÇOS DE UM USUÁRIO
========================================== */

exports.listarEnderecos = (idUsuario, callback) => {
    enderecoRepositorio.listarEnderecos(idUsuario, (erro, resultado) => {
        if (erro) {
            return callback(erro, null);
        }

        callback(null, resultado);
    });
};

/* ==========================================
   DEFINIR ENDEREÇO PRINCIPAL
========================================== */

exports.definirPrincipal = (idEndereco, idUsuario, callback) => {
    enderecoRepositorio.definirPrincipal(
        idEndereco,
        idUsuario,
        (erro, resultado) => {

            if(erro){
                return callback(erro, null);
            }

            if(!resultado){
                return callback(null, null);
            }

            callback(null, resultado);
        }
    );
};

/* ==========================================
   EXCLUIR ENDEREÇO
========================================== */

exports.excluirEndereco = (idEndereco, idUsuario, callback) => {
    enderecoRepositorio.excluir(
        idEndereco,
        idUsuario,
        (erro, resultado) => {
            if (erro) {
                return callback(erro, null);
            }

            if (resultado.affectedRows === 0) {
                return callback(null, null);
            }

            callback(null, resultado);
        }
    );
};

/* ==========================================
   BUSCAR ENDEREÇO POR ID
========================================== */

exports.buscarPorId = (idEndereco, idUsuario, callback) => {
    enderecoRepositorio.buscarPorId(
        idEndereco,
        idUsuario,
        (erro, resultado) => {
            if (erro) {
                return callback(erro, null);
            }

            callback(null, resultado);
        }
    );
};
