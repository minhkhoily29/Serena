// script.js — for your HTML with .choiceText spans

// ===== Elements =====
const questionEl = document.querySelector(".question");
const qHeaderEl = document.querySelector(".qHeader");
const formEl = document.getElementById("mulChoice");

const submitBtn = document.getElementById("submit");
const resetBtn = document.getElementById("reset");
const answerEl = document.getElementById("answer");

const radios = formEl.querySelectorAll('input[type="radio"][name="choice"]');
const choiceTexts = formEl.querySelectorAll(".choiceText");
const choiceLabels = formEl.querySelectorAll("label.choice");

// ===== Quiz data =====
const quiz = [
  {
    header: "Question 1",
    question: "What is today date?",
    choices: ["January 27", "February 14", "December 25", "April 1"],
    correctIndex: 0,
  },
  {
    header: "Question 2",
    question: "Pick the cutest vibe ✨",
    choices: ["Sailor Moon", "Froakie", "Both", "Too hard"],
    correctIndex: 2,
  },
  {
    header: "Question 3",
    question: "What do you say to Serena today?",
    choices: ["Happy birthday!", "Good morning!", "Good luck!", "Nice to meet you!"],
    correctIndex: 0,
  },
];

// ===== State =====
let current = 0;
let score = 0;
let answered = false;

// ===== Helpers =====
function showAnswer(text) {
  answerEl.textContent = text;
  answerEl.style.display = "block";
}

function hideAnswer() {
  answerEl.style.display = "none";
  answerEl.textContent = "";
}

function clearSelection() {
  radios.forEach((r) => (r.checked = false));
  choiceLabels.forEach((l) => l.classList.remove("selected"));
}

function loadQuestion(i) {
  const q = quiz[i];

  qHeaderEl.textContent = q.header;
  questionEl.textContent = q.question;

  // Update the visible option text (span), NOT the whole label
  choiceTexts.forEach((span, idx) => {
    span.textContent = q.choices[idx] ?? "";
  });

  // Ensure values are correct (0..3)
  radios.forEach((r, idx) => (r.value = String(idx)));

  clearSelection();
  hideAnswer();
  answered = false;

  submitBtn.textContent = "Submit";
  submitBtn.style.display = "inline-block";
  submitBtn.disabled = false;

  resetBtn.style.display = "none";
}

function getSelectedIndex() {
  const selected = formEl.querySelector('input[name="choice"]:checked');
  return selected ? Number(selected.value) : null;
}

function endGame() {
  submitBtn.style.display = "none";
  resetBtn.style.display = "inline-block";
  showAnswer(`Game over! 🎉 Score: ${score} / ${quiz.length}`);
}

// ===== Nice: highlight selected option =====
radios.forEach((radio) => {
  radio.addEventListener("change", () => {
    choiceLabels.forEach((l) => l.classList.remove("selected"));
    const label = radio.closest("label.choice");
    if (label) label.classList.add("selected");
  });
});

// ===== Events =====
submitBtn.addEventListener("click", () => {
  if (!answered) {
    const selectedIndex = getSelectedIndex();
    if (selectedIndex === null) {
      showAnswer("Pick an answer first 😄");
      return;
    }

    const q = quiz[current];
    answered = true;

    if (selectedIndex === q.correctIndex) {
      score++;
      showAnswer(`Correct ✅  (Score: ${score}/${quiz.length})`);
    } else {
      showAnswer(`Wrong 😅  Correct: ${q.choices[q.correctIndex]}  (Score: ${score}/${quiz.length})`);
    }

    submitBtn.textContent = current === quiz.length - 1 ? "Finish" : "Next";
    return;
  }

  // answered === true → next question
  current++;
  if (current >= quiz.length) endGame();
  else loadQuestion(current);
});

resetBtn.addEventListener("click", () => {
  current = 0;
  score = 0;
  answered = false;
  loadQuestion(current);
});

// ===== Start =====
loadQuestion(current);
