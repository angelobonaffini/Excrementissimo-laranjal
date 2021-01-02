const jaja = document.querySelector('.jaja');
const background = document.querySelector('.background');

let isJumping = false;
let isGameOver = false;
let position = 0;

function handleKeyUp(event) {
  if (event.keyCode === 32) {
    if (!isJumping) {
      jump();
    }
  }
}

function jump() {
  isJumping = true;

  let upInterval = setInterval(() => {
    if (position >= 200) {
      // Descendo
      clearInterval(upInterval);

      let downInterval = setInterval(() => {
        if (position <= 0) {
          clearInterval(downInterval);
          isJumping = false;
        } else {
          position -= 20;
          jaja.style.bottom = position + 'px';
        }
      }, 20);
    } else {
      // Subindo
      position += 20;
      jaja.style.bottom = position + 'px';
    }
  }, 20);
}

function createLaranja() {
  const laranja = document.createElement('div');
  let laranjaPosition = 1000;
  let randomTime = Math.random() * 6000;

  if (isGameOver) return;

  laranja.classList.add('laranja');
  background.appendChild(laranja);
  laranja.style.left = laranjaPosition + 'px';

  let leftTimer = setInterval(() => {
    if (laranjaPosition < -60) {
      // Saiu da tela
      clearInterval(leftTimer);
      background.removeChild(laranja);
    } else if (laranjaPosition > 0 && laranjaPosition < 60 && position < 60) {
      // Game over
      clearInterval(leftTimer);
      isGameOver = true;
      document.body.innerHTML = '<h1 class="game-over"> Impeachment! </h1>';
    } else {
      laranjaPosition -= 10;
      laranja.style.left = laranjaPosition + 'px';
    }
  }, 20);

  setTimeout(createLaranja, randomTime);
}

createLaranja();
document.addEventListener('keyup', handleKeyUp);
