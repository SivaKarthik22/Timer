const startBtn = document.querySelector("#start");
const resetBtn = document.querySelector("#reset");
const hours = document.querySelector("#hours");
const minutes = document.querySelector("#minutes");
const seconds = document.querySelector("#seconds");
const progressBar = document.querySelector(".progress");

let givenTime;
let totalSecs;
let intervalId;
let barValue;

resetBtn.style.display = "none";

startBtn.addEventListener("click", ()=>{
    //pause functionality
    if(intervalId){
        clearInterval(intervalId);
        intervalId = null;
        startBtn.innerText = "Play";
    }

    else{
        //exclusive to start functionality
        if(startBtn.dataset.role == "starter"){
            if(readInputTime() === 0) //timer ended or no input given
                return;
            
            givenTime = readInputTime();
            totalSecs = givenTime;
            barValue = 100;

            disableInput();
            updateTimerUI();//to update the UI with distributed minutes and seconds correctly before starting the timer 
            startBtn.dataset.role = "pauser";
            resetBtn.style.display = "inline-block";
        }

        //for both start and play functionality
        intervalId = setInterval(timer, 1000);
        startBtn.innerText = "Pause";
    }
});

resetBtn.addEventListener("click", ()=>{
    if(!givenTime)
        return;
    totalSecs = givenTime;
    barValue = 100;
    clearInterval(intervalId);
    intervalId = null;
    updateTimerUI();
    enableInput();
});

hours.addEventListener("keydown", (event)=>{
    if(event.key == "Enter"){
        minutes.focus();
    }
});
minutes.addEventListener("keydown", (event)=>{
    if(event.key == "Enter"){
        seconds.focus();
    }
});
seconds.addEventListener("keydown", (event)=>{
    if(event.key == "Enter"){
        startBtn.click();
    }
});
document.addEventListener("keydown", (event)=>{
    if(event.code == "Space"){
        startBtn.click();
    }
});
hours.addEventListener("keypress", function(event){
    if(this.value.length > 1){
        event.preventDefault();
    }
});
minutes.addEventListener("keypress", function(event){
    if(this.value.length > 1){
        event.preventDefault();
    }
});
seconds.addEventListener("keypress", function(event){
    if(this.value.length > 1){
        event.preventDefault();
    }
});

function timer(){
    totalSecs--;
    barValue = Math.floor(totalSecs*100/givenTime);
    if(totalSecs < 0){
        clearInterval(intervalId);
        intervalId = null;
        alert("Time's Up!");
        enableInput();
        clearInputField();
    }
    else
        updateTimerUI();
}

function updateTimerUI(){
    let remHrs = Math.floor(totalSecs/3600);
    let remMins = Math.floor(totalSecs/60) - remHrs*60;
    let remSecs = Math.floor(totalSecs % 60);
    if(remHrs < 10)
        remHrs = "0" + remHrs;
    if(remMins < 10)
        remMins = "0" + remMins;
    if(remSecs < 10)
        remSecs = "0" + remSecs;
    hours.value = remHrs;
    minutes.value = remMins;
    seconds.value = remSecs;
    progressBar.style.width = `${barValue}%`;
}
function readInputTime(){
    let hrs = Number(hours.value);
    let mins = Number(minutes.value);
    let secs = Number(seconds.value);
    return hrs*3600 + mins*60 + secs;
}
function enableInput(){
    startBtn.innerText = "Start";
    startBtn.dataset.role = "starter";
    hours.disabled = false;
    minutes.disabled = false;
    seconds.disabled = false;
}
function disableInput(){
    hours.disabled = true;
    minutes.disabled = true;
    seconds.disabled = true;
}
function clearInputField(){
    hours.value = '';
    minutes.value = '';
    seconds.value = '';
}