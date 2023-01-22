let cards = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

let turn = 1;
let number = 0;

let cardsField = document.getElementById("cards");
let info = document.getElementById("info");
let cardNumber = document.getElementById("card");
let setCard = document.getElementById("set_card");
let rel = document.getElementById("reload");

cardNumber.value = 0;
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

cardsField.innerHTML = showCards(cards);

function removeCard(number) {
  cards.splice(number, 1);
  cardsField.innerHTML = showCards(cards);
}

function checkWin(who, card) {
  info.innerHTML = who + " take " + card;
  if (card == "Q") {
    info.innerHTML = who + " win";
    setCard.removeEventListener("click", play);
    setCard.disabled = true;
    return true;
  }
  return false;
}

function myMove() {
  let b = false;
  number = cardNumber.value;
  if (number > cards.length || number < 0) {
    throw new Error("Input error! Try again!");
  }
  if (checkWin("You ", cards[number])) {
    b = true;
  }
  //removeCard(number);

  setTimeout(removeCard.bind(null, number), 1000);
  return b;
}

function computerMove() {
  let b = false;
  number = Math.floor(Math.random(cards.length) + 1);
  if (checkWin("I ", cards[number])) {
    b = true;
  }
  // removeCard(number);

  setTimeout(removeCard.bind(null, number), 1000);
  return b;
}

function play(cards) {
  try {
    if (myMove()) return;
    setTimeout(computerMove, 2000);
  } catch (ex) {
    info.innerHTML = ex.message;
    myMove();
  }
}

function newPlay() {
  location.reload();
  return false;
}

setCard.addEventListener("click", play.bind(this, cards));
rel.addEventListener("click", newPlay);

// alert(cards);

// function play(cards) {
//   function checkWin(who, card) {
//     alert(card);
//     if (card == "Q") {
//       alert(who + " win");
//       return true;
//     }
//     return false;
//   }
//   let card;
//   while (cards.length) {
//     if (turn % 2 != 0) {
//       number = +prompt("Take the card! 0-" + cards.length);
//       if (isNaN(number) || (number > cards.length && number < 0)) return;
//       let card = cards[number];
//       if (checkWin("You ", card)) return;
//     } else {
//       number = Math.floor(Math.random(cards.length) + 1);
//       let card = cards[number];
//       if (checkWin("I ", card)) return;
//     }
//     cards.splice(number, 1);
//     alert(cards);
//     turn++;
//   }
// }
// play(cards);
