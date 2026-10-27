const btnEditar = document.querySelector(".botaoContaEditarDados");
const btnSalvar = document.querySelector(".botaoContaSalvarDados");
const btnCancelar = document.querySelector(".botaoContaCancelarEdicao");

const btnEditarDados = document.querySelector(".botaoContaEditarDados");
const btnExcluirConta = document.querySelector(".botaoContaExcluir");
const btnAlterarSenha = document.querySelector(".botaoContaAlterarSenha");

const nomeInformacao = document.querySelector("#nomeInformacao");
const emailInformacao = document.querySelector("#emailInformacao");
const telefoneInformacao = document.querySelector("#telefoneInformacao");

const botoesEdicao = document.querySelector(".botoesEdicao");

let nomeOriginal;
let emailOriginal;
let telefoneOriginal;


// EDITAR DADOS

btnEditar.addEventListener("click", function () {

    nomeOriginal = nomeInformacao.textContent.trim();

    emailOriginal = emailInformacao.textContent.trim();

    telefoneOriginal = telefoneInformacao.textContent.trim();

    nomeInformacao.innerHTML = `
        <input
            type="text"
            id="inputNome"
            value="${nomeOriginal}"
        >
    `;

    emailInformacao.innerHTML = `
        <input
            type="email"
            id="inputEmail"
            value="${emailOriginal}"
        >
    `;

    telefoneInformacao.innerHTML = `
        <input
            type="text"
            id="inputTelefone"
            value="${telefoneOriginal}"
            maxlength="15"
            placeholder="(11) 99999-9999"
        >
    `;

    const inputTelefone = document.querySelector("#inputTelefone");


    // MÁSCARA DO TELEFONE

    inputTelefone.addEventListener("input", function () {

        let telefone = inputTelefone.value.replace(/\D/g, "");

        telefone = telefone.substring(0, 11);

        if (telefone.length <= 2) {

            telefone = telefone.replace(
                /^(\d{0,2})/,
                "($1"
            );

        } else if (telefone.length <= 6) {

            telefone = telefone.replace(
                /^(\d{2})(\d{0,4})/,
                "($1) $2"
            );

        } else {

            telefone = telefone.replace(
                /^(\d{2})(\d{5})(\d{0,4})/,
                "($1) $2-$3"
            );

        }

        inputTelefone.value = telefone;

    });


    // APLICA A MÁSCARA NO TELEFONE QUE JÁ ESTAVA SALVO

    inputTelefone.dispatchEvent(new Event("input"));


    btnEditarDados.style.display = "none";

    btnAlterarSenha.style.display = "none";

    btnExcluirConta.style.display = "none";

    botoesEdicao.style.display = "flex";

});


// CANCELAR EDIÇÃO

btnCancelar.addEventListener("click", function () {

    nomeInformacao.textContent = nomeOriginal;

    emailInformacao.textContent = emailOriginal;

    telefoneInformacao.textContent = telefoneOriginal;

    botoesEdicao.style.display = "none";

    btnEditarDados.style.display = "";

    btnAlterarSenha.style.display = "";

    btnExcluirConta.style.display = "";

});


// SALVAR ALTERAÇÕES

btnSalvar.addEventListener("click", async function () {

    const usuarioAtual = JSON.parse(
        localStorage.getItem("usuario") ||
        sessionStorage.getItem("usuario")
    );

    const tokenAtual =
        localStorage.getItem("token") ||
        sessionStorage.getItem("token");

    if (!usuarioAtual || !tokenAtual) {

        window.location.href = "loginEscuro.html";

        return;

    }

    const inputNome = document.querySelector("#inputNome");

    const inputEmail = document.querySelector("#inputEmail");

    const inputTelefone = document.querySelector("#inputTelefone");

    if (!inputNome || !inputEmail || !inputTelefone) {

        console.log("Campos de edição não encontrados.");

        return;

    }

    const novoNome = inputNome.value.trim();

    const novoEmail = inputEmail.value.trim();

    // REMOVE A MÁSCARA ANTES DE ENVIAR

    const novoTelefone = inputTelefone.value
        .replace(/\D/g, "")
        .trim();


    if (novoNome === "") {

        alert("Digite seu nome.");

        inputNome.focus();

        return;

    }


    if (novoEmail === "") {

        alert("Digite seu e-mail.");

        inputEmail.focus();

        return;

    }


    if (novoTelefone === "") {

        alert("Digite seu telefone.");

        inputTelefone.focus();

        return;

    }


    if (novoTelefone.length !== 11) {

        alert("Digite um telefone válido com 11 números.");

        inputTelefone.focus();

        return;

    }


    try {

        const resposta = await fetch(
            `http://localhost:3000/usuarios/${usuarioAtual.id}`,
            {
                method: "PUT",

                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${tokenAtual}`
                },

                body: JSON.stringify({
                    nome: novoNome,
                    email: novoEmail,
                    telefone: novoTelefone
                })
            }
        );

        const dados = await resposta.json();

        if (!resposta.ok) {

            throw new Error(
                dados.erro || "Erro ao atualizar os dados."
            );

        }


        // FORMATA O TELEFONE PARA MOSTRAR NA TELA

        const telefoneFormatado = novoTelefone.replace(
            /^(\d{2})(\d{5})(\d{4})$/,
            "($1) $2-$3"
        );


        nomeInformacao.textContent = novoNome;

        emailInformacao.textContent = novoEmail;

        telefoneInformacao.textContent = telefoneFormatado;

        nomeOriginal = novoNome;

        emailOriginal = novoEmail;

        telefoneOriginal = telefoneFormatado;


        // ATUALIZA USUÁRIO SALVO

        usuarioAtual.nome = novoNome;

        usuarioAtual.email = novoEmail;

        usuarioAtual.telefone = novoTelefone;


        if (localStorage.getItem("usuario")) {

            localStorage.setItem(
                "usuario",
                JSON.stringify(usuarioAtual)
            );

        } else {

            sessionStorage.setItem(
                "usuario",
                JSON.stringify(usuarioAtual)
            );

        }


        // ATUALIZA INFORMAÇÕES DA TELA

        const nomeConta = document.querySelector("#nomeConta");

        const emailConta = document.querySelector("#emailConta");

        const nomeUsuario = document.querySelector("#nomeUsuario");

        const emailUsuario = document.querySelector("#emailUsuario");

        const inicialUsuario = document.querySelector("#inicialUsuario");

        const avatarConta = document.querySelector("#avatarConta");


        if (nomeConta) {

            nomeConta.textContent = novoNome;

        }


        if (emailConta) {

            emailConta.textContent = novoEmail;

        }


        if (nomeUsuario) {

            nomeUsuario.textContent = novoNome;

        }


        if (emailUsuario) {

            emailUsuario.textContent = novoEmail;

        }


        if (inicialUsuario && novoNome.length > 0) {

            inicialUsuario.textContent =
                novoNome.charAt(0).toUpperCase();

        }


        if (avatarConta && novoNome.length > 0) {

            avatarConta.textContent =
                novoNome.charAt(0).toUpperCase();

        }


        botoesEdicao.style.display = "none";

        btnEditarDados.style.display = "";

        btnAlterarSenha.style.display = "";

        btnExcluirConta.style.display = "";

        alert("Dados atualizados com sucesso!");

    } catch (erro) {

        console.error(erro);

        alert("Não foi possível atualizar os dados.");

    }

});