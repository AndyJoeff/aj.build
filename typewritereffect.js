const phrases = [
  "Connect and Convert.",
  "Tell Your Brand’s Story.",
  "Work as Hard as You Do."
];

let currentPhrase = 0;
let currentChar = 0;
let isDeleting = false;
const typeSpeed = 80;
const deleteSpeed = 30;
const pause = 1500;

const typewriter = document.getElementById('typewriter-text');

function type() {
  const current = phrases[currentPhrase];
  typewriter.textContent = current.substring(0, currentChar);

  if (!isDeleting && currentChar < current.length) {
    currentChar++;
    setTimeout(type, typeSpeed);
  } else if (isDeleting && currentChar > 0) {
    currentChar--;
    setTimeout(type, deleteSpeed);
  } else {
    if (!isDeleting) {
      isDeleting = true;
      setTimeout(type, pause);
    } else {
      isDeleting = false;
      currentPhrase = (currentPhrase + 1) % phrases.length;
      setTimeout(type, typeSpeed);
    }
  }
}

document.addEventListener("DOMContentLoaded", type);
