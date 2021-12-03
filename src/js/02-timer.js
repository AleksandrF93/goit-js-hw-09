import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const timerInput = document.getElementById('datetime-picker');
const startButton = document.querySelector('[data-start]');
startButton.setAttribute("disabled", "disabled");

const timerDaysRef = document.querySelector('[data-days]');
const timerHoursRef = document.querySelector('[data-hours]');
const timerMinutesRef = document.querySelector('[data-minutes]');
const timerSecondsRef = document.querySelector('[data-seconds]');
const currentTime = Date.now();
let startTime = null;
let intervalId = null;
startButton.setAttribute("disabled", "disabled");
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        startTime = selectedDates[0];
        if (startTime > currentTime) {
            startButton.removeAttribute("disabled", "disabled");
        } else {
            Notiflix.Notify.failure("Please choose a date in the future");
        };   
    },
};
const flatpickrEl  = new flatpickr(timerInput, options);

startButton.addEventListener('click', updateClockRun);

function updateClockRun() {
    intervalId = setInterval(() => {
    const currentTime = Date.now();
        const deltaTime = startTime - currentTime;
        const { days, hours, minutes, seconds } = convertMs(deltaTime);
        updateTimerRefs({ days, hours, minutes, seconds });
    flatpickrEl.input.setAttribute("disabled", "disabled")
    if (deltaTime < 1000) {
        clearInterval(intervalId);
        timerDaysRef.textContent = '00';
        timerHoursRef.textContent = '00';
        timerMinutesRef.textContent = '00';
        timerSecondsRef.textContent = '00';
        timerInput.removeAttribute("disabled", "disabled");
    } 
    }, 1000);
}
 
function updateTimerRefs({ days, hours, minutes, seconds }) {
    timerDaysRef.textContent = `${days}`;
    timerHoursRef.textContent = `${hours}`;
    timerMinutesRef.textContent = `${minutes}`;
    timerSecondsRef.textContent = `${seconds}`;
}

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}