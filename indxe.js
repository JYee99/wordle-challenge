// 요구사항
// 1. 5글자 단어 (존재하는 단어가 아니어도 됨)
// 2. 6번의 시도 가능
// 3. 존재하면 노란색, 위치도 맞으면 배경색을 초록색으로 표시
// 4. 게임 종료 판단
// 5. 상단에 게임 시간 표시
const correct = "APPLE";
let index = 0;
let attempts = 0;
let handletimer;
function appStart() {
  const displayGameOver = () => {
    const div = document.createElement("div");
    div.innerText = "게임이 종료됐습니다.";
    div.style =
      "display: flex; justify-content:center; align-items:center; position: absolute; top: 40%; left: 50%; transform: translate(-50%, -40%); font-size: 30px; font-weight: bold; background-color: white; padding: 20px 30px; border: 1px solid #dadada; border-radius: 10px; box-shadow: 2px 3px 10px rgba(0,0,0,0.15);";
    document.body.appendChild(div);
    clearInterval(handletimer);
  };
  const nextLine = () => {
    if (attempts === 6) {
      gameOver();
      return;
    }
    attempts++;
    index = 0;
  };
  const gameOver = () => {
    displayGameOver();
    window.removeEventListener("keydown", haneldKeyDown);
  };
  const handleEnterKey = () => {
    let passed = 0;
    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board-block[data-index="${attempts}${i}"]`
      );
      const userText = block.innerText;
      const correctText = correct[i];
      if (userText === correctText) {
        passed++;
        block.style.backgroundColor = "#6aaa64";
      } else if (correct.includes(userText)) {
        block.style.backgroundColor = "#c9b458";
      } else block.style.backgroundColor = "#787c7e";
      block.style.color = "white";
    }
    if (passed === 5) gameOver();
    nextLine();
  };

  const handleBackSpace = () => {
    if (index > 0) {
      const preBlock = document.querySelector(
        `.board-block[data-index="${attempts}${index - 1}"]`
      );
      preBlock.innerText = "";
      index--;
    }
  };

  const haneldKeyDown = (e) => {
    const key = e.key.toUpperCase();
    const keyCode = e.keyCode;
    const thisBlock = document.querySelector(
      `.board-block[data-index="${attempts}${index}"]`
    );
    if (e.key === "Backspace") handleBackSpace();
    else if (index === 5) {
      if (e.key === "Enter") handleEnterKey();
      else return;
    } else if (keyCode >= 65 && keyCode <= 90) {
      thisBlock.innerText = key;
      index++;
    }
  };

  const startTimer = () => {
    const startDate = new Date();
    function setTime() {
      const date = new Date();
      const preDate = new Date(date - startDate);
      const min = preDate.getMinutes().toString().padStart(2, "0");
      const sec = preDate.getSeconds().toString().padStart(2, "0");
      const timer = document.querySelector("#timer-date");
      timer.innerText = `${min}:${sec}`;
    }
    handletimer = setInterval(setTime, 1000);
  };

  startTimer();
  window.addEventListener("keydown", haneldKeyDown);
}
appStart();
