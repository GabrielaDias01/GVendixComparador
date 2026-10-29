
/* ==========================================
   CONFIGURAÇÕES E ELEMENTOS
========================================== */

const URL_ENDERECOS = "http://localhost:3000/enderecos";

const listaEnderecos = document.getElementById("listaEnderecos");
const formEnderecoController = document.getElementById("formEndereco");
const botaoSalvarEndereco = document.getElementById("salvarEndereco");
const totalEnderecos = document.getElementById("totalEnderecos");

/* CAMPOS DO FORMULÁRIO */

const campoApelido = document.getElementById("apelido");
const campoCep = document.getElementById("cep");
const campoCidade = document.getElementById("cidade");
const campoBairro = document.getElementById("bairro");
const campoRua = document.getElementById("rua");
const campoNumero = document.getElementById("numero");
const campoComplemento = document.getElementById("complemento");


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
   MÁSCARA DE CEP
========================================== */

if (campoCep) {
    campoCep.addEventListener("input", function () {
        let cep = this.value.replace(/\D/g, "").slice(0, 8);

        if (cep.length > 5) {
            cep = cep.replace(/^(\d{5})(\d)/, "$1-$2");
        }

        this.value = cep;
    });
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

        if (!Array.isArray(dados)) {
            throw new Error(
                "A resposta da API não contém uma lista válida de endereços."
            );
        }

        listaEnderecos
            .querySelectorAll(".cardEndereco")
            .forEach(card => card.remove());

        if (totalEnderecos) {
            totalEnderecos.textContent = dados.length;
        }

        dados.forEach(endereco => {
            const card = criarCardEndereco(endereco);

            const botaoAdicionar = listaEnderecos.querySelector(
                "#adicionarNovoEndereco"
            );

            if (botaoAdicionar) {
                listaEnderecos.insertBefore(card, botaoAdicionar);
            } else {
                listaEnderecos.appendChild(card);
            }
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

    // Verifica se o endereço é o principal.
    const ehPrincipal =
        endereco.principal === true ||
        endereco.principal === 1 ||
        endereco.principal === "1";

    // Destaca o card se for o endereço principal.
    if (ehPrincipal) {
        card.classList.add("principal");
    }

    /* ÍCONE DO ENDEREÇO */

    const icone = document.createElement("div");
    icone.classList.add("iconeEndereco");

    const imagemIcone = document.createElement("i");
    imagemIcone.classList.add(
        "fa-solid",
        ehPrincipal ? "fa-house" : "fa-location-dot"
    );

    icone.appendChild(imagemIcone);


    /* INFORMAÇÕES DO ENDEREÇO */

    const informacoes = document.createElement("div");
    informacoes.classList.add("informacoesEndereco");


    /* TÍTULO E ETIQUETA */

    const titulo = document.createElement("div");
    titulo.classList.add("tituloEndereco");

    const nomeEndereco = document.createElement("h2");
    nomeEndereco.textContent = endereco.apelido;

    titulo.appendChild(nomeEndereco);

    if (ehPrincipal) {
        const etiqueta = document.createElement("span");
        etiqueta.classList.add("etiquetaPrincipal");
        etiqueta.textContent = "PRINCIPAL";

        titulo.appendChild(etiqueta);
    }


    /* RUA E NÚMERO */

    const enderecoTexto = document.createElement("p");
    enderecoTexto.textContent =
        `${endereco.rua}, ${endereco.numero}`;


    /* BAIRRO, CIDADE E CEP */

    const cidade = document.createElement("span");
    cidade.classList.add("cidadeEndereco");

    const cepFormatado = String(endereco.cep || "")
        .replace(/\D/g, "")
        .replace(/^(\d{5})(\d{3})$/, "$1-$2");

    cidade.textContent =
        `${endereco.bairro}, ${endereco.cidade} - CEP: ${cepFormatado}`;


    /* ADICIONAR INFORMAÇÕES AO CARD */

    informacoes.appendChild(titulo);
    informacoes.appendChild(enderecoTexto);
    informacoes.appendChild(cidade);


    /* COMPLEMENTO, QUANDO PREENCHIDO */

    if (endereco.complemento) {
        const complemento = document.createElement("span");
        complemento.classList.add("cidadeEndereco");
        complemento.textContent =
            `Complemento: ${endereco.complemento}`;

        informacoes.appendChild(complemento);
    }


    /* ==========================================
       BOTÃO PARA DEFINIR ENDEREÇO PRINCIPAL
    ========================================== */

    const botaoPrincipal = document.createElement("button");

    botaoPrincipal.type = "button";
    botaoPrincipal.classList.add("botaoPrincipal");

    if (ehPrincipal) {
        botaoPrincipal.textContent = "Endereço principal";
        botaoPrincipal.disabled = true;

        botaoPrincipal.setAttribute(
            "aria-label",
            "Este já é o endereço principal"
        );

        botaoPrincipal.title = "Este endereço já é o principal";

    } else {
        botaoPrincipal.textContent = "Definir como principal";

        botaoPrincipal.setAttribute(
            "aria-label",
            `Definir ${endereco.apelido} como endereço principal`
        );

        botaoPrincipal.title = "Definir como endereço principal";

        botaoPrincipal.addEventListener("click", () => {
            definirEnderecoPrincipal(endereco.id);
        });
    }


    /* ==========================================
       BOTÃO EXCLUIR
    ========================================== */

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


    /* ==========================================
       CONTÊINER DOS BOTÕES
       PRINCIPAL E EXCLUIR LADO A LADO
    ========================================== */

    const botoesEndereco = document.createElement("div");
    botoesEndereco.classList.add("botoesEndereco");

    botoesEndereco.appendChild(botaoPrincipal);
    botoesEndereco.appendChild(botaoExcluir);


    /* ==========================================
       MONTAR O CARD
    ========================================== */

    card.appendChild(icone);
    card.appendChild(informacoes);
    card.appendChild(botoesEndereco);

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
            principal: false
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

        // Valida o CEP antes de enviar para a API.
        if (novoEndereco.cep.length !== 8) {
            alert("Informe um CEP válido com 8 números.");
            campoCep?.focus();
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

            // Atualiza a lista após salvar.
            await carregarEnderecos();

            // Limpa os campos do formulário.
            formEnderecoController.reset();

            // Avisa os outros scripts de que um endereço foi salvo.
            document.dispatchEvent(new Event("enderecoSalvo"));

        } catch (erro) {
            console.error("Erro ao salvar endereço:", erro);

            alert(
                erro.message || "Erro ao salvar o endereço."
            );

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

        alert(
            erro.message || "Erro ao excluir o endereço."
        );
    }
}


/* ==========================================
   DEFINIR ENDEREÇO PRINCIPAL
========================================== */

async function definirEnderecoPrincipal(id) {
    const token = obterTokenEndereco();

    if (!token) {
        alert("Sua sessão expirou. Faça login novamente.");
        return;
    }

    try {
        const resposta = await fetch(
            `${URL_ENDERECOS}/${id}/principal`,
            {
                method: "PATCH",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }
        );

        // Trata respostas que não sejam JSON, como páginas HTML de erro.
        const tipoConteudo = resposta.headers.get("content-type") || "";

        const dados = tipoConteudo.includes("application/json")
            ? await resposta.json()
            : {};

        if (!resposta.ok) {
            throw new Error(
                dados.erro ||
                `Erro ${resposta.status}: não foi possível definir o endereço principal.`
            );
        }

        // Atualiza os cards com os dados do banco.
        await carregarEnderecos();

    } catch (erro) {
        console.error(
            "Erro ao definir endereço principal:",
            erro
        );

        alert(
            erro.message ||
            "Ocorreu um erro ao definir o endereço principal."
        );
    }
}


/* ==========================================
   CARREGAR ENDEREÇOS AO ABRIR A PÁGINA
========================================== */

document.addEventListener("DOMContentLoaded", carregarEnderecos);
