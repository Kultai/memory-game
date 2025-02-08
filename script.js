const images = [
  "—Pngtree—spain flag transparent watercolor painted_5331199.png",
  "—Pngtree—spain flag transparent watercolor painted_5331199.png",
  "—Pngtree—france flag transparent with watercolor_8826499.png",
  "—Pngtree—france flag transparent with watercolor_8826499.png",
  "e2829f488e54371ada393f47ae1eec23.png",
  "e2829f488e54371ada393f47ae1eec23.png",
  "fb4c30b0c90b73def2114be6e2671339.png",
  "fb4c30b0c90b73def2114be6e2671339.png",
  "7138be381ee8e16aefd8e2b6f11eb3ba.png",
  "7138be381ee8e16aefd8e2b6f11eb3ba.png",
  "241e02e9772ea8c1213eb4e112d54e46.png",
  "241e02e9772ea8c1213eb4e112d54e46.png",
  "5fb05c0784f35a300d9c81c17d985bb1.png",
  "5fb05c0784f35a300d9c81c17d985bb1.png",
  "82abade1820236dfe25767b52446c88a.png",
  "82abade1820236dfe25767b52446c88a.png",
];

let flippedCards = [];
let matchedPairs = 0;
const gameBoard = document.getElementById("gameBoard");

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function createBoard() {
  shuffle(images);
  gameBoard.innerHTML = "";
  images.forEach((image, index) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.setAttribute("data-image", image);

    const img = document.createElement("img");
    img.src = image;
    card.appendChild(img);

    card.addEventListener("click", () => flipCard(card));
    gameBoard.appendChild(card);
  });
}

function flipCard(card) {
  if (
    card.classList.contains("flipped") ||
    card.classList.contains("matched") ||
    flippedCards.length === 2
  ) {
    return;
  }

  card.classList.add("flipped");
  flippedCards.push(card);

  if (flippedCards.length === 2) {
    setTimeout(checkMatch, 1000);
  }
}

function checkMatch() {
  const [card1, card2] = flippedCards;

  if (card1.getAttribute("data-image") === card2.getAttribute("data-image")) {
    card1.classList.add("matched");
    card2.classList.add("matched");
    matchedPairs++;

    if (matchedPairs === images.length / 2) {
      alert("You win!");
      saveProgress();
    }
  } else {
    card1.classList.remove("flipped");
    card2.classList.remove("flipped");
  }

  flippedCards = [];
}

function saveProgress() {
  localStorage.setItem("matchedPairs", matchedPairs);
}

function loadProgress() {
  const savedMatchedPairs = localStorage.getItem("matchedPairs");
  if (savedMatchedPairs) {
    matchedPairs = parseInt(savedMatchedPairs);
    if (matchedPairs === images.length / 2) {
      alert("You already won!");
    }
  }
}

function resetGame() {
  matchedPairs = 0;
  flippedCards = [];
  localStorage.removeItem("matchedPairs");
  createBoard();
}

loadProgress();
createBoard();
