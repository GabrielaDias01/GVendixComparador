
const model = require("../model/services/enderecoServices");

/* ==========================================
   CADASTRAR ENDEREÇO
========================================== */

exports.salvar = (req, res) => {
    const endereco = {
        ...req.body,
        id_usuario: req.usuario.id
    };

    model.cadastroEndereco(endereco, (erro, resultado) => {
        if (erro) {
            console.error("Erro ao cadastrar endereço:", erro);

            return res.status(500).json({
                erro: "Não foi possível cadastrar o endereço."
            });
        }

        return res.status(201).json({
            mensagem: "Endereço cadastrado com sucesso!",
            id: resultado.insertId
        });
    });
};

/* ==========================================
   LISTAR ENDEREÇOS DO USUÁRIO LOGADO
========================================== */

exports.listar = (req, res) => {
    const idUsuario = req.usuario.id;

    model.listarEnderecos(idUsuario, (erro, resultado) => {
        if (erro) {
            console.error("Erro ao listar endereços:", erro);

            return res.status(500).json({
                erro: "Não foi possível carregar os endereços."
            });
        }

        return res.status(200).json(resultado);
    });
};

/* ==========================================
   EXCLUIR ENDEREÇO DO USUÁRIO LOGADO
========================================== */

exports.excluir = (req, res) => {
    const idEndereco = req.params.id;
    const idUsuario = req.usuario.id;

    model.excluirEndereco(
        idEndereco,
        idUsuario,
        (erro, resultado) => {
            if (erro) {
                console.error("Erro ao excluir endereço:", erro);

                return res.status(500).json({
                    erro: "Não foi possível excluir o endereço."
                });
            }

            if (!resultado) {
                return res.status(404).json({
                    erro: "Endereço não encontrado para este usuário."
                });
            }

            return res.status(200).json({
                mensagem: "Endereço excluído com sucesso!"
            });
        }
    );
};
