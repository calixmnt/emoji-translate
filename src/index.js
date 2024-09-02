const emojilib = require('emojilib');

window.emojis = emojilib.lib;

const entryTextAreaEl = document.querySelector('.entry__textarea');
const resultTextAreaEl = document.querySelector('.results__textarea');

const emojiIt = (text) => {
};

const inputHandler = (e) => {
    const entryValue = e.target.value;

    const resultValue = emojiIt(entryValue);
    resultTextAreaEl.value = resultValue;
};

// Ajouter un écouteur d'événements pour les entrées utilisateur
entryTextAreaEl.addEventListener('input', inputHandler);
