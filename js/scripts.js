const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const clouds = document.querySelector('.clouds')

const jump = () => {
    mario.classList.add('jump');

    setTimeout(() => {
        mario.classList.remove('jump'); 
    }, 500);
}

const loop = setInterval(() => {
    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');
    const cloudsPosition = clouds.offsetLeft;

    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {

        clouds.style.animation = 'none'
        clouds.style.left = `${cloudsPosition}px`

        pipe.style.animation = 'none'
        pipe.style.left = `${pipePosition}px`

        mario.style.animation = 'none'
        mario.style.bottom = `${marioPosition}px`
        mario.src = './assets/img/game-over.png'
        mario.style.height = '100px'
        mario.style.marginLeft = '50px'

        clearInterval(loop)
    }

}, 10);

document.addEventListener('keydown', jump);
document.addEventListener('touchstart', jump); // Adicionado para mobile
