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
    question: "WHO'S BIRTHDAY IS IT",
    choices: ["Serena", "Khoi", "Koi", "Poopy head"],
    correctIndex: 0,
  },
  {
    header: "Question 2",
    question: "Where are we going tomorrow✨",
    choices: ["Zootopia", "Nicolino", "Orange chicken and lo mein", "Panda tea"],
    correctIndex: 2,
  },
  {
    header: "Question 3",
    question: "What do you say to Serena today?",
    choices: ["Happy birthday!", "Where's my money at", "Yawn", "Yo!"],
    correctIndex: 0,
  },
  {
    header: "Question 4",
    question: "What will Serena say when she is mad?",
    choices: ["mimimimi", "Mommmm", "ok now partner", "nananabubu"],
    correctIndex: 3,
  },
  {
    header: "Question 5",
    question: "What's Weewee favorite snacks?",
    choices: ["Chips", "Mochi", "Kitkat", "sour patch kids"],
    correctIndex: 1,
  },
  {
    header: "Question 6",
    question: "Which show did Serena like to role-play as a kid?",
    choices: ["Tom and Jerry", "Sailor Moon", "Avatar", "Totally Spies!"],
    correctIndex: 3,
  },
  {
    header: "Question 7",
    question: "If you are Serena and you are hungry what would you eat?",
    choices: ["Nothing", "McDonald's", "Imma cook myself something", "hotpot"],
    correctIndex: 1,
  },
  {
    header: "Question 8",
    question: "How pretty is Serena?",
    choices: ["Freaking beautiful", "infinity/10", "breath takingly pretty", "All of the above"],
    correctIndex: 3,
  },
  {
    header: "Question 9",
    question: "Who's Serena most favorite actor?",
    choices: ["Jonathan Bailey", "Kanye West", "Michael B Jordan", "Will Smith"],
    correctIndex: 0,
  },
  {
    header: "Question 10",
    question: "What is one of the gift that Serena is getting tomorrow?",
    choices: ["Nothing", "scarf", "nananabubu", "a cat"],
    correctIndex: 3,
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
