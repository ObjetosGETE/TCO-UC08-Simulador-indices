// funcao de resize
function escalaProporcao(largura, altura) {

    var larguraScreen = $(window).width();
    var alturaScreen = $(window).height();
    var proporcaoAltura = (alturaScreen * 100) / altura;
    var proporcaoLargura = (larguraScreen * 100) / largura;
    var proporcao, larguraAltura, larguraAlturaAuto;

    if (proporcaoAltura < proporcaoLargura) {
        larguraAltura = "height";
        larguraAlturaAuto = "width";
        proporcao = proporcaoAltura / 100;
    } else {
        larguraAltura = "width";
        larguraAlturaAuto = "height";
        proporcao = proporcaoLargura / 100;
    }

    return [proporcao, larguraAltura, larguraAlturaAuto];
}

function resizeBodyConteudo() {

    var proporcao1920 = escalaProporcao(1920, 1080)[0];

    $(".wrapper").css({
        "transform": "scale(" + proporcao1920 + ")",
        "transform-origin": "center center"
    });

    var proporcao900;

    if ($(window).width() < 992) {
        proporcao900 = escalaProporcao(900, 576)[0];
    } else {
        proporcao900 = 1;
    }
}

$(document).ready(function () {
    resizeBodyConteudo()
    $(window).resize(function () {
        resizeBodyConteudo()
    })

});
const audio = new Audio();
$('.pop-up').hide();
$('.tela:not(.tela-1)').hide();

// navegacao
$('.btn-iniciar').click(function () {
    $('.tela-1').fadeOut();
    setTimeout(function () {
        $('.tela-2').fadeIn();
    }, 500)
})

$('.btn-proximo').click(function () {
    let telaAtual = $(this).parents('.tela');
    let next = $(this).parents('.tela').next();
    console.log(next.hasClass('tela-4'))

    if (next.length > 0) {
        telaAtual.fadeOut()
        setTimeout(() => {
            next.fadeIn()
            let menu = next.children('.menu-esq');
            if (menu.children('button').length > 0) {
                setTimeout(() => {
                    menu.children('.bt-blip').fadeOut();
                    menu.addClass('ativo');
                }, 1000);
                setTimeout(() => {
                    menu.children('button').fadeIn();
                }, 1500);

            }
        }, 500)
    } else {
        console.log('acabouse')
    }
})

// pop-ups
$('.bt-pop-up').click(function () {
    let count = 0;
    $(this).addClass('clicado');
    let data = $(this).data('pop');
    $(`.pop-up[data-pop=${data}]`).fadeIn();
    $(`.pop-up[data-pop=${data}]`).scrollTop = 0;
    let btsArray = $(this).parents('.tela').find('.bt-pop-up');

    for (let i = 0; i < btsArray.length; i++) {
        if (btsArray[i].classList.contains('clicado')) {
            count++
        }
    }
    if (count == btsArray.length) {
        let btn = $(this).parents('.tela').find('.btn-continuar');
        btn.removeClass('inativo');
    }
});

$('.bt-fechar-pop-up').click(function () {
    $(this).parents('.pop-up').fadeOut();
});

$('.btn-continuar').click(function () {
    telaAtual = $(this).parents('.tela');
    let telaAnterior;
    if ($(this).hasClass('continuar-1')) {
        telaAnterior = $('.tela-4');
        telaAnterior.children('.menu-esq').children('.bt-1-passo').addClass('clicado');
        telaAnterior.children('.menu-esq').children('.bt-2-passo').removeClass('inativo');
    }
    if ($(this).hasClass('continuar-2')) {
        telaAnterior = $('.tela-4');
        telaAnterior.children('.menu-esq').children('.bt-2-passo').addClass('clicado');
        telaAnterior.children('.menu-esq').children('.bt-3-passo').removeClass('inativo');
    }
    if ($(this).hasClass('continuar-3')) {
        telaAnterior = $('.tela-4');
        telaAnterior.children('.menu-esq').children('.bt-3-passo').addClass('clicado');
        telaAnterior.children('.menu-esq').children('.bt-4-passo').removeClass('inativo');
    }
    if ($(this).hasClass('continuar-4')) {
        telaAnterior = $('.tela-final')
        // telaAnterior.children('.menu-esq').children('.bt-4-passo').addClass('clicado');

    }
    telaAtual.fadeOut()
    setTimeout(() => {
        telaAnterior.fadeIn()
    }, 500);
})

// exercicios da tabela
$('.checar-tabelas').click(function () {
    let errados = 0;
    let corretos = 0;
    let exercicios = ($(this).parents('.pop-up').find('select'));
    for (let i = 0; i < exercicios.length; i++) {
        exercicios[i].classList.remove('errado');
        exercicios[i].classList.remove('correto');
        if (exercicios[i].value == 'errado' || exercicios[i].value == '') {
            exercicios[i].classList.add('errado');
            errados++;
        }
        if (exercicios[i].value == 'correto') {
            exercicios[i].classList.add('correto');
            corretos++;
        }
    }
    if (errados > 0) {
        // $('#modal-feedback-errado').show()
        $('#modal-feedback-errado').modal('show');
        audio.setAttribute('src', 'assets/audio/erro.mp3');
        audio.load();
        audio.play();
    }
    if (errados == 0 && corretos == exercicios.length) {
        $('#modal-feedback-correto').modal('show');
        audio.setAttribute('src', 'assets/audio/acerto.mp3');
        audio.load();
        audio.play();
    }
})

$('select').click(function () {
    $(this).removeClass('correto');
    $(this).removeClass('errado');
})

$('#modal-feedback-correto .close-modal').click(function () {
    $('.pop-up').fadeOut();
})

$('.bt-resumo-folha').click(function () {
    setTimeout(() => {
        $(this).parents('.tela').find('.ui-msg-escura').hide();
        $('.comprovantes-bts').show();
    }, 1500);
})


var customSelect = document.querySelector('.custom-select');
    var selectSelected = customSelect.querySelector('.select-selected');
    var selectItems = customSelect.querySelector('.select-items');
    var options = selectItems.querySelectorAll('div');

    selectSelected.addEventListener('click', function() {
        selectItems.classList.toggle('open');
    });

    options.forEach(function(option) {
        option.addEventListener('click', function() {
            selectSelected.textContent = this.textContent;
            selectItems.classList.remove('open');
        });
    });