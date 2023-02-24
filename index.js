//-------------------------------------------
// -- PEGAR ALTURA E LARGURA / FUNÇÃO --

// variavel em escopo global para capturar a altura e a largura da tela
let altura = 0;
let largura = 0;
let vidas = 1;
let tempo =20;
//--------------------------------------------------
//alterar o setInterval do html com a variavel criaNivel
let criaNivel = 2000;
let nivel = document.location.search; //procurar
nivel = nivel.replace('?','');

if(nivel === 'facil'){
    //2000
    criaNivel = 2000
}else if(nivel === 'normal'){
    //1500
    criaNivel = 1500
}else if(nivel === 'dificil'){
    //1000
    criaNivel = 1000
}



// encapsula a logica que capitura a altura e a largura em uma função
function ajustaTamanhoPalcoJogo(){
    altura = window.innerHeight;
    largura = window.innerWidth;
}   
ajustaTamanhoPalcoJogo();
// chamar a função / e aplicara função no <body onresize="função">

//  CRONOMETRO / setInterval/ span id/ recupera o tempo decrementa/DOM e atribui tempo
let cronometro = setInterval(function(){
//fluxo de vitoria / html
    tempo -= 1;

    //testar o decremento pra saber se é menor que zero para não ficar -
    if(tempo < 0){
        //21) limpar o setInterval 
        clearInterval(cronometro);
        clearInterval( criarPeixe);
        window.location.href = "vitoria.html";
    }else{
        document.getElementById('cronometro') . innerHTML = tempo;
    }
    
    
} , 1000);




//-------------------------------------------------
// -- POSIÇÕES RANDÔMICAS = DINAMICA E ALEATORIA --

function posicaoRandomica(){
//fluxo de derrota

    // remover um elemento criado de forma dinamica pelo id    
    if(document.getElementById('peixe')){
        document.getElementById('peixe').remove();

        //17)acessar a img / alterar scr pelo id 
        if(vidas > 5){
            // 18)forçar o redirecionamento pelo navegador criar uma nova pagina / antes era o alert
            window.location.href = "derrota.html"; 
        }
        else{
            document.getElementById('v' + vidas) .src="img/anzol-preto.png"
            vidas++;
        }
        
    }
    
    //função math.random() para posições randômicas
    //multiplicar pelo tamanho já capiturado da tela com a função / encapisular em math.floor= para arredondar para baixo / decremente 
    let posicaoX = Math.floor(Math.random() * largura)-90; 
    let posicaoY = Math.floor(Math.random() * altura)-90;

    // para evitar que o elemento passe da tela aplicar um controle(operador ternario)
    posicaoX = posicaoX < 0 ? 0 : posicaoX;
    posicaoY = posicaoY < 0 ? 0 : posicaoY

    console.log(posicaoX,posicaoY);

    //-----------------------------------------------------
    // CRIAR  ELEMENTOS HTML ATRAVES DO DOM = ATRAVES DE SUA API (OBJECT DOCUMENT)

    // criar elementos no html / coloca em uma variavel / chama e coloca o valor / aplica o classNane
    let peixe = document.createElement('img'); 
    peixe.src = 'img/peixe.png';
    peixe.className = tamanhoAleatorio() +' '+ ladoAleatorio(); 

    // atribuir ao elemento criado um style.left recebendo a posiçãoX
    peixe.style.left = posicaoX + 'px';
    peixe.style.top = posicaoY + 'px';

    
    // para as cordenadas serem aplicadas os elementos devem ser absoluto
    peixe.style.position = 'absolute';

    // id unico para que não seja criado um elemento atras do outro
    peixe.id = 'peixe';

    //atribuir o evento de click no peixe / this. = trata-se do proprio
    peixe.onclick = function(){
        this.remove()
    }


    // adciona um filho no bady / coloca a variavel no parametro
    document.body.appendChild(peixe); 

   
}
// envolver tudo em uma função randomica / e chamar apos a renderização do body

//-----------------------------------------------------------
//  -- TAMANHO ALEATÓRIO DO ELEMENTO COM Math.random

// função para tamanho aleatorio / chamar dentro da função posição
function tamanhoAleatorio(){
    let classe = Math.floor(Math.random()*3);

    switch(classe){
        case 0:
            return 'peixe01'
        case 1:
            return 'peixe02'
        case 2:
            return 'peixe03'        
    }
}

// função para lado aleatorio / chamar a função dentro da função randomica
function ladoAleatorio(){
    let classe = Math.floor(Math.random()*2);
    switch(classe){
        case 0:
            return 'ladoA';
        case 1:
            return 'ladoB';
    }
}


