const counterText = document.getElementById("counter");
let counter = 0;
let chislo = 0; 

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

chislo = getRandomNumber(1,10);
  	console.log(chislo);
function B1() {
  counter = 1;
  counterText.textContent = counter;
  if(counter == chislo){
  	chislo = getRandomNumber(1,10);
  	console.log(chislo);
  }
  else{
  	counter=0;
  	counterText.textContent = 'You Lose';
  }
}

const button = document.getElementById("1");
button.addEventListener("click", B1);

function B2() {
  counter = 2;
  counterText.textContent = counter;
    if(counter == chislo){
    chislo = getRandomNumber(1,10);
  	console.log(chislo);
  	}
  	 else{
  	counter=0;
  	counterText.textContent = 'You Lose';
  }
}

const button1 = document.getElementById("2");
button1.addEventListener("click", B2);

function B3() {
  counter = 3;
  counterText.textContent = counter;
    if(counter == chislo){
    chislo = getRandomNumber(1,10);
  	console.log(chislo);
  }
    else{
  	counter=0;
  	counterText.textContent = 'You Lose';
  }
}

const button2 = document.getElementById("3");
button2.addEventListener("click", B3);


function B4() {
  counter = 4;
  counterText.textContent = counter;
    if(counter == chislo){
    chislo = getRandomNumber(1,10);
  	console.log(chislo);
  }
    else{
  	counter=0;
  	counterText.textContent = 'You Lose';
  }
}

const button3 = document.getElementById("4");
button3.addEventListener("click", B4);


function B5() {
  counter = 5;
  counterText.textContent = counter;
    if(counter == chislo){
    chislo = getRandomNumber(1,10);
  	console.log(chislo);
  }
    else{
  	counter=0;
  	counterText.textContent = 'You Lose';
  }
}

const button4 = document.getElementById("5");
button4.addEventListener("click", B5);
