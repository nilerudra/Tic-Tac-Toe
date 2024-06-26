let title = document.getElementById("title");
let restartBtn = document.getElementById("restart-btn");
let boxes = Array.from(document.getElementsByClassName("box"));

var res2 = document.getElementById("con1");
var res = document.getElementById("con2");

res.innerHTML = '<img src="./confetti-10.gif" alt="">';
res2.innerHTML = '<img src="./confetti-10.gif" alt="">';

let winner = getComputedStyle(document.body).getPropertyValue(
  "--winning-blocks"
);

const O_TEXT = "O";
const X_TEXT = "X";
let current_player = X_TEXT;
let spaces = Array(9).fill(null);

const startGame = () => {
  boxes.forEach((box) => box.addEventListener("click", boxClicked));
};

const draw = () => {
  return spaces.every((space) => space !== null);
};

function boxClicked(e) {
  if (playerhaswon() !== false || draw()) {
    return;
  }

  const id = e.target.id;

  if (!spaces[id]) {
    spaces[id] = current_player;
    e.target.innerText = current_player;

    if (playerhaswon() !== false) {
      title.innerText = current_player + " has won!";
      let winning_blocks = playerhaswon();

      res.style.visibility = "visible";
      res2.style.visibility = "visible";

      winning_blocks.forEach((index) => {
        boxes[index].classList.add("win-celebration");
        boxes[index].style.backgroundColor = winner;
      });

      setTimeout(() => {
        document.getElementById(
          "board"
        ).innerHTML = `<img id="win" src=./bb-baby.gif>`;
      }, 1000);

      return;
    }

    if (draw()) {
      title.innerText = "It's a draw!";
      return;
    }
    current_player = current_player == X_TEXT ? O_TEXT : X_TEXT;
  }
}

const winning_combination = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function playerhaswon() {
  for (const i of winning_combination) {
    let [a, b, c] = i;

    if (spaces[a] && spaces[a] == spaces[b] && spaces[a] == spaces[c]) {
      return [a, b, c];
    }
  }
  return false;
}

restartBtn.addEventListener("click", () => {
  window.location.reload();
});

startGame();
