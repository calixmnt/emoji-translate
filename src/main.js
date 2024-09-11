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
      const match = data[emoji]["keywords"].find((keyword) => keyword === text);
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

const splitInputValue = (value) => {
  return value.split(" ");
};

const createSelectElement = (emojis) => {
  const selectChoiceEl = document.createElement("select");
  emojis.forEach((emoji) => {
    const opt = document.createElement("option");
    opt.value = emoji;
    opt.textContent = emoji;
    selectChoiceEl.appendChild(opt);
  });
  return selectChoiceEl;
};

const createSpanElement = (text) => {
  const elToAppend = document.createElement("span");
  elToAppend.textContent = text + " ";
  return elToAppend;
};

const appendEmojiOrText = (proposition) => {
  if (proposition.length > 1) {
    const selectChoiceEl = createSelectElement(proposition);
    appendHtmlEl(selectChoiceEl);
  } else {
    const elToAppend = createSpanElement(proposition[0]);
    appendHtmlEl(elToAppend);
  }
};

const completeWordsToEmojis = (wordsArray) => {
  const emojisArray = [];
  wordsArray.forEach((word) => {
    if (!word) {
      return;
    }
    const entryEmoji = emojiIt(word);
    emojisArray.push(entryEmoji);
  });
  return emojisArray;
};

const inputHandler = (e) => {
  const inputValue = e.target.value;
  if (!inputValue) return;

  const wordsArray = splitInputValue(inputValue);
  const emojisArray = completeWordsToEmojis(wordsArray);

  resultsBoxEl.innerHTML = "";

  emojisArray.forEach(appendEmojiOrText);
};

entryTextAreaEl.addEventListener("input", inputHandler);
window.onload = () => {
  entryTextAreaEl.focus();
};
