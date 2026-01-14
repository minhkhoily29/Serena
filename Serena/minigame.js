const subBt = document.getElementById("submit");
const firstChoice = document.getElementById("a1");
const secondChoice = document.getElementById("a2");
const thirdChoice = document.getElementById("a3");
const fourthChocie = document.getElementById("a4");
const answer = document.getElementById("answer");
const reset = document.getElementById("reset");
const question = document.getElementById("question");
const header = document.getElementById("qHeader");

let counter = 0;
const quesBank = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];
const aBank = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];
const bBank = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];
const cBank = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];
const dBank = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];

document.getElementById("mulChoice").addEventListener("submit", function(e){
    e.preventDefault();
    const selected = document.querySelector('input[name="q1"]:checked');
    
    if(!selected) {
        alert("Please select an answer!");
        return;
    }

    console.log("Selected answer:", selected.value);
}) 
