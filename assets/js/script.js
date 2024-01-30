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
    telaCheia();
    avaliacaoTelaUm();
    avaliacaoTelaDois();
    resizeBodyConteudo();
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


// exercicios da tabela


function avaliacaoTelaUm() {
    $('.resultado-tela-um').click(function () {
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
    });

    $('select').click(function () {
        $(this).removeClass('correto');
        $(this).removeClass('errado');
    });

    $('#modal-feedback-correto .close-modal').click(function () {
        $('.pop-up-1').fadeOut();
        $('.pop-up-2').fadeIn();
    });
}

function avaliacaoTelaDois() {
    $('.resultado-tela-dois').click(function () {
        let errados = 0;
        let corretos = 0;
        let exercicios = ($(this).parents('.pop-up').find('select'));
        for (let i = 0; i < exercicios.length; i++) {
            exercicios[i].classList.remove('errado');
            exercicios[i].classList.remove('correto');
            if (exercicios[i].value == 'errado' || exercicios[i].value == '') {
                exercicios[i].classList.add('errado');
                errados++;
                // Mostra o parágrafo com a classe errado e esconde o parágrafo com a classe acertou
                $(exercicios[i]).siblings('.errou').removeClass('d-none');
                $(exercicios[i]).siblings('.acertou').addClass('d-none');
            }
            if (exercicios[i].value == 'correto') {
                exercicios[i].classList.add('correto');
                corretos++;
                // Mostra o parágrafo com a classe acertou e esconde o parágrafo com a classe errado
                $(exercicios[i]).siblings('.acertou').removeClass('d-none');
                $(exercicios[i]).siblings('.errou').addClass('d-none');
            }
        }
        if (errados > 0) {
            $('#modal-feedback-errado-tela2').modal('show');
            audio.setAttribute('src', 'assets/audio/erro.mp3');
            audio.load();
            audio.play();
        }
        if (errados == 0 && corretos == exercicios.length) {
            $('#modal-feedback-correto-tela2').modal('show');
            audio.setAttribute('src', 'assets/audio/acerto.mp3');
            audio.load();
            audio.play();
        }
    });

    $('select').click(function () {
        $(this).removeClass('correto');
        $(this).removeClass('errado');
        // Esconde ambos os parágrafos ao selecionar uma nova opção
        $(this).siblings('.errou').addClass('d-none');
        $(this).siblings('.acertou').addClass('d-none');
    });

    $('#modal-feedback-correto .close-modal').click(function () {
        $('.pop-up-2').fadeOut();
        $('.div-final').fadeIn();
    });
}

function telaCheia() {
    $('.btnFullScreen').on('click', toggleFullScreen);

    function toggleFullScreen() {
        var elem = document.documentElement;

        if (!document.fullscreenElement && !document.mozFullScreenElement &&
            !document.webkitFullscreenElement && !document.msFullscreenElement) {
            if (elem.requestFullscreen) {
                elem.requestFullscreen();
                $('.btnFullScreen i').text('fullscreen');
            } else if (elem.msRequestFullscreen) {
                elem.msRequestFullscreen();
            } else if (elem.mozRequestFullScreen) {
                elem.mozRequestFullScreen();
            } else if (elem.webkitRequestFullscreen) {
                elem.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
                $('.btnFullScreen i').text('fullscreen_exit');
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            }
        }
    }
}
$(document).ready(function(){
    $('.btn-proximo').click(function () {
        $('.tela-2').fadeOut();
        setTimeout(function () {
            $('#pop-up-1').fadeIn();
        }, 500);
    });
});