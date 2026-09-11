const btnExcluir = document.querySelector("botaoContaExcluir");

btnExcluir.addEventListener("click", function(event) {
    event.preventDefault();

    var elementoClicado = event.target;

     if (elementoClicado.classList.contains("botaoContaExcluir")) {

        fetch(`http://localhost:3000/usuarios/${idUsuario}`, {
            method: "DELETE"
        })
        .then(response => response.json())
        .then(dados => {

            console.log(dados);

            listarUsuarios();
        })
        .catch(erro => {
            console.log(erro);
        });
    }
})
