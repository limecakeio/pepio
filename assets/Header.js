/**
 * HEADER.JS
 *
 * Is in charge of displaying the header of each loadPage.
 * */

let ascii = require('ascii-art');
const COVER_WIDTH = 30;
const COVER_PATTERN = 'variant1';
const TITLE_FONT = 'Doom';
const TITLE_COLOUR = 'bright_magenta';

class Header {
    constructor(path_to_cover, title) {
        this.cover = null;
        this.title = null;

        let promiseChain = []

        promiseChain.push(this.loadCover(path_to_cover), this.loadTitle(title));

        return new Promise((resolve, reject) => {
            Promise.all(promiseChain).then(() => {
                resolve(this);
            }).catch((err) => reject(err))
        });
    }

    loadCover(path_to_file) {
        return new Promise((resolve) => {
            ascii.image({
                filepath: path_to_file,
                alphabet: COVER_PATTERN,
                width: COVER_WIDTH
            }, (res) => {
                this.cover = res;
                resolve();
            })
        })
    };

    loadTitle(title) {
        return new Promise((resolve) => {
            ascii.font(title, TITLE_FONT, TITLE_COLOUR, (res) => {
                this.title = res;
                resolve();
            })
        });
    }

    print() {
        console.log(this.cover, this.title);
    }

}

module.exports = Header;
