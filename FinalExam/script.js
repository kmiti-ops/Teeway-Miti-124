/*
Khetiwe Miti 10/30/2025
Final Exam — JavaScript Calculator

What I implemented (Behavior/Logic):
- Four functions that each use required loop types + '+=' to build strings:
  1) buildAddition(): for loop → num + 1..10
  2) buildSubtraction(): while loop → num - 1..10
  3) buildMultiplication(): do...while loop → num × 1..10
  4) buildDivision(): for loop → num ÷ 1..10 with .toFixed(2)
  */

'use strict';

function getNum() {
  const n = Number(document.getElementById('num').value);
  return Number.isFinite(n) ? n : 0;
}

/* Addition — for loop with += */
function buildAddition() {
  const num = getNum();
  let output = '';
  for (let i = 1; i <= 10; i++) {
    output += `${num} + ${i} = ${num + i}\n`;
  }
  document.getElementById('addition').textContent = output;
}

/* Subtraction — while loop with += */
function buildSubtraction() {
  const num = getNum();
  let output = '';
  let i = 1;
  while (i <= 10) {
    output += `${num} - ${i} = ${num - i}\n`;
    i++;
  }
  document.getElementById('subtraction').textContent = output;
}

/* Multiplication — do...while loop with += */
function buildMultiplication() {
  const num = getNum();
  let output = '';
  let i = 1;
  do {
    output += `${num} × ${i} = ${num * i}\n`;
    i++;
  } while (i <= 10);
  document.getElementById('multiplication').textContent = output;
}

/* Division — for loop with += and toFixed(2) */
function buildDivision() {
  const num = getNum();
  let output = '';
  for (let i = 1; i <= 10; i++) {
    output += `${num} ÷ ${i} = ${(num / i).toFixed(2)}\n`;
  }
  document.getElementById('division').textContent = output;
}

/* Wrapper function runs all four */
function runAllCalculations() {
  buildAddition();
  buildSubtraction();
  buildMultiplication();
  buildDivision();
}

/* Dynamic event listener (no inline onclick) */
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('calcBtn').addEventListener('click', runAllCalculations);
});


const count = window.matchMedia('(max-width: 600px)').matches ? 3 : 6;
for (let i = 0; i < count; i++) { /* spawn */ }
  





