// content.js


var mainActive = true;
localStorage.setItem("ignored", false);

function fake(mainActive) {
	if (document.getElementById("dont-buy-popup")) return;

	const wagGif = chrome.runtime.getURL("assets/wag.gif");
	const wagGifLicenced = `<iframe src="https://giphy.com/embed/W5TK77IYd83Qw9wSEi" width="480" height="480" style="" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/stickers/Emoji-transparent-W5TK77IYd83Qw9wSEi">via GIPHY</a></p>`;


	// The wrapper is the base of the the fake -- with nothing on top it is a rectangle with a small height 


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

	// Exit button

	const redButton= document.createElement("button");
	redButton.id = "exit-button";
	wrapper.appendChild(redButton);
	redButton.style = `all: unset; margin-bottom: 10px; margin-right: 10px; position: absolute; top: 10px; left: 10px; width: 20px; height: 20px; cursor: pointer; z-index: 1000000;`;


	const redButtonDiv = document.createElement("div");
	redButtonDiv.id = "exit-button-div";
	redButtonDiv.style = `
	display: flex;
	justify-content: left;
	width: 10px;
	height: 10px;
	background-color: red;
	border-radius: 50%;
	`
	redButton.appendChild(redButtonDiv);

	redButton.addEventListener("click", () => {
		wrapper.remove();
		localStorage.setItem("ignored", true);
		mainActive = false;
	});

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
		"This isn't youuuuu pookie!!",
		"Stop it, get some help",
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
	main.appendChild(img);

	const iframeDiv = document.createElement("div");
	iframeDiv.innerHTML = wagGifLicenced;
	// main.appendChild(iframeDiv);

	// Didn't Buy Button

	const didntBuyButton = document.createElement("button");
	didntBuyButton.id = "didnt-buy-btn";
	didntBuyButton.textContent = "DIDN'T BUY";
	didntBuyButton.style = `display: block; width: 100%; margin-bottom: 10px; padding: 10px; background: blue; color: white; border: none; border-radius: 6px; font-size: 16px; cursor: pointer;`;
	main.appendChild(didntBuyButton);
	didntBuyButton.addEventListener("click", () => {
		main.style.display = "none";
		document.getElementById("didnt-view").style.display = "block";
		main.remove();
	});

	// WANT BUTTON
	const wantButton = document.createElement("button");
	wantButton.id = "wantBtn";
	wantButton.textContent = "WANT";
	wantButton.style = `display: block; width: 100%; margin-bottom:10px; padding: 10px; background: red; color: white; border: none; border-radius: 6px; font-size: 16px; cursor: pointer;`;
	main.appendChild(wantButton);


	// NEED BUTTON
	const needButton = document.createElement("button");
	needButton.id = "needBtn";
	needButton.textContent = "NEED";
	needButton.style = `display: block; width: 100%; margin-bottom: 10px; padding: 10px; background: green; color: white; border: none; border-radius: 6px; font-size: 16px; cursor: pointer;`;
	main.appendChild(needButton);
	needButton.addEventListener("click", () => {
		mainActive = false;
		console.log("Need button clicked, mainActive set to false");
		main.style.display = "none";
		document.getElementById("need-view").style.display = "block";

		//		setTimeout(()=> {
			main.remove();
			//		}, 1000);
	});

	// DIDN'T BUY VIEW
	const didntView = document.createElement("div");
	didntView.id = "didnt-view";
	didntView.style.display = "none";
	wrapper.appendChild(didntView);
	const didntTitle = document.createElement("h2");
	didntTitle.textContent = "Good Choice, You Didn't Buy It";
	didntTitle.style = "text-align: center; margin-bottom: 10px;";
	didntView.appendChild(didntTitle);

	// NEED View

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
}

console.log("✅ content.js loaded");

const buyButtonNames = [
	"Add to cart",
	"Buy now",
	"Add to Bag",
	"Add to Basket",
	"Purchase",
	"Order Now",
	"Checkout",
	"Get it now",
];


var interval = 1000;

let intervalId = setInterval(() => {
	const intervalIgnore = localStorage.getItem("ignored")
	if(intervalIgnore){ 
		interval = 30000;
		clearInterval(intervalId);
	};

	for (const name of buyButtonNames) {
		const xpathExpression = `//*[contains(text(), "${name}")]`;
		const result = document.evaluate(
			xpathExpression,
			document,
			null,
			XPathResult.BOOLEAN_TYPE,
			null
		);

		console.log(`Checking for "${name}"...`, result.booleanValue);

		if (result.booleanValue && mainActive) {
			console.log(`🛑 Found Buy/Cart: ${name}`);
			console.log(mainActive)
			fake(mainActive);
			console.log(mainActive)
			return;
		}
	}

	// DEBUG
	// console.log("Checking...");
	// console.log("XPath Result:", xpathResult.booleanValue);
}, interval);

