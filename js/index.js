let campoCidade = document.querySelector("#cidade");
let elementMensagem = document.querySelector("#mensagem");
let elementCidades = document.querySelector("#cidades");
let elementPrevisao = document.querySelector("#previsao");

campoCidade.addEventListener("keydown", function(evento){
    if (evento.key == "Enter"){
        buscarCidades()
    }
});

async function buscarCidades(){
    let nome = campoCidade.value

    elementMensagem.textContent = "Buscando..."

    let resposta = await fetch (`https://brasilapi.com.br/api/cptec/v1/cidade/${nome}`)
    

    let dados = await resposta.json();

    if (resposta.ok){
        for (let i = 0; i < dados.length; i++ ){
            let elementCidade = document.createElement("p");
            elementCidade.textContent = `${dados[i].nome} - ${dados[i].estado}`
            elementCidade.classList.add("cidade");
            elementCidade.addEventListener ("click", function() {buscarPrevisao (dados[i].id)});
            elementCidades.appendChild(elementCidade);
        }
        elementMensagem.textContent = ""
    } else {
        elementMensagem.textContent = dados.message;
    }
}

async function buscarPrevisao(id){

    elementPrevisao.textContent = "Buscando..."

    let resposta = await fetch (`https://brasilapi.com.br/api/cptec/v1/clima/previsao/${id}`)

    let dados = await resposta.json()

    if (resposta.ok){
        elementPrevisao.innerHTML = `
            <h2>${dados.cidade} - ${dados.estado}</h2>
            <div class="dia">
                <p>Data: ${formatarData(dados.clima[0].data)}</p>
                <p>Condição: ${dados.clima[0].condicao_desc}</p>
                <p>Temperatura Mínima: ${dados.clima[0].min} °C</p>
                <p>Temperatura Máxima: ${dados.clima[0].max} °C</p>
                <p>Indice UV: ${dados.clima[0].indice_uv}</p>
            </div>
        `;
    } else {
        elementMensagem.textContent = dados.message;
    }
}

function formatarData(data){
    let partes = data.split("-");
    return `${partes[2]}/${partes[1]}/${partes[0]}`;
}
