//Boutons
const activateEl = document.getElementById("activate");
const pauseEl = document.getElementById("pause");
const divButtonEl = document.getElementById("pw-button");

//Minuteur
const timerEl = document.getElementById("timer");
const estimedtimeEl = document.getElementById("estimedtime");

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
const divInputEl = document.getElementById("pw-input")

//Hide buttons
function hideHUD() {
  divButtonEl.style.visibility='hidden';
  divInputEl.style.visibility='hidden';
}

//Show buttons
function showHUD() {
  divButtonEl.style.visibility='visible';
  divInputEl.style.visibility='visible'
}

//Convert to a timezone
function convertTZ(date, tzString) {
  return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {timeZone: tzString}));   
}

//Get estimed finish time
function produceEstimateTime(minutes) {
  var today = convertTZ(new Date(),'Europe/Paris');
  var dayestimation = new Date(today.getTime() + minutes*60000).getTime();
  var timestimation = new Date(dayestimation);
  var h = timestimation.getHours(); 
  var m = timestimation.getMinutes();
  var s = timestimation.getSeconds();

  estimedtimeEl.innerHTML = "Fin estimé : " + h + "h " + m + "m " + s + "s";
}

//timeUp
function timeUp() {
  timerEl.innerHTML = "Time's up!";
  estimedtimeEl.innerHTML = "";
}

activateEl.addEventListener("click", function(){
  var workValue = workValueEl.value;
  var timerWork = new Date(new Date().getTime() + workValue*60000).getTime();
  hideHUD();
  produceEstimateTime(workValue);

  var x = setInterval(function() {

    var now = new Date().getTime();

    var distance = timerWork - now;
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if(workValue < 61)
      timerEl.innerHTML = minutes + "m " + seconds + "s"; 
    else
      timerEl.innerHTML = hours + "h " + minutes + "m " + seconds + "s";
  
    if (distance < 0) {
      clearInterval(x);
      alarmSound.play();
      timeUp()
      showHUD();
      incrementCounter();
    }
  }, 1000);
});

pauseEl.addEventListener("click", function() {
  var breakValue = breakValueEl.value;
  var timerBreak = new Date(new Date().getTime() + breakValue*60000).getTime();
  hideHUD();
  produceEstimateTime(breakValue);

  var y = setInterval(function() {

    var now = new Date().getTime();

    var distance = timerBreak - now;
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if(breakValue < 61)
      timerEl.innerHTML = minutes + "m " + seconds + "s";
    else
      timerEl.innerHTML = hours + "h " + minutes + "m " + seconds + "s";

    if (distance < 0) {
      clearInterval(y);
      alarmSound.play();
      timeUp()
      showHUD();
    }
  }, 1000);
})

