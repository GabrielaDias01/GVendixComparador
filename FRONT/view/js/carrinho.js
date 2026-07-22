const btnCarrinho = document.getElementById("btnCarrinho");
const carrinho = document.getElementById("carrinho");
const overlayCarrinho = document.getElementById("overlayCarrinho");
const fecharCarrinho = document.getElementById("fecharCarrinho");

btnCarrinho.addEventListener("click", function (e) {
    e.preventDefault();

    carrinho.classList.add("ativo");
    overlayCarrinho.classList.add("ativo");
});


document.addEventListener("click", function (e) {

    if (
        !carrinho.contains(e.target) &&
        !btnCarrinho.contains(e.target)
    ) {
        carrinho.classList.remove("ativo");
        overlayCarrinho.classList.remove("ativo");
    }

});


overlayCarrinho.addEventListener("click", function () {

    carrinho.classList.remove("ativo");
    overlayCarrinho.classList.remove("ativo");

});


document.addEventListener("keydown", function (e) {

    if (e.key === "Escape") {

        carrinho.classList.remove("ativo");
        overlayCarrinho.classList.remove("ativo");

    }

});

fecharCarrinho.addEventListener("click", function(){

    carrinho.classList.remove("ativo");
    overlayCarrinho.classList.remove("ativo");

});