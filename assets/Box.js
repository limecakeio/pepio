const boxen = require('boxen');

/**
 * CONSTANTS
 * */
const DEFAULT_MARGIN = 0;

class Box {
    constructor(message, options={}) {
        this._message = message;
        this._options = options;
    }

    print() {
        console.log(boxen(this.message, {
            padding: 1,
            margin: (this.options.margin ? this.options.margin : DEFAULT_MARGIN),
            borderStyle: 'round',
            borderColor: 'blue'
        }));
    }

    printFalse() {
        console.log(boxen(this.message, {
            padding: 1,
            margin: (this.options.margin ? this.options.margin : DEFAULT_MARGIN),
            borderStyle: 'round',
            borderColor: 'red',
            dimBorder: true,
            backgroundColor: 'red'
        }));
    }

    printCorrect() {
        console.log(boxen(this.message, {
            padding: 1,
            margin: (this.options.margin ? this.options.margin : DEFAULT_MARGIN),
            borderStyle: 'round',
            borderColor: 'green',
            dimBorder: true
        }));
    }

    get message() {
        return this._message;
    }

    get options() {
        return this._options;
    }

}

module.exports = Box;