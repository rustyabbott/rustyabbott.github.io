// Variables
const restart = $('.restart');
const deck = $('.deck');
let allCards = $('.card');

// Functions
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
  // Shuffle the cards
  let shuffledCards = shuffle(allCards);
  // Iterate through the cards and create/clone their html
  shuffledCards.each(function(){
    let card = $('<li>').append($(this).clone()).html();
    // Add the cards to the deck
    deck.append(card);
  })
}

function removeCards() {
  // Removes the first 16 cards
  $('.deck > li').slice(0,16).remove();
}


// When restart button clicked, show cards, shuffle cards, hide cards, reset timer, reset moves, reset stars.
restart.click(function() {
  $('.card').addClass('open show');
  setTimeout(shuffleCards, 2000);
  setTimeout(removeCards, 2000);
  setTimeout(function () {
    $('.card').removeClass('open show match');
  }, 4000);
})

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
