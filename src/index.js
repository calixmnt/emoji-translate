let data = require("unicode-emoji-json");
let keywordSet = require("emojilib");

for (const emoji in data) {
  if (keywordSet[emoji]) {
    data[emoji]["keywords"] = keywordSet[emoji];
  } else {
    data[emoji]["keywords"] = [];
  }
}

const entryTextAreaEl = document.querySelector(".entry__textarea");
const resultsBoxEl = document.querySelector(".results-box");

const emojiIt = (text) => {
  let matchingEmojis = [];

  for (const emoji in data) {
    if (data[emoji]["keywords"]) {
      const match = data[emoji]["keywords"].find((keyword) =>
        keyword.includes(text)
      );
      if (match) {
        matchingEmojis.push(emoji);
      }
    }
  }
  return matchingEmojis.length > 0 ? matchingEmojis : [text];
};

const appendHtmlEl = (elToAppend) => {
  resultsBoxEl.insertAdjacentElement("beforeend", elToAppend);
};

const inputHandler = (e) => {
    const entryEmoji = emojiIt(e.target.value);
  
    if (entryEmoji.length > 1) {
      const selectChoiceEl = document.createElement("select");
  
      entryEmoji.forEach((emoji) => {
        const opt = document.createElement("option");
        opt.value = emoji;
        opt.textContent = emoji;
        selectChoiceEl.appendChild(opt);
      });
      appendHtmlEl(selectChoiceEl); 
    } else if (entryEmoji.length === 1) {
      const elToAppend = document.createElement('span');
      elToAppend.textContent = entryEmoji[0];
      appendHtmlEl(elToAppend);
    } else {
      const elToAppend = document.createElement('span');
      elToAppend.textContent = e.target.value;
      appendHtmlEl(elToAppend);
    }
  };
  

entryTextAreaEl.addEventListener("input", inputHandler);
window.onload = () => {
  entryTextAreaEl.focus();
};
