/**
* PAGES.JS
*
* Pages are views that can be loaded into the console at any time during the executing of the program
*
* Every loadPage displays a persisted text which can be accessed through a designated key
*
* A loadPage always returns to the current state in the game
* **/

const fs = require('fs');
const ascii = require('ascii-art');
let promptSync = require('prompt-sync')();
const clear = require('clear');

/**
 * CONSTANTS
 * */
const PAGE_ROOT = "./assets/Page";
const PAGE_DELIMITER = "#";

class Page {
    constructor(pageFile, header) {
        this._pageFile = pageFile;
        this._header = header;
        this._title = "";
        this._body = "";
        this._action = "";

        this.parsePageFile();
    }

    get pageFile() {
        return this._pageFile;
    }

    get header() {
        return this._header;
    }

    get title() {
        return this._title;
    }

    set title(title) {
        this._title = title;
    }

    get body() {
        return this._body;
    }

    set body(body) {
        this._body = body;
    }

    get action() {
        return this._action;
    }

    set action(action) {
        this._action = action;
    }

    parsePageFile() {
        let rawPF = fs.readFileSync(PAGE_ROOT + "/" + this.pageFile + ".txt", {encoding: 'utf8'})
        let pfArray = rawPF.split(PAGE_DELIMITER);
        if(pfArray.length !== 3) {
            throw new Error("Invalid page format for page: " + this.pageFile);
        }
        this.title = pfArray[0];
        this.body = pfArray[1];
        this.action = pfArray[2];
    }

    serve() {
        clear();
        this.header.print();
        console.log(ascii.style(this.title, 'blue+bold'), ascii.style("", 'off'));
        console.log(this.body);
        console.log(this.action);
    }
}


module.exports = Page;