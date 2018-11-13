let fs = require('fs');
let ascii = require('ascii-art');
let FrameSolver = require('./FrameSolver');

/**
 * Constants
 * */
const FILE_DELIMITER = ';';


/**
 * Frame
 *
 * The frame represents the game frame shown to the end user
 *
 * To instantiate a Frame, a Frame Object is required.
 *
 * A Frame object is the raw JSON representation found in frames.json
 * */

class Frame {
    constructor(frame) {
        this._id = frame.id;
        this._header = frame.header;
        this._body = frame.body;
        this._question = frame.question;
        this._solution = frame.solution;
        this._passed = frame.passed;

        if(frame.file) {
            this.populateFromFile(frame.file);
        }
    }

    print() {
        console.log(ascii.style(this.header, 'bold+bright_blue'));
        console.log(ascii.style("", 'off'));
        console.log(this.body);
        console.log(this.question);
    }

    evaluate(input=null) {
        let frameSolver = new FrameSolver(this, input);
        return frameSolver.solution();
    }

    get id() {
        return this._id;
    }

    get header() {
        return this._header;
    }

    set header(header) {
        this._header = header;
    }

    get body() {
        return this._body;
    }

    set body(body) {
        this._body = body;
    }

    get question() {
        return this._question;
    }

    set question(question) {
        this._question = question;
    }

    get solution() {
        return this._solution;
    }

    get passed() {
        return this._passed;
    }

    set passed(hasPassed) {
        this._passed = hasPassed;
    }

    populateFromFile(path_to_file) {
        let rawFile = fs.readFileSync('./assets/Frames/' + path_to_file, {encoding: 'utf8'});
        let frameArray = rawFile.split(FILE_DELIMITER);
        if(frameArray.length !== 3) {
            throw new Error("Error parsing frame file! File in question: " + path_to_file);
        }
        this.header = frameArray[0];
        this.body = frameArray[1];
        this.question = frameArray[2];
    }


    markAsPassed() {
        let frames = require('./frames.json');
        frames[this.id].passed = true;

        try {
            fs.writeFileSync('./assets/Frames/frames.json', JSON.stringify(frames));
            this.passed = true;
        } catch (e) {
            throw new Error(e);
        }
    }
}

module.exports = Frame;