/* ==========================================
   ELEMENTOS DO PERFIL
========================================== */

const btnPerfil = document.getElementById("btnPerfil");
const perfil = document.getElementById("perfil");
const overlayPerfil = document.getElementById("overlayPerfil");
const fecharPerfil = document.getElementById("fecharPerfil");

/* ==========================================
   DADOS DA CONTA
========================================== */

const abrirDadosConta = document.getElementById("abrirDadosConta");
const dadosConta = document.getElementById("dadosConta");
const voltarPerfil = document.getElementById("voltarPerfil");
const fecharDadosConta = document.getElementById("fecharDadosConta");

/* ==========================================
   PAINEL DE ENDEREÇOS
========================================== */

const botaoAbrirPainelEnderecos = document.getElementById("abrirEnderecos");
const painelEnderecos = document.getElementById("painel-enderecos");
const voltarEnderecos = document.getElementById("voltarEnderecos");
const fecharEnderecos = document.getElementById("fecharEnderecos");

/* ==========================================
   FORMULÁRIO DE ENDEREÇO
========================================== */

const botaoFormEndereco = document.getElementById("adicionarNovoEndereco");
const formularioEndereco = document.getElementById("formularioEndereco");
const formEndereco = document.getElementById("formEndereco");
const botaoCancelarEndereco = document.getElementById("cancelarEndereco");

/* ==========================================
   FECHAR FORMULÁRIO DE ENDEREÇO
========================================== */

function fecharFormularioEndereco(limparFormulario = false) {
    formularioEndereco?.classList.remove("ativo");

    botaoFormEndereco?.classList.remove("ativo");
    botaoFormEndereco?.setAttribute("aria-expanded", "false");

    if (limparFormulario) {
        formEndereco?.reset();
    }
}

/* ==========================================
   FECHAR TODOS OS PAINÉIS DO PERFIL
========================================== */

function fecharTudoPerfil() {
    fecharFormularioEndereco(true);

    perfil?.classList.remove("ativo");
    dadosConta?.classList.remove("ativo");
    painelEnderecos?.classList.remove("ativo");
    overlayPerfil?.classList.remove("ativo");
}

/* ==========================================
   ABRIR PERFIL
========================================== */

btnPerfil?.addEventListener("click", function (e) {
    e.preventDefault();

    perfil?.classList.add("ativo");
    overlayPerfil?.classList.add("ativo");
});

/* ==========================================
   CLIQUE FORA DOS PAINÉIS
========================================== */

document.addEventListener("click", function (e) {
    if (!overlayPerfil?.classList.contains("ativo")) {
        return;
    }

    const clicouNoPerfil = perfil?.contains(e.target);
    const clicouNosDados = dadosConta?.contains(e.target);
    const clicouNosEnderecos = painelEnderecos?.contains(e.target);
    const clicouNoBotaoPerfil = btnPerfil?.contains(e.target);

    if (
        !clicouNoPerfil &&
        !clicouNosDados &&
        !clicouNosEnderecos &&
        !clicouNoBotaoPerfil
    ) {
        fecharTudoPerfil();
    }
});

/* ==========================================
   FECHAR PELO OVERLAY
========================================== */

overlayPerfil?.addEventListener("click", fecharTudoPerfil);

/* ==========================================
   FECHAR COM ESC
========================================== */

document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
        if (formularioEndereco?.classList.contains("ativo")) {
            fecharFormularioEndereco(true);
        } else {
            fecharTudoPerfil();
        }
    }
});

/* ==========================================
   FECHAR PERFIL
========================================== */

fecharPerfil?.addEventListener("click", fecharTudoPerfil);

/* ==========================================
   ABRIR DADOS DA CONTA
========================================== */

abrirDadosConta?.addEventListener("click", function (e) {
    e.preventDefault();

    perfil?.classList.remove("ativo");
    dadosConta?.classList.add("ativo");
});

/* ==========================================
   VOLTAR DOS DADOS PARA O PERFIL
========================================== */

voltarPerfil?.addEventListener("click", function (e) {
    e.preventDefault();

    dadosConta?.classList.remove("ativo");
    perfil?.classList.add("ativo");
});

/* ==========================================
   FECHAR DADOS DA CONTA
========================================== */

fecharDadosConta?.addEventListener("click", fecharTudoPerfil);

/* ==========================================
   ABRIR PAINEL DE ENDEREÇOS
========================================== */

botaoAbrirPainelEnderecos?.addEventListener("click", function (e) {
    e.preventDefault();

    perfil?.classList.remove("ativo");
    dadosConta?.classList.remove("ativo");

    painelEnderecos?.classList.add("ativo");
    overlayPerfil?.classList.add("ativo");

    fecharFormularioEndereco(true);
});

/* ==========================================
   VOLTAR DOS ENDEREÇOS PARA O PERFIL
========================================== */

voltarEnderecos?.addEventListener("click", function (e) {
    e.preventDefault();

    fecharFormularioEndereco(true);

    painelEnderecos?.classList.remove("ativo");
    perfil?.classList.add("ativo");
});

/* ==========================================
   FECHAR PAINEL DE ENDEREÇOS
========================================== */

fecharEnderecos?.addEventListener("click", fecharTudoPerfil);

/* ==========================================
   ABRIR E FECHAR FORMULÁRIO DE ENDEREÇO
========================================== */

botaoFormEndereco?.addEventListener("click", function (e) {
    e.preventDefault();

    const formularioAberto =
        formularioEndereco?.classList.contains("ativo");

    if (formularioAberto) {
        fecharFormularioEndereco(true);
        return;
    }

    formularioEndereco?.classList.add("ativo");

    botaoFormEndereco?.classList.add("ativo");
    botaoFormEndereco?.setAttribute("aria-expanded", "true");

    requestAnimationFrame(() => {
        formularioEndereco?.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    });
});

/* ==========================================
   CANCELAR FORMULÁRIO DE ENDEREÇO
========================================== */

botaoCancelarEndereco?.addEventListener("click", function () {
    fecharFormularioEndereco(true);
});

/* ==========================================
   FECHAR FORMULÁRIO AO CLICAR FORA DELE
========================================== */

document.addEventListener("click", function (e) {
    if (!formularioEndereco?.classList.contains("ativo")) {
        return;
    }

    const clicouNoFormulario = formularioEndereco.contains(e.target);
    const clicouNoBotaoAdicionar = botaoFormEndereco?.contains(e.target);

    if (!clicouNoFormulario && !clicouNoBotaoAdicionar) {
        fecharFormularioEndereco(true);
    }
});


/* ==========================================
   APÓS SALVAR ENDEREÇO NO BACKEND
========================================== */

document.addEventListener("enderecoSalvo", function () {
    fecharFormularioEndereco(true);
});
