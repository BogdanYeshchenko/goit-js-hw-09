const el = {
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
  body: document.querySelector('body'),
};
let intervalChangeColor = null;
let isChangeColorWork = false;

el.startBtn.addEventListener('click', handleStartChangeColor);
el.stopBtn.addEventListener('click', handleStopChangeColor);

function handleStartChangeColor() {
  if (isChangeColorWork) {
    return;
  }

  isChangeColorWork = true;

  intervalChangeColor = setInterval(changeColorBody, 1000);
}

function handleStopChangeColor() {
  isChangeColorWork = false;
  clearInterval(intervalChangeColor);
}

function changeColorBody() {
  el.body.style.backgroundColor = getRandomHexColor();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
