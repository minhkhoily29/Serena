const startedBt = document.getElementById("startedBt");
const welcome = document.getElementById("welcome-quote");
const container = document.getElementById("container");

const loginBt = document.getElementById("loginBt");
const uname = document.getElementById("uname");
const pass = document.getElementById("pass");
const msg = document.getElementById("loginMsg");

const forgotBt = document.getElementById("forgotBt");
const hint = document.getElementById("hint");

startedBt.addEventListener("click", () => {
  welcome.classList.remove("active");
  container.classList.add("active");
});

forgotBt.addEventListener("click", () => {
  hint.classList.toggle("show");

  // auto-hide after 2.5s (optional)
  if (hint.classList.contains("show")) {
    setTimeout(() => hint.classList.remove("show"), 2500);
  }
});

// optional: click outside closes hint
document.addEventListener("click", (e) => {
  const clickedHintArea = hint.contains(e.target) || forgotBt.contains(e.target);
  if (!clickedHintArea) hint.classList.remove("show");
});



const PASS = "2901dubaichocolate";
const USER_NAME = "riri";

loginBt.addEventListener("click", () => {
    const u = uname.value.trim().toLowerCase();
    const p = pass.value;
    if(u === USER_NAME.toLowerCase() && p === PASS) {
        msg.textContent = "Access granted ✨";
        window.location.href = "homepage.html";
    } else {
        msg.textContent = "na na na bu bu 😭";
    }
})