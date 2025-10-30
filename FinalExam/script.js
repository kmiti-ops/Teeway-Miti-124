
'use strict'

function buildAddition() {
  const num = Number(document.getElementById("num").value);
  let output = "";
  for (let i = 1; i <= 10; i++) {
    output += `${i} + ${num} = ${i + num}\n`;
  }
  document.getElementById("addition").textContent = output;
document.getElementById("calcBtn").addEventListener("click", buildAddition);
}


function buildSubtraction() {
  const num = Number(document.getElementById("num").value);
  let output = "";
  let i = 1;
  while (i <= 10) {
    output += `${i} - ${num} = ${i - num}\n`;
    i++; 
  }
  document.getElementById("subtraction").textContent = output;
document.getElementById("calcBtn").addEventListener("click", buildSubtraction);
}


function buildMultiplication() {
  const num = Number(document.getElementById("num").value);
  let output = "";
  let i = 1;
  do {
    output += `${i} × ${num} = ${i * num}\n`;
    i++;
  } while (i <= 10);
  document.getElementById("multiplication").textContent = output;
  document.getElementById("calcBtn").addEventListener("click", buildMultiplication);
}


function buildDivision() {
  const num = Number(document.getElementById("num").value);
  let output = "";
  for (let i = 1; i <= 10; i++) {
    const result = (i / num).toFixed(2);
    output += `${i} ÷ ${num} = ${result}\n`;
  }
  document.getElementById("division").textContent = output;
document.getElementById("calcBtn").addEventListener("click", buildDivision);

}

function runAllCalculations() {
  buildAddition();
  buildSubtraction();
  buildMultiplication();
  buildDivision();
}


function runAllCalculations() {
  const num = Number(document.getElementById("num").value);
  buildAddition(num);
  buildSubtraction(num);
  buildMultiplication(num);
  buildDivision(num);
}
document.getElementById("calcBtn").addEventListener("click", runAllCalculations);


const count = window.matchMedia('(max-width: 600px)').matches ? 3 : 6;
for (let i = 0; i < count; i++) { /* spawn */ }
  



