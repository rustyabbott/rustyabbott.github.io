const restart = $('.restart');
const deck = $('.deck');
const minutes = $('.minutes');
const seconds = $('.seconds');
let allCards = $('.card');
let openedCards = [];
let matchedCards = [];
let sec = 0;
let timerId;

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function shuffleCards() {
  const allCardsArray = allCards.toArray();
  const shuffledCards = shuffle(allCardsArray);
  for (card of shuffledCards) {
    deck.append(card);
  }
}

function pad(val) {
  return val > 9 ? val : "0" + val;
}

function timer() {
  seconds.html(pad(++sec%60));
  minutes.html(pad(parseInt(sec/60,10)));
}

function startTimer() {
  timerId = setInterval(timer, 1000);
}

function stopTimer() {
  clearInterval(timerId);
}

function resetTimer() {
  sec = 0;
  minutes.html('00');
  seconds.html('00');
}

shuffleCards();

allCards.click(function (event) {
  minutes.html() == 00 && seconds.html() == 00 ? startTimer() : '';
  let clickedCard = $(event.target);
  clickedCard.addClass('open show');
  openedCards.push(clickedCard);
  let numOfCards = openedCards.length;
  if (numOfCards === 2) {
    if (openedCards[0].html() == openedCards[1].html()) {
      openedCards[0].addClass('match');
      openedCards[1].addClass('match');
      matchedCards.push(clickedCard);
      if (matchedCards.length == 8) {
        alert("Game complete!");
        stopTimer();
      }
      openedCards = [];
    } else {
      setTimeout(function() {
        openedCards[0].removeClass('open show');
        openedCards[1].removeClass('open show');
        openedCards = [];
      }, 1000);
    }
  }
})

restart.click(function() {
  stopTimer();
  allCards.addClass('open show');
  setTimeout(shuffleCards, 2000);
  setTimeout(function() {
    allCards.removeClass('open show match');
  }, 4000);
  setTimeout(resetTimer, 5000);
  setTimeout(startTimer, 6000);
})
