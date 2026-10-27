const btnAcessibilidade = document.getElementById("btnAcessibilidade");
const menuAcessibilidade = document.getElementById("menuAcessibilidade");

const btnLeitura = document.getElementById("btnLeitura");
const btnAumentar = document.getElementById("btnAumentar");
const btnDiminuir = document.getElementById("btnDiminuir");
const btnSaturacao = document.getElementById("btnSaturacao");

btnAcessibilidade.addEventListener("click", (e) => {

    e.stopPropagation();

    menuAcessibilidade.style.display =
        menuAcessibilidade.style.display === "block"
            ? "none"
            : "block";

});

document.addEventListener("click", (e) => {

    if (
        !menuAcessibilidade.contains(e.target) &&
        !btnAcessibilidade.contains(e.target)
    ) {
        menuAcessibilidade.style.display = "none";
    }

});

let leitorAtivo = localStorage.getItem("leitor") === "true";

atualizarTextoLeitura();

function atualizarTextoLeitura() {

    btnLeitura.innerHTML = `
        <i class="fa-solid fa-volume-high"></i>
        Leitura por voz: ${leitorAtivo ? "ON" : "OFF"}
    `;

}

btnLeitura.addEventListener("click", () => {

    leitorAtivo = !leitorAtivo;

    localStorage.setItem("leitor", leitorAtivo);

    atualizarTextoLeitura();

});

function falar(texto) {

    speechSynthesis.cancel();

    const voz = new SpeechSynthesisUtterance(texto);

    voz.lang = "pt-BR";
    voz.rate = 1;
    voz.pitch = 1;

    speechSynthesis.speak(voz);

}

const elementos = document.querySelectorAll("*");

elementos.forEach((elemento) => {

    elemento.addEventListener("mouseenter", () => {

        if (!leitorAtivo) return;

        const texto =
            elemento.innerText ||
            elemento.placeholder ||
            elemento.alt ||
            elemento.title ||
            elemento.value;

        if (texto && texto.trim() !== "") {

            falar(texto);

        }

    });

});

let escala = Number(localStorage.getItem("escala")) || 1;

aplicarEscala();

btnAumentar.addEventListener("click", () => {

    if (escala < 1.5) {

        escala += 0.1;

        aplicarEscala();

    }

});

btnDiminuir.addEventListener("click", () => {

    if (escala > 0.8) {

        escala -= 0.1;

        aplicarEscala();

    }

});

function aplicarEscala() {

    document.body.style.zoom = escala;

    localStorage.setItem("escala", escala);

}

let saturacao = Number(localStorage.getItem("saturacao")) || 100;

aplicarSaturacao();

btnSaturacao.addEventListener("click", () => {

    saturacao += 25;

    if (saturacao > 200) {

        saturacao = 50;

    }

    aplicarSaturacao();

});

function aplicarSaturacao() {

    document.body.style.filter = `saturate(${saturacao}%)`;

    localStorage.setItem("saturacao", saturacao);

}