const boxes = document.querySelectorAll('.box');
const boxTexts = document.querySelectorAll('.boxText');
const resetBtn = document.getElementById('reset');
const playerInfo = document.querySelector('.info');
let gameOver = false; // keeps track of game , at first it is false because game has not ended
let turn = 'X'; // give ist turn to x
const changeTurn = () => {
  return turn === 'X' ? 'O' : 'X';
};
const checkWins = () => {
  let wins = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  const isWinner = wins.some((e) => {
    //  wherever condition gets true it immediately returns
    return (
      boxTexts[e[0]].innerText === boxTexts[e[1]].innerText &&
      boxTexts[e[2]].innerText === boxTexts[e[1]].innerText &&
      boxTexts[e[0]].innerText !== ''
    );
  });
  if (isWinner) {
    playerInfo.textContent = `Player ${turn} WON 🎉`;
    gameOver = true;
    showCrackers();
    return;
  } else {
    const isDraw = Array.from(boxTexts).every((box) => box.innerText !== ''); // no box shd be empty
    if (isDraw) {
      playerInfo.textContent = "It's a Draw 🤝";
      gameOver = true;
    }
  }
};
//box logic
boxes.forEach((box) => {
  const boxText = box.querySelector('.boxText');
  box.addEventListener('click', () => {
    if (boxText.innerText !== '' || gameOver) return;
    {
      boxText.innerText = turn;
      checkWins();
    }
    if (!gameOver) {
      turn = changeTurn();
      playerInfo.textContent = `Turn for ${turn}`;
    }
  });
});
resetBtn.addEventListener('click', () => {
  boxTexts.forEach((box) => (box.innerText = ''));
  turn = 'X';
  gameOver = false;
  playerInfo.textContent = `Turn for ${turn}`;
});

const showCrackers = () => {
  confetti({
    particleCount: 150,
    spread: 70,
    origin: { y: 0.6 },
  });
};
