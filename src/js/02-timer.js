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

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] < options.defaultDate) {
            Notiflix.Notify.failure("Please choose a date in the future");
            // window.alert("Please choose a date in the future");
            startButton.setAttribute("disabled", "disabled");
        } else {
            startButton.removeAttribute("disabled", "disabled");
            startButton.addEventListener('click', () => {
                timer.start(selectedDates[0]);        
        });
        };   
    },
};

flatpickr(timerInput, options);

const timer = {
    intervalId: null,
    start(startDate) {
        const startTime = startDate;
        this.intervalId = setInterval(() => {
            const currentTime = Date.now();
            const deltaTime = startTime - currentTime;
            const { days, hours, minutes, seconds } = convertMs(deltaTime);
            updateTimerRefs({ days, hours, minutes, seconds });
        }, 1000);
    },
    stop() {
        if (options.defaultDate === Date.now()) {
          clearInterval(this.intervalId);  
        } 
     },
};

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