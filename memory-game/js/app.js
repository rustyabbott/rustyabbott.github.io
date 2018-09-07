const restart = $('.restart');
const deck = $('.deck');
const minutes = $('.minutes');
const seconds = $('.seconds');
const stars = $('.stars li');
const modal = $('#myModal');
const closeButton = $('.close');
const replayButton = $('.replay-button');
let allCards = $('.card');
let openedCards = [];
let matchedCards = [];
let sec = 0;
let timerId;
let moves = 0;
let counter = $('.moves');
let timerOff = true;
let finalMoves = $('.final-moves');
let finalStars = $('.final-stars');
let finalTime = $('.final-time');
let remainingStars = 5;

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

function timer() {
  seconds.html(pad(++sec%60));
  minutes.html(pad(parseInt(sec/60,10)));
}

function pad(val) {
  return val > 9 ? val : '0' + val;
}

function startTimer() {
  timerId = setInterval(timer, 1000);
  timerOff = false;
}

function stopTimer() {
  clearInterval(timerId);
}

function resetTimer() {
  sec = 0;
  minutes.html('00');
  seconds.html('00');
  timerOff = true;
}

function moveCounter() {
  moves++;
  counter.html(moves);
  moves > 10 ? (stars.first().hide(), remainingStars = 4) : '';
  moves > 15 ? ($('.stars li:nth-child(2)').hide(), remainingStars = 3) : '';
  moves > 20 ? ($('.stars li:nth-child(3)').hide(), remainingStars = 2) : '';
  moves > 25 ? ($('.stars li:nth-child(4)').hide(), remainingStars = 1) : '';
}

function resetCounter() {
  moves = 0;
  counter.html('0');
}

function showShuffleHide() {
  resetCounter();
  stars.show();
  allCards.removeClass('match').addClass('open show');
  setTimeout(shuffleCards, 2000);
  setTimeout(function() {
    allCards.removeClass('open show match');
  }, 3000);
  setTimeout(resetTimer, 3000);
}

function displayModal() {
  modal.css('display', 'block');
  finalMoves.html('Moves: ' + moves);
  finalStars.html('Stars: ' + remainingStars);
  finalTime.html('Time: ' + minutes.html() + ':' + seconds.html())
  replayButton.click(function(){
    modal.hide();
    showShuffleHide();
  })
}

closeButton.click(function() {
  modal.hide();
})

shuffleCards();

allCards.click(function (event) {
  timerOff ? startTimer() : '';
  let clickedCard = $(event.target);
  clickedCard.addClass('open show');
  openedCards.push(clickedCard);
  let numOfCards = openedCards.length;
  if (numOfCards === 2) {
    moveCounter();
    if (openedCards[0].html() == openedCards[1].html()) {
      openedCards[0].addClass('match');
      openedCards[1].addClass('match');
      matchedCards.push(clickedCard);
      if (matchedCards.length == 8) {
        stopTimer();
        displayModal();
      }
      openedCards = [];
    } else {
      setTimeout(function() {
        openedCards[0].removeClass('open show');
        openedCards[1].removeClass('open show');
        openedCards = [];
      }, 500);
    }
  }
})

restart.click(function() {
  stopTimer();
  showShuffleHide();
})
