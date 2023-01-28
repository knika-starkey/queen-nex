let cards = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

let turn = 1;
let number = 0;

let cardsField = document.getElementById("cards");
let info = document.getElementById("info");
// let cardNumber = document.getElementById("card");
// let setCard = document.getElementById("set_card");
let rel = document.getElementById("reload");

let realCards = document.getElementById("real_cards");
let playedCardsField = document.getElementById("played_cards");

let congratDiv = document.getElementById("congrat");

let playedCards = [];

let isGame = true;

//cardNumber.value = 0;
info.innerHTML = "Take the card!";

function shuffle(arr) {
  let rand, temp;
  for (let i = 0; i < arr.length; i++) {
    rand = Math.floor(Math.random() * (i + 1));
    temp = arr[rand];
    arr[rand] = arr[i];
    arr[i] = temp;
  }
  return arr;
}

shuffle(cards);

function showCards(cards) {
  return cards.join(", ");
}
function tidy(s) {
  if (!isNaN(s)) {
    let ne = "&#9824;".repeat(s);
    return ne;
  } else return s;
}

cardsField.innerHTML = showCards(cards);

function generateCards(cards, cardsF, show = false) {
  cardsF.innerHTML = "";
  for (let i = 0; i < cards.length; i++) {
    cardsF.innerHTML += `<div id="rc_${cards[i]}" class="card ${
      show ? "" : "backCard"
    } ">${show ? cards[i] : ""}</div>`;
  }
}

function removeCard(number) {
  cards.splice(number, 1);
  cardsField.innerHTML = showCards(cards);
}

function addEventCardList() {
  let card_elements = document.getElementsByClassName("card");

  for (let i = 0; i < card_elements.length; i++) {
    card_elements[i].addEventListener("click", play);
  }
}

function removeCard(card) {
  playedCards.push(card);
  for (let i = 0; i < cards.length; i++) {
    if (cards[i] == card) number = i;
  }
  cards.splice(number, 1);

  cardsField.innerHTML = cards;

  generateCards(cards, realCards, false);

  generateCards(playedCards, playedCardsField, true);
  addEventCardList();
}

function newPlay() {
  location.reload();
  return false;
}

function play(event) {
  if (!isGame) return;
  let el = event.target;
  let elId = el.id;
  try {
    if (myMove(elId)) return;
    setTimeout(computerMove, 2000);
  } catch (ex) {
    info.innerHTML = ex.message;
  }
}

function myMove(elId) {
  let b = false;
  let card = elId.substr(3);
  if (checkWin("You ", card)) {
    b = true;
  } else {
    setTimeout(removeCard.bind(null, card), 1000);
  }
  return b;
}
function computerMove() {
  isGame = false;
  let b = false;
  number = Math.floor(Math.random() * cards.length);
  let card = cards[number];
  if (checkWin("I ", card)) {
    b = true;
  }
  setTimeout(removeCard.bind(null, card), 1000);
  isGame = true;
  return b;
}

function checkWin(who, card) {
  info.innerHTML = who + " take " + card;
  if (card == "Q") {
    info.innerHTML = who + " win";

    stop();
    fly();
    congratDiv.classList.remove("sized");
    congratDiv.innerHTML = who + " win!";
    return true;
  }
  return false;
}
function stop() {
  let card_elements = document.getElementsByClassName("card");
  for (let i = 0; i < card_elements.length; i++) {
    // card_elements[i].onclick = play.bind(this, cards);
    card_elements[i].removeEventListener("click", play);
  }
  isGame = false;
}
function fly() {
  let card_elements = document.getElementsByClassName("card");
  for (let i = 0; i < card_elements.length; i++) {
    card_elements[i].classList.add("opac-card");
    // card_elements[i].classList.add(`transition-delay: ${i * 50}ms;`);
    card_elements[i].style.transitionDelay = `${i * 200}ms`;
  }
}

window.onload = function () {
  generateCards(cards, realCards, false);
  addEventCardList();
  rel.addEventListener("click", newPlay);
};

// function checkWin(who, card) {
//   info.innerHTML = who + " take " + card;
//   if (card == "Q") {
//     info.innerHTML = who + " win";
//     setCard.removeEventListener("click", play);
//     setCard.disabled = true;
//     return true;
//   }
//   return false;
// }

// function myMove() {
//   let b = false;
//   number = cardNumber.value;
//   if (number > cards.length || number < 0) {
//     throw new Error("Input error! Try again!");
//   }
//   if (checkWin("You ", cards[number])) {
//     b = true;
//   }
//   //removeCard(number);

//   setTimeout(removeCard.bind(null, number), 1000);
//   return b;
// }

// function computerMove() {
//   let b = false;
//   number = Math.floor(Math.random(cards.length) + 1);
//   if (checkWin("I ", cards[number])) {
//     b = true;
//   }
//   // removeCard(number);

//   setTimeout(removeCard.bind(null, number), 1000);
//   return b;
// }

// function play(cards) {
//   try {
//     if (myMove()) return;
//     setTimeout(computerMove, 2000);
//   } catch (ex) {
//     info.innerHTML = ex.message;
//     //myMove();
//   }
// }

//setCard.addEventListener("click", play.bind(this, cards));
