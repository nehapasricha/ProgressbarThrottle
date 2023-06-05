const addButton = document.getElementById("add-progress-bar");
const progressBarsContainer = document.getElementById(
  "progress-bars-container"
);

// Throttling variables
const progressBarLimit = 3;
let progressBarCount = 0;
const progressBarQueue = [];

addButton.addEventListener("click", function () {
  if (progressBarCount < progressBarLimit) {
    createProgressBar();
  } else {
    progressBarQueue.push(createProgressBar);
  }
});

function createProgressBar() {
  progressBarCount++;

  const progressBar = document.createElement("div");
  progressBar.className = "progress-bar";
  const fill = document.createElement("div");
  fill.className = "progress-bar-fill";
  progressBar.appendChild(fill);
  progressBarsContainer.appendChild(progressBar);

  const duration = Math.floor(Math.random() * 3000) + 2000; // Random duration between 2 to 5 seconds

  animateProgressBar(fill, duration).then(() => {
    //progressBarsContainer.removeChild(progressBar);
    progressBarCount--;

    if (progressBarQueue.length > 0) {
      const nextProgressBar = progressBarQueue.shift();
      nextProgressBar();
    }
  });
}

function animateProgressBar(element, duration) {
  return new Promise((resolve) => {
    let width = 0;
    const increment = 10;
    const interval = duration / (100 / increment);

    const timerId = setInterval(() => {
      width += increment;
      element.style.width = width + "%";

      if (width >= 100) {
        clearInterval(timerId);
        resolve();
      }
    }, interval);
  });
}
