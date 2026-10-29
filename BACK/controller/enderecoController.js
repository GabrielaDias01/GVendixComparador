
const model = require("../model/services/enderecoServices");

/* ==========================================
   CADASTRAR ENDEREÇO
========================================== */

exports.salvar = (req, res) => {
    const endereco = {
        ...req.body,
        id_usuario: req.usuario.id
    };

    const camposObrigatorios = [
        "apelido",
        "cep",
        "cidade",
        "bairro",
        "rua",
        "numero"
    ];

    for (const campo of camposObrigatorios) {
        if (
            typeof endereco[campo] !== "string" ||
            !endereco[campo].trim()
        ) {
            return res.status(400).json({
                erro: "Preencha todos os campos obrigatórios."
            });
        }
    }

    endereco.apelido = endereco.apelido.trim();
    endereco.cep = endereco.cep.replace(/\D/g, "");
    endereco.cidade = endereco.cidade.trim();
    endereco.bairro = endereco.bairro.trim();
    endereco.rua = endereco.rua.trim();
    endereco.numero = endereco.numero.trim();

    endereco.complemento =
        typeof endereco.complemento === "string"
            ? endereco.complemento.trim() || null
            : null;

    endereco.principal = endereco.principal === true;

    if (endereco.cep.length !== 8) {
        return res.status(400).json({
            erro: "Informe um CEP válido com 8 números."
        });
    }

    model.cadastroEndereco(endereco, (erro, resultado) => {
        if (erro) {
            if (erro.codigo === "ENDERECO_DUPLICADO") {
                return res.status(409).json({
                    erro: erro.message
                });
            }

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
   DEFINIR ENDEREÇO PRINCIPAL
========================================== */

exports.definirPrincipal = (req, res) => {

    const idEndereco = req.params.id;
    const idUsuario = req.usuario.id;

    model.definirPrincipal(
        idEndereco,
        idUsuario,
        (erro, resultado) => {

            if(erro){
                console.error("Erro ao definir endereço principal.", erro);

                return res.status(500).json({
                    erro: "Não foi possível definir o endereço principal."
                });
            }

            if (!resultado){
                return res.status(404).json({
                    erro: "Endereço não encontrado para este usuário."
                });
            }

            return res.status(200).json({
                mensagem: "Endereço principal atualizado com sucesso!"
            });
        }
    );
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
