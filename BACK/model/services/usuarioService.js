const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const usuarioRepositorio = require("../repositories/usuarioRepositories");

exports.cadastrarUsuario = async (usuario, callback) => {

    usuarioRepositorio.buscarPorEmail(usuario.email, async (usuarioEncontrado) => {

        if (usuarioEncontrado) {
            return callback({
                erro: "E-mail já cadastrado"
            });
        }

        try {
            usuario.senha = await bcrypt.hash(
                usuario.senha,
                10
            );

            usuarioRepositorio.salvar(usuario, (resultado) => {
                callback(resultado);
            });
        }
        catch (erro) {
            console.log(erro);
        }
    });
};

exports.listarUsuarios = (callback) => {
    usuarioRepositorio.listar((resultado) => {
        callback(resultado);
    });
};

exports.atualizarUsuario = async (idUsuario, usuario, callback) => {
    try {

        if (usuario.senha) {

            usuario.senha = await bcrypt.hash(
                usuario.senha,
                10
            );

        }

        usuarioRepositorio.atualizar(
            idUsuario,
            usuario,
            (resultado) => {
                callback(resultado);
            }
        );
    } catch (erro) {
        console.error(erro);
    }
};


exports.excluirUsuario = (idUsuario, callback) => {
    usuarioRepositorio.excluir(idUsuario, (resultado) => {
        callback(resultado);
    });
};

exports.login = (email, senha, callback) => {

    usuarioRepositorio.buscarPorEmail(email, async (usuario) => {

        if (!usuario) {
            return callback({
                erro: "Usuário não encontrado"
            });
        }

        const senhaCorreta = await bcrypt.compare(
            senha,
            usuario.senha
        );

        if (!senhaCorreta) {
            return callback({
                erro: "Senha inválida"
            });
        }

        const token = jwt.sign(
            {
                id: usuario.id,
                perfil: usuario.perfil
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "8h"
            }
        );

        callback({
            token,
            usuario: {
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email,
                perfil: usuario.perfil
            }
        });

    });

};

exports.alterarSenha = async (email, senha, callback) => {

    usuarioRepositorio.buscarPorEmail(email, async (usuario) => {

        if (!usuario) {
            return callback({
                erro: "E-mail não encontrado"
            });
        }

        try {

            const novaSenha = await bcrypt.hash(senha, 10);

            usuarioRepositorio.alterarSenha(
                email,
                novaSenha,
                (resultado) => {
                    callback(resultado);
                }
            );

        } catch (erro) {

            console.error(erro);

            callback({
                erro: "Erro ao alterar a senha"
            });

        }
    });
};

exports.buscarPorId = (id, callback) => {

    usuarioRepositorio.buscarPorId(id, (resultado) => {

        callback(resultado);

    });

};

