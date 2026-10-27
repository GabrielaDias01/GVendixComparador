function usuarioValidacoes(req, res, next) {

    const { nome, telefone, email, senha } = req.body;

    if (!nome || nome.trim() === "") {
        return res.status(400).json({
            erro: "O nome é obrigatório!"
        });
    }

    if (!telefone || String(telefone).trim() === "") {
        return res.status(400).json({
            erro: "O telefone é obrigatório!"
        });
    }

    if (String(telefone).length !== 11) {
        return res.status(400).json({
            erro: "O telefone deve ter 11 números!"
        });
    }

    if (!email || !email.includes("@") || !email.includes(".")) {
        return res.status(400).json({
            erro: "Digite um e-mail válido!"
        });
    }

    if (!senha || senha.trim() === "") {
        return res.status(400).json({
            erro: "A senha é obrigatória!"
        });
    }

    next();
}

module.exports = usuarioValidacoes;
