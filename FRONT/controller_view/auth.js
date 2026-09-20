const usuarioLogado = JSON.parse(
    localStorage.getItem("usuario") ||
    sessionStorage.getItem("usuario")
);

console.log("Usuário: ", usuarioLogado);

if (!usuarioLogado) {

    console.log("Não está logado");

    window.location.href = "loginEscuro.html";

} else {

    console.log("Está logado");

}

const btnSair = document.querySelector(".btnSair");

btnSair.addEventListener("click", () => {

    // Sai da conta

    localStorage.removeItem("token");
    localStorage.removeItem("usuario");

    sessionStorage.removeItem("token");
    sessionStorage.removeItem("usuario");

    // NÃO remove o emailLembrado

    window.location.href = "loginEscuro.html";

});