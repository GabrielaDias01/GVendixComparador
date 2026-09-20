const btnCadastrar = document.getElementById("btnCadastrar");

btnCadastrar.addEventListener("click", function (event) {

    event.preventDefault();

    const frmUsuario = document.querySelector("#frmUsuario");

    if (validarFormularioUsuario(frmUsuario) == false) {

        return false;

    }

    const usuario = obtemUsuarioDoFormulario(frmUsuario);

    console.log("USUÁRIO QUE SERÁ CADASTRADO:", usuario);

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

            criaMensagem("Erro ao conectar com o servidor.");

        });

});


function obtemUsuarioDoFormulario(frmUsuario) {

    const nome = frmUsuario.querySelector("#nome").value.trim();

    const telefone = frmUsuario.querySelector("#telefone").value
        .replace(/\D/g, "");

    const email = frmUsuario.querySelector("#email").value.trim();

    const senha = frmUsuario.querySelector("#senha").value;

    return {

        nome: nome,

        telefone: telefone,

        email: email,

        senha: senha

    };

}


function validarFormularioUsuario(frmUsuario) {

    const divMensagens = document.querySelector("#divMensagens");

    divMensagens.textContent = "";

    const nome = frmUsuario.querySelector("#nome");

    const telefone = frmUsuario.querySelector("#telefone");

    const email = frmUsuario.querySelector("#email");

    const senha = frmUsuario.querySelector("#senha");

    const confirSenha = frmUsuario.querySelector("#confirSenha");


    if (nome.value.trim().length == 0) {

        criaMensagem("Nome inválido!");

        return false;

    }


    if (telefone.value.trim().length == 0) {

        criaMensagem("Telefone inválido!");

        return false;

    }


    if (
        email.value.trim().length == 0 ||
        !email.value.includes("@")
    ) {

        criaMensagem("Digite um e-mail válido!");

        return false;

    }


    if (senha.value.length == 0) {

        criaMensagem("Senha inválida!");

        return false;

    }


    if (senha.value !== confirSenha.value) {

        criaMensagem("As senhas não coincidem!");

        return false;

    }


    return true;

}


function criaMensagem(texto) {

    const msg = document.createElement("div");

    msg.classList.add("alert", "alert-warning");

    msg.textContent = texto;

    document.querySelector("#divMensagens").appendChild(msg);

}