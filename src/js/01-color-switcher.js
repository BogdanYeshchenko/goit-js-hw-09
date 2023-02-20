const el = {
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
  body: document.querySelector('body'),
};
let intervalChangeColor = null;
let isChangeColorWork = false;

el.startBtn.addEventListener('click', handleStartChangeColor);
el.stopBtn.addEventListener('click', handleStopChangeColor);

el.stopBtn.setAttribute('disabled', true);

function handleStartChangeColor() {
  if (isChangeColorWork) {
    return;
  }

  isChangeColorWork = true;

  el.startBtn.setAttribute('disabled', true);
  el.stopBtn.removeAttribute('disabled');

  intervalChangeColor = setInterval(changeColorBody, 1000);
}

function handleStopChangeColor() {
  isChangeColorWork = false;
  el.stopBtn.setAttribute('disabled', true);
  el.startBtn.removeAttribute('disabled');
  clearInterval(intervalChangeColor);
}

function changeColorBody() {
  el.body.style.backgroundColor = getRandomHexColor();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
