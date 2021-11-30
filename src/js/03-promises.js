import Notiflix from 'notiflix';

const formInputRefs = document.querySelector('.form');
formInputRefs.addEventListener('submit', onFormSubmit);

function onFormSubmit(evt) {
  evt.preventDefault();
  let formData = new FormData(this);
  let firstDelay = formData.get("delay");
  let amountInput = formData.get("amount");
  let stepInput = formData.get("step");
  const message = {
    position: parseInt(amountInput, 10),
    delay: parseInt(firstDelay, 10),
  };

  for (let i = 1; i <= amountInput; i += 1) {
    message.position = i;
    message.delay = message.delay + parseInt(stepInput, 10);
    createPromise(message)
      .then(message => {
        console.log(message);
      })
      .catch(message => {
        console.log(message);
      });
  }
}

  function createPromise({ position, delay }) {
    return new Promise((resolve, reject) => {
      const shouldResolve = Math.random() > 0.3;
      setTimeout(() => {
        if (shouldResolve) {
          resolve(Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`));
        } else {
          reject(Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`));
        }
      }, delay);
    })
  }

