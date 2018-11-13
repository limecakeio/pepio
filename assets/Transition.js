/**
 * Transition.js
 *
 * A transition takes place between frames and displays either a positive or negative
 * feedback dependent on whether a question was solved successfully or not.
 *
 * */

const sleep = require('sleep');
const ascii = require('ascii-art');
let Box = require('./Box');

/**
 * CONSTANTS
 * */
const TEXT_CORRENT = "Korrekt! Sehr gut, weiter so!";
const TEXT_INCORRECT = "Leider falsch! Probiere es noch einmal!";

class Transition {
    constructor(blockTime) {
        this._blockTime = blockTime; //In seconds!
    }

    print(hasPassed) {
        let statement = (hasPassed ? new Box(TEXT_CORRENT).printCorrect() : new Box(TEXT_INCORRECT).printFalse());
        console.log(ascii.style("", 'off'))
        console.log("Returning to the Jagd in...")
            for(let i = this.blockTime; i > 0; i--) {
                console.log(i + "...")
                sleep.sleep(1);
            }
    }

    get blockTime() {
        return this._blockTime;
    }
}

module.exports = Transition;