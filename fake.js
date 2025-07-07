(function fake() {
  if (document.getElementById("dont-buy-popup")) return;

  // const wagGif = chrome.runtime.getURL("assets/wag.gif");
  const wagGifLicenced = `<iframe src="https://giphy.com/embed/W5TK77IYd83Qw9wSEi" width="480" height="480" style="" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/stickers/Emoji-transparent-W5TK77IYd83Qw9wSEi">via GIPHY</a></p>`


  const wrapper = document.createElement("div");
  wrapper.id = "dont-buy-popup";
  wrapper.style = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 250px;
    background: #222;
    color: white;
    padding: 16px;
    border-radius: 12px;
    z-index: 999999;
  `;

  // MAIN

  

  const main = document.createElement("div");
  main.id = "dont-buy-main";
  wrapper.appendChild(main);

  const title = document.createElement("h1");
  title.id = "dont-buy-title";
  title.style =
    "display: flex; justify-content: center; font-size: 20px; margin: 0;";
  main.appendChild(title);
 
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

  const randomTitle = titles[Math.floor(Math.random() * titles.length)];
  title.textContent = randomTitle;

  const img = document.createElement("img");
  img.src = wagGif;
  img.alt = "wag wag";
  img.style = "width: 100%; margin-bottom: 10px;";
  // main.appendChild(img);

  main.appendChild(wagGifLicenced);

  const needButton = document.createElement("button");
  needButton.id = "needBtn";
  needButton.textContent = "NEED";
  needButton.style = `display: block; width: 100%; margin-bottom: 10px; padding: 10px; background: green; color: white; border: none; border-radius: 6px; font-size: 16px; cursor: pointer;`;
  main.appendChild(needButton);
  needButton.addEventListener("click", () => {
    main.style.display = "none";
    document.getElementById("need-view").style.display = "block";
    setTimeout(() => {
      wrapper.remove();
    }, 1000);
  });
  const wantButton = document.createElement("button");
  wantButton.id = "wantBtn";
  wantButton.textContent = "WANT";
  wantButton.style = `display: block; width: 100%; padding: 10px; background: red; color: white; border: none; border-radius: 6px; font-size: 16px; cursor: pointer;`;
  main.appendChild(wantButton);

  // NEED

  const needView = document.createElement("div");
  needView.id = "need-view";
  needView.style.display = "none";
  wrapper.appendChild(needView);
  const needTitle = document.createElement("h2");
  needTitle.textContent = "Fair Enough, Essentials are Essential";
  needTitle.style = "text-align: center; margin-bottom: 10px;";
  needView.appendChild(needTitle);

  // WANT

  document.body.appendChild(wrapper);
})();
