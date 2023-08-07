class Game {
    constructor (length=4, range=6, player) {
        this.length = length;
        this.range = range;
        this.secret = this.generateSecret(this.length, this.range).toString();
        this.player = new player(length, range);
    }
    generateSecret(length, range) {
        let randomNumber = '';
        for (let i = 0; i < length; i++) {
            const randomInt = Math.floor(Math.random() * range) + 1;
            randomNumber += randomInt.toString(); // Convert the random number to a string and append it
        }
        return randomNumber;
    }
    startGame () {
        let result;
        let currGuess;
        let endGame = false;
        let guessPath = '';
        let numberOfGuesses = 0;
        // console.log('The secret is ' + this.secret);
        while (!endGame) {
            currGuess = this.player.getNextGuess().toString();
            numberOfGuesses++;
            result = eval2(this.secret, currGuess);
            // guessPath += `Guess: ${currGuess}, hits: ${result['hits']}, perfect hits: ${result['perfect hits']}\n`;
            if (result['perfect hits'] === 4) {
                endGame = true;
            } else {
                this.player.resultOfPlayerGuess(currGuess, result['hits'], result['perfect hits']);
            }
        }
        // console.log(guessPath + 'Congrats you won !');
        return numberOfGuesses
    }
}

class smartPlayer {
    constructor (length, range) {
        this.length = length;
        this.range = range;

        this.numberSet = initSet(length, range);
    }
    getNextGuess() {
        let guess = findNumberWithMostUniqueDigits(this.numberSet);
        return guess;
    }
    resultOfPlayerGuess(previousGuess, hits, perfectHits) {
        let results;
        let secret;
        let filteredNumberSet = []; // array to store filtered numbers
        for (let i = 0; i < this.numberSet.length; i++) {
            secret = this.numberSet[i].toString();
            previousGuess = previousGuess.toString();
            results = eval2(secret, previousGuess);
            if (results['hits'] === hits && results['perfect hits'] ===         
                perfectHits) {
                    // push number onto filtered set of numbers
                    filteredNumberSet.push(this.numberSet[i]);
            }
        }
        this.numberSet = filteredNumberSet;
    }
}

class averagePlayer {
    constructor (length, range) {
        this.length = length;
        this.range = range;

        this.numberSet = initSet(length, range);
    }
    getNextGuess() {
        return this.numberSet[0];
    }
    resultOfPlayerGuess(previousGuess, hits, perfectHits) {
        let results;
        let secret;
        let filteredNumberSet = []; // array to store filtered numbers
        for (let i = 0; i < this.numberSet.length; i++) {
            secret = this.numberSet[i].toString();
            previousGuess = previousGuess.toString();
            results = eval2(secret, previousGuess);
            if (results['hits'] === hits && results['perfect hits'] ===         
                perfectHits) {
                    // push number onto filtered set of numbers
                    filteredNumberSet.push(this.numberSet[i]);
            }
        }
        this.numberSet = filteredNumberSet;
    }
}

class randomPlayer {
    constructor (length, range) {
        this.length = length;
        this.range = range;

        this.numberSet = initSet(length, range);
    }
    getNextGuess() {
        return parseInt(this.numberSet[(Math.floor(Math.random() * this.numberSet.length))]);
    }
    resultOfPlayerGuess(previousGuess, hits, perfectHits) {
        const index = this.numberSet.indexOf(parseInt(previousGuess));
        this.numberSet.splice(index, 1);
    }
}

// test function to test the evaluate function
function test(secret, guess, expectedHits, expectedPerfectHits) {
    let r = eval2(secret, guess); // will return an object containing hits, and perfect hits

    console.log(r);

    return (r['hits'] === expectedHits && r['perfect hits'] ===         
            expectedPerfectHits);

    // assert(r['hits'] === expectedHits);
    // assert(r['perfect hits'] === expectedPerfectHits);
}

function testHelper (secret_str, guess_str, expectedHits, expectedPerfectHits){
    if (!test(secret_str, guess_str, expectedHits, expectedPerfectHits)) {
        console.log('There was an error');
    } else {
        console.log('No error !');
    }
}

function AllTests() {
    testHelper('2222', '1111', 0, 0);
    testHelper('1111', '1111', 0, 4);
    testHelper('1234', '1144', 0, 2);
    testHelper('1123', '4112', 2, 1);
    testHelper('1123', '4111', 1, 1);
}

function generateRandomNumber(lengthOfWord, range) {
    let randomNumber = '';
    for (let i = 0; i < lengthOfWord; i++) {
        const randomInt = Math.floor(Math.random() * range) + 1;
        randomNumber += randomInt.toString(); // Convert the random number to a string and append it
    }
    return randomNumber;
}

function eval2(secret, guess) {
    secret = secret.split('').map(Number);
    guess = guess.split('').map(Number);
    let hits = 0;
    let perfectHits = 0;
    // assuming secret and guess are the same length
    // calculate the amount of perfect hits
    for (let i = 0; i < secret.length; i++) {
        if (secret[i] === guess[i]) {
            perfectHits++;
            secret[i] = -1;
            guess[i] = -1;
        }
    }
    for (let i = 0; i < secret.length; i++) {
        for (let j = 0; j < guess.length; j++) {
            if (secret[i] == guess[j] && secret[i] !== -1) {
                //secret[i] = -1;
                guess[j] = -1;
                hits++;
                break;
            }
        }
    }
    let results = {'hits': hits, 'perfect hits': perfectHits};
    return results;
}

