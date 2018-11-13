let ascii = require('ascii-art');

const MENU_TITLE = "MENU: ";
const MENU_FUNCTIONS = {
    quit: {
        title: "[Q] Quit",
        event: 'quit',
        inputs: ['q', 'Q', 'quit', 'Quit', 'exit', 'Exit', null],
    },
    clean: {
        title: "[R] Reset Game",
        event: 'reset',
        inputs: ['r', 'R', 'reset', 'Reset'],
    },
    info: {
        title: "[I] Info",
        event: "info",
        inputs: ['i', 'I', 'info', 'Info']
    },
    tips: {
        title: "[T] Tips",
        event: "tips",
        inputs: ['t', 'T', 'tips', 'Tips']
    },
    credits: {
        title: "[C] Credits",
        event: "credits",
        inputs: ['c', 'C', 'credits', 'Credits']
    }
}

class Menu {
    constructor() {
        this._functions = [];

        this.initFunctions();
    }

    get functions() {
        return this._functions;
    }

    initFunctions() {
        Object.keys(MENU_FUNCTIONS).map((key) => this._functions.push(MENU_FUNCTIONS[key]));
    }

    print() {
        let menuEntries = this.functions.map((entry) => entry.title);
        console.log(ascii.style(" " + MENU_TITLE + menuEntries.join('         ') + "          ", 'white+blue_bg+bold'), ascii.style('\n', 'off'));
    }

    parse(input) {
        let result = null;
        this.functions.map((func) => {
            func["inputs"].map((i) => {
                if(i === input) {
                    result = func['event'];
                }
            })
        });
        return result;
    }
}

module.exports = Menu;