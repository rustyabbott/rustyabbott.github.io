// Service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
  .register('/sw.js')
  .catch(function(err) {
    console.log(err);
  })
} else {
  console.log('Service worker not in navigtor');
}

// Side navigation panel
const mySidenav = $('#mySidenav');
const burger = $('.fa-bars');

function openNav() {
  mySidenav.css('width', '250px');
}

function closeNav() {
  mySidenav.css('width', 0);
}

// Close side navigation panel by clicking outside of it
$(document).click(function(e) {
  if (!mySidenav.is(e.target) && !burger.is(e.target)) {
    mySidenav.css('width', 0);
  }
});

// Expand and collapse the rubric
const rubric = $('.rubric');
const rubricToggle = $('.rubric-toggle');

rubricToggle.click(function() {
  rubric.slideToggle('slow');
})

// Expand and collapse step setup
const setup = $('.setup');
const setupToggle = $('.setup-toggle');

setupToggle.click(function() {
  setup.slideToggle('slow');
})
