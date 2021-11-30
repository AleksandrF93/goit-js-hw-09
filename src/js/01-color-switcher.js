const buttonStart = document.querySelector('[data-start]');
const buttonStop = document.querySelector('[data-stop]');

const PROMPT_DELAY = 1000;
let timerId = null;


function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};
    
function onButtonStartClick() {
    if (onButtonStartClick) {
        buttonStart.setAttribute("disabled", "disabled")
    };
    timerId = setInterval(() => { changeBackGround(); }, PROMPT_DELAY);  
};

function changeBackGround() {
    document.body.style.backgroundColor = getRandomHexColor();
};
 
buttonStart.addEventListener('click', onButtonStartClick);

function onButtonStopClick() {
    if (onButtonStopClick) {
        buttonStart.removeAttribute("disabled", "disabled");
    };
    clearInterval(timerId);
};

buttonStop.addEventListener('click', onButtonStopClick);