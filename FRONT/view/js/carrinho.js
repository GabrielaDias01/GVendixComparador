const btnCarrinho = document.getElementById("btnCarrinho");
const carrinho = document.getElementById("carrinho");
const overlayCarrinho = document.getElementById("overlayCarrinho");
const fecharCarrinho = document.getElementById("fecharCarrinho");

// Abrir

btnCarrinho.addEventListener("click", function (e) {
    e.preventDefault();

    carrinho.classList.add("ativo");
    overlayCarrinho.classList.add("ativo");
});

// Fechar função

function fecharPainelCarrinho() {
    carrinho.classList.remove("ativo");
    overlayCarrinho.classList.remove("ativo");
}

// Botão X

fecharCarrinho.addEventListener("click", fecharPainelCarrinho);

// Overlay

overlayCarrinho.addEventListener("click", fecharPainelCarrinho);

// ESC

document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
        fecharPainelCarrinho();
    }
});

// Clique fora

document.addEventListener("click", function (e) {

    if (
        carrinho.classList.contains("ativo") &&
        !carrinho.contains(e.target) &&
        !btnCarrinho.contains(e.target)
    ) {
        fecharPainelCarrinho();
    }

});
