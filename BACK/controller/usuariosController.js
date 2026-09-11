const model = require("../model/services/usuarioService");

exports.salvar = (req, res) => {

    const usuario = req.body;

    model.cadastrarUsuario(usuario, (resultado) => {
        res.status(201).json({
            mensagem: "Usuário cadastrado com sucesso!"
        });
    });
};

exports.listar = (req, res) => {
    model.listarUsuarios((resultado) => {
        res.json(resultado);
    });
};

exports.atualizar = (req, res) => {

    const id = req.params.id;
    const usuario = req.body;

    model.atualizarUsuario(id, usuario, (resultado) => {

        res.status(200).json({
            mensagem: "Usuário atualizado com sucesso!"
        });

    });
};

exports.excluir = (req, res) => {
    const id = req.params.id;

    model.excluirUsuario(id, (resultado) => {
        res.status(201).json({
            mensagem: "Usuário excluído com sucesso!"
        });
    });
};


exports.login = (req,res)=>{

    const {email, senha} = req.body;

    model.login(

        email,
        senha,

        (resultado)=>{

            if(resultado.erro){

                return res.status(401).json(resultado);

            }

            res.json(resultado);

        }

    );

}

exports.perfil = (req, res) => {

    const id = req.usuario.id;

    model.buscarPorId(id, (resultado) => {

        if (!resultado) {
            return res.status(404).json({
                erro: "Usuário não encontrado"
            });
        }

        res.json(resultado);

    });

};