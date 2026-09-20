const usuarioLogadoAuth = JSON.parse(
    localStorage.getItem("usuario") ||
    sessionStorage.getItem("usuario")
);

const tokenAuth =
    localStorage.getItem("token") ||
    sessionStorage.getItem("token");

console.log("Usuário:", usuarioLogadoAuth);

if (!usuarioLogadoAuth || !tokenAuth) {

    console.log("Não está logado");

    window.location.href = "loginEscuro.html";

} else {

    console.log("Está logado");

}


// BOTÃO SAIR DA CONTA

const btnSair = document.querySelector(".btnSair");

if (btnSair) {

    btnSair.addEventListener("click", function () {

        localStorage.removeItem("token");

        localStorage.removeItem("usuario");

        sessionStorage.removeItem("token");

        sessionStorage.removeItem("usuario");

        // NÃO REMOVE emailLembrado

        window.location.href = "loginEscuro.html";

    });

}