function validateGuess(guess, wordLength, range) {
    // length, int, range
    if (guess.length > wordLength) {
        return false;
    } else if (!/^\d+$/.test(guess)) {
        return false;
    }
    // turn string into array of ints
    guess = guess.split('').map(Number);
    for (let i = 0; i < wordLength; i++) {
        if (guess[i] > range || guess[i] < 1) {
            return false
        }
    }
    return true
}

function initSet(numberLength, numberRange) {
    const minNum = parseInt('1'.repeat(numberLength));
    const maxNum = parseInt(numberRange.toString().repeat(numberLength));
  
    const numberSet = [];
  
    for (let i = minNum; i <= maxNum; i++) {
      const currentNum = i.toString();
  
      if (currentNum.length === numberLength && isValidNumber(currentNum, numberRange)) {
        numberSet.push(parseInt(currentNum));
      }
    }
  
    return numberSet;
}

function isValidNumber(number, numberRange) {
    const maxDigit = numberRange.toString();
    for (let i = 0; i < number.length; i++) {
      const digit = number.charAt(i);
      if (digit < '1' || digit > maxDigit) {
        return false;
      }
    }
    return true;
}

function filterSet(previousGuess, hits, perfectHits, numberSet) {
    let results;
    let secret;
    let filteredNumberSet = []; // array to store filtered numbers
    for (let i = 0; i < numberSet.length; i++) {
        secret = numberSet[i].toString();
        prevGuess = previousGuess.toString();
        results = eval2(secret, prevGuess);
        if (results['hits'] === hits && results['perfect hits'] ===         
            perfectHits) {
                // push number onto filtered set of numbers
                filteredNumberSet.push(numberSet[i]);
        }
    }
    return filteredNumberSet;
}

function makeGuess(numberSet) {
    // returns first element in numberSet, which contains all valid guesses
    let guess = findNumberWithMostUniqueDigits(numberSet);
    return guess;
}

function compVsComp() {
    // console.log('Cows and Bulls Game');
    // declare variables
    let guess;
    let result
    let endGame = false;
    let guessPath = '';
    let numberOfGuesses = 0;

    // generate secret number
    let secret = generateRandomNumber(4, 6).toString();
    // console.log(`Secret is ${secret}`);

    // init number set
    let numberSet = initSet(4, 6);

    while (!endGame) {
        guess = makeGuess(numberSet).toString();
        numberOfGuesses++;
        // console.log(`Guess is ${guess}`);
        result = eval2(secret, guess);
        // console.log(`Hits: ${result['hits']} Perfect Hits: ${result['perfect hits']}`);
        guessPath += `Guess: ${guess}, hits: ${result['hits']}, perfect hits: ${result['perfect hits']}\n`;
        if (result['perfect hits'] === 4) {
            endGame = true;
        } else {
            numberSet = filterSet(guess, result['hits'], result['perfect hits'], numberSet);
        }
    }
    let finalArray = [guessPath, numberOfGuesses];
    return finalArray;
}

function countUniqueDigits(number) {
    let digitSet = new Set(number.toString().split(''));
    return digitSet.size;
}
  
  function findNumberWithMostUniqueDigits(numbers) {
    let maxUniqueDigits = 0;
    let numberWithMostUniqueDigits = null;
  
    for (const number of numbers) {
      const uniqueDigits = countUniqueDigits(number);
      if (uniqueDigits > maxUniqueDigits) {
        maxUniqueDigits = uniqueDigits;
        numberWithMostUniqueDigits = number;
      }
    }
  
    return numberWithMostUniqueDigits;
}

function driverFunction(selectedPlayer) {
    let numGuesses;
    let guessesArray = [];
    let gameInstance;
    for (let i = 0; i < 1000; i++) {
        if (selectedPlayer === 1) {
            gameInstance = new Game(4, 6, smartPlayer);
        } else if (selectedPlayer === 2) {
            gameInstance = new Game(4, 6, averagePlayer);
        } else if (selectedPlayer === 3) {
            gameInstance = new Game(4, 6, randomPlayer);
        }
        numGuesses = gameInstance.startGame();
        guessesArray[i] = numGuesses
    }
    const sum = guessesArray.reduce((partialSum, a) => partialSum + a, 0);
    let avg = sum/guessesArray.length;
    let min = Math.min(...guessesArray);
    let max = Math.max(...guessesArray);

    const message = `After running the computer vs computer simulation 1000 times, here are the statistics: Average Number of Guesses: ${avg}\nSmallest Number of Guesses: ${min}\nLargest Number of Guesses: ${max}`;
    return message
}

// main driver function
(function() {
    // let array = [];
    // let numGuesses;
    // let guessesArray = [];
    // for (let i = 0; i < 1000; i++) {
    //     array = compVsComp();
    //     numGuesses = array[1];
    //     guessesArray[i] = numGuesses
    // }
    // const sum = guessesArray.reduce((partialSum, a) => partialSum + a, 0);
    // let avg = sum/guessesArray.length;
    // let min = Math.min(...guessesArray);
    // let max = Math.max(...guessesArray);
    // console.log(`After running the computer vs computer simulation 1000 times, here are the statistics: Average Number of Guesses: ${avg}\nSmallest Number of Guesses: ${min}\nLargest Number of Guesses: ${max}`);
    // const gameInstance = new Game(4, 6, Player1);
    // gameInstance.startGame();
    console.log(driverFunction(1));
})();