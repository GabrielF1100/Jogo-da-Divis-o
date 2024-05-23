const iniciarJogoButton = document.getElementById('iniciar-jogo');
const modal = document.getElementById('modal');
const pontuacaoDisplay = document.getElementById('pontuacao');
const container = document.getElementById('container');
const modalcontainer = document.getElementById('modal-container');
const divisorDisplay = document.getElementById('divisor');
const resposta = document.getElementById('resposta');
const modalresposta = document.getElementById('modal-resposta');
const contDDisplay= document.getElementById('contD');
const contUDisplay= document.getElementById('contU');
const zerar= document.getElementById('zerar');
const zerarmodal= document.getElementById('modal-zerar');

let contDtotal = 0;
let contUtotal = 0;

let contD = Array(9).fill(0);
let contU = Array(9).fill(0);

// Definição dos elementos NumberD e NumberU
const NumberD = [];
const NumberU = [];

for (let i = 0; i <9; i++) {
    NumberD.push(document.querySelector(`.NumberD${i}`));
    NumberU.push(document.querySelector(`.NumberU${i}`));
}

let pontuacao = 0;

for (let i = 0; i < 9; i++) {

    NumberD[i].addEventListener('click', () => {
        if (contD[i] === 0) { // Verifica se é o primeiro clique
            contD[i] = 1;
            contDtotal++; 
            contDDisplay.textContent = `Dezenas: ${contDtotal}`; // Atualiza a exibição
        }
    });

    NumberU[i].addEventListener('click', () => {
        if (contU[i] === 0) { // Verifica se é o primeiro clique
            contU[i] = 1;
            contUtotal++; 
            contUDisplay.textContent = `Unidades: ${contUtotal}`; // Atualiza a exibição
        }
    });
}

// Função para atualizar a pontuação
function atualizarPontuacao() {
    pontuacao++;
    pontuacaoDisplay.textContent = `Pontuação: ${pontuacao}`;
};

function atualizarPontuacaoP() {
    pontuacao=pontuacao-2;
    pontuacaoDisplay.textContent = `Pontuação: ${pontuacao}`;
};

function atualizarNumero() {
    let numerador = Math.floor(Math.random() * 100);
    let denominador = Math.floor(Math.random() * 10);
    if(denominador==0){
    let denominador = Math.floor(Math.random() * 10);
    return { numerador, denominador};
    }

    else{
    return { numerador, denominador};
    }
};

// Função para gerar números aleatórios e calcular resultado
function fazerConta(numerador, denominador) {
    let resultado = Math.floor(numerador/denominador);
    let resultadoD = Math.floor(resultado/10);
    let resultadoU = resultado%10;
    return { resultadoD, resultadoU }; // Retorna os resultados como um objeto
}

// Função para zerar as contagens de cliques
function zerarClick() {
    contD.fill(0);
    contU.fill(0);
    contDtotal = 0;
    contUtotal = 0;
    contDDisplay.textContent = `Dezenas: ${contDtotal}`; // Atualiza a exibição
    contUDisplay.textContent = `Unidades: ${contUtotal}`; // Atualiza a exibição
}

// Função para mostrar mensagem de erro
function mostrarErro() {
    alert("Você errou o resultado, tente novamente");
}

zerar.addEventListener('click', () => {
    zerarClick();
});

iniciarJogoButton.addEventListener('click', () => {
    modal.style.display = 'none';
    modalcontainer.style.display = 'flex';
    modalresposta.style.display = 'flex';
    zerarmodal.style.display='flex';

    console.log('Botão "Iniciar Jogo" clicado');
    let { numerador, denominador} = atualizarNumero();
    divisorDisplay.textContent = `Conta: ${numerador}/${denominador}`;
    zerarClick();

    resposta.addEventListener('click', () => {
        let { resultadoD, resultadoU } = fazerConta(numerador, denominador);
        console.log(contDtotal, contUtotal);
        console.log(resultadoD, resultadoU);
        if (contDtotal === resultadoD && contUtotal === resultadoU) {
            ({ numerador, denominador } = atualizarNumero()); // Atualizando os valores de numerador e denominador
            ({ resultadoD, resultadoU } = fazerConta(numerador, denominador)); // Calcular novos resultados com os novos valores de numerador e denominador
            divisorDisplay.textContent = `Conta: ${numerador}/${denominador}`;
            atualizarPontuacao();
            zerarClick();

        } else {
            mostrarErro();
            atualizarPontuacaoP();
             zerarClick();

        }
    });

});