const btnAtualizar = document.querySelector(".botaoContaEditarDados");
const btnSalvar = document.querySelector("#btnSalvarAlteracao");
const btnCancelar = document.querySelector("#btnCancelarAlteracao");


btnAtualizar.addEventListener("click", function (event) {
    event.preventDefault();
});

btnSalvar.addEventListener("click", function (event) {
    event.preventDefault();
});

btnCancelar.addEventListener("click", function (event) {
    event.preventDefault();
});

btnAtualizar.abrirEditarPerfil = function (usuario) {

    document.querySelector("#idUsuario").value = usuario.id;
    document.querySelector("#txtNomeAlterar").value = usuario.nome;
    document.querySelector('#txtTelefoneAlterar').value = usuario.telefone;
    document.querySelector("#txtEmailAlterar").value = usuario.email;

    abrirAlterarDados.style.display = "flex";

}

btnSalvar.addEventListener("click", function () {

    console.log(document.querySelector("#idUsuario").value);
    const nome = document.querySelector("#txtNomeAlterar").value;
    const telefone = document.querySelector('#txtTelefoneAlterar').value;
    const email = document.querySelector("#txtEmailAlterar").value;
    const senha = document.querySelector("#txtSenhaAlterar").value;
    const confirmarSenha = document.querySelector("#txtConfirmarSenhaAlterar").value;

    if (senha !== confirmarSenha) {

        alert("As senhas não conferem!");
        return;

    }

    const usuario = {
        nome,
        telefone,
        email,
        senha
    };

    fetch(`http://localhost:3000/usuarios/${id}`, {

        method: "PUT",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(usuario)

    })
        .then(() => {

            alert("Usuário atualizado com sucesso!");

            abrirAlterarDados.style.display = "none";

            listarUsuarios();

        })
        .catch(erro => {

            console.error(erro);

            alert("Erro ao atualizar usuário");

        });

});