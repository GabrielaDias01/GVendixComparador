const botaoAlterarSenha = document.querySelector(".botaoContaAlterarSenha");

const formularioAlterarSenha = document.querySelector("#formAlterarSenha");

const botaoSalvarSenha = document.querySelector("#salvarSenha");
const botaoCancelarSenha = document.querySelector("#cancelarSenha");

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

    // Mostra formulário
    formularioAlterarSenha.classList.add("ativo");


    // Esconde os botões principais
    botaoAlterarSenha.style.display = "none";
    botaoEditarDadosSenha.style.display = "none";
    botaoExcluirContaSenha.style.display = "none";


    // Coloca o foco no primeiro campo
    inputNovaSenha.focus();

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
    inputNovaSenha.value = "";
    inputConfirmarSenha.value = "";


    // Volta os campos para password
    inputNovaSenha.type = "password";
    inputConfirmarSenha.type = "password";


    // Volta os ícones para o olho normal
    const botoesOlho = document.querySelectorAll(".mostrarSenha");

    botoesOlho.forEach(function (botao) {

        const icone = botao.querySelector("i");

        icone.classList.remove("fa-eye-slash");
        icone.classList.add("fa-eye");

        botao.setAttribute("aria-label", "Mostrar senha");

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


// ==========================================
// SALVAR NOVA SENHA
// ==========================================

botaoSalvarSenha.addEventListener("click", function () {

    const novaSenha = inputNovaSenha.value;
    const confirmarSenha = inputConfirmarSenha.value;


    // ==========================================
    // CAMPOS VAZIOS
    // ==========================================

    if (novaSenha.trim() === "") {

        alert("Digite sua nova senha.");

        inputNovaSenha.focus();

        return;

    }


    if (confirmarSenha.trim() === "") {

        alert("Confirme sua nova senha.");

        inputConfirmarSenha.focus();

        return;

    }


    // ==========================================
    // TAMANHO DA SENHA
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

            senha: novaSenha

        })

    })

        .then(async function (response) {

            let dados = {};

            try {

                dados = await response.json();

            }

            catch (erro) {

                console.log("A resposta não possui JSON.");

            }


            if (!response.ok) {

                throw new Error(
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


            // Fecha o formulário
            fecharAlteracaoSenha();

        })

        .catch(function (erro) {

            console.log(erro);

            alert(erro.message);

        });

});