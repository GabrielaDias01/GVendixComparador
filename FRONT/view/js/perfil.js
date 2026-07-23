const btnPerfil = document.getElementById("btnPerfil");
const perfil = document.getElementById("perfil");
const overlayPerfil = document.getElementById("overlayPerfil");

const fecharPerfil = document.getElementById("fecharPerfil");

const abrirDadosConta = document.getElementById("abrirDadosConta");
const dadosConta = document.getElementById("dadosConta");

const voltarPerfil = document.getElementById("voltarPerfil");
const fecharDadosConta = document.getElementById("fecharDadosConta");

function fecharTudoPerfil() {

    perfil.classList.remove("ativo");

    dadosConta.classList.remove("ativo");

    overlayPerfil.classList.remove("ativo");

}

/* ABRIR PERFIL */

btnPerfil.addEventListener("click", function (e) {

    e.preventDefault();

    perfil.classList.add("ativo");
    overlayPerfil.classList.add("ativo");

});


/* CLIQUE FORA */

document.addEventListener("click", function (e) {

    if (!overlayPerfil.classList.contains("ativo")) return;

    const clicouNoPerfil =
        perfil.contains(e.target);

    const clicouNosDados =
        dadosConta.contains(e.target);

    const clicouNoBotaoPerfil =
        btnPerfil.contains(e.target);

    if (
        !clicouNoPerfil &&
        !clicouNosDados &&
        !clicouNoBotaoPerfil
    ) {

        fecharTudoPerfil();

    }

});

overlayPerfil.addEventListener(
    "click",
    fecharTudoPerfil
);

document.addEventListener("keydown", function (e) {

    if (e.key === "Escape") {

        fecharTudoPerfil();

    }

});

fecharPerfil.addEventListener(
    "click",
    fecharTudoPerfil
);

abrirDadosConta.addEventListener("click", () => {

    perfil.classList.remove("ativo");

    dadosConta.classList.add("ativo");

});

voltarPerfil.addEventListener("click", () => {

    dadosConta.classList.remove("ativo");

    perfil.classList.add("ativo");

});

fecharDadosConta.addEventListener(
    "click",
    fecharTudoPerfil
);