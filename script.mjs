import { palavras } from './palavras.mjs';
import { palavrasCertas } from './palavrasCertas.mjs';

var palavraTemp = ['', '', '', '', ''],
    letraCount = 0,
    palavraCount = 0,
    next = '',
    num = Math.floor(Math.random() * 2021),
    resposta = palavrasCertas[num].split(''),
    respostaTemp = resposta,
    select = '',
    previous = '',
    body = document.getElementById('body'),
    x = 0,
    count = 0,
    w = 1,
    arrow = 0,
    botoes = [letra1_1, letra1_2, letra1_3, letra1_4, letra1_5, letra2_1, letra2_2, letra2_3, letra2_4, letra2_5, letra3_1, letra3_2, letra3_3, letra3_4, letra3_5, letra4_1, letra4_2, letra4_3, letra4_4, letra4_5, letra5_1, letra5_2, letra5_3, letra5_4, letra5_5, letra6_1, letra6_2, letra6_3, letra6_4, letra6_5],
    tela = document.querySelector('#tela'),
    seta = document.querySelector('#seta'),
    pontuacao = 0

body.addEventListener('keydown', click);
botoes.forEach((element) => element.addEventListener('click', apertar));
seta.addEventListener('click', appear)
console.log('resposta: ' + resposta);

function apertar(event) {
    if (event.target.parentElement.parentElement == tela) {
        if (Object.values(event.target.classList).includes('palavraVez')) {
            if (Object.values(event.target.classList).includes('selecionada') != true && document.querySelector('.selecionada') != null) {
                document.querySelector('.selecionada').classList.remove('selecionada');
                event.target.classList.add('selecionada');
                letraCount = parseInt(event.target.id.split('')[7]) - 1;
            } else if (document.querySelector('.selecionada') == null) {
                event.target.classList.add('selecionada');
                letraCount = parseInt(event.target.id.split('')[7]) - 1;
            }
            arrow = 1;
        }
    } else {
        if (Object.values(event.target.parentElement.classList).includes('palavraVez')) {
            if (Object.values(event.target.parentElement.classList).includes('selecionada') != true && document.querySelector('.selecionada') != null) {
                document.querySelector('.selecionada').classList.remove('selecionada');
                event.target.parentElement.classList.add('selecionada');
                letraCount = parseInt(event.target.parentElement.id.split('')[7]) - 1;
            } else if (document.querySelector('.selecionada') == null) {
                event.target.parentElement.classList.add('selecionada');
                letraCount = parseInt(event.target.parentElement.id.split('')[7]) - 1;
            }
            arrow = 1;
        }
    }
}

