function validacoes(req, res, next){

    const {nome, email, senha} = req.body;

    if (!nome || nome.trim() === ""){
        return res.status(400).json({
            erro: "O nome é obrigatório!"
        });
    }

    if (!email || !email.includes("@") || !email.includes(".")) {
        return res.status(400).json({
            erro: "Digite um e-mail válido!"
        });
    }

    if (!senha || senha.trim() === ""){
        return res.status(400).json({
            erro: "A senha é obrigatória!"
        });
    }
    next();
}

module.exports = validacoes;