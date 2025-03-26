let minutes = 0, seconds = 0, milliseconds = 0;
let timer;
let running = false;

const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");
const millisecondsEl = document.getElementById("milliseconds");
const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const resetBtn = document.getElementById("reset");
const lapBtn = document.getElementById("lap");
const lapsContainer = document.getElementById("laps");

// Start Stopwatch
function startTimer() {
    if (!running) {
        running = true;
        timer = setInterval(() => {
            milliseconds += 10;
            if (milliseconds === 1000) {
                milliseconds = 0;
                seconds++;
            }
            if (seconds === 60) {
                seconds = 0;
                minutes++;
            }
            updateDisplay();
        }, 10);
    }
}

// Pause Stopwatch
function pauseTimer() {
    clearInterval(timer);
    running = false;
}

// Reset Stopwatch
function resetTimer() {
    clearInterval(timer);
    running = false;
    minutes = 0;
    seconds = 0;
    milliseconds = 0;
    updateDisplay();
    lapsContainer.innerHTML = "";
}

// Record Lap
function recordLap() {
    if (running) {
        let lapTime = `${formatTime(minutes)}:${formatTime(seconds)}:${formatMilliseconds(milliseconds)}`;
        let lapItem = document.createElement("li");
        lapItem.textContent = `Lap ${lapsContainer.children.length + 1}: ${lapTime}`;
        lapsContainer.appendChild(lapItem);
    }
}

// Update Display
function updateDisplay() {
    minutesEl.textContent = formatTime(minutes);
    secondsEl.textContent = formatTime(seconds);
    millisecondsEl.textContent = formatMilliseconds(milliseconds);
}

// Format Time
function formatTime(value) {
    return value < 10 ? `0${value}` : value;
}

// Format Milliseconds
function formatMilliseconds(value) {
    return value < 100 ? `0${value}`.slice(0, 2) : value.toString().slice(0, 2);
}

// Event Listeners
startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);
lapBtn.addEventListener("click", recordLap);
