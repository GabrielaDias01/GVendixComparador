const btnEsquecerSenha = document.querySelector("#btnEsquecerSenha");
const recuperarSenha = document.querySelector("#recuperarSenha");
const fecharRecuperarSenha = document.querySelector("#fecharRecuperarSenha");
const btnCancelarRecuperacao = document.querySelector("#btnCancelarRecuperacao");
const btnSalvarNovaSenha = document.querySelector("#btnSalvarNovaSenha");

const emailLogin = document.querySelector("#email");
const lembrarSenha = document.querySelector("#lembrarSenha");

const emailLembrado = localStorage.getItem("emailLembrado");

if (emailLembrado) {
    emailLogin.value = emailLembrado;
    lembrarSenha.checked = true;
}


btnEsquecerSenha.addEventListener("click", () => {
    recuperarSenha.classList.add("ativo");
});

fecharRecuperarSenha.addEventListener("click", () => {
    recuperarSenha.classList.remove("ativo");
});


btnCancelarRecuperacao.addEventListener("click", () => {
    recuperarSenha.classList.remove("ativo");
});

// SALVAR NOVA SENHA

btnSalvarNovaSenha.addEventListener("click", async () => {

    const email = document.getElementById("emailRecuperacao").value.trim();
    const novaSenha = document.getElementById("novaSenha").value.trim();
    const confirmarNovaSenha = document.getElementById("confirmarNovaSenha").value.trim();

    if (!email || !novaSenha || !confirmarNovaSenha) {
        alert("Preencha todos os campos para alterar a senha.");
        return;
    }

    if (novaSenha !== confirmarNovaSenha) {
        alert("As senhas não são iguais!");
        return;
    }

    try {

        const resposta = await fetch("http://localhost:3000/usuarios/alterar-senha", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                senha: novaSenha
            })
        });

        const dados = await resposta.json();

        if (resposta.ok) {

            alert("Senha alterada com sucesso!");

            document.getElementById("emailRecuperacao").value = "";
            document.getElementById("novaSenha").value = "";
            document.getElementById("confirmarNovaSenha").value = "";

            recuperarSenha.classList.remove("ativo");

        } else {

            alert(dados.erro || "Não foi possível alterar a senha.");

        }

    } catch (erro) {

        console.error(erro);

        alert("Erro ao conectar com o servidor.");

    }

});

// LOGIN

document.getElementById("formLogin").addEventListener("submit", async function (e) {

    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value.trim();
    const lembrar = document.getElementById("lembrarSenha").checked;

    if (!email || !senha) {
        alert("Todos os campos são obrigatórios!");
        return;
    }

    try {

        const resposta = await fetch("http://localhost:3000/usuarios/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                senha
            })
        });

        const dados = await resposta.json();

        if (dados.token) {

            if (lembrar) {

                localStorage.setItem("emailLembrado", email);

                localStorage.setItem("token", dados.token);

                localStorage.setItem(
                    "usuario",
                    JSON.stringify(dados.usuario)
                );

                sessionStorage.removeItem("token");
                sessionStorage.removeItem("usuario");

            } else {

                localStorage.removeItem("emailLembrado");

                sessionStorage.setItem("token", dados.token);

                sessionStorage.setItem(
                    "usuario",
                    JSON.stringify(dados.usuario)
                );

                localStorage.removeItem("token");
                localStorage.removeItem("usuario");

            }

            alert("Login realizado com sucesso!");

            window.location.href = "telaPrincipalEscura.html";

        } else {

            alert(dados.erro || "Erro no login");

        }

    } catch (erro) {

        console.error(erro);

        alert("Erro ao conectar com o servidor.");

    }

});