function click(event) {
    resposta = palavrasCertas[num].split('');
    if (event.keyCode >= 65 && event.keyCode <= 90 && letraCount < 5) {
        if (letraCount < 4) {
            x = 0;
            palavraTemp[letraCount] = event.key;
            select = event.target.children[3].children[palavraCount].children[letraCount];
            count = 0;
            palavraTemp.forEach((v) => v === '' && count++);
            if (count > 1) {
                if (event.target.children[3].children[palavraCount].children[0].innerHTML == '' && event.target.children[3].children[palavraCount].children[letraCount + 1].innerHTML != '' && letraCount != 0) {
                    letraCount = 0;
                    event.target.children[3].children[palavraCount].children[0].classList.add('selecionada');
                    w = 0;
                } else {
                    while (event.target.children[3].children[palavraCount].children[letraCount + 1].innerHTML != '') {
                        letraCount++;
                        /* if(letraCount==4){
                            letraCount = 0
                        } */
                    }
                }
            }

            if (count == 1) {
                letraCount = 0;
                while (palavraTemp[letraCount] != '') {
                    letraCount++;
                }
                letraCount--;
            }

            if (document.querySelector('.selecionada').nextElementSibling != null && count != 0 && w != 0) {
                next = event.target.children[3].children[palavraCount].children[letraCount + 1];
                next.classList.add('selecionada');
            }
            select.innerHTML = '<p>' + event.key + '</p>';
            select.classList.remove('selecionada');
            if (w != 0) {
                letraCount++;
            }
            count = 0;
            palavraTemp.forEach((v) => v === '' && count++);

            if (count == 0) {
                letraCount = 5;
            }
            w = 1;
        } else if (letraCount == 4) {
            count = 0;
            palavraTemp.forEach((v) => v == '' && count++);

            palavraTemp[letraCount] = event.key;
            select = event.target.children[3].children[palavraCount].children[letraCount];
            select.innerHTML = '<p>' + event.key + '</p>';
            select.classList.remove('selecionada');

            if (count > 1) {
                letraCount = 0;
                while (event.target.children[3].children[palavraCount].children[letraCount].innerHTML != '') {
                    letraCount++;
                }
                event.target.children[3].children[palavraCount].children[letraCount].classList.add('selecionada');
            } else {
                letraCount++;
            }
        }
    } else if (event.key == 'Enter' && palavraTemp.length == 5) {

        if (palavras.includes(palavraTemp.join(''))) {
            if (palavraTemp[0] != respostaTemp[0] || palavraTemp[1] != respostaTemp[1] || palavraTemp[2] != respostaTemp[2] || palavraTemp[3] != respostaTemp[3] || palavraTemp[5] != respostaTemp[5]) {
                for (var i = 0; i < resposta.length; i++) {
                    if (resposta[i] == palavraTemp[i]) {
                        event.target.children[3].children[palavraCount].children[x].classList.replace('palavraVez', 'certa');
                        palavraTemp[i] = '';
                        respostaTemp[i] = '';
                    }
                    x++;
                }
                x = 0;
                for (var i = 0; i < resposta.length; i++) {
                    if (respostaTemp.includes(palavraTemp[i]) == true) {
                        event.target.children[3].children[palavraCount].children[x].classList.replace('palavraVez', 'tem');
                    } else {
                        event.target.children[3].children[palavraCount].children[x].classList.replace('palavraVez', 'errada');
                    }
                    x++;
                }
                palavraCount++;
                if (palavraCount < 6) {
                    for (var i = 0; i < 5; i++) {
                        if (i == 1) {
                            event.target.children[3].children[palavraCount].childNodes[i].classList.add('selecionada');
                        }
                        event.target.children[3].children[palavraCount].children[i].classList.replace('palavraDepois', 'palavraVez');
                    }
                    palavraTemp = ['', '', '', '', ''];
                    letraCount = 0;
                    next = '';
                    select = '';
                } else {
                    console.log("perdeu")
                }

            } else {
                for (var i = 0; i < resposta.length; i++) {
                    if (resposta[i] == palavraTemp[i]) {
                        event.target.children[3].children[palavraCount].children[x].classList.replace('palavraVez', 'certa');
                        palavraTemp[i] = '';
                        respostaTemp[i] = '';
                    }
                    x++;
                }
                setTimeout(acertou, 1000)
            }

            respostaTemp = resposta;

            if (palavraTemp == respostaTemp) {
                console.log("acertou")
            }

            if (palavraCount == 6) {
                if (palavraTemp == respostaTemp) {
                    console.log("acertou")
                }
            }
        }

    } else if (event.key == 'Backspace') {
        if (arrow == 1) {
            document.querySelector('.selecionada').innerHTML = '';
            palavraTemp[letraCount] = '';
            arrow = 0;
        } else {
            if (document.querySelector('.selecionada') == null) {
                event.target.children[3].children[palavraCount].lastChild.previousElementSibling.innerHTML = '';
                event.target.children[3].children[palavraCount].lastChild.previousElementSibling.classList.add('selecionada');
                palavraTemp[letraCount - 1] = '';
                letraCount--;
            } else if (document.querySelector('.selecionada').previousElementSibling == null) {
            } else {
                select = document.querySelector('.selecionada');
                previous = document.querySelector('.selecionada').previousElementSibling;
                previous.innerHTML = '';
                select.classList.remove('selecionada');
                previous.classList.add('selecionada');
                palavraTemp[letraCount - 1] = '';
                letraCount--;
            }
        }
    } else if (event.code == 'Space') {
        count = 0;
        palavraTemp.forEach((v) => v === '' && count++);

        if (document.querySelector('.selecionada').nextElementSibling != undefined && count != 1) {
            select = document.querySelector('.selecionada');
        } else if (document.querySelector('.selecionada').nextElementSibling == undefined) {
            select = document.querySelector('.selecionada');
            select.classList.remove('selecionada');
            letraCount = 0;
            while (event.target.children[3].children[palavraCount].children[letraCount].innerHTML != '') {
                letraCount++;
            }
            event.target.children[3].children[palavraCount].children[letraCount].classList.add('selecionada');
            var y = 0;
        }

        var count2 = 0;
        for (i = letraCount; i < palavraTemp.length; i++) {
            if (palavraTemp[i] == '') {
                count2++;
            }
        }

        if (event.target.children[3].children[palavraCount].children[0].innerHTML == '' && letraCount != 0 && y != 0 && count != 1 && event.target.children[3].children[palavraCount].children[letraCount + 1].innerHTML != '' && count2 < 2) {
            letraCount = 0;
            event.target.children[3].children[palavraCount].children[0].classList.add('selecionada');
            y = 0;
        } else if (document.querySelector('.selecionada').nextElementSibling != null && y != 0 && count != 1) {
            while (event.target.children[3].children[palavraCount].children[letraCount + 1].innerHTML != '') {
                letraCount++;
                if (letraCount == 4) {
                    letraCount = 0;
                }
            }

            event.target.children[3].children[palavraCount].children[letraCount + 1].classList.add('selecionada');
        }

        if (count != 1) {
            select.classList.remove('selecionada');
        }

        if (y != 0 && count != 1) {
            letraCount++;
        }

        y = 1;
    } else if (event.key == 'ArrowRight' || event.key == 'ArrowLeft') {
        if (event.key == 'ArrowRight') {
            if (letraCount != 5) {
                select = event.target.children[3].children[palavraCount].children[letraCount];
                if (document.querySelector('.selecionada').nextElementSibling != null) {
                    console.log('if');
                    next = event.target.children[3].children[palavraCount].children[letraCount + 1];
                    next.classList.add('selecionada');
                    select.classList.remove('selecionada');
                    letraCount++;
                }
            } else if (letraCount == 5) {
                letraCount = 0;
                event.target.children[3].children[palavraCount].children[letraCount].classList.add('selecionada');
            }
        }
        if (event.key == 'ArrowLeft') {
            if (letraCount != 5) {
                select = event.target.children[3].children[palavraCount].children[letraCount];
                if (document.querySelector('.selecionada').previousElementSibling != null) {
                    next = event.target.children[3].children[palavraCount].children[letraCount - 1];
                    next.classList.add('selecionada');
                }
                if (letraCount != 0) {
                    select.classList.remove('selecionada');
                    letraCount--;
                }
            } else if (letraCount == 5) {
                letraCount = 4;
                event.target.children[3].children[palavraCount].children[letraCount].classList.add('selecionada');
            }
        }
        if (document.querySelector('.selecionada').innerHTML != '') {
            arrow = 1;
        } else {
            arrow = 0;
        }
    }

    console.log(palavraTemp, letraCount);
}

