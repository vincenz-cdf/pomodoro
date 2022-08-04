const activateEl = document.getElementById("activate");
const timerEl = document.getElementById("timer");
const alarmSound = document.getElementById("alarm");

activateEl.addEventListener("click", function(){
  activateEl.style.visibility='hidden';
  var timeleft = 3;

  var downloadTimer = setInterval(function function1(){
    timerEl.innerHTML = timeleft + 
  " "+"seconds remaining";

  timeleft -= 1;
  if(timeleft <= 0){
      clearInterval(downloadTimer);
      alarmSound.play();
      timerEl.innerHTML = "Time is up!"
  }
  }, 1000);
});



