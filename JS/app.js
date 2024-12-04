colors = ["red", "green", "blue", "purple", "yellow"];
const colorContainer = document.getElementById("color-container");
const title = document.getElementById("title");
const popularColorDisplay = document.getElementById("popular-color");

let votes = {};
let currentAudio = null;

const generateColors = () => {
  colors.forEach((color) => {
    const colorDiv = document.createElement("div");
    colorDiv.classList.add("color");
    colorDiv.style.backgroundColor = color;
    colorDiv.dataset.color = color;
    colorContainer.appendChild(colorDiv);
    votes[color] = 0;
  });
};

generateColors();

colorContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("color")) {
    const selectedColor = e.target.dataset.color;
    title.style.color = selectedColor;

    votes[selectedColor]++;
    updatePopularColor();
  }
});

const updatePopularColor = () => {
  let popular = Object.keys(votes).reduce((a, b) =>
    votes[a] > votes[b] ? a : b
  );
  popularColorDisplay.textContent = `El color más popular es: ${popular} con ${votes[popular]} votos`;
};

//add color
document.getElementById("add-color").addEventListener("click", () => {
  const newColor = prompt("Introduce un color (nombre o código HEX):");
  if (newColor) {
    const colorDiv = document.createElement("div");
    colorDiv.classList.add("color");
    colorDiv.style.backgroundColor = newColor;
    colorDiv.dataset.color = newColor;
    colorContainer.appendChild(colorDiv);
    votes[newColor] = 0;
  }
});

//reset
document.getElementById("reset").addEventListener("click", () => {
  colorContainer.innerHTML = "";
  title.style.color = "black";
  popularColorDisplay.textContent = "El color más popular: Ninguno";
  votes = {};
  generateColors();
  currentAudio.pause();
});


const playSound = () => {
  const audios = [
    "./MEDIA/AUDIO/sound-1.mp3",
    "./MEDIA/AUDIO/sound-2.mp3",
    "./MEDIA/AUDIO/sound-3.mp3",
    "./MEDIA/AUDIO/sound-4.mp3",
    "./MEDIA/AUDIO/sound-5.mp3"
  ];

  if (currentAudio) {
    currentAudio.pause();       
    currentAudio.currentTime = 0;
  }
  currentAudio = new Audio(audios[Math.floor(Math.random() * audios.length)]);
  currentAudio.play();
};

colorContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("color")) {
    playSound();
  }
});
