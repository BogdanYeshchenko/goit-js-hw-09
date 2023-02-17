import flatpickr from 'flatpickr';
import { Report } from 'notiflix/build/notiflix-report-aio';

import '../../node_modules/flatpickr/dist/flatpickr.min.css';
import '../../node_modules/notiflix/dist/notiflix-3.2.6.min.css';

const el = {
  input: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

let timerID = null;
let selectedTime = 0;
let isTimerOn = false;

el.startBtn.setAttribute('disabled', true);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedTime = selectedDates[0].getTime();

    if (selectedTime > new Date().getTime()) {
      el.startBtn.removeAttribute('disabled');
      return;
    }

    el.startBtn.setAttribute('disabled', true);
    Report.failure(
      'Не делай мине беременную голову!',
      'Please choose a date in the future'
    );
  },
};

const d = flatpickr('#datetime-picker', options);

el.startBtn.addEventListener('click', handleStartTimer);

function handleStartTimer() {
  if (isTimerOn) {
    return;
  }

  timerID = setInterval(Timer, 1000);
}

function Timer() {
  let timeLeft = Math.round(selectedTime) - Math.round(new Date().getTime());
  isTimerOn = true;

  if (timeLeft < 0) {
    isTimerOn = false;
    clearInterval(timerID);
    Report.warning(
      'GAME OVER',
      'Воз отдыхает зимой, сани — летом, а конь — никогда.',
      'Try again'
    );
    return;
  }

  assingValue(convertMs(timeLeft));
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = String(Math.floor(ms / day)).padStart(2, '0');
  const hours = String(Math.floor((ms % day) / hour)).padStart(2, '0');
  const minutes = String(Math.floor(((ms % day) % hour) / minute)).padStart(
    2,
    '0'
  );
  const seconds = String(
    Math.floor((((ms % day) % hour) % minute) / second)
  ).padStart(2, '0');

  return { days, hours, minutes, seconds };
}

function assingValue({ days, hours, minutes, seconds }) {
  el.days.textContent = days;
  el.hours.textContent = hours;
  el.minutes.textContent = minutes;
  el.seconds.textContent = seconds;
}
