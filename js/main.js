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
const mySidenav = document.getElementById('mySidenav');
let isOpen = false;

function openNav() {
  mySidenav.style.width = '250px';
}

function closeNav() {
  mySidenav.style.width = '0';
}
