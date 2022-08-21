//Boutons
const activateEl = document.getElementById("activate");
const pauseEl = document.getElementById("pause");
const divButtonEl = document.getElementById("pw-button");

//Minuteur
const timerEl = document.getElementById("timer");
const estimedtimeEl = document.getElementById("estimedtime");
const depassementEl = document.getElementById("depassement");

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

function nullfyTimer() {
  timerEl.innerHTML="";
  estimedtimeEl.innerHTML="";
}

//temps écoulé!
function timeUp() {
  var s = 0;
  nullfyTimer()
  depassementEl.style.visibility='visible';
  var z = setInterval(function() {
    s=++s;
    depassementEl.innerHTML = "dépassement : " + s + "s";
  },1000)
  activateEl.addEventListener("click", function(){
    clearInterval(z);
    depassementEl.style.visibility='hidden';
  });
  pauseEl.addEventListener("click", function(){
    clearInterval(z);
    depassementEl.style.visibility='hidden';
  });
}

activateEl.addEventListener("click", function clickBOSSER(){
  var workValue = workValueEl.value;
  const status = 1;
  hideHUD();
  produceEstimateTime(workValue);
  timeEngine(workValue, status);
});

pauseEl.addEventListener("click", function clickPAUSE() {
  var breakValue = breakValueEl.value;
  const status = 0;
  hideHUD();
  produceEstimateTime(breakValue);
  timeEngine(breakValue, status);
});

function timeEngine(input,inputstatus) {

  var value = input;
  var status = inputstatus;
  var timeToday = new Date(new Date().getTime() + value*60000).getTime();
  var x = setInterval(function() {

    var now = new Date().getTime();

    var distance = timeToday - now;
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if(value < 61)
      timerEl.innerHTML = minutes + "m " + seconds + "s"; 
    else
      timerEl.innerHTML = hours + "h " + minutes + "m " + seconds + "s";
  
    if (distance < 0) {
      clearInterval(x);
      alarmSound.play();
      timeUp()
      showHUD();
      if (status == 1)
        incrementCounter();
    }
  }, 1000);
}