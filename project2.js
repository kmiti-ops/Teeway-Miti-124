//Khetiwe Miti 09/10/25

let myName = 'Khetiwe Miti'; // create and initialize a string variable named myName with your full name
let para1 = document.getElementById("p1"); //create and initialize a variable named para1 and set it equal to document.getElementById("p1");
para1.textContent = myName; //set para1.textContent = myName;

let n1 = 13; //create and initialize two number variables with the name n1 using any numeric values desired
let n2 = 25; //create and initialize two number variables with the name n2 using any numeric values desired
let numberSum = n1 + n2; //create and initialize a variable named numberSum to add the two numbers using their variable names
document.getElementById("p2").textContent = numberSum;//set document.getElementById("p2").textContent = numberSum;

let numberMult = n1 * n2; //create and initialize a variable named numberMult to multiply the two numbers using their variable names.
document.getElementById("p3").textContent = numberMult; //set document.getElementById("p3").textContent = numberMult;

let myNameAddNum = myName + n1; //create and initialize a variable named myNameAddNum to add one of your numeric variables to the string variable
document.getElementById("p4").textContent = myNameAddNum; //set document.getElementById("p4").textContent = myNameAddNum;
//(yes, you can add strings and numbers -- note the result)

let myNameMultNum = myName * n1; //create and initialize a variable named  to multiply one of your numeric variables to the string variable
document.getElementById("p5").textContent = myNameMultNum; //set document.getElementById("p5").textContent = myNameMultNum;
//(no, you cannot multiply, divide, or do any math (other than "add") on text -- note the result)

let age = 30;
let ageCompare = age < numberMult; //create and initialize a variable named ageCompare to compare your age (you can use a made-up, but realistic value) to the multiplication of your numeric variables (hint, use <, <=, >, or >= to do a comparison. The comparison will evaluate true or false).
document.getElementById("p6").textContent = ageCompare; //set document.getElementById("p6").textContent = ageCompare;




