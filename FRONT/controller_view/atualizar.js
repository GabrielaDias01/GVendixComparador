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


// ==========================================
// EDITAR DADOS
// ==========================================

btnEditar.addEventListener("click", function () {

    // Salva os dados atuais
    nomeOriginal = nomeInformacao.textContent.trim();
    emailOriginal = emailInformacao.textContent.trim();
    telefoneOriginal = telefoneInformacao.textContent.trim();


    // ==========================================
    // TRANSFORMA OS DADOS EM INPUTS
    // ==========================================

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


    // ==========================================
    // ESCONDE OS BOTÕES PRINCIPAIS
    // ==========================================

    btnEditarDados.style.display = "none";
    btnAlterarSenha.style.display = "none";
    btnExcluirConta.style.display = "none";


    // ==========================================
    // MOSTRA SALVAR E CANCELAR
    // ==========================================

    botoesEdicao.style.display = "flex";

});


// ==========================================
// CANCELAR EDIÇÃO
// ==========================================

btnCancelar.addEventListener("click", function () {

    // Volta os valores anteriores
    nomeInformacao.textContent = nomeOriginal;
    emailInformacao.textContent = emailOriginal;
    telefoneInformacao.textContent = telefoneOriginal;


    // Esconde Salvar e Cancelar
    botoesEdicao.style.display = "none";


    // Mostra novamente os botões principais
    btnEditarDados.style.display = "";
    btnAlterarSenha.style.display = "";
    btnExcluirConta.style.display = "";

});


// ==========================================
// SALVAR ALTERAÇÕES
// ==========================================

btnSalvar.addEventListener("click", function () {

    const inputNome = document.querySelector("#inputNome");
    const inputEmail = document.querySelector("#inputEmail");
    const inputTelefone = document.querySelector("#inputTelefone");


    // ==========================================
    // VERIFICA SE OS INPUTS EXISTEM
    // ==========================================

    if (!inputNome || !inputEmail || !inputTelefone) {
        console.log("Campos de edição não encontrados.");
        return;
    }


    // ==========================================
    // PEGA OS NOVOS VALORES
    // ==========================================

    const novoNome = inputNome.value.trim();
    const novoEmail = inputEmail.value.trim();
    const novoTelefone = inputTelefone.value.trim();


    // ==========================================
    // VALIDAÇÕES
    // ==========================================

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


    // ==========================================
    // TOKEN
    // ==========================================

    const token = localStorage.getItem("token");


    // ==========================================
    // ENVIA PARA O BACK-END
    // ==========================================

    fetch(`http://localhost:3000/usuarios/${usuario.id}`, {

        method: "PUT",

        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },

        body: JSON.stringify({

            nome: novoNome,
            email: novoEmail,
            telefone: novoTelefone

        })

    })

        .then(response => {

            if (!response.ok) {
                throw new Error("Erro ao atualizar os dados.");
            }

            return response.json();

        })

        .then(dados => {

            console.log(dados);


            // ==========================================
            // ATUALIZA DADOS NA TELA
            // ==========================================

            nomeInformacao.textContent = novoNome;
            emailInformacao.textContent = novoEmail;
            telefoneInformacao.textContent = novoTelefone;


            // ==========================================
            // ATUALIZA VALORES ORIGINAIS
            // ==========================================

            nomeOriginal = novoNome;
            emailOriginal = novoEmail;
            telefoneOriginal = novoTelefone;


            // ==========================================
            // ESCONDE SALVAR/CANCELAR
            // ==========================================

            botoesEdicao.style.display = "none";


            // ==========================================
            // MOSTRA OS BOTÕES PRINCIPAIS
            // ==========================================

            btnEditarDados.style.display = "";
            btnAlterarSenha.style.display = "";
            btnExcluirConta.style.display = "";


            // ==========================================
            // PEGA OUTROS ELEMENTOS DA TELA
            // ==========================================

            const nomeConta = document.querySelector("#nomeConta");
            const emailConta = document.querySelector("#emailConta");

            const nomeUsuario = document.querySelector("#nomeUsuario");
            const emailUsuario = document.querySelector("#emailUsuario");

            const inicialUsuario = document.querySelector("#inicialUsuario");
            const avatarConta = document.querySelector("#avatarConta");


            // ==========================================
            // ATUALIZA CABEÇALHO DOS DADOS
            // ==========================================

            if (nomeConta) {
                nomeConta.textContent = novoNome;
            }

            if (emailConta) {
                emailConta.textContent = novoEmail;
            }


            // ==========================================
            // ATUALIZA CARD DO PERFIL
            // ==========================================

            if (nomeUsuario) {
                nomeUsuario.textContent = novoNome;
            }

            if (emailUsuario) {
                emailUsuario.textContent = novoEmail;
            }


            // ==========================================
            // ATUALIZA INICIAL DO AVATAR
            // ==========================================

            if (inicialUsuario && novoNome.length > 0) {
                inicialUsuario.textContent =
                    novoNome.charAt(0).toUpperCase();
            }


            if (avatarConta && novoNome.length > 0) {
                avatarConta.textContent =
                    novoNome.charAt(0).toUpperCase();
            }

        })

        .catch(erro => {

            console.log(erro);

            alert("Não foi possível atualizar os dados.");

        });

});