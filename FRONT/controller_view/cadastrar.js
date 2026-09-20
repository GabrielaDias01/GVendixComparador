const btnCadastrar = document.getElementById("btnCadastrar");

btnCadastrar.addEventListener("click", function (event) {
    event.preventDefault();

    var frmUsuario = document.querySelector("#frmUsuario");

    if (validarFormularioUsuario(frmUsuario) == false) {
        return false;
    }

    var usuario = obtemUsuarioDoFormulario(frmUsuario);

    fetch("http://localhost:3000/usuarios", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(usuario)
    })
        .then(response => {

            console.log("STATUS:", response.status);

            return response.json();
        })
        .then(dados => {

            console.log("RESPOSTA DO SERVIDOR:", dados);

            if (dados.erro) {
                criaMensagem(dados.erro);
                return;
            }

            frmUsuario.reset();

            criaMensagem("Usuário cadastrado com sucesso!");

        })
        .catch(erro => {

            console.error("ERRO:", erro);

        });
});

function obtemUsuarioDoFormulario(frmUsuario) {

    return {
        nome: frmUsuario.nome.value,
        telefone: frmUsuario.telefone.value.replace(/\D/g, ""),
        email: frmUsuario.email.value,
        senha: frmUsuario.senha.value
    };

}

function validarFormularioUsuario(frmUsuario) {
    var divMensagens = document.querySelector("#divMensagens");
    divMensagens.textContent = "";

    if (frmUsuario.nome.value.length == 0) {
        criaMensagem("Nome inválido!");
        return false;
    };

    if (frmUsuario.telefone.value.length == 0) {
        criaMensagem("Telefone inválido!");
        return false;
    };

    if (frmUsuario.email.value.length == 0 || !frmUsuario.email.value.includes("@")) {
        criaMensagem("Digite um e-mail válido!");
        return false;
    };

    if (frmUsuario.senha.value.length == 0) {
        criaMensagem("Senha Inválida!");
        return false;
    };
    if (frmUsuario.senha.value !== frmUsuario.confirSenha.value) {
        criaMensagem("As senhas não coincidem!");
        return false;
    };
    return true;
}

function criaMensagem(texto) {
    var msg = document.createElement("div");
    msg.classList.add("alert", "alert-warning");
    msg.textContent = texto;

    document.querySelector("#divMensagens").appendChild(msg);
}