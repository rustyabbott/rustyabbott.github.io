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
function openNav() {
  document.getElementById('mySidenav').style.width = '250px';
}

function closeNav() {
  document.getElementById('mySidenav').style.width = '0';
}
