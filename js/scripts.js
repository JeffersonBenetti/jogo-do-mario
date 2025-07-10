const menu = document.querySelector('.menu-button')
const play = document.querySelector('.play')
const pause = document.querySelector('.pause')
const mario = document.querySelector('.mario')
const pipe = document.querySelector('.pipe')
const clouds = document.querySelector('.clouds')
const gameOver = document.querySelector('.game-over')
const reset = document.querySelector('.reset')

let loop = null
let isPlaying = false // Controle do estado do jogo.
let isPaused = false // Controla se o jogo está pausado ou não.


const jump = () => {
    if (isPlaying) {
        mario.classList.add('jump')

        setTimeout(() => {
            mario.classList.remove('jump')
        }, 500);
    } else if (!isPlaying) {
        alert('Clique no botão "Play" para iniciar o jogo.')
    }
}

const showMenu = () => {
    const infoText = document.querySelector('.info-text')
    const displayAtual = window.getComputedStyle(infoText).display

    if (displayAtual === 'none') {
        infoText.style.display = 'flex' 
    } else {
        infoText.style.display = 'none'
    }
}

const startTheGame = () => {
    if (isPaused) {
        // Se estiver pausado, só retorna ao jogo.
        isPaused = false
        pipe.style.animationPlayState = 'running'
        clouds.style.animationPlayState = 'running'
        play.innerHTML = 'Play'
        startLoop() // Reinicia o loop.
    } else if (isPlaying === false) {
        // Se for a primeira vez, começa do zero.
        isPlaying = true

        pipe.classList.add('move-pipe');
        clouds.classList.add('move-clouds');

        pipe.style.animationPlayState = 'running';
        clouds.style.animationPlayState = 'running';
        startLoop()
    }

    play.blur()
}

const startLoop = () => {
    clearInterval(loop)

    loop = setInterval(() => {
        let pipePosition = pipe.offsetLeft
        let marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '')

        if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
            // Muda posição do Pipe.
            pipe.style.left = `${pipePosition}px`

            // Muda imagem, posição e estilo do Mario.
            mario.style.bottom = `${marioPosition}px`
            mario.src = './assets/img/game-over.png'
            mario.style.height = '100px'
            mario.style.marginLeft = '50px'

            // Tela GAME OVER.
            gameOver.classList.add('scale')

            isPlaying = false
            clearInterval(loop)
        }
    }, 10);
}

const pauseGame = () => {
    if (isPlaying && isPaused === false) {
        isPaused = true

        pipe.style.animationPlayState = 'paused'
        clouds.style.animationPlayState = 'paused'

        play.innerHTML = 'Continuar'

        clearInterval(loop) // Pausa o loop
    }
}

const resetGame = () => {
    // Zera os controles.
    isPlaying = false
    isPaused = false
    clearInterval(loop)

    // Remove as animações.
    pipe.classList.remove('move-pipe')
    clouds.classList.remove('move-clouds')

    // Reseta as posições.
    pipe.style.animation = 'none'
    pipe.style.left = ''
    clouds.style.animation = 'none'

    // Força o navegador a "recalcular" para permitir reinício da animação.
    pipe.offsetHeight
    clouds.offsetHeight

    pipe.style.animation = null
    clouds.style.animation = null

    // Reseta o Mario
    mario.src = './assets/img/mario.gif'
    mario.style.height = '150px'
    mario.style.marginLeft = '0'
    mario.style.bottom = '0';

    // Remove tela de Game over.
    gameOver.classList.remove('scale')
    text.style.display = 'block'
}

// Computador
window.addEventListener('keydown', jump)
menu.addEventListener('click', showMenu)
play.addEventListener('click', startTheGame)
pause.addEventListener('click', pauseGame)
reset.addEventListener('click', resetGame)

// Adicionado para mobile
document.addEventListener('touchstart', jump);
play.addEventListener('touchstart', startTheGame)
pause.addEventListener('touchstart', pauseGame)
reset.addEventListener('touchstart', resetGame)