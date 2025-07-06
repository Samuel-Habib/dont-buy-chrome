// background.js

chrome.runtime.onMessage.addListener((msg, sender) => {
  if (msg.openPopupInTab) {
    chrome.tabs.create({ url: chrome.runtime.getURL("popup.html") });
  }
});
