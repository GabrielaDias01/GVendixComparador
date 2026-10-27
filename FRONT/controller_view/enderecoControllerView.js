/* ==========================================
   CONFIGURAÇÕES E ELEMENTOS
========================================== */

const URL_ENDERECOS = "http://localhost:3000/enderecos";

const listaEnderecos = document.getElementById("listaEnderecos");
const formEnderecoController = document.getElementById("formEndereco");
const botaoSalvarEndereco = document.getElementById("salvarEndereco");

/* CAMPOS DO FORMULÁRIO */

const campoApelido = document.getElementById("apelido");
const campoCep = document.getElementById("cep");
const campoCidade = document.getElementById("cidade");
const campoBairro = document.getElementById("bairro");
const campoRua = document.getElementById("rua");
const campoNumero = document.getElementById("numero");
const campoComplemento = document.getElementById("complemento");
const campoPrincipal = document.getElementById("principal");


/* ==========================================
   OBTER TOKEN DE AUTENTICAÇÃO
========================================== */

function obterTokenEndereco() {
    return (
        localStorage.getItem("token") ||
        sessionStorage.getItem("token")
    );
}


/* ==========================================
   CARREGAR ENDEREÇOS DO USUÁRIO
========================================== */

async function carregarEnderecos() {
    if (!listaEnderecos) {
        return;
    }

    const token = obterTokenEndereco();

    if (!token) {
        console.error("Token não encontrado. Faça login novamente.");
        return;
    }

    try {
        const resposta = await fetch(URL_ENDERECOS, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        const dados = await resposta.json();

        if (!resposta.ok) {
            throw new Error(
                dados.erro || "Não foi possível carregar os endereços."
            );
        }

        listaEnderecos
            .querySelectorAll(".cardEndereco")
            .forEach(card => card.remove());

        if (!Array.isArray(dados) || dados.length === 0) {
            return;
        }

        dados.forEach(endereco => {
            const card = criarCardEndereco(endereco);
            const botaoAdicionar = listaEnderecos.querySelector(
                "#adicionarNovoEndereco"
            );

            listaEnderecos.insertBefore(card, botaoAdicionar);
        });

    } catch (erro) {
        console.error("Erro ao carregar endereços:", erro);
    }
}


/* ==========================================
   CRIAR CARD DE ENDEREÇO
========================================== */



function criarCardEndereco(endereco) {
    const card = document.createElement("article");
    card.classList.add("cardEndereco");
    card.dataset.id = endereco.id;

    // Destaca o card se for o endereço principal
    if (endereco.principal) {
        card.classList.add("principal");
    }

    // Ícone do endereço
    const icone = document.createElement("div");
    icone.classList.add("iconeEndereco");

    const imagemIcone = document.createElement("i");
    imagemIcone.classList.add(
        "fa-solid",
        endereco.principal ? "fa-house" : "fa-location-dot"
    );

    icone.appendChild(imagemIcone);

    // Informações do endereço
    const informacoes = document.createElement("div");
    informacoes.classList.add("informacoesEndereco");

    // Título e etiqueta
    const titulo = document.createElement("div");
    titulo.classList.add("tituloEndereco");

    const nomeEndereco = document.createElement("h2");
    nomeEndereco.textContent = endereco.apelido;

    titulo.appendChild(nomeEndereco);

    if (endereco.principal) {
        const etiqueta = document.createElement("span");
        etiqueta.classList.add("etiquetaPrincipal");
        etiqueta.textContent = "PRINCIPAL";
        titulo.appendChild(etiqueta);
    }

    // Rua e número
    const enderecoTexto = document.createElement("p");
    enderecoTexto.textContent =
        `${endereco.rua}, ${endereco.numero}`;

    // Bairro, cidade e CEP
    const cidade = document.createElement("span");
    cidade.classList.add("cidadeEndereco");
    cidade.textContent =
        `${endereco.bairro}, ${endereco.cidade} - CEP: ${endereco.cep}`;

    informacoes.appendChild(titulo);
    informacoes.appendChild(enderecoTexto);
    informacoes.appendChild(cidade);

    // Complemento, quando preenchido
    if (endereco.complemento) {
        const complemento = document.createElement("span");
        complemento.classList.add("cidadeEndereco");
        complemento.textContent =
            `Complemento: ${endereco.complemento}`;

        informacoes.appendChild(complemento);
    }

    // Botão excluir
    const botaoExcluir = document.createElement("button");
    botaoExcluir.type = "button";
    botaoExcluir.classList.add("botaoExcluir");
    botaoExcluir.setAttribute(
        "aria-label",
        `Excluir endereço ${endereco.apelido}`
    );
    botaoExcluir.title = "Excluir endereço";

    const iconeExcluir = document.createElement("i");
    iconeExcluir.classList.add("fa-solid", "fa-trash");

    botaoExcluir.appendChild(iconeExcluir);

    botaoExcluir.addEventListener("click", () => {
        excluirEndereco(endereco.id);
    });

    // Monta o card
    card.appendChild(icone);
    card.appendChild(informacoes);
    card.appendChild(botaoExcluir);

    return card;
}




/* ==========================================
   CADASTRAR ENDEREÇO
========================================== */

if (formEnderecoController) {
    formEnderecoController.addEventListener("submit", async function (evento) {
        evento.preventDefault();

        const token = obterTokenEndereco();

        if (!token) {
            alert("Sua sessão expirou. Faça login novamente.");
            return;
        }

        const novoEndereco = {
            apelido: campoApelido?.value.trim(),
            cep: campoCep?.value.replace(/\D/g, ""),
            cidade: campoCidade?.value.trim(),
            bairro: campoBairro?.value.trim(),
            rua: campoRua?.value.trim(),
            numero: campoNumero?.value.trim(),
            complemento: campoComplemento?.value.trim() || null,
            principal: campoPrincipal?.checked || false
        };

        if (
            !novoEndereco.apelido ||
            !novoEndereco.cep ||
            !novoEndereco.cidade ||
            !novoEndereco.bairro ||
            !novoEndereco.rua ||
            !novoEndereco.numero
        ) {
            alert("Preencha todos os campos obrigatórios.");
            return;
        }

        try {
            if (botaoSalvarEndereco) {
                botaoSalvarEndereco.disabled = true;
            }

            const resposta = await fetch(URL_ENDERECOS, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(novoEndereco)
            });

            const dados = await resposta.json();

            if (!resposta.ok) {
                throw new Error(
                    dados.erro || "Não foi possível salvar o endereço."
                );
            }

            await carregarEnderecos();

            formEnderecoController.reset();

            document.dispatchEvent(new Event("enderecoSalvo"));

        } catch (erro) {
            console.error("Erro ao salvar endereço:", erro);
            alert(erro.message || "Erro ao salvar o endereço.");
        } finally {
            if (botaoSalvarEndereco) {
                botaoSalvarEndereco.disabled = false;
            }
        }
    });
}


/* ==========================================
   EXCLUIR ENDEREÇO
========================================== */

async function excluirEndereco(id) {
    const confirmar = confirm(
        "Deseja realmente excluir este endereço?"
    );

    if (!confirmar) {
        return;
    }

    const token = obterTokenEndereco();

    if (!token) {
        alert("Sua sessão expirou. Faça login novamente.");
        return;
    }

    try {
        const resposta = await fetch(`${URL_ENDERECOS}/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        const dados = await resposta.json();

        if (!resposta.ok) {
            throw new Error(
                dados.erro || "Não foi possível excluir o endereço."
            );
        }

        await carregarEnderecos();

    } catch (erro) {
        console.error("Erro ao excluir endereço:", erro);
        alert(erro.message || "Erro ao excluir o endereço.");
    }
}


/* ==========================================
   CARREGAR ENDEREÇOS AO ABRIR A PÁGINA
========================================== */

document.addEventListener("DOMContentLoaded", carregarEnderecos);