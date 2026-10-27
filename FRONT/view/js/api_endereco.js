
/* ==========================================
   ELEMENTOS DO FORMULÁRIO DE ENDEREÇO
========================================== */

const cep_input = document.getElementById("cep");
const cidade_input = document.getElementById("cidade");
const bairro_input = document.getElementById("bairro");
const rua_input = document.getElementById("rua");


/* ==========================================
   CONSULTAR CEP NO VIACEP
========================================== */

async function buscarEndereco(cep) {
    const cepLimpo = cep.replace(/\D/g, "");

    if (cepLimpo.length !== 8) {
        return;
    }

    try {
        const response = await fetch(
            `https://viacep.com.br/ws/${cepLimpo}/json/`
        );

        if (!response.ok) {
            throw new Error("Erro ao consultar o CEP.");
        }

        const data = await response.json();

        if (data.erro) {
            cidade_input.value = "";
            bairro_input.value = "";
            rua_input.value = "";

            alert("CEP não encontrado.");
            return;
        }

        cidade_input.value = data.localidade || "";
        bairro_input.value = data.bairro || "";
        rua_input.value = data.logradouro || "";

    } catch (erro) {
        console.error("Erro ao buscar endereço:", erro);

        alert("Não foi possível consultar o CEP. Tente novamente.");
    }
}


/* ==========================================
   PREENCHER ENDEREÇO AUTOMATICAMENTE
========================================== */

if (cep_input) {
    cep_input.addEventListener("input", () => {
        const cep = cep_input.value.replace(/\D/g, "");

        if (cep.length === 8) {
            buscarEndereco(cep);
        } else {
            cidade_input.value = "";
            bairro_input.value = "";
            rua_input.value = "";
        }
    });
}
