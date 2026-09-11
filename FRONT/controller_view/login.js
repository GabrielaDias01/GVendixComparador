document.getElementById("formLogin").addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;


    const resposta = await fetch("http://localhost:3000/usuarios/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, senha })
    });

    const dados = await resposta.json();

    if (dados.token) {

        localStorage.setItem("token", dados.token);

        localStorage.setItem(
            "usuario",
            JSON.stringify(dados.usuario)
        );

        alert("Login realizado com sucesso!");

        window.location.href = "telaPrincipalEscura.html";

    } else {

        alert(dados.erro || "Erro no login");

    }
});