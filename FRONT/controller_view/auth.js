const usuarioLogado = JSON.parse(localStorage.getItem("usuario"));

console.log("Usuário: ", usuarioLogado);

if (!usuarioLogado) {
    console.log("Não está logado");
    window.location.href = "loginEscuro.html";
} else {
    console.log("Está logado");
}

document.querySelector("#btnSair").addEventListener("click", () => {

    localStorage.clear();
});