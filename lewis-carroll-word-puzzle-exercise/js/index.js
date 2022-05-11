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
            console.log('Nytt ord: ', newWord[i]);
            console.log('Start ord: ', lastWord[i]);
        }
    }

    if (changes > 1) {
        return false;
    } else {
        return true;
    }
}

buttonElem.addEventListener('click', () => {
    const newWord = inputElem.value;
    let correctChange;

    if (changedWords.length > 0) {
        const lastWord = changedWords[changedWords.length - 1]; // Plockar ut sista ordet i arrayen
        correctChange = onlyChangedOneLetter(newWord, lastWord);
    } else {
        correctChange = onlyChangedOneLetter(newWord, puzzle.startWord);
    }
    
    if (correctChange) {
        changedWords.push(newWord);
        console.log(changedWords);
    } else {
        console.log('Du fuskar!');
    }
});

startGame();