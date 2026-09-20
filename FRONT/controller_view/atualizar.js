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
        >
    `;

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

    const novoTelefone = inputTelefone.value.trim();

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

        nomeInformacao.textContent = novoNome;

        emailInformacao.textContent = novoEmail;

        telefoneInformacao.textContent = novoTelefone;

        nomeOriginal = novoNome;

        emailOriginal = novoEmail;

        telefoneOriginal = novoTelefone;


        // ATUALIZA USUÁRIO SALVO

        usuarioAtual.nome = novoNome;

        usuarioAtual.email = novoEmail;

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