import "../css/style.css";
import one from "../images/1.png";
import two from "../images/2.png";
import three from "../images/3.png";
import four from "../images/4.png";
import five from "../images/5.png";
import six from "../images/6.png";

// Import all of Bootstrap's JS
import * as bootstrap from "bootstrap";

let player1 = document.getElementById("player1");
let player1Name = document.getElementById("player1Name");
let player2 = document.getElementById("player2");
let player2Name = document.getElementById("player2Name");
let welcomepage = document.getElementById("welcomepage");
let betRecipe = document.getElementById("betRecipe");

let step1 = document.getElementById("step1");
let step2 = document.getElementById("step2");
let step3 = document.getElementById("step3");
let gameStep = document.getElementById("gameStep");
let resultStep = document.getElementById("resultStep");

let step2Text = document.getElementById("step2Text");
let step3Text = document.getElementById("step3Text");
let nextBtn = document.getElementById("nextBtn");
let submitBtn = document.getElementById("submitBtn");
let beginBtn = document.getElementById("beginBtn");
let diceImage1 = document.getElementById("diceImage1");
let rollBtn = document.getElementsByClassName("rollBtn");
let passBtn = document.getElementsByClassName("passBtn");

let player1Status = document.getElementById("player-1-status");
let player2Status = document.getElementById("player-2-status");
let activePlayer = 1;
let temp_score = 0;
let totalScore = [0, 0];

let p1Name;
let p2Name;
step2.style.display = "none";
step3.style.display = "none";

gameStep.style.display = "none";
resultStep.style.display = "none";

player2Status.style.display = "none";
console.log(p1Name, p2Name);

const nextStep = () => {
  step1.style.display = "none";
  step2.style.display = "block";
  p1Name = player1.value;
  p2Name = player2.value;
  console.log(p1Name, p2Name);
  step2Text.textContent = `
  Hey ${p1Name} and ${p2Name} select your favorite thing that you want to bet on.
  `;
};

const finalStep = () => {
  step2.style.display = "none";
  step3.style.display = "block";
  step3Text.textContent = `
    Hey ${p1Name} and ${p2Name}The first to reach 50 score wins the game
     and throughout your game, the algo will monitor your dice and at any
      given time, if you get 1 on your dice, 
      your entire score will be halved and dice will shifted. so in case you want to be safe side, 
      you can pass the dice by clicking the button. Good Luck :)
    `;
  document.getElementById("betReicpetext").textContent = betRecipe.value;
};

const beginGame = () => {
  welcomepage.style.display = "none";
  gameStep.style.display = "block";
  player1Name.textContent = p1Name;
  player2Name.textContent = p2Name;
};

const checkWinner = () => {
  if (totalScore[activePlayer - 1] >= 50) {
    gameStep.style.display = "none";
    resultStep.style.display = "block";

    let winner, opponent;
    if (activePlayer == 1) {
      winner = p1Name;
      opponent = p2Name;
    } else {
      winner = p2Name;
      opponent = p1Name;
    }
    console.log("winner", winner, activePlayer);

    document.getElementById("winner").textContent = winner;
    let opponents = document.getElementsByClassName("opponent");
    document.getElementById("wonRecipe").textContent = betRecipe.value;
    for (var i = 0; i < opponents.length; i++) {
      opponents[i].textContent = opponent;
    }

    var currentDate = new Date();

    var currentHour = currentDate.getHours();
    var wishes;
    if (currentHour >= 5 && currentHour < 12) {
      wishes = "Morning";
    } else if (currentHour >= 12 && currentHour < 17) {
      wishes = "Afternoon";
    } else if (currentHour >= 17 && currentHour < 21) {
      wishes = "Evening";
    } else {
      wishes = "Night";
    }
    document.getElementById("wishes").textContent = wishes;
  }
};

const changeDice = () => {
  console.log("active palyer is", activePlayer);
  let diceImage = document.getElementById("diceImage" + activePlayer);
  diceImage.classList.add("rolling");
  let dice_no = Math.floor(Math.random() * 6);
  dice_no = dice_no + 1;
  if (dice_no == 1) {
    totalScore[activePlayer - 1] = Math.floor(
      (totalScore[activePlayer - 1] + temp_score) / 2
    );

    checkWinner();

    temp_score = 0;
    document.getElementById(
      "player-" + activePlayer + "-current-score"
    ).textContent = temp_score;
    document.getElementById(
      "player-" + activePlayer + "-total-score"
    ).textContent = totalScore[activePlayer - 1];
    activePlayer == 1 ? switchPlayerTo(2) : switchPlayerTo(1);
  } else {
    temp_score = temp_score + dice_no;
    document.getElementById(
      "player-" + activePlayer + "-current-score"
    ).textContent = temp_score;
    console.log("else temp score", temp_score);
  }
  // let image = `../images/${dice_no}.png`;
  let image;
  if (dice_no == 1) {
    image = one;
  } else if (dice_no == 2) {
    image = two;
  } else if (dice_no == 3) {
    image = three;
  } else if (dice_no == 4) {
    image = four;
  } else if (dice_no == 5) {
    image = five;
  } else {
    image = six;
  }
  // let image = `images/${dice_no}.png`;
  diceImage.setAttribute("src", image);
  console.log(dice_no);
  diceImage.classList.remove("rolling");
};

const switchPlayerTo = (currentplayer) => {
  totalScore[activePlayer - 1] = totalScore[activePlayer - 1] + temp_score;
  temp_score = 0;
  console.log("temp score", temp_score);
  document.getElementById(
    "player-" + activePlayer + "-current-score"
  ).textContent = temp_score;
  document.getElementById(
    "player-" + activePlayer + "-total-score"
  ).textContent = totalScore[activePlayer - 1];
  checkWinner();
  activePlayer = currentplayer;

  console.log("shifiting to player", activePlayer);
  if (activePlayer == 1) {
    player1Status.style.display = "block";
    player2Status.style.display = "none";
  } else {
    player1Status.style.display = "none";
    player2Status.style.display = "block";
  }
};

nextBtn.addEventListener("click", nextStep);
submitBtn.addEventListener("click", finalStep);
beginBtn.addEventListener("click", beginGame);
rollBtn[0].addEventListener("click", changeDice);
rollBtn[1].addEventListener("click", changeDice);
passBtn[0].addEventListener("click", function () {
  switchPlayerTo(2);
});
passBtn[1].addEventListener("click", function () {
  switchPlayerTo(1);
});



// Date and Time
function showDateTime() {
  const currentDate = new Date();

  // Format the date 
  const formattedDate = currentDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Format the time
  const formattedTime = currentDate.toLocaleTimeString("en-US");
  const dateTime = `${formattedDate} - ${formattedTime}`;
  document.getElementById("dateTimeDisplay").textContent = dateTime;
}

// Call the function initially
setInterval(showDateTime, 1000);


