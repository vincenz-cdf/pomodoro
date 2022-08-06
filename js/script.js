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

//Inputs
const workValueEl = document.getElementById("workValue");
const breakValueEl = document.getElementById("breakValue"); 

//Hide buttons
function hideHUD() {
  activateEl.style.visibility='hidden';
  pauseEl.style.visibility='hidden';
  workValueEl.style.visibility='hidden';
  breakValueEl.style.visibility='hidden';
}

//Show buttons
function showHUD() {
  activateEl.style.visibility='visible';
  pauseEl.style.visibility='visible';
  workValueEl.style.visibility='visible';
  breakValueEl.style.visibility='visible';
}

activateEl.addEventListener("click", function(){
  var workValue = workValueEl.value;
  var timerWork = new Date(new Date().getTime() + workValue*60000).getTime();
  hideHUD();

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
      showHUD();
      incrementCounter();
    }
  }, 1000);
});

pauseEl.addEventListener("click", function() {
  var breakValue = breakValueEl.value;
  var timerBreak = new Date(new Date().getTime() + breakValue*60000).getTime();
  hideHUD();

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
      showHUD();
    }
  }, 1000);
})

