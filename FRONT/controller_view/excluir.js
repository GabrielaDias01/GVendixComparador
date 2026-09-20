const btnExcluir = document.querySelector(".botaoContaExcluir");

btnExcluir.addEventListener("click", function(event) {

    event.preventDefault();

    var elementoClicado = event.target;

    if (elementoClicado.classList.contains("botaoContaExcluir")) {

        const token = localStorage.getItem("token");

        fetch(`http://localhost:3000/usuarios/${usuario.id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })

        .then(response => response.json())

        .then(dados => {

            console.log(dados);

            localStorage.removeItem("token");
            localStorage.removeItem("usuario");

            window.location.href = "../html/loginEscuro.html";

        })

        .catch(erro => {

            console.log(erro);

        });

    }

});