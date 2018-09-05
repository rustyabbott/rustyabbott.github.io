const restart = $('.restart');
const deck = $('.deck');
let allCards = $('.card');
let openedCards = [];
let matchedCards = [];
let sec = 0;

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
  let shuffledCards = shuffle(allCards);
  shuffledCards.each(function(){
    let card = $('<li>').append($(this).clone()).html();
    deck.append(card);
  })
  $('.deck > li').slice(0,16).remove();
}

function pad(val) {
  return val > 9 ? val : "0" + val;
}

function timer() {
  setInterval(function(){
    $('.seconds').html(pad(++sec%60));
    $('.minutes').html(pad(parseInt(sec/60,10)));
  }, 1000);
}

allCards.click(function (event) {
  let minutes = $('.minutes').html(),
      seconds = $('.seconds').html();
  minutes == 00 && seconds == 00 ? timer() : '';
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
      }
      openedCards = [];
    } else {
      setTimeout(function() {
        openedCards[0].removeClass('open show');
        openedCards[1].removeClass('open show');
        openedCards = [];
      }, 1500);
    }
  }
})

restart.click(function() {
  $('.card').addClass('open show');
  setTimeout(shuffleCards, 2000);
  setTimeout(function() {
    $('.card').removeClass('open show match');
  }, 4000);
  setTimeout(timer, 4000);
})
