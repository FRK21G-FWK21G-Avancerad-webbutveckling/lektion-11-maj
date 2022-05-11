/**
 * 1. Slumpa en kombo av ett start/slutord och starta pusslet
 * 2. Låta användaren mata in ett nytt ord där en bokstav är bytt
 * 3. Kontrollera att det enbart är en bokstav som är bytt
 * 4. Kontrollera att det är ett korrekt engelskt ord mot API
 * 5. Se om vi har vunnit
 */

const puzzles = [{ startWord: 'FOUR', endWord: 'FIVE' }, { startWord: 'EYE', endWord: 'LID' }];
let puzzle = {};
const changedWords = []; //Här sparas alla våra ändrade ord

const startWordElem = document.querySelector('#start-word');
const endWordElem = document.querySelector('#end-word');
const inputElem = document.querySelector('#input-word');
const buttonElem = document.querySelector('#submit-word');
const wordsElem = document.querySelector('#words');

function startGame() {
    // Slumpar en position i arrayen
    const index = Math.floor(Math.random() * puzzles.length);
    puzzle = puzzles[index];

    startWordElem.innerHTML = puzzle.startWord;
    endWordElem.innerHTML = puzzle.endWord;
}

function onlyChangedOneLetter(newWord, lastWord) {
    let changes = 0;

    for(let i = 0; i < newWord.length; i++) {
        if (newWord[i] !== lastWord[i]) {
            changes++;
        }
    }

    if (changes > 1) {
        return false;
    } else {
        return true;
    }
}

async function isAEnglishWord(newWord) {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${newWord}`);
    const data = await response.json();

    console.log(data);
    if (data.length > 0) {
        return true;
    } else {
        return false;
    }
}

function hasWon(lastWord) {
    if (lastWord === puzzle.endWord) alert('Du vann!');
}

function createWordElem(word) {
    const wordElem = document.createElement('li');
    wordElem.innerHTML = word;
    wordsElem.append(wordElem);
}

function displayWords() {
    wordsElem.innerHTML = ''; // Tar bort alla li-taggar i vår ul

    for(let i = 0; i < changedWords.length; i++) {
        createWordElem(changedWords[i]);
    }
}

buttonElem.addEventListener('click', async () => {
    const newWord = inputElem.value;
    let correctChange;
    let correctEnglishWord;

    if (newWord.length === puzzle.startWord.length) {
        if (changedWords.length > 0) {
            const lastWord = changedWords[changedWords.length - 1]; // Plockar ut sista ordet i arrayen
            correctChange = onlyChangedOneLetter(newWord, lastWord);
            correctEnglishWord = await isAEnglishWord(newWord);
        } else {
            correctChange = onlyChangedOneLetter(newWord, puzzle.startWord);
            correctEnglishWord = await isAEnglishWord(newWord);
        }
    }
    
    if (correctChange && correctEnglishWord) {
        changedWords.push(newWord);
        hasWon(newWord);
        displayWords();
        console.log(changedWords);
    } else {
        console.log('Du fuskar!');
    }
});

startGame();