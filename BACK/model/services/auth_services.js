const conexao = require("../../database/conexao");
const usuarioRepositorio = require("../repositories/usuarioRepositories");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


exports.login = (email, senha, callback)=>{

    usuarioRepositorio.buscarPorEmail(email, async(usuario)=>{

        if(!usuario){

            callback({
                erro: "Usuário não encontrado"
            });

            return;
        }

        const senhaCorreta = await bcrypt.compare(
            senha,
            usuario.senha
        );

        if(!senhaCorreta){

            callback({
                erro: "Senha inválida"
            });

            return;
        }

        const token = jwt.sign(

            {
                id: usuario.id,
                perfil: usuario.perfil
            },

            process.env.JWT_SECRET,

            {
                expiresIn:"8h"
            }

        );

        callback({

            token,

            usuario:{
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email,
                perfil: usuario.perfil
            }

        });

    });

}