function appear(event) {
    var header = document.querySelector('#header')
    var nav = document.querySelector('#nav')
    console.log(header.classList[0])
    if (header.classList[0] == "invisivel") {
        header.classList.replace('invisivel', 'visivel')
        nav.classList.replace('invisivel', 'visivel')
        seta.classList.replace('baixo', 'cima')
    } else {
        header.classList.replace('visivel', 'invisivel')
        nav.classList.replace('visivel', 'invisivel')
        seta.classList.replace('cima', 'baixo')
    }

}

function acertou() {
    palavraTemp = ['', '', '', '', '']
    letraCount = 0
    palavraCount = 0
    next = ''
    num = Math.floor(Math.random() * 2021)
    resposta = palavrasCertas[num].split('')
    respostaTemp = resposta
    select = ''
    previous = ''
    tela = document.getElementById('tela')
    x = 0
    count = 0
    w = 1
    arrow = 0
    pontuacao ++
    var pontos = document.getElementById("pontuacao")

    for (var p = 0; p < 6; p++) {
        for (var l = 0; l < 5; l++) {
            if(p == 0){
                tela.children[p].children[l].classList.remove("tem")
                tela.children[p].children[l].classList.remove("certa")
                tela.children[p].children[l].classList.remove("errada")
                tela.children[p].children[l].classList.add("palavraVez")
            }else{
                tela.children[p].children[l].classList.remove("tem")
                tela.children[p].children[l].classList.remove("certa")
                tela.children[p].children[l].classList.remove("errada")
                tela.children[p].children[l].classList.add("palavraDepois")
            }
            tela.children[p].children[l].innerText = ""
        }
    }
    tela.children[0].children[0].classList.add("selecionada")
    
    pontos.innerHTML = `Pontuação: ${pontuacao}`
}