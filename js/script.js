//Boutons
const activateEl = document.getElementById("activate");
const pauseEl = document.getElementById("pause");

//Minuteur
const timerEl = document.getElementById("timer");

//Fichier Mp3
const alarmSound = document.getElementById("alarm");

//Compteur
const countEl = document.getElementById("count");
var counter = 0;
countEl.innerHTML = "Session : " + counter;

function incrementCounter() {
  counter++
  countEl.innerHTML = "Session : " + counter;
}

activateEl.addEventListener("click", function(){
  var timerWork = new Date(new Date().getTime() + 25*60000).getTime();
  activateEl.style.visibility='hidden';
  pauseEl.style.visibility='hidden';

  var x = setInterval(function() {

    var now = new Date().getTime();

    var distance = timerWork - now;
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    timerEl.innerHTML = minutes + "m " + seconds + "s";

    if (distance < 0) {
      clearInterval(x);
      alarmSound.play();
      timerEl.innerHTML = "Time's up!";
      activateEl.style.visibility='visible';
      pauseEl.style.visibility='visible';
      incrementCounter();
    }
  }, 1000);
});

pauseEl.addEventListener("click", function() {
  var timerBreak = new Date(new Date().getTime() + 5*60000).getTime();
  activateEl.style.visibility='hidden';
  pauseEl.style.visibility='hidden';

  var y = setInterval(function() {

    var now = new Date().getTime();

    var distance = timerBreak - now;
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    timerEl.innerHTML = minutes + "m " + seconds + "s";
    
    if (distance < 0) {
      clearInterval(y);
      alarmSound.play();
      timerEl.innerHTML = "Time's up!";
      activateEl.style.visibility='visible';
      pauseEl.style.visibility='visible';
    }
  }, 1000);
})

