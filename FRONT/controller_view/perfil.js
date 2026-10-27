const usuario = JSON.parse(
    localStorage.getItem("usuario") ||
    sessionStorage.getItem("usuario")
);

const token =
    localStorage.getItem("token") ||
    sessionStorage.getItem("token");

console.log("USUÁRIO:", usuario);
console.log("TOKEN:", token);

if (!token) {

    window.location.href = "loginEscuro.html";

}

fetch("http://localhost:3000/usuarios/perfil", {

    method: "GET",

    headers: {

        "Authorization": `Bearer ${token}`

    }

})

    .then(async resposta => {

        console.log("STATUS:", resposta.status);
        console.log("URL:", resposta.url);

        const texto = await resposta.text();

        console.log("RESPOSTA DO SERVIDOR:", texto);

        if (!resposta.ok) {
            throw new Error("Erro ao carregar perfil");
        }

        return JSON.parse(texto);

    })

    .then(usuario => {

        console.log("USUÁRIO RECEBIDO DO BACKEND:", usuario);

        document.querySelector("#nomeUsuario").textContent = usuario.nome;

        document.querySelector("#emailUsuario").textContent = usuario.email;


        // Inicial do nome

        document.querySelector("#inicialUsuario").textContent =
            usuario.nome.charAt(0).toUpperCase();


        // Dados da conta

        document.querySelector("#nomeConta").textContent = usuario.nome;

        document.querySelector("#emailConta").textContent = usuario.email;


        // Avatar da conta

        document.querySelector("#avatarConta").textContent =
            usuario.nome.charAt(0).toUpperCase();


        // Informações

        document.querySelector("#nomeInformacao").textContent = usuario.nome;

        document.querySelector("#emailInformacao").textContent = usuario.email;


        // Caso esses campos existam no banco

        document.querySelector("#telefoneInformacao").textContent =
            usuario.telefone || "Não informado";

        document.querySelector("#membroDesde").textContent =
            usuario.data_cadastro || "Não informado";

    })

    .catch(erro => {

        console.error(erro);

    });