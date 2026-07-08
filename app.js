import { possibleGuess } from "./words.js"
import { possibleWords } from "./words.js"

console.log(possibleGuess.length)

const keys = {
    0: 'q',
    1: 'w',
    2: 'e',
    3: 'r',
    4: 't',
    5: 'y',
    6: 'u',
    7: 'i',
    8: 'o',
    9: 'p',
    10: 'a',
    11: 's',
    12: 'd',
    13: 'f',
    14: 'g',
    15: 'h',
    16: 'j',
    17: 'k',
    18: 'l',
    19: 'z',
    20: 'x',
    21: 'c',
    22: 'v',
    23: 'b',
    24: 'n',
    25: 'm'
};

function addKeys() {
    let workingRow = 1
    for (let i in keys) {
        console.log('ee')
        document.getElementById(`rowKey${workingRow}`).insertAdjacentHTML('beforeend',
            `
                <button id="${keys[i]}" class="key col-1 py-2" onclick="keyPress('${keys[i]}')">${keys[i].toUpperCase()}</button>        
            `
        )
        if (i == 9) {
            workingRow = 2
        }
        if (i == 18) {
            workingRow = 3
        }
    }
    document.getElementById(`rowKey${workingRow}`).insertAdjacentHTML('beforeend',
        `
        <button id="enter" class="key col-1 py-2 enter" onclick="keyPress('enter')">&rarr;</button>

        `
    )

}
window.addKeys = addKeys
addKeys()


let realWord = possibleWords[Math.floor(Math.random() * possibleWords.length)]
console.log(realWord)


let word = ""
let guess = 1
let character = 1
let winsteak = 0

let backgroundBlur = document.getElementById("win-blur")


// boxes
let looseBox = document.getElementById("loose-box")
let winBox = document.getElementById("win-box")

// tries and correct word text
let correctWordLooseBox = document.getElementById("correctWord")
let triesWinBox = document.getElementById("tries")

// winstreak text
let winstreakTextWinBox = document.getElementById("winstreakWin")
let winstreakTextLooseBox = document.getElementById("winstreakLoose")


//keys and wordboxes
let wordBoxes = document.querySelectorAll(".wordbox")
let keyBoxes = document.querySelectorAll(".key")




document.addEventListener('keydown', logKey);
function logKey(e) {
    if (e.code.length == 4) {
        keyPress(e.code[3].toLowerCase())
    }
    else {
        keyPress(e.code)
    }
}
window.logKey = logKey


function keyPress(key) {
    console.log(key)
    if (character <= 5 && key.length == 1) {
        word += key;
        document.getElementById("guess-" + guess + "-" + character).innerHTML = key.toUpperCase()
        document.getElementById("guess-" + guess + "-" + character).classList.add("wordIn", "box-big-small")
        character += 1
    }
    else if (key == "Backspace") {
        if (character > 1) {
            character -= 1
            word = word.slice(0, -1)
            document.getElementById("guess-" + guess + "-" + character).innerHTML = " "
            document.getElementById("guess-" + guess + "-" + character).classList.remove("wordIn", "box-big-small", "box-big-small")
        }

    }
    else if (key == "Enter") {
        console.log("enter")

        if (character == 6 && possibleGuess.includes(word) || character == 6 && possibleWords.includes(word)) {
            console.log("enterIn")

            let realWordArr = Array.from(realWord)
            let guessWordArr = Array.from(word)

            if (realWord === word) {
                for (let i = 0; i <= 4; i++) {
                    document.getElementById("guess-" + guess + "-" + (i + 1)).classList.add("enter-green")
                }

                setTimeout(() => {
                    win()
                }, 1000);
            }
            else if (realWord != word && guess < 6) {
                console.log("enterInNotWord")

                for (let i = 0; i <= 4; i++) {


                    if (!realWordArr.includes(guessWordArr[i])) {
                        document.getElementById("guess-" + guess + "-" + (i + 1)).classList.add("enter-gray")
                        document.getElementById(guessWordArr[i]).classList.add("key-gray")


                    }
                    if (realWordArr.includes(guessWordArr[i])) {
                        document.getElementById("guess-" + guess + "-" + (i + 1)).classList.add("enter-yellow")
                        document.getElementById(guessWordArr[i]).classList.add("key-yellow")


                    }
                    if (realWordArr[i] == guessWordArr[i]) {
                        console.log(i + 1)
                        document.getElementById("guess-" + guess + "-" + (i + 1)).classList.add("enter-green")
                        document.getElementById(guessWordArr[i]).classList.add("key-green")

                    }
                }


                guess += 1
                character = 1
                word = ""

            }
            if (guess >= 6) {
                loose()
            }


        }
        else if (character == 6) {
            document.getElementById("row-" + guess).classList.add("move-left-right")
            setTimeout(() => {
                document.getElementById("row-" + guess).classList.remove("move-left-right")

            }, 400);
        }
    }

}
window.keyPress = keyPress


function win() {
    winBox.classList.remove("d-none")
    backgroundBlur.classList.add("opactiy-20", "blur")
    winsteak += 1
    winstreakTextWinBox.innerHTML = winsteak
    triesWinBox.innerHTML = guess
}
window.win = win


function loose() {
    looseBox.classList.remove("d-none")
    backgroundBlur.classList.add("opactiy-20", "blur")
    winsteak = 0
    winstreakTextLooseBox.innerHTML = winsteak
    correctWordLooseBox.innerHTML = realWord.toUpperCase()

}

window.loose = loose

function playAgain() {

    looseBox.classList.add("d-none")
    winBox.classList.add("d-none")
    backgroundBlur.classList.remove("opactiy-20", "blur")
    word = ""
    guess = 1
    character = 1
    realWord = possibleWords[Math.floor(Math.random() * possibleWords.length)]
    console.log(realWord)
    console.log(Math.floor(Math.random() * possibleWords.length))

    wordBoxes.forEach(box => {
        box.innerHTML = "&nbsp"
        box.classList = "wordbox"
    })
}

window.playAgain = playAgain










