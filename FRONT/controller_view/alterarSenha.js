const botaoAlterarSenha = document.querySelector(".botaoContaAlterarSenha");

const formularioAlterarSenha = document.querySelector(".formAlterarSenha");

const botaoSalvarSenha = document.querySelector("#salvarSenha");
const botaoCancelarSenha = document.querySelector("#cancelarSenha");

const inputSenhaAtual = document.querySelector("#senhaAtual");
const inputNovaSenha = document.querySelector("#novaSenha");
const inputConfirmarSenha = document.querySelector("#confirmarSenha");


// ==========================================
// OUTROS BOTÕES DA TELA
// ==========================================

const botaoEditarDadosSenha = document.querySelector(".botaoContaEditarDados");
const botaoExcluirContaSenha = document.querySelector(".botaoContaExcluir");


// ==========================================
// ABRIR ALTERAÇÃO DE SENHA
// ==========================================

botaoAlterarSenha.addEventListener("click", function () {

    // Esconde os botões principais
    botaoAlterarSenha.style.display = "none";
    botaoEditarDadosSenha.style.display = "none";
    botaoExcluirContaSenha.style.display = "none";

    // Mostra o formulário
    formularioAlterarSenha.classList.add("ativo");

    // Coloca o cursor no campo da senha atual
    inputSenhaAtual.focus();

});


// ==========================================
// SALVAR NOVA SENHA
// ==========================================

botaoSalvarSenha.addEventListener("click", function () {

    const senhaAtual = inputSenhaAtual.value;
    const novaSenha = inputNovaSenha.value;
    const confirmarSenha = inputConfirmarSenha.value;


    // ==========================================
    // SENHA ATUAL VAZIA
    // ==========================================

    if (senhaAtual.trim() === "") {

        alert("Digite sua senha atual.");

        inputSenhaAtual.focus();

        return;
    }


    // ==========================================
    // NOVA SENHA VAZIA
    // ==========================================

    if (novaSenha.trim() === "") {

        alert("Digite sua nova senha.");

        inputNovaSenha.focus();

        return;
    }


    // ==========================================
    // CONFIRMAÇÃO VAZIA
    // ==========================================

    if (confirmarSenha.trim() === "") {

        alert("Confirme sua nova senha.");

        inputConfirmarSenha.focus();

        return;
    }


    // ==========================================
    // TAMANHO DA NOVA SENHA
    // ==========================================

    if (novaSenha.length < 6) {

        alert("A senha deve ter pelo menos 6 caracteres.");

        inputNovaSenha.focus();

        return;
    }


    // ==========================================
    // CONFIRMAÇÃO
    // ==========================================

    if (novaSenha !== confirmarSenha) {

        alert("As senhas não coincidem.");

        inputConfirmarSenha.focus();

        return;
    }


    // ==========================================
    // IMPEDIR USAR A MESMA SENHA
    // ==========================================

    if (senhaAtual === novaSenha) {

        alert("A nova senha deve ser diferente da senha atual.");

        inputNovaSenha.focus();

        return;
    }


    // ==========================================
    // TOKEN DO USUÁRIO LOGADO
    // ==========================================

    const token =
        localStorage.getItem("token") ||
        sessionStorage.getItem("token");


    if (!token) {

        alert("Usuário não está logado.");

        return;
    }


    // ==========================================
    // ALTERAR SENHA
    // ==========================================

    fetch("http://localhost:3000/usuarios/alterar-senha-logado", {

        method: "PUT",

        headers: {

            "Content-Type": "application/json",

            "Authorization": `Bearer ${token}`

        },

        // Envia a senha atual e a nova senha
        body: JSON.stringify({

            senhaAtual: senhaAtual,
            novaSenha: novaSenha

        })

    })

        .then(async function (response) {

            let dados = {};

            try {

                dados = await response.json();

            } catch (erro) {

                console.log("A resposta não possui JSON.");

            }


            if (!response.ok) {

                throw new Error(
                    dados.erro ||
                    dados.mensagem ||
                    dados.message ||
                    "Não foi possível alterar a senha."
                );

            }


            return dados;

        })

        .then(function (dados) {

            console.log(dados);

            alert("Senha alterada com sucesso!");

            fecharAlteracaoSenha();

        })

        .catch(function (erro) {

            console.log(erro);

            alert(erro.message);

        });

});


// ==========================================
// CANCELAR ALTERAÇÃO DE SENHA
// ==========================================

botaoCancelarSenha.addEventListener("click", function () {

    fecharAlteracaoSenha();

});


// ==========================================
// FUNÇÃO PARA FECHAR O FORMULÁRIO
// ==========================================

function fecharAlteracaoSenha() {

    // Esconde formulário
    formularioAlterarSenha.classList.remove("ativo");


    // Limpa os campos
    inputSenhaAtual.value = "";
    inputNovaSenha.value = "";
    inputConfirmarSenha.value = "";


    // Volta os campos para password
    inputSenhaAtual.type = "password";
    inputNovaSenha.type = "password";
    inputConfirmarSenha.type = "password";


    // Volta os ícones para o olho normal
    const botoesOlho = document.querySelectorAll(".mostrarSenha");

    botoesOlho.forEach(function (botao) {

        const icone = botao.querySelector("i");

        icone.classList.remove("fa-eye-slash");
        icone.classList.add("fa-eye");

        botao.setAttribute(
            "aria-label",
            "Mostrar senha"
        );

    });


    // Mostra os botões principais novamente
    botaoAlterarSenha.style.display = "";
    botaoEditarDadosSenha.style.display = "";
    botaoExcluirContaSenha.style.display = "";

}


// ==========================================
// MOSTRAR / ESCONDER SENHA
// ==========================================

const botoesMostrarSenha = document.querySelectorAll(".mostrarSenha");

botoesMostrarSenha.forEach(function (botao) {

    botao.addEventListener("click", function () {

        // Descobre qual input esse botão controla
        const idInput = botao.dataset.input;

        const input = document.getElementById(idInput);

        const icone = botao.querySelector("i");


        // ==========================================
        // MOSTRAR SENHA
        // ==========================================

        if (input.type === "password") {

            input.type = "text";

            icone.classList.remove("fa-eye");
            icone.classList.add("fa-eye-slash");

            botao.setAttribute(
                "aria-label",
                "Ocultar senha"
            );

        }


        // ==========================================
        // ESCONDER SENHA
        // ==========================================

        else {

            input.type = "password";

            icone.classList.remove("fa-eye-slash");
            icone.classList.add("fa-eye");

            botao.setAttribute(
                "aria-label",
                "Mostrar senha"
            );

        }

    });

});