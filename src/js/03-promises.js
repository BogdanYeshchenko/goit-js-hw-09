import { Notify } from 'notiflix/build/notiflix-notify-aio';

import '../../node_modules/notiflix/dist/notiflix-3.2.6.min.css';

const formSubmitElement = document.querySelector('.form');

formSubmitElement.addEventListener('submit', handlesabmitForm);

function handlesabmitForm(event) {
  event.preventDefault();

  const { delay, step, amount } = event.target.elements;

  for (let i = 1; i <= Number(amount.value); i++) {
    let time = Number(delay.value) + i * Number(step.value);
    const promise = createPromise(i, time);

    promise
      .then(x => {
        console.log(x);
        Notify.success(x);
      })
      .catch(y => {
        console.log(y);
        Notify.failure(y);
      });
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise ${position} in ${delay}ms`);
      }
    }, delay);
  });
}
