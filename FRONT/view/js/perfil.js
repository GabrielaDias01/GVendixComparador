const btnPerfil = document.getElementById("btnPerfil");
const perfil = document.getElementById("perfil");
const overlayPerfil = document.getElementById("overlayPerfil");
const fecharPerfil = document.getElementById("fecharPerfil");


btnPerfil.addEventListener("click", function (e) {
    e.preventDefault();

    perfil.classList.add("ativo");
    overlayPerfil.classList.add("ativo");
});


document.addEventListener("click", function (e) {

    if (
        !perfil.contains(e.target) &&
        !btnPerfil.contains(e.target)
    ) {
        perfil.classList.remove("ativo");
        overlayPerfil.classList.remove("ativo");
    }

});


overlayPerfil.addEventListener("click", function () {

    perfil.classList.remove("ativo");
    overlayPerfil.classList.remove("ativo");

});


document.addEventListener("keydown", function (e) {

    if (e.key === "Escape") {

        perfil.classList.remove("ativo");
        overlayPerfil.classList.remove("ativo");

    }

});

fecharPerfil.addEventListener("click", function(){

    perfil.classList.remove("ativo");
    overlayPerfil.classList.remove("ativo");

});