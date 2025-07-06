const needView = document.getElementById("need-view");
const wantView = document.getElementById("want-view");
const main = document.getElementById("main");
const title = document.getElementById("title");

const titles = [
  "This isn't youuuuu",
  "Zon't zo it",
  "Here we go again",
  "Just ...don't, k?",
  "Okay... let's not do that",
  "Please, no",
  "GOD NO GOOOOOD NOOOOO",
  "Please don't",
  "You don't want this",
  "You don't need this",
];

// Randomly select a title from the titles array
const randomTitle = titles[Math.floor(Math.random() * titles.length)];
title.textContent = randomTitle;

main.style.display = "none";

document.getElementById("goToNeed").addEventListener("click", () => {
  main.style.display = "none";
  needView.style.display = "block";
});

// Placeholder for "WANT" button logic
document.getElementById("wantBtn").addEventListener("click", () => {
  main.style.display = "none";
  wantView.style.display = "block";
});

document.querySelectorAll(".back-to-main").forEach((button) => {
  button.addEventListener("click", () => {
    main.style.display = "block";
    needView.style.display = "none";
    wantView.style.display = "none";
  });
});

document.getElementById("scanBuy").addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });



  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["fake.js"],
  });


});

